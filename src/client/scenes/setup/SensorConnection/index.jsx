import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Typography } from 'material-ui';
import { ActionStore } from '../../../stores/ActionStore';

// components
import SensorConnectionItem from './SensorConnectionItem';

// styled
import SensorList from './styled/SensorList';
import SensorListItem from './styled/SensorListItem';

const SensorConnectionComponent = ({ actionStore, mode }) => (
  <div>
    <Typography type="caption" gutterBottom paragraph>
      <em>
        Let op, dit scherm past automatisch aan als je sensors aansluit of
        loskoppelt.
      </em>
    </Typography>
    <SensorList>
      {actionStore.sensors
        .filter(sensor => mode === 'connect' || sensor.connected)
        .map(sensor => (
          <SensorListItem key={sensor.channel}>
            <SensorConnectionItem
              key={sensor.channel}
              sensor={sensor}
              mode={mode}
            />
          </SensorListItem>
        ))}
    </SensorList>
  </div>
);

SensorConnectionComponent.propTypes = {
  actionStore: PropTypes.instanceOf(ActionStore).isRequired,
  mode: PropTypes.oneOf(['connect', 'calibrate']),
};

SensorConnectionComponent.defaultProps = {
  mode: 'connect',
};

export default inject('actionStore')(observer(SensorConnectionComponent));
