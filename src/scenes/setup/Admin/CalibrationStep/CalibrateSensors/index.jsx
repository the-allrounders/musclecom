import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
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
    this.props.actionStore.socket.on(
      'startCalibration',
      this.onStartCalibration,
    );
    this.props.actionStore.socket.on('stopCalibration', this.onStopCalibration);
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
    this.props.actionStore.socket.emit('onCalibrate', channel);
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

export default inject('actionStore')(observer(CalibrateSensorsComponent));
