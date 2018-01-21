import React from 'react';

// Components
import SensorConnection from '../../SensorConnection';
import AppBar from '../../AppBar';

// styled
import CalibrationWrapper from './styled/CalibrationWrapper';

const CalibrationStep = () => (
  <section>
    <AppBar subtitle="Stap 2 - Instellen" />
    <CalibrationWrapper>
      <SensorConnection mode="calibrate" />
    </CalibrationWrapper>
  </section>
);

export default CalibrationStep;
