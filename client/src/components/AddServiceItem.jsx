import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { postServiceItem } from '../../network/serviceItemRequests';

export default class AddServiceItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceName: '',
      serviceIntervalMonths: 0,
      serviceIntervalMiles: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  handleFormInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { displayedCar, userID, toggleAddServiceItem } = this.props;
    const { serviceName, serviceIntervalMonths, serviceIntervalMiles } = this.state;

    if (serviceName.length < 1 || (serviceIntervalMiles < 1 && serviceIntervalMonths < 1)) return;

    const payload = {
      serviceIntervalMonths,
      serviceIntervalMiles,
      serviceName
    };

    toggleAddServiceItem();
    await postServiceItem(userID, displayedCar, payload);
  }

  render() {
    const { serviceName, serviceIntervalMonths, serviceIntervalMiles } = this.state;
    const { toggleAddServiceItem } = this.props;

    const isEnabled =
      serviceName.length > 0 && (serviceIntervalMonths > 0 || serviceIntervalMiles > 0);

    return (
      <div>
        <form>
          <label htmlFor="serviceName">
            Service Name:
            <input
              name="serviceName"
              type="text"
              value={serviceName}
              onChange={this.handleFormInput}
            />
          </label>
          <label htmlFor="serviceIntervalMonths">
            Service Interval by Months:
            <input
              name="serviceIntervalMonths"
              type="number"
              min="0"
              value={serviceIntervalMonths}
              onChange={this.handleFormInput}
            />
          </label>
          <label htmlFor="serviceIntervalMiles">
            Service Interval by Miles:
            <input
              name="serviceIntervalMiles"
              type="number"
              min="0"
              value={serviceIntervalMiles}
              onChange={this.handleFormInput}
            />
          </label>
          <input type="submit" disabled={!isEnabled} onClick={this.handleSubmit} />
        </form>
        <button type="button" onClick={toggleAddServiceItem}>
          Cancel
        </button>
      </div>
    );
  }
}

AddServiceItem.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  toggleAddServiceItem: PropTypes.func.isRequired
};
