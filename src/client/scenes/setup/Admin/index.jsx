import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import socket from '../../../Socket';
// Components
import ProgressBar from '../ProgressBar';
import SensorStep from './SensorStep';
import CalibrationStep from './CalibrationStep';

class AdminSetupComponent extends Component {
  componentDidMount() {
    const step = this.props.getStep();
    if (!step || step === 1) {
      this.onStep(2);
    }
  }

  onStep = step => {
    socket.emit('step', step);
  };

  render() {
    const step = this.props.getStep();

    const pager = {
      step,
      next: () => this.onStep(step + 1),
      previous: () => this.onStep(step - 1),
    };

    return (
      <section>
        <ProgressBar step={step} />
        <h1>Instellen</h1>
        {step === 2 && (
          <SensorStep sensors={this.props.actionStore.sensors} pager={pager} />
        )}
        {(step === 3 || step === 4) && (
          <CalibrationStep
            sensors={this.props.actionStore.sensors}
            pager={pager}
          />
        )}
      </section>
    );
  }
}

export default inject('actionStore')(observer(withRouter(AdminSetupComponent)));
