import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Switch, Route, withRouter } from 'react-router-dom';
import qs from 'query-string';
import { routes } from '../../router';
import socket from '../../client/Socket';
// Components
import Admin from './Admin';
import Client from './Client';

class SetupScene extends Component {
  static stepCount = 3;

  componentDidMount() {
    socket.on('step', this.step);
    const step = this.getStep();
    if (step === false) {
      this.props.history.push({ search: qs.stringify({ step: 1 }) });
    }
  }

  componentWillUnmount() {
    socket.off('step');
  }

  getStep = () => {
    const search = qs.parse(this.props.location.search);
    const step = parseInt(search.step, 10);
    return Number.isNaN(step) ? false : step;
  };

  step = step => {
    const search = qs.parse(this.props.location.search);
    if (search.step) {
      this.props.history.push({ search: qs.stringify({ ...search, step }) });
    }
  };

  render() {
    const { actionStore } = this.props;
    if (
      typeof actionStore.sensorsCalibrated !== 'undefined' &&
      actionStore.sensorsCalibrated === actionStore.sensorsConnected
    ) {
      // return <Redirect to='/main'/>
    }

    return (
      <Switch>
        <Route
          path={routes.SETUP}
          exact
          component={p => (
            <Client {...p} getStep={this.getStep} actionStore={actionStore} />
          )}
        />
        <Route
          path={routes.SETUP_ADMIN}
          exact
          component={p => (
            <Admin {...p} getStep={this.getStep} actionStore={actionStore} />
          )}
        />
      </Switch>
    );
  }
}

SetupScene.propTypes = {
  actionStore: PropTypes.shape({
    sensorsCalibrated: PropTypes.number,
    sensorsConnected: PropTypes.number,
  }).isRequired,
};

const DecoratedSetupScene = inject('actionStore')(
  observer(withRouter(SetupScene)),
);
DecoratedSetupScene.stepCount = SetupScene.stepCount;

export default DecoratedSetupScene;
