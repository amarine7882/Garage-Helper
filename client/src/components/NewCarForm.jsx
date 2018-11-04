import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Input, InputNumber, Button, Select } from 'antd';

import { postNewCar } from '../../network/carRequests';
import { generateModelYears } from '../../helpers/helpers';

class NewCarFormTemplate extends Component {
  constructor(props) {
    super(props);
    this.years = generateModelYears();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { userID, getCarList, toggleNewCarForm, form } = this.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        await postNewCar(userID, values);
        getCarList();
        toggleNewCarForm();
      }
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit} style={{ width: 500, margin: 'auto' }}>
        <Form.Item label="Car Name" colon={false}>
          {getFieldDecorator('carName')(<Input placeholder="Car Name (Optional)" />)}
        </Form.Item>
        <Form.Item label="Make" colon={false}>
          {getFieldDecorator('make', {
            rules: [{ required: true, message: "Please input your car's make" }]
          })(<Input placeholder="Make" />)}
        </Form.Item>
        <Form.Item label="Model" colon={false}>
          {getFieldDecorator('model', {
            rules: [{ required: true, message: "Please input your car's model" }]
          })(<Input placeholder="Model" />)}
        </Form.Item>
        <Form.Item label="Model Year" colon={false}>
          {getFieldDecorator('modelYear', {
            initialValue: moment().year()
          })(
            <Select>
              {this.years.map(year => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Mileage" colon={false}>
          {getFieldDecorator('mileage', {
            initialValue: 0,
            rules: [{ required: true, message: "Please input your car's mileage" }]
          })(<InputNumber name="mileage" min={0} style={{ width: 300 }} />)}
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    );
  }
}

const NewCarForm = Form.create()(NewCarFormTemplate);

export default NewCarForm;

NewCarFormTemplate.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  userID: PropTypes.string.isRequired,
  getCarList: PropTypes.func.isRequired,
  toggleNewCarForm: PropTypes.func.isRequired
};
