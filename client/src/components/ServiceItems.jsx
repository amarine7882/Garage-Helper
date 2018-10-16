import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import AddServiceItem from './AddServiceItem';
import { displayIntervalsIfPresent, displayNextDueIfPresent } from '../../helpers/helpers';

export default class ServiceItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceItems: [],
      isAdding: false
    };

    this.getServiceItems = this.getServiceItems.bind(this);
    this.toggleAddServiceItem = this.toggleAddServiceItem.bind(this);
    this.completeServiceItem = this.completeServiceItem.bind(this);
    this.deleteServiceItem = this.deleteServiceItem.bind(this);
  }

  componentDidMount() {
    this.getServiceItems();
  }

  componentDidUpdate(prevProps) {
    const { displayedCar } = this.props;

    if (prevProps.displayedCar !== displayedCar) {
      this.getServiceItems();
    }
  }

  getServiceItems() {
    const { displayedCar, userID } = this.props;

    axios
      .get(`/api/users/${userID}/cars/${displayedCar}/serviceItems`)
      .then(({ data }) => this.setState({ serviceItems: data.serviceItems }))
      .catch(err => console.log(err));
  }

  deleteServiceItem(e) {
    const { displayedCar, userID } = this.props;
    const { id } = e.target;

    axios
      .delete(`/api/users/${userID}/cars/${displayedCar}/serviceItems/${id}`)
      .then(this.getServiceItems)
      .catch(err => console.log(err));
  }

  completeServiceItem(e) {
    const { displayedCar, userID, mileage } = this.props;
    const { id } = e.target;

    axios
      .patch(`/api/users/${userID}/cars/${displayedCar}/serviceItems/${id}`, { mileage })
      .then(this.getServiceItems)
      .catch(err => console.log(err));
  }

  toggleAddServiceItem() {
    const { isAdding } = this.state;

    this.setState({ isAdding: !isAdding });
  }

  render() {
    const { serviceItems, isAdding } = this.state;
    const { userID, displayedCar } = this.props;

    let toggle;
    if (isAdding) {
      toggle = (
        <AddServiceItem
          userID={userID}
          displayedCar={displayedCar}
          toggleAddServiceItem={this.toggleAddServiceItem}
          getServiceItems={this.getServiceItems}
        />
      );
    } else {
      toggle = (
        <button type="button" onClick={this.toggleAddServiceItem}>
          Add Service Item
        </button>
      );
    }
    return (
      <div>
        {toggle}
        <div>
          {serviceItems.map(
            ({
              _id,
              serviceName,
              lastCompletedDate,
              lastCompletedMileage,
              nextDueDate,
              nextDueMileage,
              serviceIntervalMonths,
              serviceIntervalMiles
            }) => (
              <div key={_id}>
                <h3>{serviceName}</h3>
                <h3>{displayNextDueIfPresent(nextDueDate, nextDueMileage)}</h3>
                <p>{displayIntervalsIfPresent(serviceIntervalMonths, serviceIntervalMiles)}</p>
                <p>
                  {`Last Completed on: ${
                    lastCompletedDate ? moment(lastCompletedDate).calendar() : 'Not Completed Yet'
                  }`}
                </p>
                <p>
                  {`Mileage when last completed: ${lastCompletedMileage || 'Not completed yet'}`}
                </p>
                <button type="button" id={_id} onClick={this.completeServiceItem}>
                  Complete
                </button>
                <button type="button" id={_id} onClick={this.deleteServiceItem}>
                  Delete
                </button>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

ServiceItems.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  mileage: PropTypes.number.isRequired
};
