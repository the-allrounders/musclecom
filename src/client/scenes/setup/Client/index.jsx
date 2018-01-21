import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import socket from '../../../socket';

// Components
import SetupConnect from './SetupConnect';
import SensorStep from './SensorStep';
import CalibrationStep from './CalibrationStep';

// styled
import globalClientStyles from '../../../styles/global.client';
import SetupWrapper from './styled/SetupWrapper';

class ClientSetupComponent extends Component {
  componentDidMount() {
    socket.on('pushRoute', this.onPushRoute);
  }

  componentWillUnmount() {
    socket.off('step');
  }

  onPushRoute = route => {
    this.props.history.push(route);
  };

  render() {
    const { getStep } = this.props;
    const step = getStep();
    return (
      <SetupWrapper>
        <style>{globalClientStyles}</style>
        {step === 1 && <SetupConnect />}
        {step === 2 && <SensorStep />}
        {step === 3 && <CalibrationStep />}
      </SetupWrapper>
    );
  }
}

export default withRouter(ClientSetupComponent);
