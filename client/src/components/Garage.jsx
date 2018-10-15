import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { makeCarListValue } from '../../utils/helpers';

import NewCarForm from './NewCarForm';
import Car from './Car';

export default class Garage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreating: false,
      carList: [],
      displayedCar: ''
    };

    this.toggleNewCarForm = this.toggleNewCarForm.bind(this);
    this.getCarList = this.getCarList.bind(this);
    this.changeDisplayedCar = this.changeDisplayedCar.bind(this);
  }

  componentDidMount() {
    this.getCarList();
  }

  getCarList() {
    const { userID } = this.props;

    axios
      .get(`api/users/${userID}/cars`)
      .then(({ data }) => this.setState({ carList: data }))
      .catch(err => console.log(err));
  }

  changeDisplayedCar(e) {
    const { target } = e;
    this.setState({ displayedCar: target.value });
  }

  toggleNewCarForm() {
    const { isCreating } = this.state;

    this.setState({ isCreating: !isCreating }, () => this.getCarList());
  }

  render() {
    const { isCreating, carList, displayedCar } = this.state;
    const { userID } = this.props;

    let newCarForm;
    if (isCreating) {
      newCarForm = <NewCarForm userID={userID} toggleNewCarForm={this.toggleNewCarForm} />;
    }

    return (
      <div>
        <button type="button" onClick={this.toggleNewCarForm}>
          Create New Car
        </button>
        <div>
          Your Cars:
          <select onChange={this.changeDisplayedCar} value={displayedCar}>
            <option value="">select a car</option>
            {carList.map(car => (
              <option value={car._id} key={car._id}>
                {makeCarListValue(car)}
              </option>
            ))}
          </select>
        </div>
        <Car displayedCar={displayedCar} />
        {newCarForm}
      </div>
    );
  }
}

Garage.propTypes = {
  userID: PropTypes.string.isRequired
};
