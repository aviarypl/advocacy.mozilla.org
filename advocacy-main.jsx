/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-disable no-unused-vars */
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

function NotMatch(nextState, replace) {
  replace('/');
}

render((
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRoute component={require(`./pages/home.jsx`)}/>
      <Route path="/open-web-fellows" component={require(`./pages/open-web-fellows/overview.jsx`)}/>
      <Route path="/open-web-fellows/fellows" component={require(`./pages/open-web-fellows/fellows.jsx`)}/>
      <Route path="/open-web-fellows/info" component={require(`./pages/open-web-fellows/info.jsx`)}/>
      <Route path="*" onEnter={NotMatch}/>
    </Route>
  </Router>
), document.querySelector(`#my-app`));