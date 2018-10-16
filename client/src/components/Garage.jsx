import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { makeCarListValue } from '../../helpers/helpers';

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
    this.deleteCar = this.deleteCar.bind(this);
  }

  componentDidMount() {
    this.getCarList();
  }

  getCarList() {
    const { userID } = this.props;
    axios
      .get(`/api/users/${userID}/cars`)
      .then(({ data }) => this.setState({ carList: data }))
      .catch(err => console.log(err));
  }

  changeDisplayedCar(e) {
    const { target } = e;
    this.setState({ displayedCar: target.value });
  }

  deleteCar() {
    const { userID, displayedCar } = this.state;

    axios
      .delete(`api/users/${userID}/cars/${displayedCar}`)
      .then(() => {
        this.setState({ displayedCar: '' });
        this.getCarList();
      })
      .catch(err => console.log(err));
  }

  toggleNewCarForm() {
    const { isCreating } = this.state;

    this.setState({ isCreating: !isCreating }, () => this.getCarList());
  }

  render() {
    const { isCreating, carList, displayedCar } = this.state;
    const { userID } = this.props;

    let toggle;
    if (isCreating) {
      toggle = <NewCarForm userID={userID} toggleNewCarForm={this.toggleNewCarForm} />;
    } else {
      toggle = (
        <div>
          <button type="button" onClick={this.toggleNewCarForm}>
            Create New Car
          </button>
          <button type="button" onClick={this.deleteCar}>
            Delete Car
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
          <Car displayedCar={displayedCar} userID={userID} />
        </div>
      );
    }

    return <div>{toggle}</div>;
  }
}

Garage.propTypes = {
  userID: PropTypes.string.isRequired
};
