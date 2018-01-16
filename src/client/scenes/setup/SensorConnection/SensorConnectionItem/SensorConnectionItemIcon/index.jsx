import React from 'react';
import PropTypes from 'prop-types';
import Sensor from '../../../../../stores/Objects/Sensor';

// styled
import IconWrapper from './styled/IconWrapper';
import UsbIcon from './styled/UsbIcon';
import CheckStatusIcon from './styled/CheckStatusIcon';
import CloseStatusIcon from './styled/CloseStatusIcon';

const SensorConnectionItemIcon = ({ sensor }) => (
  <IconWrapper>
    <UsbIcon />
    {sensor.connected ? (
      <CheckStatusIcon bgColor="#07d407" />
    ) : (
      <CloseStatusIcon bgColor="#d41a24" />
    )}
  </IconWrapper>
);

SensorConnectionItemIcon.propTypes = {
  sensor: PropTypes.instanceOf(Sensor).isRequired,
};

export default SensorConnectionItemIcon;
