import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
        <div>
          {serviceItems.map(item => (
            <div key={item._id}>
              <div>{item.serviceName}</div>
              <div>{`Due every ${item.serviceInterval} months`}</div>
              <div>Next Due</div>
            </div>
          ))}
        </div>
        {toggle}
      </div>
    );
  }
}

ServiceItems.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired
};
