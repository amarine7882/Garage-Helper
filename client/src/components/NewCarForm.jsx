import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class NewCarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carName: '',
      make: '',
      model: '',
      year: 2000,
    };

    this.handleFormInput = this.handleFormInput.bind(this);
  }

  handleFormInput(e) {
    const { target } = e;
    const field = target.name;
    this.setState({ [field]: target.value });
  }

  render() {
    const { carName, make, model, year } = this.state;
    const { isCreating } = this.props;

    const start = 1900;
    // Adding plus one to year to account for next model year cars
    const end = new Date().getFullYear() + 1;
    let years = [];

    for (let i = start; i <= end; i += 1) {
      years = [...years, i];
    }

    if (!isCreating) {
      return null;
    }

    return (
      <div>
        <form>
          <label htmlFor="carName">
            Name Your Car:
            <input name="carName" type="text" value={carName} onChange={this.handleFormInput} />
          </label>
          <label htmlFor="make">
            Make:
            <input name="make" type="text" value={make} onChange={this.handleFormInput} />
          </label>
          <label htmlFor="model">
            Model:
            <input name="model" type="text" value={model} onChange={this.handleFormInput} />
          </label>
          <label htmlFor="year">
            Year:
            <select name="year" value={year} onChange={this.handleFormInput}>
              {years.map(yr => (
                <option value={yr}>{yr}</option>
              ))}
            </select>
          </label>
        </form>
      </div>
    );
  }
}

NewCarForm.propTypes = {
  isCreating: PropTypes.bool.isRequired,
};
