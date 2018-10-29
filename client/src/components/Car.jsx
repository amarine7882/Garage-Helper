import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon, Loader, Header } from 'semantic-ui-react';

import ServiceItemsContainer from './ServiceItemsContainer';
import UpdateMileage from './UpdateMileage';

import { numberWithCommas } from '../../helpers/helpers';
import { requestCarData } from '../../network/carRequests';

export default class Car extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carData: undefined
    };

    this.getCarData = this.getCarData.bind(this);
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

  render() {
    const { carData } = this.state;
    const { displayedCar, userID, deleteCar } = this.props;

    if (!displayedCar) return null;
    if (!carData) return <Loader active inline="centered" size="massive" />;

    const { carName, make, model, modelYear, mileage } = carData;

    return (
      <div className="ui container">
        <Segment.Group>
          <Segment />
          <Icon onClick={deleteCar} name="trash" />
          <Segment.Group>
            <Segment>
              <Header>{carName}</Header>
              <Header>{`${modelYear} ${make} ${model}`}</Header>
              <Header>{`Mileage: ${numberWithCommas(mileage)}`}</Header>
            </Segment>
          </Segment.Group>
          <Segment>
            <UpdateMileage
              userID={userID}
              displayedCar={displayedCar}
              getCarData={this.getCarData}
            />
          </Segment>
          <Segment>
            <ServiceItemsContainer displayedCar={displayedCar} userID={userID} mileage={mileage} />
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

Car.propTypes = {
  deleteCar: PropTypes.func.isRequired,
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired
};
