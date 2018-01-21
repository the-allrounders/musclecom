import React from 'react';
import PropTypes from 'prop-types';

import Stepper, { Step, StepLabel } from 'material-ui/Stepper';

const ProgressBar = ({ step }) => (
  <Stepper activeStep={step - 1} alternativeLabel>
    <Step>
      <StepLabel>Verbinden</StepLabel>
    </Step>
    <Step>
      <StepLabel>Sensoren</StepLabel>
    </Step>
    <Step>
      <StepLabel>Instellen</StepLabel>
    </Step>
  </Stepper>
);

ProgressBar.propTypes = {
  step: PropTypes.number.isRequired,
};

export default ProgressBar;
