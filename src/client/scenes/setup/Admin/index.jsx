import React, { Component } from 'react';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import socket from '../../../socket';
import Sensor from '../../../stores/Objects/Sensor';

// Components
import ProgressBar from '../ProgressBar';
import SensorStep from './SensorStep';
import CalibrationStep from './CalibrationStep';
import AppBar from '../AppBar';
// styled
import SetupWrapper from './styled/SetupWrapper';

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
      <SetupWrapper>
        <AppBar />
        <ProgressBar step={step} />
        {step === 2 && (
          <SensorStep sensors={this.props.actionStore.sensors} pager={pager} />
        )}
        {(step === 3 || step === 4) && (
          <CalibrationStep
            sensors={this.props.actionStore.sensors}
            pager={pager}
          />
        )}
      </SetupWrapper>
    );
  }
}

AdminSetupComponent.propTypes = {
  actionStore: PropTypes.shape({
    sensors: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Sensor))
      .isRequired,
  }).isRequired,
  getStep: PropTypes.func.isRequired,
};

export default inject('actionStore')(observer(withRouter(AdminSetupComponent)));
