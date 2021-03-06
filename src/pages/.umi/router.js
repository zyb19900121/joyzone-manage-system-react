import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/zyb/work/joyzone-manage-system-react/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__UserLayout" */'../../layouts/UserLayout'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "name": "login",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__Login" */'../User/Login'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register",
        "name": "register",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__Register" */'../User/Register'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "name": "register.result",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__RegisterResult" */'../User/RegisterResult'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/zyb/work/joyzone-manage-system-react/node_modules/_umi-build-dev@1.6.1@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/dashboard/analysis",
        "exact": true
      },
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "Routes": [require('../Authorized').default],
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "path": "/dashboard/analysis",
            "name": "analysis",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Dashboard/models/monitor.js').then(m => { return { namespace: 'monitor',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Dashboard__Analysis" */'../Dashboard/Analysis'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/dashboard/monitor",
            "name": "monitor",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Dashboard/models/monitor.js').then(m => { return { namespace: 'monitor',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Dashboard__Monitor" */'../Dashboard/Monitor'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/dashboard/workplace",
            "name": "workplace",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Dashboard/models/monitor.js').then(m => { return { namespace: 'monitor',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Dashboard__Workplace" */'../Dashboard/Workplace'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/zyb/work/joyzone-manage-system-react/node_modules/_umi-build-dev@1.6.1@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "gamemanage",
        "icon": "crown",
        "path": "/gamemanage",
        "routes": [
          {
            "path": "/gamemanage/game",
            "name": "game",
            "routes": [
              {
                "path": "/gamemanage/game",
                "redirect": "/gamemanage/game/list",
                "exact": true
              },
              {
                "name": "game-list",
                "path": "/gamemanage/game/list",
                "hideInMenu": true,
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Game__models__company.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Game/models/company.js').then(m => { return { namespace: 'company',...m.default}}),
  import(/* webpackChunkName: 'p__Game__models__game.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Game/models/game.js').then(m => { return { namespace: 'game',...m.default}}),
  import(/* webpackChunkName: 'p__Game__models__type.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Game/models/type.js').then(m => { return { namespace: 'type',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Game/Game'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "name": "game-create",
                "path": "/gamemanage/game/create",
                "hideInMenu": true,
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Game__models__company.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Game/models/company.js').then(m => { return { namespace: 'company',...m.default}}),
  import(/* webpackChunkName: 'p__Game__models__game.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Game/models/game.js').then(m => { return { namespace: 'game',...m.default}}),
  import(/* webpackChunkName: 'p__Game__models__type.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Game/models/type.js').then(m => { return { namespace: 'type',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Game/CreateGame'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/zyb/work/joyzone-manage-system-react/node_modules/_umi-build-dev@1.6.1@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/gamemanage/news",
            "name": "news",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__News__News" */'../News/News'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/gamemanage/gallery",
            "name": "gallery",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Gallery__models__gallery.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Gallery/models/gallery.js').then(m => { return { namespace: 'gallery',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Gallery__Gallery" */'../Gallery/Gallery'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/gamemanage/strategy",
            "name": "strategy",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Strategy__Strategy" */'../Strategy/Strategy'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/zyb/work/joyzone-manage-system-react/node_modules/_umi-build-dev@1.6.1@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "config",
        "icon": "setting",
        "path": "/config",
        "routes": [
          {
            "path": "/config/gametype",
            "name": "gametype",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Config__models__company.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Config/models/company.js').then(m => { return { namespace: 'company',...m.default}}),
  import(/* webpackChunkName: 'p__Config__models__type.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Config/models/type.js').then(m => { return { namespace: 'type',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Config__GameType" */'../Config/GameType'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/config/gamecompany",
            "name": "gamecompany",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Config__models__company.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Config/models/company.js').then(m => { return { namespace: 'company',...m.default}}),
  import(/* webpackChunkName: 'p__Config__models__type.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Config/models/type.js').then(m => { return { namespace: 'type',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Config__GameCompany" */'../Config/GameCompany'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/zyb/work/joyzone-manage-system-react/node_modules/_umi-build-dev@1.6.1@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/comment",
        "icon": "message",
        "name": "comment",
        "Routes": [require('../Authorized').default],
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Comment__models__comment.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Comment/models/comment.js').then(m => { return { namespace: 'comment',...m.default}}),
  import(/* webpackChunkName: 'p__Comment__models__game.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/Comment/models/game.js').then(m => { return { namespace: 'game',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Comment__Comment" */'../Comment/Comment'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/accesslog",
        "icon": "eye",
        "name": "accesslog",
        "Routes": [require('../Authorized').default],
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__AccessLog__models__logList.js' */'/Users/zyb/work/joyzone-manage-system-react/src/pages/AccessLog/models/logList.js').then(m => { return { namespace: 'logList',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__AccessLog__LogList" */'../AccessLog/LogList'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__404" */'../404'),
  LoadingComponent: require('/Users/zyb/work/joyzone-manage-system-react/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/zyb/work/joyzone-manage-system-react/node_modules/_umi-build-dev@1.6.1@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/zyb/work/joyzone-manage-system-react/node_modules/_umi-build-dev@1.6.1@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
