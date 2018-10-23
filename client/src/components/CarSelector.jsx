import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

import { makeCarListValue } from '../../helpers/helpers';

const CarSelector = ({ changeDisplayedCar, carList }) => (
  <Dropdown item text="Your Cars">
    <Dropdown.Menu>
      <Dropdown.Header>Select a Car</Dropdown.Header>
      {carList.map(car => {
        const { _id } = car;
        return (
          <Dropdown.Item value={_id} key={_id} onClick={changeDisplayedCar}>
            {makeCarListValue(car)}
          </Dropdown.Item>
        );
      })}
    </Dropdown.Menu>
  </Dropdown>
);

CarSelector.propTypes = {
  changeDisplayedCar: PropTypes.func.isRequired,
  carList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CarSelector;
