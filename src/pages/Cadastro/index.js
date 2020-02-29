import React from 'react';
import {withRouter} from 'react-router-dom';
import {Pagina, Logotipo} from '../../assets/global/style';
import {GrupoBotoes, BotaoPainel} from './style';
import {FaArrowLeft} from 'react-icons/fa';

import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import FormCadastro from './formCadastro';

function Cadastro(props) {

    return (
        <Pagina>
            <Logotipo src={Logo}/>
            <GrupoBotoes>
                <BotaoPainel variant="primary" onClick={() => props.history.push('/perfis')}><FaArrowLeft /> VOLTAR</BotaoPainel>
            </GrupoBotoes>
            <FormCadastro redirect={props}/>
        </Pagina>
    )
}

export default withRouter(Cadastro);