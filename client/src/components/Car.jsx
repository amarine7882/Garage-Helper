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
      carData: undefined,
      isUpdating: false,
      isAdding: false
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

    const data = await requestCarData(userID, displayedCar);
    this.setState({ carData: data });
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
    const { carData, isUpdating, isAdding } = this.state;
    const { displayedCar, userID, deleteCar } = this.props;

    let mileageToggle;
    let serviceItemsToggle;
    if (!displayedCar) return null;
    if (!carData) return <Icon type="loading" theme="outlined" style={{ fontSize: '80px' }} />;
    if (isUpdating) {
      mileageToggle = (
        <UpdateMileage
          userID={userID}
          displayedCar={displayedCar}
          getCarData={this.getCarData}
          toggleUpdate={this.toggleUpdate}
        />
      );
    }

    const { carName, make, model, modelYear, mileage } = carData;
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
          style={{ width: 400 }}
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
          <div>{carName}</div>
          <div>{`${modelYear} ${make} ${model}`}</div>
          <div>{`Mileage: ${numberWithCommas(mileage)}`}</div>
        </Card>
        {mileageToggle}
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
