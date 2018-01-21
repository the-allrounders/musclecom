import React from 'react';
import PropTypes from 'prop-types';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { Typography } from 'material-ui';
import Sensor from '../../../stores/Objects/Sensor';

// components
import SensorConnectionItem from './SensorConnectionItem';

// styled
import SensorList from './styled/SensorList';
import SensorListItem from './styled/SensorListItem';

const SensorConnectionComponent = ({ sensors }) => (
  <div>
    <Typography type="caption" gutterBottom paragraph>
      <em>
        Let op, dit scherm past automatisch aan als je sensors aansluit of
        loskoppelt.
      </em>
    </Typography>
    <SensorList>
      {sensors.map(sensor => (
        <SensorListItem key={sensor.channel}>
          <SensorConnectionItem key={sensor.channel} sensor={sensor} />
        </SensorListItem>
      ))}
    </SensorList>
  </div>
);

SensorConnectionComponent.propTypes = {
  sensors: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Sensor))
    .isRequired,
};

export default observer(SensorConnectionComponent);
