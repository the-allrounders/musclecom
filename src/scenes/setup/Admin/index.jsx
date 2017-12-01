import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter} from 'react-router-dom';
import qs from 'query-string';
// Components
import SetupScene from '../';
import ProgressBar from '../ProgressBar';

class AdminSetupComponent extends Component {
  onStep = (step) => {
    this.props.actionStore.socket.emit('step', step);
  }

  componentDidMount() {
    this.onStep(2);
  }

  render() {
    const search = qs.parse(this.props.location.search);
    const step = parseInt(search.step);
    return (
    <div>
      <h1>Admin</h1>
      <ProgressBar step={step} />
      <button disabled={step < 3} onClick={() => this.onStep(step - 1)}>Previous step</button>
      <button disabled={step > SetupScene.stepCount - 1} onClick={() => this.onStep(step + 1)}>Next step</button>
    </div>
  );
  }
}

export default inject('actionStore')(observer(withRouter(AdminSetupComponent)));
