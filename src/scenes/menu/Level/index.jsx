import React from 'react';
import PropTypes from 'prop-types';
// styled
import Level from './styled/Level';
import LevelImage from './styled/LevelImage';

const LevelComponent = ({ name, image, active, action, total }) => (
  <Level active={active} total={total}>
    <LevelImage src={image} alt={name} />
    <figcaption>{name}</figcaption>
    <span>{action > 0 ? action : ''}</span>
  </Level>
);

LevelComponent.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  active: PropTypes.bool,
  action: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

LevelComponent.defaultProps = {
  image:
    'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/cross-24-512.png',
  active: false,
};

export default LevelComponent;
