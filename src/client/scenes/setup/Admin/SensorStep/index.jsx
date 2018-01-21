import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from 'material-ui';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import SensorConnection from '../../common/SensorConnection';
import Sensor from '../../../../stores/Objects/Sensor';

// styled
import SensorStepWrapper from './styled/SensorStepWrapper';

const SensorStepComponent = ({ sensors, pager, actionStore }) => (
  <SensorStepWrapper>
    <Typography paragraph>
      Sluit nu alle sensoren aan en bevestig de stickers op de juiste spieren.
      Controleer hieronder of alle spieren aangesloten zijn.
    </Typography>
    <Button
      raised
      color="primary"
      onClick={pager.next}
      disabled={actionStore.sensorsConnected === 0}
    >
      {actionStore.sensorsConnected === 0
        ? 'Sluit ten minste 1 sensor aan'
        : 'Ja, alle spieren zijn aangesloten'}
    </Button>
    <Typography paragraph />
    <SensorConnection sensors={sensors} />
  </SensorStepWrapper>
);

SensorStepComponent.propTypes = {
  sensors: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Sensor))
    .isRequired,
  pager: PropTypes.shape({
    next: PropTypes.func.isRequired,
  }).isRequired,
};

export default inject('actionStore')(observer(SensorStepComponent));
