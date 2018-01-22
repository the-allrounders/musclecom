import React from 'react';
import SensorConnectionItem from '../../SensorConnection/SensorConnectionItem';

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
