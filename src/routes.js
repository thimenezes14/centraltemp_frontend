import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Perfis from './pages/Perfis';
import Cadastro from './pages/Cadastro';
import Chuveiro from './pages/Chuveiro';
import api from './services/shower_api';

async function checkShowerState() {
    const response = await api.get('chuveiro');
    return response.data;
}

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props} showerStatus={checkShowerState} /> } />
                <Route exact path="/perfis" component={Perfis} />
                <Route exact path="/perfis/novo" component={Cadastro} />
                <Route exact path="/banho" render={(props) => <Chuveiro {...props} showerStatus={checkShowerState} /> }/>
            </Switch>
        </BrowserRouter>
    )
}