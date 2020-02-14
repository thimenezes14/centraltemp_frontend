import React, { useState } from 'react';
import { ModalAuth, FormAuth, FormAuthInput, Botao, IconeBotaoLoading } from './style';
import {FaKey} from 'react-icons/fa';

export default function Modal(props) {
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

    const handleAuth = e => {
        setBotaoLoading(true);
        setSenha('');
        setBotaoDisabled(true);

        setTimeout(() => {
            console.log("Autentiquei!"); 
            props.onHide(); 
            setBotaoLoading(false);
        }, 5000);

        e.preventDefault();
    }

    return (
        <>
            <ModalAuth
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="text-align text-dark"
                onExit={() => setSenha('')}
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
            </ModalAuth>
        </>
    )
}