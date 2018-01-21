import React from 'react';
import SensorConnectionItem from '../../SensorConnection/SensorConnectionItem/index';
// styled
import SensorListItem from '../../SensorConnection/styled/SensorListItem';

const CalibrateSensorComponent = ({
  currentChannel,
  channel,
  sensor,
  startCalibration,
  currentAction,
  interactive,
}) => {
  const active = currentChannel === channel;
  return (
    <SensorListItem>
      {active &&
        interactive && (
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
          </div>
        )}
      <SensorConnectionItem
        sensor={sensor}
        mode="calibrate"
        onClick={() => startCalibration(channel)}
        active={active}
        currentAction={currentAction}
        interactive={interactive}
      />
    </SensorListItem>
  );
};

export default CalibrateSensorComponent;
