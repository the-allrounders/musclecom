import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
// Components
import Loading from './Loading';

const setupCheckDecorator = (InnerComponent) => {
  @inject('actionStore')
  @observer
  class _HOC extends Component {
    render() {
      const { actionStore } = this.props;
      if(typeof actionStore.sensorsCalibrated === 'undefined') {
        return <Loading>Connecting...</Loading>;
      }

      // Calibration has yet to be done...
      if(actionStore.sensorsCalibrated !== actionStore.sensorsConnected) {
        return <Redirect to='/setup' />;
      }

      return <InnerComponent {...this.props} />;
    }

    static propTypes = {
      actionStore: PropTypes.shape({
        sensorsCalibrated: PropTypes.number,
        sensorsConnected: PropTypes.number,
      }).isRequired,
    };
  }

  return _HOC;
};

export default setupCheckDecorator;
