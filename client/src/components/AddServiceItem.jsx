import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class AddServiceItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceName: '',
      serviceInterval: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  handleFormInput(e) {
    const { target } = e;
    const field = target.name;
    this.setState({ [field]: target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { displayedCar, userID, getServiceItems, toggleAddServiceItem } = this.props;
    const { serviceName, serviceInterval } = this.state;

    const serviceItem = {
      serviceInterval,
      serviceName
    };

    axios
      .post(`/api/users/${userID}/cars/${displayedCar}/serviceItems`, serviceItem)
      .then(() => {
        getServiceItems();
        toggleAddServiceItem();
      })
      .catch(err => console.log(err));
  }

  render() {
    const { serviceName, serviceInterval } = this.state;

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
          <label htmlFor="serviceInterval">
            Service Interval:
            <input
              name="serviceInterval"
              type="number"
              value={serviceInterval}
              onChange={this.handleFormInput}
            />
          </label>
          <input type="submit" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

AddServiceItem.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  getServiceItems: PropTypes.func.isRequired,
  toggleAddServiceItem: PropTypes.func.isRequired
};
