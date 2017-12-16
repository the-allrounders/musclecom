import React, { Component } from 'react';
import SensorConnectionItem from '../../../../SensorConnection/SensorConnectionItem';

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
      <li
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
        <SensorConnectionItem sensor={sensor} />
        <button onClick={() => startCalibration(channel)} disabled={active}>
          Nu instellen
        </button>
      </li>
    );
  }
}

export default CalibrateSensorComponent;
