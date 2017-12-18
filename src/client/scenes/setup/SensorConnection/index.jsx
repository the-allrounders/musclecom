import React from 'react';
import { observer } from 'mobx-react';
import SensorConnectionItem from './SensorConnectionItem';

const SensorConnectionComponent = ({ sensors }) => (
  <ul>
    {sensors.map(sensor => (
      <li key={sensor.channel}>
        <SensorConnectionItem key={sensor.channel} sensor={sensor} />
      </li>
    ))}
  </ul>
);

export default observer(SensorConnectionComponent);