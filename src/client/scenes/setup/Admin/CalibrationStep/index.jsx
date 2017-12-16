import React from 'react';
import { withRouter } from 'react-router-dom';
// Components
import CalibrationIntro from './CalibrationIntro';
import CalibrateSensors from './CalibrateSensors';

const CalibrationStepComponent = ({ pager }) => (
  <section>
    <h2>Stap 2 - Kalibratie</h2>
    {pager.step === 3 && <CalibrationIntro pager={pager} />}
    {pager.step === 4 && <CalibrateSensors />}
  </section>
);

export default withRouter(CalibrationStepComponent);
