import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class ServiceItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceItems: []
    };

    this.getServiceItems = this.getServiceItems.bind(this);
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
      .then(({ data }) => this.setState({ serviceItems: data }))
      .catch(err => console.log(err));
  }

  render() {
    const { serviceItems } = this.state;
    return <div>Service Items</div>;
  }
}

ServiceItems.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired
};
