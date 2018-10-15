import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import NewCarForm from './NewCarForm';
import Car from './Car';

export default class Garage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreating: false,
      carList: undefined,
      displayedCar: undefined
    };

    this.toggleNewCarForm = this.toggleNewCarForm.bind(this);
  }

  toggleNewCarForm() {
    const { isCreating } = this.state;

    this.setState({ isCreating: !isCreating });
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
          <select>
            {carList.map(car => (
              <option value={car.id} key={car.id}>
                {car.name}
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
