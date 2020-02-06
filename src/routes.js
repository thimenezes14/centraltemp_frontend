import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Perfis from './pages/Perfis';
import Cadastro from './pages/Cadastro';
import Chuveiro from './pages/Chuveiro';
import shower_api from './services/shower_api';

async function checkShowerState() {
    const response = await shower_api.get('chuveiro');
    return {data: response.data, status: response.status};
}

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props} showerStatus={checkShowerState} /> } />
                <Route exact path="/perfis" component={Perfis} />
                <Route exact path="/perfis/novo" component={Cadastro} />
                <Route exact path="/banho" render={(props) => <Chuveiro {...props} /> }/>
            </Switch>
        </BrowserRouter>
    )
}