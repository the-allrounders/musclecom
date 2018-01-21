import React, { Component } from 'react';
import SensorConnectionItem from '../../../../SensorConnection/SensorConnectionItem';
// styled
import SensorListItem from '../../../../SensorConnection/styled/SensorListItem';

class CalibrateSensorComponent extends Component {
  state = {
    timeLeft: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentChannel === this.props.channel &&
      this.props.currentChannel !== nextProps.currentChannel
    ) {
      this.setState({
        timeLeft: nextProps.currentAction.calibrationTime,
      });
      this.timeLeftInterval = setInterval(
        () => this.setState({ timeLeft: this.state.timeLeft - 1000 }),
        1000,
      );
    }
    if (nextProps.currentChannel !== this.props.channel) {
      clearInterval(this.timeLeftInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeLeftInterval);
  }

  render() {
    const {
      currentChannel,
      channel,
      sensor,
      startCalibration,
      currentAction,
    } = this.props;
    const active = currentChannel === channel;
    return (
      <SensorListItem
        style={{
          // eslint-disable-next-line no-nested-ternary
          backgroundColor: active
            ? currentAction.action === 'min' ? '#eee' : '#ddd'
            : 'transparent',
        }}
      >
        {active && (
          <div>
            {currentAction.action === 'min' && (
              <p>
                Span de spier nu zo min mogelijk aan. Je kunt dit net zo vaak
                opnieuw proberen als je zelf wilt.
              </p>
            )}
            {currentAction.action === 'max' && (
              <p>
                Span de spier nu aan. Je kunt dit net zo vaak opnieuw proberen
                als je zelf wilt.
              </p>
            )}
            {this.state.timeLeft / 1000}s
          </div>
        )}
        <SensorConnectionItem
          sensor={sensor}
          mode="calibrate"
          onClick={() => startCalibration(channel)}
          active={active}
        />
      </SensorListItem>
    );
  }
}

export default CalibrateSensorComponent;
