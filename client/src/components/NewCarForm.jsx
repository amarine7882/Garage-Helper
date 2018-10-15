import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { generateModelYears } from '../../utils/helpers';

export default class NewCarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carName: '',
      make: '',
      model: '',
      modelYear: 2000
    };

    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormInput(e) {
    const { target } = e;
    const field = target.name;
    this.setState({ [field]: target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { carName, make, model, modelYear } = this.state;
    const { userID, toggleNewCarForm } = this.props;

    axios
      .post('api/cars', { userID, carName, make, model, modelYear })
      .then(() => toggleNewCarForm())
      .catch(err => console.log(err));
  }

  render() {
    const { carName, make, model, modelYear } = this.state;

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
          <label htmlFor="modelYear">
            Model Year:
            <select name="modelYear" value={modelYear} onChange={this.handleFormInput}>
              {generateModelYears().map(year => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <input type="submit" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

NewCarForm.propTypes = {
  userID: PropTypes.string.isRequired,
  toggleNewCarForm: PropTypes.func.isRequired
};
