import React from 'react';
import PropTypes from 'prop-types';
// styled
import Level from './styled/Level';
import LevelImage from './styled/LevelImage';

const LevelComponent = ({ name, icon, active, action, total }) => (
  <Level active={active} total={total}>
    <LevelImage src={icon} alt={name} />
    <figcaption>{name}</figcaption>
    <span>{action !== null ? action : ''}</span>
  </Level>
);

LevelComponent.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  active: PropTypes.bool,
  action: PropTypes.number,
  total: PropTypes.number.isRequired,
};

LevelComponent.defaultProps = {
  icon:
    'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/cross-24-512.png',
  active: false,
  action: null,
};

export default LevelComponent;
