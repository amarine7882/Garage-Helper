import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  handleFormInput(e) {
    const { value } = e.target;

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
      <form>
        <label htmlFor="updateMileage">
          Enter current mileage:
          <input
            name="updateMileage"
            type="number"
            value={updateMileage}
            onChange={this.handleFormInput}
          />
        </label>
        <input type="submit" onClick={this.updateMileage} />
      </form>
    );
  }
}

UpdateMileage.propTypes = {
  userID: PropTypes.string.isRequired,
  displayedCar: PropTypes.string.isRequired,
  getCarData: PropTypes.func.isRequired
};
