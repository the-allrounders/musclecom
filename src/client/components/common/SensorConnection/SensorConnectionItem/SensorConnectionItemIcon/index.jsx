import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Sensor from '../../../../../stores/Objects/Sensor';

// styled
import IconWrapper from './styled/IconWrapper';
import UsbIcon from './styled/UsbIcon';
import WifiIcon from './styled/WifiIcon';
import CheckStatusIcon from './styled/CheckStatusIcon';
import CloseStatusIcon from './styled/CloseStatusIcon';
import StatusIconWrapper from './styled/StatusIconWrapper';

const SensorConnectionItemIcon = ({ sensor, mode }) => {
  const check = sensor[mode === 'connect' ? 'connected' : 'calibrated'];
  return (
    <IconWrapper>
      {mode === 'connect' ? <UsbIcon /> : <WifiIcon />}
      <StatusIconWrapper bgColor={check ? '#07d407' : '#d41a24'}>
        {check ? <CheckStatusIcon /> : <CloseStatusIcon />}
      </StatusIconWrapper>
    </IconWrapper>
  );
};

SensorConnectionItemIcon.propTypes = {
  sensor: PropTypes.instanceOf(Sensor).isRequired,
  mode: PropTypes.oneOf(['connect', 'calibrate']),
};

SensorConnectionItemIcon.defaultProps = {
  mode: 'connect',
};

export default observer(SensorConnectionItemIcon);
