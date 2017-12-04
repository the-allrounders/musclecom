import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import qs from 'query-string';
import { routes } from '../../router';
// Components
import SetupConnect from './SetupConnect';
import Admin from './Admin';
import ProgressBar from './ProgressBar';

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

  render() {
    const { actionStore, location } = this.props;
    if(typeof actionStore.sensorsCalibrated !== 'undefined' && actionStore.sensorsCalibrated === actionStore.sensorsConnected) {
      // return <Redirect to='/main'/>
    }

    const search = qs.parse(location.search);
    const step = parseInt(search.step);

    return (
      <Switch>
        <Route path={routes.SETUP} exact>
          <section>
            <ProgressBar step={step} />
            {step === 1 && <SetupConnect />}
            {step === 2 && <div>Stap 2 - Sensoren</div>}
            {step === 3 && <div>Stap 3 - Kalibratie</div>}
          </section>
        </Route>
        <Route path={routes.SETUP_ADMIN} exact component={Admin} />
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
