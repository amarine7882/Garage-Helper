import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { displayIntervalsIfPresent, displayNextDueIfPresent } from '../../helpers/helpers';

const ServiceItems = ({ serviceItems, completeServiceItem, deleteServiceItem }) => (
  <div>
    {serviceItems.map(
      ({
        _id,
        serviceName,
        lastCompletedDate,
        lastCompletedMileage,
        nextDueDate,
        nextDueMileage,
        serviceIntervalMonths,
        serviceIntervalMiles
      }) => (
        <div key={_id}>
          <h3>{serviceName}</h3>
          <h3>{displayNextDueIfPresent(nextDueDate, nextDueMileage)}</h3>
          <p>{displayIntervalsIfPresent(serviceIntervalMonths, serviceIntervalMiles)}</p>
          <p>
            {`Last Completed on: ${
              lastCompletedDate ? moment(lastCompletedDate).calendar() : 'Not Completed Yet'
            }`}
          </p>
          <p>{`Mileage when last completed: ${lastCompletedMileage || 'Not completed yet'}`}</p>
          <button type="button" id={_id} onClick={completeServiceItem}>
            Complete
          </button>
          <button type="button" id={_id} onClick={deleteServiceItem}>
            Delete
          </button>
        </div>
      )
    )}
  </div>
);

ServiceItems.propTypes = {
  serviceItems: PropTypes.objectOf(PropTypes.string).isRequired,
  completeServiceItem: PropTypes.func.isRequired,
  deleteServiceItem: PropTypes.func.isRequired
};

export default ServiceItems;
