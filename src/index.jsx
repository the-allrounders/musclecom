import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import Root from './components/Root';

const root = document.querySelector('#root');

const mount = (Component) => {
  const App = (
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>
  );

  hydrate(
    App,
    root
  );
};

if(module.hot) {
  /**
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
  const orgError = console.error;
  console.error = (...args) => {
    if(args && args[0] && typeof args[0] === 'string' &&
      args[0].indexOf('You cannot change <Router routes>;') > -1) {
      // React route changed
    } else {
      // Log the error as normal
      orgError.apply(console, args);
    }
  };
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require,import/newline-after-import
    const RootComponent = require('./components/Root').default;
    mount(RootComponent);
  });
}

mount(Root);
