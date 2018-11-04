/* eslint react/no-did-update-set-state: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Card, Skeleton } from 'antd';

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

  componentDidMount() {
    const { displayedCar } = this.props;
    if (displayedCar) this.getCarData();
  }

  componentDidUpdate(prevProps) {
    const { displayedCar } = this.props;

    if (prevProps.displayedCar !== displayedCar) {
      this.setState({ isAdding: false, isUpdating: false, isLoading: true });
      this.getCarData();
    }
    return false;
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

    let loader;
    if (isLoading) {
      loader = (
        <div>
          <Card style={{ width: 500, marginBottom: 10 }}>
            <Skeleton loading active title />
          </Card>
          <Card style={{ width: 500, marginBottom: 10 }}>
            <Skeleton loading active title />
          </Card>
          <Card style={{ width: 500, marginBottom: 10 }}>
            <Skeleton loading active title />
          </Card>
        </div>
      );
    }

    return (
      <Card>
        <Card
          loading={isLoading}
          style={{ width: 600, margin: '0px auto 30px auto' }}
          actions={[
            <span
              role="button"
              tabIndex={0}
              onKeyPress={this.toggleAddServiceItem}
              onClick={this.toggleAddServiceItem}
              style={{ outline: 'none' }}
            >
              <Icon type="plus" theme="outlined" style={{ fontSize: '24px', marginRight: 10 }} />
              Add Service
            </span>,
            <span
              role="button"
              tabIndex={0}
              onKeyPress={this.toggleUpdate}
              onClick={this.toggleUpdate}
              style={{ outline: 'none' }}
            >
              <Icon
                type="arrow-up"
                theme="outlined"
                style={{ fontSize: '24px', marginRight: 10 }}
              />
              Update Mileage
            </span>,
            <span
              role="button"
              tabIndex={0}
              onKeyPress={deleteCar}
              onClick={deleteCar}
              style={{ outline: 'none' }}
            >
              <Icon
                type="delete"
                theme="outlined"
                style={{ fontSize: '24px', color: 'red', marginRight: 10 }}
              />
              Delete Car
            </span>
          ]}
        >
          <h3>{carName}</h3>
          <h2>{`${modelYear} ${make} ${model}`}</h2>
          <p>{`Mileage: ${numberWithCommas(mileage)}`}</p>
          {mileageToggle}
        </Card>
        {serviceItemsToggle}
        {loader}
      </Card>
    );
  }
}

Car.propTypes = {
  deleteCar: PropTypes.func.isRequired,
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired
};
