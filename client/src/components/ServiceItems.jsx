import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Icon } from 'antd';

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
        <Card
          key={_id}
          title={serviceName}
          style={{ width: 500 }}
          actions={[
            <Icon type="delete" theme="outlined" onClick={() => deleteServiceItem(_id)} />,
            <Icon type="check" theme="outlined" onClick={() => completeServiceItem(_id)} />
          ]}
        >
          <h3>{displayNextDueIfPresent(nextDueDate, nextDueMileage)}</h3>
          <p>{displayIntervalsIfPresent(serviceIntervalMonths, serviceIntervalMiles)}</p>
          <p>
            {`Last Completed on: ${
              lastCompletedDate ? moment(lastCompletedDate).calendar() : 'Not Completed Yet'
            }`}
          </p>
          <p>{`Mileage when last completed: ${lastCompletedMileage || 'Not completed yet'}`}</p>
        </Card>
      )
    )}
  </div>
);

ServiceItems.propTypes = {
  serviceItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  completeServiceItem: PropTypes.func.isRequired,
  deleteServiceItem: PropTypes.func.isRequired
};

export default ServiceItems;
