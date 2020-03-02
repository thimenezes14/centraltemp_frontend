import React, { useState, useEffect } from 'react';
import avatar_path from '../../services/avatar_path';
import { Form, Col, Row, Button } from 'react-bootstrap';
import {FormularioEdicao, FormularioEdicaoGrupo} from './style';

export default function FormEditarUsuario(props) {
    const [perfilEdicao, setPerfilEdicao] = useState({});
    const [nome, setNome] = useState(props.usuario.nome);
    const [senha, setSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState('');

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


    return (
        <div>
            <img src={`${avatar_path}${perfilEdicao.avatar}`} alt={`Imagem de ${perfilEdicao.nome}`} width="100" />

            <FormularioEdicao>
                <FormularioEdicaoGrupo as={Row} controlId="formHorizontalEmail">
                    <FormularioEdicao.Label column sm={2}>
                        Nome
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <Form.Control type="text" value={nome} onChange={handleNome} />
                    </Col>
                </FormularioEdicaoGrupo>

                <FormularioEdicaoGrupo as={Row} controlId="formularioedicaoHorizontalPassword">
                    <FormularioEdicao.Label column sm={2}>
                        Nova Senha
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <FormularioEdicao.Control type="password" />
                    </Col>
                </FormularioEdicaoGrupo>
                
                <FormularioEdicaoGrupo as={Row} controlId="formularioedicaoHorizontalPassword">
                    <FormularioEdicao.Label column sm={2}>
                        Senha Atual
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <FormularioEdicao.Control type="password" />
                    </Col>
                </FormularioEdicaoGrupo>

                <FormularioEdicaoGrupo as={Row} controlId="formularioedicaoHorizontalPassword">
                    <FormularioEdicao.Label column sm={2}>
                        Data de Nasc.
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <FormularioEdicao.Control className="bg-secondary text-white" readOnly type="text" value={perfilEdicao.data_nasc} />
                    </Col>
                </FormularioEdicaoGrupo>

                <FormularioEdicaoGrupo as={Row} controlId="formularioedicaoHorizontalPassword">
                    <FormularioEdicao.Label column sm={2}>
                        Sexo
                    </FormularioEdicao.Label>
                    <Col sm={6}>
                        <FormularioEdicao.Control className="bg-secondary text-white" readOnly type="text" value={perfilEdicao.sexo === 'M' ? 'Masculino' : 'Feminino'}/>
                    </Col>
                </FormularioEdicaoGrupo>

                <FormularioEdicaoGrupo as={Row}>
                    <Col sm={6}>
                        <Button type="button">Salvar Alterações</Button>
                    </Col>
                    <Col sm={6}>
                        <Button type="button" variant="danger">Excluir Perfil</Button>
                    </Col>
                </FormularioEdicaoGrupo>
            </FormularioEdicao>
        </div>


    );
}