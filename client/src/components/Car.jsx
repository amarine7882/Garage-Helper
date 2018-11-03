import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Card } from 'antd';

import ServiceItemsContainer from './ServiceItemsContainer';
import UpdateMileage from './UpdateMileage';
import AddServiceItem from './AddServiceItem';

import { numberWithCommas } from '../../helpers/helpers';
import { requestCarData } from '../../network/carRequests';

export default class Car extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carData: {},
      isUpdating: false,
      isAdding: false,
      isLoading: true
    };

    this.getCarData = this.getCarData.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.toggleAddServiceItem = this.toggleAddServiceItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { displayedCar } = this.props;

    if (prevProps.displayedCar !== displayedCar) {
      this.setState({ isAdding: false, isUpdating: false, isLoading: true });
      this.getCarData();
    } else {
      return false;
    }
  }

  async getCarData() {
    const { displayedCar, userID } = this.props;

    if (!displayedCar) return;

    const data = await requestCarData(userID, displayedCar);
    this.setState({ carData: data, isLoading: false });
  }

  toggleUpdate() {
    const { isUpdating } = this.state;
    this.setState({ isUpdating: !isUpdating, isAdding: false });
  }

  toggleAddServiceItem() {
    const { isAdding } = this.state;
    this.setState({ isAdding: !isAdding, isUpdating: false });
  }

  render() {
    const { displayedCar, userID, deleteCar } = this.props;
    const {
      carData: { carName, make, model, modelYear, mileage },
      isUpdating,
      isAdding,
      isLoading
    } = this.state;

    if (!displayedCar) return null;

    let mileageToggle;
    if (isUpdating) {
      mileageToggle = (
        <UpdateMileage
          userID={userID}
          displayedCar={displayedCar}
          getCarData={this.getCarData}
          toggleUpdate={this.toggleUpdate}
          mileage={mileage}
        />
      );
    }

    let serviceItemsToggle;
    if (isAdding) {
      serviceItemsToggle = (
        <AddServiceItem
          userID={userID}
          displayedCar={displayedCar}
          toggleAddServiceItem={this.toggleAddServiceItem}
        />
      );
    } else {
      serviceItemsToggle = (
        <ServiceItemsContainer displayedCar={displayedCar} userID={userID} mileage={mileage} />
      );
    }

    return (
      <Card>
        <Card
          loading={isLoading}
          style={{ width: 600, marginBottom: 30 }}
          actions={[
            <Icon
              type="plus"
              theme="outlined"
              onClick={this.toggleAddServiceItem}
              style={{ fontSize: '24px' }}
            />,
            <Icon
              type="arrow-up"
              theme="outlined"
              onClick={this.toggleUpdate}
              style={{ fontSize: '24px' }}
            />,
            <Icon
              type="delete"
              theme="outlined"
              onClick={deleteCar}
              style={{ fontSize: '24px', color: 'red' }}
            />
          ]}
        >
          <h3>{carName}</h3>
          <h2>{`${modelYear} ${make} ${model}`}</h2>
          <p>{`Mileage: ${numberWithCommas(mileage)}`}</p>
          {mileageToggle}
        </Card>
        {serviceItemsToggle}
      </Card>
    );
  }
}

Car.propTypes = {
  deleteCar: PropTypes.func.isRequired,
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired
};
