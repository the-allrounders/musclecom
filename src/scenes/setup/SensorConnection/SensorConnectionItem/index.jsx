import React from 'react';
import { observer } from 'mobx-react';

const SensorConnectionItemComponent = ({ sensor }) => (
  <li>
    <h3>Sensor {sensor.channel}</h3>
    <ul>
      <li>
        Channel: {sensor.channel}
      </li>
      <li>
        Connected: {sensor.connected ? 'yes' : 'no'}
      </li>
      <li>
        Calibrated: {sensor.calibrated ? 'yes' : 'no'}
      </li>
    </ul>
  </li>
);

export default observer(SensorConnectionItemComponent);
