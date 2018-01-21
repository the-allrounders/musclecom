import React from 'react';
import { withRouter } from 'react-router-dom';
// Components
import CalibrationIntro from './CalibrationIntro/index';
import CalibrateSensors from '../../CalibrateSensors/index';

const CalibrationStepComponent = ({ pager }) => (
  <section>
    {pager.step === 3 && <CalibrationIntro pager={pager} />}
    {pager.step === 4 && <CalibrateSensors interactive />}
  </section>
);

export default withRouter(CalibrationStepComponent);
