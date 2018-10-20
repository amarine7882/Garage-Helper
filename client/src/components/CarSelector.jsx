import React from 'react';
import PropTypes from 'prop-types';

import { makeCarListValue } from '../../helpers/helpers';

const CarSelector = ({ changeDisplayedCar, carList, displayedCar }) => (
  <div>
    Your Cars:
    <select onChange={changeDisplayedCar} value={displayedCar}>
      <option value="">select a car</option>
      {carList.map(car => {
        const { _id } = car;
        return (
          <option value={_id} key={_id}>
            {makeCarListValue(car)}
          </option>
        );
      })}
    </select>
  </div>
);

CarSelector.propTypes = {
  changeDisplayedCar: PropTypes.func.isRequired,
  carList: PropTypes.arrayOf(PropTypes.string).isRequired,
  displayedCar: PropTypes.string.isRequired
};

export default CarSelector;
