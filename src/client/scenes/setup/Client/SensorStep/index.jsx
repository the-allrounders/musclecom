import React from 'react';

// Components
import SensorConnection from '../../common/SensorConnection';
import AppBar from '../../common/AppBar';

// styled
import SetupWrapper from './styled/SetupWrapper';

const SensorStepComponent = () => (
  <section>
    <AppBar subtitle="Stap 1 - Sensoren" />
    <SetupWrapper>
      <SensorConnection />
    </SetupWrapper>
  </section>
);

export default SensorStepComponent;
