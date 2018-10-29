import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Message } from 'semantic-ui-react';

import { postNewCar } from '../../network/carRequests';

export default class NewCarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carName: '',
      make: '',
      model: '',
      modelYear: moment().year(),
      mileage: 0,
      isSubmited: false,
      isWarning: false,
      isPosting: false
    };

    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormInput(e, { value, name }) {
    this.setState({ [name]: value, isSubmited: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { carName, make, model, modelYear, mileage } = this.state;
    const { userID, getCarList } = this.props;

    this.setState({ isPosting: true });
    const payload = { carName, make, model, modelYear, mileage };

    await postNewCar(userID, payload);
    this.setState({
      isSubmited: true,
      isWarning: false,
      isPosting: false,
      carName: '',
      make: '',
      model: '',
      modelYear: moment().year(),
      mileage: 0
    });
    getCarList();
  }

  render() {
    const {
      carName,
      make,
      model,
      mileage,
      modelYear,
      isSubmited,
      isWarning,
      isPosting
    } = this.state;

    return (
      <div className="ui container">
        <Form
          success={isSubmited}
          warning={isWarning}
          loading={isPosting}
          onSubmit={this.handleSubmit}
        >
          <Form.Input
            fluid
            type="text"
            label="Car Name"
            name="carName"
            value={carName}
            onChange={this.handleFormInput}
          />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              required
              type="text"
              label="Make"
              name="make"
              value={make}
              onChange={this.handleFormInput}
            />
            <Form.Input
              fluid
              required
              type="text"
              label="Model"
              name="model"
              value={model}
              onChange={this.handleFormInput}
            />
            <Form.Input
              fluid
              required
              type="number"
              label="Model Year"
              name="modelYear"
              value={modelYear}
              onChange={this.handleFormInput}
            />
          </Form.Group>
          <Form.Input
            fluid
            required
            type="number"
            name="mileage"
            label="Mileage"
            value={mileage}
            onChange={this.handleFormInput}
          />
          <Message success header="Car Created" content="You can now find it in your garage" />
          <Form.Button content="Submit" type="submit" />
        </Form>
      </div>
    );
  }
}

NewCarForm.propTypes = {
  userID: PropTypes.string.isRequired,
  getCarList: PropTypes.func.isRequired
};
