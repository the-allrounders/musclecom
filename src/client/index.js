import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import Root from './RootWrapper';

const root = document.createElement('div');

document.body.appendChild(root);

const mount = RootComponent => {
  render(
    <AppContainer>
      <BrowserRouter>
        <RootComponent />
      </BrowserRouter>
    </AppContainer>,
    root
  );
};

if(module.hot) {
  module.hot.accept('./RootWrapper', () => {
    // eslint-disable-next-line global-require,import/newline-after-import
    const RootComponent = require('./RootWrapper').default;
    mount(RootComponent);
  });
}

mount(Root);
