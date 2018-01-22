import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Typography } from 'material-ui';
import { actionStore } from '../../../stores';
import socket from '../../../socket';

// Components
import CalibrateSensor from './CalibrateSensor';

// styled
import SensorList from '../SensorConnection/styled/SensorList';

@observer
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
    socket.emit('cancelCalibration', channel);
    socket.emit('onCalibrate', channel);
  };

  render() {
    const { interactive } = this.props;
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
          interactive={interactive}
        />
      ));

    return (
      <div>
        <Typography type="caption" gutterBottom paragraph>
          <em>
            Let op, dit scherm past automatisch aan als je sensors aansluit of
            loskoppelt.
          </em>
        </Typography>
        <SensorList>{calibrations}</SensorList>
      </div>
    );
  }
}

CalibrateSensorsComponent.propTypes = {
  interactive: PropTypes.bool,
};

CalibrateSensorsComponent.defaultProps = {
  interactive: false,
};

export default CalibrateSensorsComponent;
