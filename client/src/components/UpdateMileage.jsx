import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input } from 'antd';

import { patchCarMileage } from '../../network/carRequests';

export default class UpdateMileage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateMileage: 0
    };

    this.handleFormInput = this.handleFormInput.bind(this);
    this.updateMileage = this.updateMileage.bind(this);
  }

  handleFormInput({ target }) {
    const { value } = target;
    this.setState({ updateMileage: value });
  }

  async updateMileage(e) {
    e.preventDefault();
    const { updateMileage } = this.state;
    const { getCarData, userID, displayedCar, toggleUpdate } = this.props;

    toggleUpdate();
    await patchCarMileage(userID, displayedCar, updateMileage);
    getCarData();
  }

  render() {
    const { updateMileage } = this.state;

    return (
      <Form onSubmit={this.updateMileage}>
        <Form.Item>
          Update Mileage:
          <Input
            type="number"
            name="updateMileage"
            value={updateMileage}
            onChange={this.handleFormInput}
          />
        </Form.Item>
        <Button htmlType="submit">Update</Button>
      </Form>
    );
  }
}

UpdateMileage.propTypes = {
  userID: PropTypes.string.isRequired,
  displayedCar: PropTypes.string.isRequired,
  getCarData: PropTypes.func.isRequired,
  toggleUpdate: PropTypes.func.isRequired
};
