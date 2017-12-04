import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import qs from 'query-string';
import { routes } from '../../router';
// Components
import Admin from './Admin';
import Client from './Client';

class SetupScene extends Component {
  static stepCount = 3;

  componentDidMount() {
    this.props.actionStore.socket.on('step', this.step);
    const search = qs.parse(this.props.location.search);
    if(!search.step) {
      this.props.history.push({ search: qs.stringify({ step: 1 }) });
    }
  }

  componentWillUnmount() {
    this.props.actionStore.socket.off('step');
  }

  step = (step) => {
    const search = qs.parse(this.props.location.search);
    if(search.step) {
      this.props.history.push({ search: qs.stringify({ step }) });
    }
  }

  getStep = () => {
    const search = qs.parse(this.props.location.search);
    return parseInt(search.step);
  }

  render() {
    const { actionStore } = this.props;
    if(typeof actionStore.sensorsCalibrated !== 'undefined' && actionStore.sensorsCalibrated === actionStore.sensorsConnected) {
      // return <Redirect to='/main'/>
    }

    return (
      <Switch>
        <Route path={routes.SETUP} exact component={(p) => <Client {...p} getStep={this.getStep} actionStore={actionStore} />} />
        <Route path={routes.SETUP_ADMIN} exact component={(p) => <Admin {...p} getStep={this.getStep} actionStore={actionStore} />} />
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

const DecoratedSetupScene = inject('actionStore')(observer(withRouter(SetupScene)))
DecoratedSetupScene.stepCount = SetupScene.stepCount;

export default DecoratedSetupScene;
