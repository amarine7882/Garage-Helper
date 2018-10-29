import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

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

  handleFormInput(e, { value }) {
    this.setState({ updateMileage: value });
  }

  async updateMileage(e) {
    e.preventDefault();
    const { updateMileage } = this.state;
    const { getCarData, userID, displayedCar } = this.props;

    await patchCarMileage(userID, displayedCar, updateMileage);
    getCarData();
  }

  render() {
    const { updateMileage } = this.state;

    return (
      <Form onSubmit={this.updateMileage}>
        <Form.Input
          type="number"
          name="updateMileage"
          label="Update Mileage"
          value={updateMileage}
          onChange={this.handleFormInput}
        />
        <Form.Button content="Update" type="submit" />
      </Form>
    );
  }
}

UpdateMileage.propTypes = {
  userID: PropTypes.string.isRequired,
  displayedCar: PropTypes.string.isRequired,
  getCarData: PropTypes.func.isRequired
};
