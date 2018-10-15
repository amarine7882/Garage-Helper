import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Car extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { displayedCar } = this.props;

    if (!displayedCar) return null;

    return <div>Car</div>;
  }
}

Car.defaultProps = {
  displayedCar: undefined
};

Car.propTypes = {
  displayedCar: PropTypes.string
};
