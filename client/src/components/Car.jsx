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
      carData: {
        mileage: 0,
        carName: ''
      },
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
      this.getCarData();
    }
  }

  async getCarData() {
    const { displayedCar, userID } = this.props;

    if (!displayedCar) return;
    // TODO: fix loading display on mileage refresh
    this.setState({ isLoading: true, isAdding: false, isUpdating: false });
    const data = await requestCarData(userID, displayedCar);
    this.setState({ carData: data, isLoading: false });
  }

  toggleUpdate() {
    const { isUpdating } = this.state;
    this.setState({ isUpdating: !isUpdating });
  }

  toggleAddServiceItem() {
    const { isAdding } = this.state;
    this.setState({ isAdding: !isAdding });
  }

  render() {
    const { carData, isUpdating, isAdding, isLoading } = this.state;
    const { displayedCar, userID, deleteCar } = this.props;

    if (!displayedCar) return null;
    const { carName, make, model, modelYear, mileage } = carData;

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
            <Icon type="delete" theme="outlined" onClick={deleteCar} style={{ fontSize: '24px' }} />
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
