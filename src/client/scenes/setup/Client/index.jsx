import React, { Component } from 'react';

// Components
import SetupConnect from './SetupConnect';
import SensorStep from './SensorStep';

// styled
import globalClientStyles from '../../../styles/global.client';
import SetupWrapper from './styled/SetupWrapper';

class ClientSetupComponent extends Component {
  componentWillMount() {
    globalClientStyles();
  }

  render() {
    const { actionStore, getStep } = this.props;
    const step = getStep();
    return (
      <SetupWrapper>
        {step === 1 && <SetupConnect />}
        {(step === 2 || step === 3) && (
          <SensorStep sensors={actionStore.sensors} />
        )}
      </SetupWrapper>
    );
  }
}

export default ClientSetupComponent;
