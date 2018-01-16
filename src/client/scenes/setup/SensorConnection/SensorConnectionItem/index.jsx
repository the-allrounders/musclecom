import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { CardContent, Typography } from 'material-ui';
import Sensor from '../../../../stores/Objects/Sensor';

// components
import SensorConnectionItemIcon from './SensorConnectionItemIcon';

// styled
import StyledCard from './styled/StyledCard';
import StyledDetails from './styled/StyledDetails';
import StyledCardMedia from './styled/StyledCardMedia';

const SensorConnectionItemComponent = ({ sensor }) => (
  <Fragment>
    <StyledCard>
      <StyledDetails>
        <CardContent>
          <Typography type="headline">Sensor {sensor.channel}</Typography>
          <Typography type="subheading" color="secondary">
            {sensor.connected ? 'Aangesloten' : 'Niet aangesloten'}
          </Typography>
          <Typography type="subheading" color="secondary">
            {sensor.calibrated ? 'Al ingesteld' : 'Nog niet ingesteld'}
          </Typography>
        </CardContent>
      </StyledDetails>
      <StyledCardMedia
        component={p => <SensorConnectionItemIcon {...p} sensor={sensor} />}
        image="#"
      />
    </StyledCard>
  </Fragment>
);

SensorConnectionItemComponent.propTypes = {
  sensor: PropTypes.instanceOf(Sensor).isRequired,
};

export default observer(SensorConnectionItemComponent);
