import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ServiceItems from './ServiceItems';
import { numberWithCommas } from '../../helpers/helpers';

export default class Car extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateMileage: 1,
      carData: undefined
    };

    this.getCarData = this.getCarData.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
    this.updateMileage = this.updateMileage.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { displayedCar } = this.props;

    if (prevProps.displayedCar !== displayedCar) {
      this.getCarData();
    }
  }

  getCarData() {
    const { displayedCar, userID } = this.props;

    if (!displayedCar) return;

    axios
      .get(`api/users/${userID}/cars/${displayedCar}`)
      .then(({ data }) => this.setState({ carData: data, updateMileage: data.mileage }))
      .catch(err => console.log(err));
  }

  handleFormInput(e) {
    const { target } = e;
    const field = target.name;
    this.setState({ [field]: target.value });
  }

  updateMileage(e) {
    e.preventDefault();
    const { updateMileage } = this.state;
    const { userID, displayedCar } = this.props;

    axios
      .patch(`api/users/${userID}/cars/${displayedCar}`, { updateMileage })
      .then(this.getCarData())
      .catch(err => console.log(err));
  }

  render() {
    const { carData, updateMileage } = this.state;
    const { displayedCar, userID } = this.props;

    if (!displayedCar) return null;
    if (!carData) return <div>Loading...</div>;

    const { carName, make, model, modelYear, mileage } = carData;

    return (
      <div>
        <h3>{carName}</h3>
        <h3>{`${modelYear} ${make} ${model}`}</h3>
        <h3>{`Mileage: ${numberWithCommas(mileage)}`}</h3>
        <form>
          <label htmlFor="updateMileage">
            Enter current mileage:
            <input
              name="updateMileage"
              type="number"
              min={mileage}
              value={updateMileage}
              onChange={this.handleFormInput}
            />
          </label>
          <input type="submit" onClick={this.updateMileage} />
        </form>
        <ServiceItems displayedCar={displayedCar} userID={userID} mileage={mileage} />
      </div>
    );
  }
}

Car.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired
};
