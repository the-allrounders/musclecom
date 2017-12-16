import React from 'react';
import PropTypes from 'prop-types';
// styled
import Loading from './styled/Loading';

const LoadingComponent = ({ children }) => <Loading>{children}</Loading>;

LoadingComponent.propTypes = {
  children: PropTypes.node,
};

LoadingComponent.defaultProps = {
  children: undefined,
};

export default LoadingComponent;
