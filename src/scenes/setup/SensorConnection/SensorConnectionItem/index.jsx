import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
// svg
import CheckIco from '../../../../vector/ic_check_24px.svg';
import CloseIco from '../../../../vector/ic_close_24px.svg';

const SensorConnectionItemComponent = ({ sensor }) => (
  <Fragment>
    <h3>Sensor {sensor.channel}</h3>
    <ul>
      <li>Channel: {sensor.channel}</li>
      <li>Connected: {sensor.connected ? <CheckIco /> : <CloseIco />}</li>
      <li>Calibrated: {sensor.calibrated ? <CheckIco /> : <CloseIco />}</li>
    </ul>
  </Fragment>
);

export default observer(SensorConnectionItemComponent);
