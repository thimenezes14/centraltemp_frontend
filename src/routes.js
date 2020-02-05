import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import chuveiro_info from './services/tests/fake_shower_api';

import {useStore} from 'react-context-hook';

import Home from './pages/Home';
import Perfis from './pages/Perfis';
import Cadastro from './pages/Cadastro';
import Chuveiro from './pages/Chuveiro';
import api from './services/api';

async function checkShowerState() {
    
    const response = await api.get('chuveiro');
    return response.data.ligado;
}

//Verificar se o chuveiro está ligado antes de prosseguir.
const IsShowerOn = ({component: Component, ...rest}) => (
    
    <Route {...rest} render={props => (
        !checkShowerState()
        ? <Component {...props} /> 
        : <Redirect to={{pathname: '/banho', state: {from: props.location}}} />
    )} />
);

const IsShowerOff = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        checkShowerState()
        ? <Component {...props} /> 
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />
    )} />
);

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/perfis" component={Perfis} />
                <Route exact path="/perfis/novo" component={Cadastro} />
                <Route exact path="/banho" component={Chuveiro} />
            </Switch>
        </BrowserRouter>
    )
}