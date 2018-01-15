import React from 'react';
import PropTypes from 'prop-types';

// styled

const SingleLevelComponent = ({ icon, name }) => (
  <div>
    <img src={icon} alt={name} />
  </div>
);

SingleLevelComponent.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

SingleLevelComponent.defaultProps = {
  icon:
    'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/cross-24-512.png',
};

export default SingleLevelComponent;
