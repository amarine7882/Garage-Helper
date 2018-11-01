import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Input, InputNumber, Button } from 'antd';

import { postNewCar } from '../../network/carRequests';

export default class NewCarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carName: '',
      make: '',
      model: '',
      modelYear: moment().year(),
      mileage: 0
    };

    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormInput({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { carName, make, model, modelYear, mileage } = this.state;
    const { userID, getCarList } = this.props;

    const payload = { carName, make, model, modelYear, mileage };

    await postNewCar(userID, payload);
    this.setState({
      carName: '',
      make: '',
      model: '',
      modelYear: moment().year(),
      mileage: 0
    });
    getCarList();
  }

  render() {
    const { carName, make, model, mileage, modelYear } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Car Name">
          <Input
            name="carName"
            value={carName}
            onChange={this.handleFormInput}
            placeholder="car name"
          />
        </Form.Item>
        <Form.Item label="Make" required>
          <Input name="make" value={make} onChange={this.handleFormInput} placeholder="make" />
        </Form.Item>
        <Form.Item label="Model" required>
          <Input name="model" value={model} onChange={this.handleFormInput} placeholder="model" />
        </Form.Item>
        <Form.Item label="Model Year" required>
          <InputNumber name="modelYear" value={modelYear} onChange={this.handleFormInput} />
        </Form.Item>
        <Form.Item label="Mileage" required>
          <InputNumber name="mileage" value={mileage} onChange={this.handleFormInput} />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    );
  }
}

NewCarForm.propTypes = {
  userID: PropTypes.string.isRequired,
  getCarList: PropTypes.func.isRequired
};
