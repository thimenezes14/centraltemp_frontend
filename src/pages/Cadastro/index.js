import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Pagina, Logotipo} from '../../assets/global/style';

import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import FormCadastro from './formCadastro';

function Cadastro(props) {
    return (
        <Pagina>
            <Logotipo src={Logo}/>
            <FormCadastro />
        </Pagina>
    )
}

export default withRouter(Cadastro);