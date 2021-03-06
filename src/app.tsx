import React, { ReactElement, useState } from "react";
import { configure } from "mobx";
import { Route, Switch } from "react-router-dom";

import { appRoutes } from "@app/router/routes";

import "normalize.css";
import "@assets/styles/app.css";
import 'react-toastify/dist/ReactToastify.css';

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  observableRequiresReaction: false, // TODO: check true setting
  reactionRequiresObservable: true,
});

console.log(process, 'process');
console.log(window, 'window');

export const App = (): ReactElement => {
  return (

    <Switch>
      {appRoutes.map((appRoute, i) => (
        <Route key={i} {...appRoute} />
      ))}
    </Switch>

  );
};
