import React, { ReactElement } from 'react';
import { configure } from 'mobx';
import { Route, Switch } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-mui';

import { appRoutes } from '@app/router/routes';

import 'normalize.css';
import '@assets/styles/app.css';
import '@assets/styles/fonts.css';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  observableRequiresReaction: false, // TODO: check true setting
  reactionRequiresObservable: true,
});

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

export const App = (): ReactElement => {
  return (
    //@ts-ignore
    <AlertProvider template={AlertTemplate} {...options}>
      <Switch>
        {appRoutes.map((appRoute, i) => <Route key={i} {...appRoute} />)}
      </Switch>
    </AlertProvider>
  );
};
