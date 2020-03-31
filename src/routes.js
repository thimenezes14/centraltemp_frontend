import React from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Home from './pages/Home';
import Perfis from './pages/Perfis';
import Cadastro from './pages/Cadastro';
import Chuveiro from './pages/Chuveiro';
import Dashboard from './pages/Dashboard';
import {isAuthenticated} from './services/auth';

import Logo from './assets/images/centralTemp-logotipo-final-alternativo-2019.png';


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
            <div className="content">
              <img src={Logo} className="logo" alt="Logotipo CentralTemp" />
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/perfis" component={Perfis} />
                  <Route exact path="/perfis/novo" component={Cadastro} />
                  <Route exact path="/banho" render={(props) => <Chuveiro {...props} /> }/>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
        </BrowserRouter>
    )
}