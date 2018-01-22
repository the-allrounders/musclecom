import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { actionStore } from '../../../stores';

// Components
import ProgressBar from '../common/ProgressBar';
import SensorStep from './SensorStep';
import CalibrationStep from './CalibrationStep';
import AppBar from '../common/AppBar';
// styled
import SetupWrapper from './styled/SetupWrapper';

@observer
class AdminSetupComponent extends Component {
  componentDidMount() {
    console.log('current step', actionStore.step);
    if (actionStore.step === 0) {
      console.log('Going to step 1!');
      actionStore.setStep(1);
    }
  }

  render() {
    const { step } = actionStore;

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
