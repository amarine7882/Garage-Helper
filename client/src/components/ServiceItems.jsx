import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import AddServiceItem from './AddServiceItem';

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
    const { displayedCar, userID } = this.props;
    const { id } = e.target;

    axios
      .patch(`/api/users/${userID}/cars/${displayedCar}/serviceItems/${id}`)
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
          {serviceItems.map(item => (
            <div key={item._id}>
              <div>
                <h2>{item.serviceName}</h2>
              </div>
              <div>
                <h3>{`Next Due: ${moment(item.nextDue).calendar()}`}</h3>
              </div>
              <div>{`Due every ${item.serviceInterval} months`}</div>
              <div>{`Last Completed: ${moment(item.lastCompleted).calendar()}`}</div>
              <button type="button" id={item._id} onClick={this.completeServiceItem}>
                Complete
              </button>
              <button type="button" id={item._id} onClick={this.deleteServiceItem}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ServiceItems.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired
};
