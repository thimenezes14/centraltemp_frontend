import React, { useState, useEffect } from 'react';
import avatar_path from '../../services/avatar_path';
import { Form, Col, Row, Button } from 'react-bootstrap';
import {FormularioEdicao, FormularioEdicaoGrupo} from './style';
import {FaEraser, FaCheckCircle} from 'react-icons/fa';

import {logout} from '../../services/auth';

import ModalConfirmacao from './modalConfirmacao';

import profile_api from '../../services/profile_api';

export default function FormEditarUsuario(props) {
    const [perfilEdicao, setPerfilEdicao] = useState({});
    const [nome, setNome] = useState(props.usuario.nome);
    const [senha, setSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [botaoDisabled, setBotaoDisabled] = useState(true);

    const [nomeOk, setNomeOk] = useState(true);

    useEffect(() => {enableButton()});

    useEffect(() => {
        setPerfilEdicao(props.usuario);
    }, [props.usuario]);

   
    const handleNome = e => {
        const rgx = new RegExp(/^[a-zA-Zà-úÀ-Ú ]{0,10}$/);
        if (rgx.test(e.target.value)) {
            setNome(e.target.value);
        } else {
            return false;
        }
    }

    const validateNome = e => {
        const MIN_NOME = 2, MAX_NOME = 10;
        if (e.target.value.length >= MIN_NOME && e.target.value.length <= MAX_NOME) {
            setNomeOk(true);
        } else {
            setNomeOk(false);
        }
    }

    const handleNovaSenha = e => {
        const rgx = new RegExp(/^[0-9]{0,4}$/);
        if (rgx.test(e.target.value)) {
            setNovaSenha(e.target.value);
        } else {
            return false;
        }
    }

    const handleSenha = e => {
        const rgx = new RegExp(/^[0-9]{0,4}$/);
        if (rgx.test(e.target.value)) {
            setSenha(e.target.value);
        } else {
            return false;
        }
    }

    const enableButton = () => {
        if(props.usuario.nome !== nome && nomeOk) {
            if((novaSenha.length === 0 && senha.length === 0) || senha === novaSenha) {
                setBotaoDisabled(false);
            }
        } else {
            if((novaSenha.length !== 0 && senha.length !== 0) && senha === novaSenha) {
                setBotaoDisabled(false);
            } else {
                setBotaoDisabled(true);
            }
        }
     
    }

    const handleExclusao = () => {
        setModalShow(true);
    }
    
    const handleSubmitUpdate = e => {
        e.preventDefault();
        const TAM_SENHA = 4;
        const dadosParaAtualizar = {nome};

        if(novaSenha.length === TAM_SENHA)
            dadosParaAtualizar.senha = novaSenha;

        profile_api.put(`atualizar/${perfilEdicao.id}`, dadosParaAtualizar)
        .then(() => {
            setSenha('');
            setNovaSenha('');
            logout();
            props.history.push('/perfis');
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <img src={`${avatar_path}${perfilEdicao.avatar}`} alt={`Imagem de ${perfilEdicao.nome}`} width="100" />
            <ModalConfirmacao show={modalShow} onHide={()=> setModalShow(false)} idusuario={perfilEdicao.id} history={props.history} />
            <FormularioEdicao onSubmit={handleSubmitUpdate}>
                <FormularioEdicaoGrupo as={Row}>
                    <FormularioEdicao.Label column sm={2}>
                        Nome
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <Form.Control type="text" value={nome} onChange={handleNome} onKeyUp={validateNome}/>
                    </Col>
                </FormularioEdicaoGrupo>

                <FormularioEdicaoGrupo as={Row} >
                    <FormularioEdicao.Label column sm={2}>
                        Nova Senha
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <FormularioEdicao.Control type="password" value={novaSenha} onChange={handleNovaSenha} />
                    </Col>
                </FormularioEdicaoGrupo>
                
                <FormularioEdicaoGrupo as={Row}>
                    <FormularioEdicao.Label column sm={2}>
                        Repetir Senha
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <FormularioEdicao.Control type="password" value={senha} onChange={handleSenha}/>
                    </Col>
                </FormularioEdicaoGrupo>

                <hr className="hr" />

                <FormularioEdicaoGrupo as={Row} >
                    <FormularioEdicao.Label column sm={2}>
                        Data de Nasc.
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <FormularioEdicao.Control className="bg-secondary text-white" readOnly type="text" value={perfilEdicao.data_nasc || ''} />
                    </Col>
                </FormularioEdicaoGrupo>

                <FormularioEdicaoGrupo as={Row} >
                    <FormularioEdicao.Label column sm={2}>
                        Sexo
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <FormularioEdicao.Control className="bg-secondary text-white" readOnly type="text" value={perfilEdicao.sexo === 'M' ? 'Masculino' : 'Feminino'}/>
                    </Col>
                </FormularioEdicaoGrupo>

                <FormularioEdicaoGrupo as={Row}>
                    <Col sm={6}>
                        <Button disabled={botaoDisabled} type="submit" ><FaCheckCircle /> Salvar Alterações</Button>
                    </Col>
                    <Col sm={6}>
                        <Button type="button" variant="danger" onClick={handleExclusao}><FaEraser /> Excluir Perfil</Button>
                    </Col>
                </FormularioEdicaoGrupo>
            </FormularioEdicao>
        </div>
    );
}