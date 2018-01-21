import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from 'material-ui';
import { PropTypes as MobxPropTypes } from 'mobx-react';
import SensorConnection from '../../SensorConnection';
import Sensor from '../../../../stores/Objects/Sensor';
// styled
import SensorStepWrapper from './styled/SensorStepWrapper';

const SensorStepComponent = ({ sensors, pager }) => (
  <SensorStepWrapper>
    <Typography>
      Sluit nu alle sensoren aan en bevestig de stickers op de juiste spieren.
      Controleer hieronder of alle spieren aangesloten zijn.
    </Typography>
    <Button raised color="primary" onClick={pager.next}>
      Ja, alle spieren zijn aangesloten
    </Button>
    <Typography type="caption">
      <em>
        Let op, dit scherm past automatisch aan als je sensors aansluit of
        loskoppelt.
      </em>
    </Typography>
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

export default SensorStepComponent;
