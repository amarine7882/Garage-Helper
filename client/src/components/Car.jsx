import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServiceItemsContainer from './ServiceItemsContainer';
import UpdateMileage from './UpdateMileage';

import { numberWithCommas } from '../../helpers/helpers';
import { requestCarData } from '../../network/carRequests';

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

  async getCarData() {
    const { displayedCar, userID } = this.props;

    if (!displayedCar) return;

    const data = await requestCarData(userID, displayedCar);
    this.setState({ carData: data });
  }

  render() {
    const { carData } = this.state;
    const { displayedCar, userID } = this.props;

    if (!displayedCar) return null;
    if (!carData) return <div>Loading...</div>;

    const { carName, make, model, modelYear, mileage } = carData;

    return (
      <div>
        <h3>{carName}</h3>
        <h3>{`${modelYear} ${make} ${model}`}</h3>
        <h3>{`Mileage: ${numberWithCommas(mileage)}`}</h3>
        <UpdateMileage userID={userID} displayedCar={displayedCar} getCarData={this.getCarData} />
        <ServiceItemsContainer displayedCar={displayedCar} userID={userID} mileage={mileage} />
      </div>
    );
  }
}

Car.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired
};
