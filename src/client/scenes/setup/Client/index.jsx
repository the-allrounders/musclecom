import React, { Component } from 'react';

// Components
import SetupConnect from './SetupConnect';
import SensorStep from './SensorStep';
import CalibrationStep from './CalibrationStep';

// styled
import globalClientStyles from '../../../styles/global.client';
import SetupWrapper from './styled/SetupWrapper';

class ClientSetupComponent extends Component {
  componentWillMount() {
    globalClientStyles();
  }

  render() {
    const { getStep } = this.props;
    const step = getStep();
    return (
      <SetupWrapper>
        {step === 1 && <SetupConnect />}
        {step === 2 && <SensorStep />}
        {step === 3 && <CalibrationStep />}
      </SetupWrapper>
    );
  }
}

export default ClientSetupComponent;
