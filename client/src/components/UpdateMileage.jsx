import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, InputNumber } from 'antd';

import { patchCarMileage } from '../../network/carRequests';

class UpdateMileageTemplate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mileageUpdateValidator = this.mileageUpdateValidator.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { getCarData, userID, displayedCar, toggleUpdate, form } = this.props;

    form.validateFields(async (err, { updateMileage }) => {
      if (!err) {
        toggleUpdate();
        await patchCarMileage(userID, displayedCar, updateMileage);
        getCarData();
      }
    });
  }

  mileageUpdateValidator(rule, value, callback) {
    const { mileage } = this.props;
    if (value < mileage && value !== '') {
      callback('You must enter a mileage higher than your current mileage');
    } else {
      callback();
    }
  }

  render() {
    const { mileage, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Update Mileage" required>
          {getFieldDecorator('updateMileage', {
            initialValue: mileage + 1,
            rules: [
              { required: true, message: "Please enter your car's current mileage" },
              { validator: this.mileageUpdateValidator }
            ]
          })(<InputNumber min={mileage + 1} />)}
        </Form.Item>
        <Button htmlType="submit">Update</Button>
      </Form>
    );
  }
}

const UpdateMileage = Form.create()(UpdateMileageTemplate);

export default UpdateMileage;

UpdateMileageTemplate.propTypes = {
  userID: PropTypes.string.isRequired,
  displayedCar: PropTypes.string.isRequired,
  getCarData: PropTypes.func.isRequired,
  toggleUpdate: PropTypes.func.isRequired,
  form: PropTypes.instanceOf(Object).isRequired,
  mileage: PropTypes.number.isRequired
};
