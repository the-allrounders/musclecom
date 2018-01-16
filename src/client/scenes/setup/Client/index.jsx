import React from 'react';
import { AppBar, Toolbar, Typography } from 'material-ui';
import SetupConnect from '../SetupConnect';
import SensorStep from './SensorStep';

// styled
import SetupWrapper from './styled/SetupWrapper';

const ClientSetupComponent = ({ actionStore, getStep }) => {
  const step = getStep();
  return (
    <SetupWrapper>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" styles={{ flex: 1 }}>
            MuscleCom instellen
          </Typography>
        </Toolbar>
      </AppBar>
      {step === 1 && <SetupConnect />}
      {(step === 2 || step === 3) && (
        <SensorStep sensors={actionStore.sensors} />
      )}
    </SetupWrapper>
  );
};

export default ClientSetupComponent;
