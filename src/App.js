import React from 'react';
import {withStore} from 'react-context-hook';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Routes from './routes';

const estadoChuveiro = {chuveiro: {ligado: true}};

function App() {
  return (
    <Routes />
  )
}

export default withStore(App, estadoChuveiro);
