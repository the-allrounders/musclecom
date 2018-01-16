import React from 'react';
import { observer } from 'mobx-react';

// components
import SensorConnectionItem from './SensorConnectionItem';

// styled
import SensorList from './styled/SensorList';
import SensorListItem from './styled/SensorListItem';

const SensorConnectionComponent = ({ sensors }) => (
  <SensorList>
    {sensors.map(sensor => (
      <SensorListItem key={sensor.channel}>
        <SensorConnectionItem key={sensor.channel} sensor={sensor} />
      </SensorListItem>
    ))}
  </SensorList>
);

export default observer(SensorConnectionComponent);
