import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Button } from 'antd';

import { postServiceItem } from '../../network/serviceItemRequests';

class AddServiceItemTemplate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validationSync = this.validationSync.bind(this);
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
    form.validateFields(['serviceIntervalMonths', 'serviceIntervalMiles'], { force: true });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} style={{ width: 500 }}>
          <Form.Item label="Service Name" colon={false}>
            {getFieldDecorator('serviceName', {
              rules: [{ required: true, message: 'Please input a name for the service' }]
            })(<Input placeholder="Service Name" />)}
          </Form.Item>
          <Form.Item label="Service Interval In Months" colon={false}>
            {getFieldDecorator('serviceIntervalMonths', {
              rules: [{ validator: this.serviceIntervalValidator }]
            })(
              <InputNumber
                placeholder="Months"
                min={0}
                style={{ width: 200 }}
                onChange={() => setTimeout(this.validationSync, 10)}
              />
            )}
          </Form.Item>
          <Form.Item label="Service Interval In Miles" colon={false}>
            {getFieldDecorator('serviceIntervalMiles', {
              rules: [{ validator: this.serviceIntervalValidator }]
            })(
              <InputNumber
                placeholder="Miles"
                min={0}
                style={{ width: 200 }}
                onChange={() => setTimeout(this.validationSync, 10)}
              />
            )}
          </Form.Item>
          <Button htmlType="submit">Submit</Button>
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
