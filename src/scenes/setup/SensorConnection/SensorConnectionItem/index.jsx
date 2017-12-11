import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

const SensorConnectionItemComponent = ({ sensor }) => (
  <Fragment>
    <h3>Sensor {sensor.channel}</h3>
    <ul>
      <li>Channel: {sensor.channel}</li>
      <li>Connected: {sensor.connected ? 'yes' : 'no'}</li>
      <li>Calibrated: {sensor.calibrated ? 'yes' : 'no'}</li>
    </ul>
  </Fragment>
);

export default observer(SensorConnectionItemComponent);
