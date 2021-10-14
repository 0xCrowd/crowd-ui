import React from 'react';
import { Redirect, RouteProps } from 'react-router-dom';

import { RouteNames } from '@app/router/route-names';
import MainPage from '@app/pages/main-page';
//import CrowdPage from '@app/pages/crowd-page';


export interface IAppRoute extends RouteProps {
  routes?: IAppRoute[];
  private?: boolean;
}

/**
 * Конфигурация роутов приложения
 */
export const appRoutes: IAppRoute[] = [
  {
    path: RouteNames.INDEX,
    exact: true,
    render: () => <MainPage />,
  },
  //{
  //   path: RouteNames.CROWD,
  //   exact: true,
  //   render: () => <CrowdPage />,
  //},
  //{
  //  path: RouteNames.FORM,
  //  render: props => (
  //    <EntityFormStoresCtx.Provider value={getEntityFormStores()}>
  //      <EntityFormPage {...props} action="new" />
  //    </EntityFormStoresCtx.Provider>
  //  ),
  //},
];
