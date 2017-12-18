import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, Provider } from 'mobx-react';
import stores from '../../stores/index';
import Router from '../../router';
import '../styles/global-styles';

const Root = observer(() => (
  <Provider {...stores}>
    <Router />
  </Provider>
));

export default withRouter(Root);