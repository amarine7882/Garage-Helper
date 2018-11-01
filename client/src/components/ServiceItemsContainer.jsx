import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      serviceItems: []
    };

    this.getServiceItems = this.getServiceItems.bind(this);
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

  async deleteServiceItem({ target }) {
    const { displayedCar, userID } = this.props;
    const { id } = target;

    await requestDeleteServiceItem(userID, displayedCar, id);
    this.getServiceItems();
  }

  async completeServiceItem({ target }) {
    const { displayedCar, userID, mileage } = this.props;
    const { id } = target;

    await patchServiceItem(userID, displayedCar, id, mileage);
    this.getServiceItems();
  }

  render() {
    const { serviceItems } = this.state;

    return (
      <ServiceItems
        serviceItems={serviceItems}
        completeServiceItem={this.completeServiceItem}
        deleteServiceItem={this.deleteServiceItem}
      />
    );
  }
}

ServiceItemsContainer.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  mileage: PropTypes.number.isRequired
};
