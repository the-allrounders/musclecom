import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { actionStore } from '../../../stores';

// Components
import SetupConnect from './SetupConnect';
import SensorStep from './SensorStep';
import CalibrationStep from './CalibrationStep';

// styled
import globalClientStyles from '../../../styles/global.client';
import SetupWrapper from './styled/SetupWrapper';

@observer
class ClientSetupComponent extends Component {
  render() {
    const { step } = actionStore;
    return (
      <SetupWrapper>
        <style>{globalClientStyles}</style>
        {step === 0 && <SetupConnect />}
        {step === 1 && <SensorStep />}
        {step === 2 && <CalibrationStep />}
      </SetupWrapper>
    );
  }
}

export default ClientSetupComponent;
