import React from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Home from './pages/Home';
import Perfis from './pages/Perfis';
import Cadastro from './pages/Cadastro';
import Chuveiro from './pages/Chuveiro';
import Dashboard from './pages/Dashboard';
import shower_api from './services/shower_api';
import {isAuthenticated} from './services/auth';

async function checkShowerState() {
    const response = await shower_api.get('info');
    return {data: response.data, status: response.status};
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/perfis", state: { from: props.location } }} />
        )
      }
    />
  );

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props} showerStatus={checkShowerState} /> } />
                <Route exact path="/perfis" component={Perfis} />
                <Route exact path="/perfis/novo" component={Cadastro} />
                <Route exact path="/banho" render={(props) => <Chuveiro {...props} /> }/>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}