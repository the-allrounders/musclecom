import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Typography } from 'material-ui';
import { actionStore } from '../../../stores';
import ProgressBar from '../../common/ProgressBar';
import SensorStep from './SensorStep';
import CalibrationStep from './CalibrationStep';
import AppBar from '../../common/AppBar';
import SetupWrapper from './styled/SetupWrapper';
import SetupInnerWrapper from './styled/SetupInnerWrapper';

@observer
class AdminSetupComponent extends Component {
  render() {
    const { step } = actionStore;

    return (
      <SetupWrapper>
        <AppBar />
        {step < 3 && <ProgressBar step={step} />}
        {step === 0 && (
          <SetupInnerWrapper>
            <Typography paragraph>
              Om MuscleCom te gebruiken, moeten alle sensoren eerst
              geconfigureerd worden.
            </Typography>
            <Button
              raised
              color="primary"
              onClick={() => {
                actionStore.setStep(1);
              }}
            >
              Start configuratie
            </Button>
          </SetupInnerWrapper>
        )}
        {step === 1 && <SensorStep sensors={actionStore.sensors} />}
        {step === 2 && <CalibrationStep sensors={actionStore.sensors} />}
      </SetupWrapper>
    );
  }
}

export default AdminSetupComponent;
