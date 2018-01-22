import React, { Component } from 'react';
import { Button, Typography } from 'material-ui';
import { observer } from 'mobx-react';
import { actionStore } from '../../../../stores';
import SensorConnection from '../../../common/SensorConnection';

// styled
import SetupInnerWrapper from '../styled/SetupInnerWrapper';

@observer
class SensorStepComponent extends Component {
  render() {
    return (
      <SetupInnerWrapper>
        <Typography paragraph>
          Sluit nu alle sensoren aan en bevestig de stickers op de juiste
          spieren. Controleer hieronder of alle spieren aangesloten zijn.
        </Typography>
        <Button
          raised
          color="primary"
          onClick={() => {
            actionStore.setStep(actionStore.step + 1);
          }}
          disabled={actionStore.sensorsConnected === 0}
        >
          {actionStore.sensorsConnected === 0
            ? 'Sluit ten minste 1 sensor aan'
            : 'Ja, alle spieren zijn aangesloten'}
        </Button>
        <Typography paragraph />
        <SensorConnection />
      </SetupInnerWrapper>
    );
  }
}

export default SensorStepComponent;
