import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Layout } from 'antd';

import NewCarForm from './NewCarForm';
import Car from './Car';

import { requestCarList, requestCarDelete } from '../../network/carRequests';
import { makeCarListValue } from '../../helpers/helpers';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class Garage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreating: false,
      carList: [],
      displayedCar: ''
    };

    this.toggleNewCarForm = this.toggleNewCarForm.bind(this);
    this.getCarList = this.getCarList.bind(this);
    this.changeDisplayedCar = this.changeDisplayedCar.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
  }

  componentDidMount() {
    this.getCarList();
  }

  async getCarList() {
    const { userID } = this.props;
    const carList = await requestCarList(userID);

    this.setState({ carList });
  }

  async deleteCar() {
    const { userID, displayedCar } = this.state;

    await requestCarDelete(userID, displayedCar);
    this.setState({ displayedCar: '' });
    this.getCarList();
  }

  toggleNewCarForm() {
    const { isCreating } = this.state;
    this.setState({ isCreating: !isCreating });
  }

  async changeDisplayedCar({ key }) {
    const { isCreating } = this.state;
    if (isCreating) {
      await this.setState({ isCreating: false });
    }
    this.setState({ displayedCar: key });
  }

  render() {
    const { isCreating, carList, displayedCar } = this.state;
    const { userID } = this.props;

    let toggle;
    if (isCreating) {
      toggle = (
        <NewCarForm
          userID={userID}
          getCarList={this.getCarList}
          toggleNewCarForm={this.toggleNewCarForm}
        />
      );
    } else {
      toggle = <Car displayedCar={displayedCar} userID={userID} deleteCar={this.deleteCar} />;
    }

    return (
      <Layout style={{ padding: '24px 0' }}>
        <Sider>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['carSelector']}
            defaultOpenKeys={['carSelector']}
          >
            <Menu.Item key="createNewCar" onClick={this.toggleNewCarForm}>
              Create New Car
            </Menu.Item>

            <SubMenu key="carSelector" title="Select Your Car">
              {carList.map(car => {
                const { _id } = car;
                return (
                  <Menu.Item key={_id} onClick={this.changeDisplayedCar}>
                    {makeCarListValue(car)}
                  </Menu.Item>
                );
              })}
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>{toggle}</Content>
      </Layout>
    );
  }
}

Garage.propTypes = {
  userID: PropTypes.string.isRequired
};
