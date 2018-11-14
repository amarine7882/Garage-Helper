provider "aws" {
  access_key  = "${var.AWS_ACCESS_KEY_ID}"
  seceret_key = "${var.AWS_SECRET_ACCESS_KEY}"
  region      = "us-west-1"
}

//---------------------------------
//---------------------------------
// SECURITY GROUP
//---------------------------------
//---------------------------------

resource "aws_security_group" "garage-helper-sg" {
  name        = "Security group for garage-helper"
  description = "SSH and server port access"

  # SSH access from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Server port access from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

//---------------------------------
//---------------------------------
// APPLICATION SERVERS
//---------------------------------
//---------------------------------

resource "aws_instance" "garage-helper-service" {
  count                  = 1
  ami                    = "ami-0bdb828fd58c52235"
  instance_type          = "t2.micro"
  vpc_security_group_ids = ["${aws_security_group.garage-helper-sg.id}"]
  key_name               = "garage-helper"

  provisioner "remote-exec" {
    inline = [
      "sudo yum install -y docker",
      "sudo service docker start",
      "sudo docker pull amarine7882/garage-helper:0.1.${var.TAG}",
      "sudo docker run -d -p 80:80 --env-file ./env.list --restart unless-stopped amarine7882/garage-helper:0.1.${var.TAG}",
    ]
  }

  connection {
    user        = "ec2-user"
    private_key = "${file("./garage-helper.pem")}"
  }

  tags {
    Name = "service-${count.index}"
  }
}
