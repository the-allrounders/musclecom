import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { CardContent, CardActions, Typography, Button } from 'material-ui';
import Sensor from '../../../../stores/Objects/Sensor';

// components
import SensorConnectionItemIcon from './SensorConnectionItemIcon';

// styled
import StyledCard from './styled/StyledCard';
import StyledDetails from './styled/StyledDetails';
import StyledCardMedia from './styled/StyledCardMedia';

const SensorConnectionItemComponent = ({ sensor, mode, onClick, active }) => (
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
        <CardActions>
          <Button dense onClick={onClick} disabled={active} color="primary">
            {sensor.calibrated ? 'Opnieuw' : 'Nu'} instellen
          </Button>
        </CardActions>
      </StyledDetails>
      <StyledCardMedia
        component={p => (
          <SensorConnectionItemIcon
            {...p}
            check={sensor[mode === 'connect' ? 'connected' : 'calibrated']}
            mode={mode}
          />
        )}
        image="#"
      />
    </StyledCard>
  </Fragment>
);

SensorConnectionItemComponent.propTypes = {
  sensor: PropTypes.instanceOf(Sensor).isRequired,
  mode: PropTypes.oneOf(['connect', 'calibrate']),
};

SensorConnectionItemComponent.defaultProps = {
  mode: 'connect',
};

export default observer(SensorConnectionItemComponent);
