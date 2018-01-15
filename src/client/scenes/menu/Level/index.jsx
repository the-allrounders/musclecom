import React from 'react';
import PropTypes from 'prop-types';
// styled
import Level from './styled/Level';
import LevelImage from './styled/LevelImage';
import LevelFigCaption from './styled/LevelFigCaption';
import LevelWrapper from './styled/LevelWrapper';

const LevelComponent = ({ name, icon, active, action, total }) => (
  <Level active={active} total={total}>
    <LevelWrapper>
      <LevelImage src={icon} alt={name} />
      <LevelFigCaption active={active}>{name}</LevelFigCaption>
      <span>{action !== null ? action : ''}</span>
    </LevelWrapper>
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
