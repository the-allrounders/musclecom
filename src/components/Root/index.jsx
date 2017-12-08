import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, Provider } from 'mobx-react';
import stores from '../../stores';
import Router from '../../router';

const Root = observer(() => (
  <Provider {...stores}>
    <Router />
  </Provider>
));

export default withRouter(Root);
