import React from 'react';
import {withRouter} from 'react-router-dom';
import { BotaoVoltar } from './style';
import {FaArrowLeft} from 'react-icons/fa';

import FormCadastro from '../../components/FormDados';

function Cadastro(props) {
    return (
        <div>
            <BotaoVoltar variant="primary" onClick={() => props.history.push('/perfis')}><FaArrowLeft /> VOLTAR</BotaoVoltar>
            <FormCadastro {...props} />
        </div>
    )
}

export default withRouter(Cadastro);