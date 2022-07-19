import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MetaMaskProvider } from "metamask-react";

import { App } from './app';

const root = document.getElementById('root');
const app = (
  <MetaMaskProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MetaMaskProvider>
);

render(app, root);

if (module.hot) {
  module.hot.accept();
}
