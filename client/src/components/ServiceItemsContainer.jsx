import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddServiceItem from './AddServiceItem';
import ServiceItems from './ServiceItems';

import {
  requestServiceItems,
  requestDeleteServiceItem,
  patchServiceItem
} from '../../network/serviceItemRequests';

export default class ServiceItemsContainer extends Component {
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

  async getServiceItems() {
    const { userID, displayedCar } = this.props;

    const { serviceItems } = await requestServiceItems(userID, displayedCar);
    this.setState({ serviceItems });
  }

  async deleteServiceItem(e) {
    const { displayedCar, userID } = this.props;
    const { id } = e.target;

    await requestDeleteServiceItem(userID, displayedCar, id);
    this.getServiceItems();
  }

  async completeServiceItem(e) {
    const { displayedCar, userID, mileage } = this.props;
    const { id } = e.target;

    await patchServiceItem(userID, displayedCar, id, mileage);
    this.getServiceItems();
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
        <ServiceItems
          serviceItems={serviceItems}
          completeServiceItem={this.completeServiceItem}
          deleteServiceItem={this.deleteServiceItem}
        />
      </div>
    );
  }
}

ServiceItemsContainer.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  mileage: PropTypes.number.isRequired
};
