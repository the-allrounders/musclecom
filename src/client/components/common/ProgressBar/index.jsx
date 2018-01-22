import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import { actionStore } from '../../../stores';

const ProgressBar = ({ step }) => (
  <Stepper activeStep={step} alternativeLabel>
    <Step onClick={() => actionStore.setStep(0)}>
      <StepLabel>Introductie</StepLabel>
    </Step>
    <Step onClick={() => actionStore.setStep(1)}>
      <StepLabel>Aansluiten</StepLabel>
    </Step>
    <Step
      onClick={() => {
        if (actionStore.sensorsConnected > 0) actionStore.setStep(2);
      }}
    >
      <StepLabel>Kalibreren</StepLabel>
    </Step>
  </Stepper>
);

ProgressBar.propTypes = {
  step: PropTypes.number.isRequired,
};

export default observer(ProgressBar);
