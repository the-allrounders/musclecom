import React, { Component } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from 'material-ui';
import { observer } from 'mobx-react';
import { actionStore } from '../../../../stores';

// Components
import CalibrateSensors from '../../../common/CalibrateSensors';
import SetupInnerWrapper from '../styled/SetupInnerWrapper';

@observer
class CalibrationStepComponent extends Component {
  state = {
    openConfirmDialog: false,
  };

  toggleConfirmDialog = () => {
    this.setState({ openConfirmDialog: !this.state.openConfirmDialog });
  };

  checkBeforeRoutePush = () => {
    const { sensorsCalibrated, sensorsConnected } = actionStore;
    if (sensorsConnected > sensorsCalibrated) {
      this.toggleConfirmDialog();
    } else {
      this.pushRoute();
    }
  };

  pushRoute = () => {
    actionStore.setStep(actionStore.step + 1);
  };

  render() {
    const { sensorsCalibrated, sensorsConnected } = actionStore;
    return (
      <SetupInnerWrapper>
        <Typography paragraph>
          Om te weten hoe de verschillende spieren functioneren gaan we een paar
          oefeningen doen.
        </Typography>
        <Typography paragraph>
          Per spier willen we erachter komen wat het verschil is tussen wel en
          niet aanspannen. Om hier achter te komen gaan we per spier eerst een
          aantal seconden niet aanspannen, en daarna een aantal seconden wel.
          Span de spier dan niet per se zo <strong>hard</strong> mogelijk aan,
          maar net zo hard als dat jij het vol kunt houden om die actie vaker op
          een dag te herhalen.
        </Typography>
        <Typography paragraph>
          De begeleider bepaalt wanneer een oefening gelukt is. Je kunt dus net
          zo vaak oefenen tot het voor je gevoel goed gaat.
        </Typography>
        <Button
          onClick={this.checkBeforeRoutePush}
          raised
          color="primary"
          disabled={actionStore.sensorsCalibrated === 0}
        >
          Klaar met instellen
        </Button>
        <Typography paragraph />
        <CalibrateSensors interactive />
        <Dialog
          open={this.state.openConfirmDialog}
          onClose={this.toggleConfirmDialog}
        >
          <DialogTitle>Weet je het zeker?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {sensorsCalibrated === 0 &&
                `Je hebt nog geen van de aangesloten sensoren ingesteld`}
              {sensorsCalibrated === 1 &&
                `Je hebt op dit moment nog maar 1 van de ${
                  sensorsConnected
                } aangesloten sensoren ingesteld.`}
              {sensorsCalibrated > 1 &&
                `Op dit moment zijn nog maar ${sensorsCalibrated} van de ${
                  sensorsConnected
                } aangesloten sensoren ingesteld.`}
              <br />
              <br />
              Weet je zeker dat je klaar bent met instellen?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirmDialog} color="primary">
              Nee, verder met instellen
            </Button>
            <Button
              onClick={() => {
                this.toggleConfirmDialog();
                this.pushRoute();
              }}
              color="primary"
              autoFocus
            >
              Ja, ga naar menu
            </Button>
          </DialogActions>
        </Dialog>
      </SetupInnerWrapper>
    );
  }
}

export default CalibrationStepComponent;
