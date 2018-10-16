import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ServiceItems from './ServiceItems';
import { numberWithCommas } from '../../helpers/helpers';

export default class Car extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carData: undefined
    };

    this.getCarData = this.getCarData.bind(this);
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
      .then(({ data }) => this.setState({ carData: data }))
      .catch(err => console.log(err));
  }

  render() {
    const { carData } = this.state;
    const { displayedCar, userID } = this.props;

    if (!displayedCar) return null;
    if (!carData) return <div>Loading...</div>;

    const { carName, make, model, modelYear, mileage } = carData;

    return (
      <div>
        <h1>{carName}</h1>
        <h3>{`${modelYear} ${make} ${model}`}</h3>
        <h3>{`Mileage: ${numberWithCommas(mileage)}`}</h3>
        <ServiceItems displayedCar={displayedCar} userID={userID} />
      </div>
    );
  }
}

Car.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired
};
