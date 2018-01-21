import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobxPropTypes } from 'mobx-react';
import Sensor from '../../../../stores/Objects/Sensor';

// Components
import SensorConnection from '../../SensorConnection';
import AppBar from '../../AppBar';

// styled
import SetupWrapper from './styled/SetupWrapper';

const SensorStepComponent = ({ sensors }) => (
  <section>
    <AppBar subtitle="Stap 1 - Sensoren" />
    <SetupWrapper>
      <SensorConnection sensors={sensors} />
    </SetupWrapper>
  </section>
);

SensorStepComponent.propTypes = {
  sensors: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Sensor))
    .isRequired,
};

export default SensorStepComponent;
