import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import socket from '../../../../../socket';
// Components
import CalibrateSensor from './CalibrateSensor';

class CalibrateSensorsComponent extends Component {
  state = {
    currentChannel: -1,
    currentAction: {
      currentAction: 'min',
      calibrationTime: null,
      startTime: null,
    },
  };

  componentDidMount() {
    socket.on('startCalibration', this.onStartCalibration);
    socket.on('stopCalibration', this.onStopCalibration);
  }

  onStartCalibration = ({ action, channel, calibrationTime, startTime }) => {
    this.setState({
      currentChannel: channel,
      currentAction: {
        action,
        calibrationTime,
        startTime,
      },
    });
  };

  onStopCalibration = () => {
    this.setState({
      currentChannel: -1,
    });
  };

  startCalibration = channel => {
    socket.emit('onCalibrate', channel);
  };

  render() {
    const { actionStore } = this.props;
    const calibrations = actionStore.sensors
      .filter(sensor => sensor.connected)
      .map(sensor => (
        <CalibrateSensor
          key={sensor.channel}
          channel={sensor.channel}
          sensor={sensor}
          currentChannel={this.state.currentChannel}
          startCalibration={this.startCalibration}
          currentAction={this.state.currentAction}
        />
      ));

    return (
      <section>
        <ul>{calibrations}</ul>
      </section>
    );
  }
}

CalibrateSensorsComponent.propTypes = {
  actionStore: PropTypes.shape({
    sensors: PropTypes.arrayOf({
      channel: PropTypes.number,
      connected: PropTypes.bool,
      calibrated: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

export default inject('actionStore')(observer(CalibrateSensorsComponent));
