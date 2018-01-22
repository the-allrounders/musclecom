import React from 'react';

// Components
import AppBar from '../../../common/AppBar';
import CalibrateSensors from '../../../common/CalibrateSensors';

// styled
import CalibrationWrapper from './styled/CalibrationWrapper';

const CalibrationStep = () => (
  <section>
    <AppBar subtitle="Stap 3 - Kalibreren" />
    <CalibrationWrapper>
      <CalibrateSensors />
    </CalibrationWrapper>
  </section>
);

export default CalibrationStep;
