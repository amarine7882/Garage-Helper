/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Button } from 'antd';

import { postServiceItem } from '../../network/serviceItemRequests';

class AddServiceItemTemplate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validationSync = this.validationSync.bind(this);
    this.maxMonthValidator = this.maxMonthValidator.bind(this);
    this.maxMileValidator = this.maxMileValidator.bind(this);
    this.serviceIntervalValidator = this.serviceIntervalValidator.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { displayedCar, userID, toggleAddServiceItem, form } = this.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        await postServiceItem(userID, displayedCar, values);
        toggleAddServiceItem();
      }
    });
  }

  serviceIntervalValidator(rule, value, callback) {
    const { form } = this.props;
    const mileIntervalValue = form.getFieldValue('serviceIntervalMiles');
    const monthIntervalValue = form.getFieldValue('serviceIntervalMonths');

    if (!mileIntervalValue && !monthIntervalValue) {
      callback('You must enter at least one valid service interval value');
    } else {
      callback();
    }
  }

  validationSync() {
    const { form } = this.props;
    setTimeout(() => {
      form.validateFields(['serviceIntervalMonths', 'serviceIntervalMiles'], { force: true });
    }, 10);
  }

  maxMonthValidator(rule, value, callback) {
    if (value > 120) {
      callback('Please enter a service Interval within 10 years');
    } else {
      callback();
    }
  }

  maxMileValidator(rule, value, callback) {
    if (value > 1000000) {
      callback('Please enter a service interval within 1,000,000 miles');
    } else {
      callback();
    }
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} style={{ width: 500, margin: 'auto' }}>
          <Form.Item label="Service Name" colon={false}>
            {getFieldDecorator('serviceName', {
              rules: [{ required: true, message: 'Please input a name for the service' }]
            })(<Input placeholder="Service Name" />)}
          </Form.Item>
          <Form.Item label="Service Interval In Months" colon={false}>
            {getFieldDecorator('serviceIntervalMonths', {
              rules: [
                { validator: this.serviceIntervalValidator },
                { validator: this.maxMonthValidator }
              ]
            })(
              <InputNumber
                placeholder="Months"
                min={0}
                max={120}
                style={{ width: 200 }}
                onChange={this.validationSync}
              />
            )}
          </Form.Item>
          <Form.Item label="Service Interval In Miles" colon={false}>
            {getFieldDecorator('serviceIntervalMiles', {
              rules: [
                { validator: this.serviceIntervalValidator },
                { validator: this.maxMileValidator }
              ]
            })(
              <InputNumber
                placeholder="Miles"
                min={0}
                max={1000000}
                style={{ width: 200 }}
                onChange={this.validationSync}
              />
            )}
          </Form.Item>
          <Button htmlType="submit" style={{ color: '#303f9f' }}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const AddServiceItem = Form.create()(AddServiceItemTemplate);

export default AddServiceItem;

AddServiceItemTemplate.propTypes = {
  displayedCar: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  toggleAddServiceItem: PropTypes.func.isRequired,
  form: PropTypes.instanceOf(Object).isRequired
};
