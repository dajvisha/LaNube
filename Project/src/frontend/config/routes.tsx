import * as React from 'react';
import { Route } from 'react-router-dom';
import { history } from 'Logic/store';

import Main from 'Containers/home';
import Login from 'Containers/login';
import Admin from 'Containers/admin';


import { ConnectedRouter } from 'react-router-redux'

export class Routes extends React.Component<any, any> {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Main}/>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={Admin}/>
        </div>
      </ConnectedRouter>
    );
  }
}