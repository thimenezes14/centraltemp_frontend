import React, { useState } from 'react';
import { ModalAuth, FormAuth, FormAuthInput, Botao, IconeBotaoLoading } from './style';
import {FaKey} from 'react-icons/fa';
import { login } from "../../services/auth";

import profile_api from '../../services/profile_api';
import { Alert } from 'react-bootstrap';

export default function Modal(props) {
        
    const [error, setError] = useState({status: false, message: ''});

    const [senha, setSenha] = useState('');
    const [botaoLoading, setBotaoLoading] = useState(false);
    const [botaoDisabled, setBotaoDisabled] = useState(true);

    const handleSenha = e => {
        const TAMANHO_SENHA = 4;
        if(RegExp(/^[0-9]*$/).test(e.target.value) && e.target.value.length <= TAMANHO_SENHA) {
            setSenha(e.target.value);
        } else {
            return false;
        }

        if(e.target.value.length === TAMANHO_SENHA) {
            setBotaoDisabled(false);
        } else {
            setBotaoDisabled(true);
        }
    }

    const handleAuth = async e => {
        e.preventDefault();

        let id = props.perfilauth.id_perfil;
        
        setBotaoLoading(true);
        setSenha('');
        setBotaoDisabled(true);

        try {
            const auth = await profile_api.post('/autenticar', {id, senha});
            login(auth.data.token);
            props.onHide(); 
            setBotaoLoading(false);
            props.history.push({pathname: '/dashboard', state: id});
        } catch (err) {
            setBotaoLoading(false);
            setError({status: true, message: err.response.data});
            if(err.response) {
                if(err.response.status === 404) {
                    window.location.reload();
                }
            }
        }

    }

    return (
        <>
            <ModalAuth
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="text-align text-dark"
                onExit={() => {setSenha(''); setError({status: false, message: ''});}}
            >
                <ModalAuth.Header closeButton>
                    <ModalAuth.Title id="contained-modal-title-vcenter">
                        AUTENTICAÇÃO
                    </ModalAuth.Title>
                </ModalAuth.Header>
                <FormAuth onSubmit={e => handleAuth(e)}>
                    <ModalAuth.Body>
                        <FormAuthInput value={senha} type="password" placeholder={`${props.perfilauth.nome}, digite a sua senha`} onChange={e => handleSenha(e)} />
                    </ModalAuth.Body>
                    <ModalAuth.Footer>
                        <Botao disabled={botaoDisabled} variant="success" type="submit" loading={botaoLoading.toString()}>{botaoLoading ? (<><IconeBotaoLoading /> AUTENTICANDO...</>) : (<><FaKey /> ACESSAR</>)}</Botao>
                    </ModalAuth.Footer>
                </FormAuth>
                <Alert variant="danger" show={error.status}>{error.message}</Alert>
            </ModalAuth>
        </>
    )
}