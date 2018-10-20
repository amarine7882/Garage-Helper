import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { generateModelYears } from '../../helpers/helpers';
import { postNewCar } from '../../network/carRequests';

export default class NewCarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carName: '',
      make: '',
      model: '',
      modelYear: 2000,
      mileage: 0
    };

    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormInput(e) {
    const { target } = e;
    const field = target.name;

    this.setState({ [field]: target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { carName, make, model, modelYear, mileage } = this.state;
    const { userID, toggleNewCarForm } = this.props;
    const payload = { carName, make, model, modelYear, mileage };

    if (make.length < 1 || model.length < 1 || mileage < 0) return;

    await postNewCar(userID, payload);
    toggleNewCarForm();
  }

  render() {
    const { carName, make, model, modelYear, mileage } = this.state;
    const { toggleNewCarForm } = this.props;

    const isEnabled = make.length > 0 && model.length > 0 && mileage >= 0;

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
          <label htmlFor="mileage">
            Mileage:
            <input
              name="mileage"
              type="Number"
              value={mileage}
              min="0"
              onChange={this.handleFormInput}
            />
          </label>
          <input type="submit" disabled={!isEnabled} onClick={this.handleSubmit} />
        </form>
        <button type="button" onClick={toggleNewCarForm}>
          Cancel
        </button>
      </div>
    );
  }
}

NewCarForm.propTypes = {
  userID: PropTypes.string.isRequired,
  toggleNewCarForm: PropTypes.func.isRequired
};
