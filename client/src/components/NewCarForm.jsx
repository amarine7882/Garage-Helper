import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Message } from 'semantic-ui-react';

import { generateModelYears } from '../../helpers/helpers';
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

    if (make.length < 1 || model.length < 1 || mileage < 0) {
      this.setState({ isWarning: true });
      return;
    }
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
    const options = generateModelYears().map(year => ({ key: year, text: year, value: year }));

    return (
      <div>
        <Form success={isSubmited} warning={isWarning} loading={isPosting}>
          <Form.Input
            fluid
            type="text"
            label="Car Name"
            name="carName"
            value={carName}
            placeholder="Optional"
            onChange={this.handleFormInput}
          />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              type="text"
              label="Make"
              name="make"
              value={make}
              onChange={this.handleFormInput}
            />
            <Form.Input
              fluid
              type="text"
              label="Model"
              name="model"
              value={model}
              onChange={this.handleFormInput}
            />
            <Form.Select
              fluid
              label="Model Year"
              name="modelYear"
              options={options}
              value={modelYear}
              onChange={this.handleFormInput}
            />
          </Form.Group>
          <Form.Input
            fluid
            type="number"
            name="mileage"
            label="Mileage"
            value={mileage}
            min="0"
            onChange={this.handleFormInput}
          />
          <Message success header="Car Created" content="You can now find it in your garage" />
          <Message
            warning
            header="Missing Fields"
            content="please fill make, model and mileage before submitting"
          />
          <Form.Button content="Submit" type="submit" onClick={this.handleSubmit} />
        </Form>
      </div>
    );
  }
}

NewCarForm.propTypes = {
  userID: PropTypes.string.isRequired,
  getCarList: PropTypes.func.isRequired
};
