import React, { useState, useEffect } from 'react';
import avatar_path from '../../services/avatar_path';
import { Form, Col, Row, Button } from 'react-bootstrap';
import {FormularioEdicao, FormularioEdicaoGrupo} from './style';
import {FaEraser, FaCheckCircle} from 'react-icons/fa';

import ModalConfirmacao from './modalConfirmacao';

export default function FormEditarUsuario(props) {
    const [perfilEdicao, setPerfilEdicao] = useState({});
    const [nome, setNome] = useState(props.usuario.nome);
    const [senha, setSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [modalAcao, setModalAcao] = useState('');

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

    const handleConfirmacao = () => {
        setModalShow(true);
    }
    


    return (
        <div>
            <img src={`${avatar_path}${perfilEdicao.avatar}`} alt={`Imagem de ${perfilEdicao.nome}`} width="100" />
            <ModalConfirmacao show={modalShow} onHide={()=> setModalShow(false)} idusuario={perfilEdicao.id} history={props.history} acao={modalAcao} />
            <FormularioEdicao>
                <FormularioEdicaoGrupo as={Row}>
                    <FormularioEdicao.Label column sm={2}>
                        Nome
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <Form.Control type="text" value={nome} onChange={handleNome} />
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
                        Senha Atual
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <FormularioEdicao.Control type="password" value={senha} onChange={handleSenha} />
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
                        <Button type="button" onClick={() => { setModalAcao('atualizar'); handleConfirmacao(); }}><FaCheckCircle /> Salvar Alterações</Button>
                    </Col>
                    <Col sm={6}>
                        <Button type="button" variant="danger" onClick={() => {setModalAcao('excluir'); handleConfirmacao();  }}><FaEraser /> Excluir Perfil</Button>
                    </Col>
                </FormularioEdicaoGrupo>
            </FormularioEdicao>
        </div>


    );
}