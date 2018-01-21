import React from 'react';
import PropTypes from 'prop-types';

// styled
import IconWrapper from './styled/IconWrapper';
import UsbIcon from './styled/UsbIcon';
import WifiIcon from './styled/WifiIcon';
import CheckStatusIcon from './styled/CheckStatusIcon';
import CloseStatusIcon from './styled/CloseStatusIcon';

const SensorConnectionItemIcon = ({ check, mode }) => (
  <IconWrapper>
    {mode === 'connect' ? <UsbIcon /> : <WifiIcon />}
    {check ? (
      <CheckStatusIcon bgColor="#07d407" />
    ) : (
      <CloseStatusIcon bgColor="#d41a24" />
    )}
  </IconWrapper>
);

SensorConnectionItemIcon.propTypes = {
  check: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['connect', 'calibrate']),
};

SensorConnectionItemIcon.defaultProps = {
  mode: 'connect',
};

export default SensorConnectionItemIcon;
