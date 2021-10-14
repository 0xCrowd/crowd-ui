import React, { ReactElement } from 'react';
import { configure } from 'mobx';
import { Route, Switch } from 'react-router-dom';

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

export const App = (): ReactElement => {
  return (
    <Switch>
      {appRoutes.map((appRoute, i) => <Route key={i} {...appRoute} />)}
    </Switch>
  );
};
