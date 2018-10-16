import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ServiceItems from './ServiceItems';

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
    if (!carData) return <div>Loadng...</div>;

    const { carName, make, model, modelYear } = carData;

    return (
      <div>
        <div>
          <h1>{carName}</h1>
        </div>
        <div>
          <h2>{make}</h2>
        </div>
        <div>
          <h2>{model}</h2>
        </div>
        <div>
          <h3>{modelYear}</h3>
        </div>
        <ServiceItems displayedCar={displayedCar} userID={userID} />
      </div>
    );
  }
}

Car.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired
};
