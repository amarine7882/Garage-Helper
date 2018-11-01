import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'garage'
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick({ key }) {
    this.setState({ activeItem: key });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu
          mode="horizontal"
          theme="dark"
          selectedKeys={[activeItem]}
          onClick={this.handleMenuClick}
        >
          <Menu.Item key="garage">
            <Icon type="car" theme="outlined" />
            Garage
          </Menu.Item>
          <Menu.Item key="logout" style={{ float: 'right' }}>
            <Icon type="logout" theme="outlined" />
            Logout
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

// TODO modularize style
