import React from 'react';

// Components
import AppBar from '../../AppBar';
import CalibrateSensors from '../../CalibrateSensors';

// styled
import CalibrationWrapper from './styled/CalibrationWrapper';

const CalibrationStep = () => (
  <section>
    <AppBar subtitle="Stap 2 - Instellen" />
    <CalibrationWrapper>
      <CalibrateSensors />
    </CalibrationWrapper>
  </section>
);

export default CalibrationStep;
