import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { actionStore } from '../../../stores';
import ProgressBar from '../common/ProgressBar';
import SensorStep from './SensorStep';
import CalibrationStep from './CalibrationStep';
import AppBar from '../common/AppBar';
import SetupWrapper from './styled/SetupWrapper';

@observer
class AdminSetupComponent extends Component {
  render() {
    const { step } = actionStore;

    if (actionStore.step === 0) {
      actionStore.setStep(1);
    }

    return (
      <SetupWrapper>
        <AppBar />
        <ProgressBar step={step} />
        {step === 1 && <SensorStep sensors={actionStore.sensors} />}
        {step === 2 && <CalibrationStep sensors={actionStore.sensors} />}
      </SetupWrapper>
    );
  }
}

export default AdminSetupComponent;
