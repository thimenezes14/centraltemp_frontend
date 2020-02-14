import React, { useState } from 'react';
import { ModalAuth, FormAuth, FormAuthInput, BotaoPainel, Botao } from './style';
import {FaKey} from 'react-icons/fa';

export default function Modal(props) {
    const [senha, setSenha] = useState('');
    const [botaoLoading, setBotaoLoading] = useState(false);

    const handleSenha = e => {
        if(RegExp(/^[0-9]*$/).test(e.target.value) && e.target.value.length <= 4)
            setSenha(e.target.value);
    }

    const handleAuth = e => {

        console.log(e);
        setBotaoLoading(true)
        console.log("Senha digitada: " + senha);
        setSenha('');

        setTimeout(() => {console.log("Autentiquei!"); props.onHide(); setBotaoLoading(false)}, 5000);
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
                        Olá, {props.perfilauth.nome}!
                    </ModalAuth.Title>
                </ModalAuth.Header>
                <FormAuth onSubmit={e => handleAuth(e)}>
                    <ModalAuth.Body>
                        <FormAuthInput value={senha} type="password" placeholder="Digite a sua senha de 4 dígitos" onChange={e => handleSenha(e)} />
                    </ModalAuth.Body>
                    <ModalAuth.Footer>
                        <Botao variant="success" type="submit"><FaKey /> {botaoLoading ? 'VERIFICANDO' : 'ACESSAR'}</Botao>
                    </ModalAuth.Footer>
                </FormAuth>
            </ModalAuth>
        </>
    )
}