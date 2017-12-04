import React from 'react';
import { observer } from 'mobx-react';
import SensorConnectionItem from './SensorConnectionItem';

const SensorConnectionComponent = ({ sensors }) => (
  <ul>
    {sensors.map(sensor => <SensorConnectionItem key={sensor.channel} sensor={sensor} />)}
  </ul>
);

export default observer(SensorConnectionComponent);
