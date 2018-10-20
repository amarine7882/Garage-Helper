import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewCarForm from './NewCarForm';
import Car from './Car';
import CarSelector from './CarSelector';

import { requestCarList, requestCarDelete } from '../../network/carRequests';

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

  async getCarList() {
    const { userID } = this.props;
    const carList = await requestCarList(userID);

    this.setState({ carList });
  }

  async deleteCar() {
    const { userID, displayedCar } = this.state;

    await requestCarDelete(userID, displayedCar);
    this.setState({ displayedCar: '' });
    this.getCarList();
  }

  changeDisplayedCar(e) {
    const { value } = e.target;
    this.setState({ displayedCar: value });
  }

  async toggleNewCarForm() {
    const { isCreating } = this.state;

    await this.getCarList();
    this.setState({ isCreating: !isCreating });
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
          <CarSelector
            carList={carList}
            displayedCar={displayedCar}
            changeDisplayedCar={this.changeDisplayedCar}
          />
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
