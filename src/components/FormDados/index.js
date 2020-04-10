import React, { useState, useEffect } from 'react';
import { FormularioCadastro, BotaoFormularioCadastro, GrupoOpcoesImagem, OpcaoImagem } from './style';
import { FaCheckCircle, FaUserAlt } from 'react-icons/fa';
import moment from 'moment';
import { Row, Col, Alert } from 'react-bootstrap';
import profile_api from '../../services/profile_api';
import avatar_path from '../../services/avatar_path';

import getError from '../../helpers/handleErrors';

export default function FormCadastro(props) {

    const [error, setError] = useState({status: false, message: ''});
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [nome, setNome] = useState('');
    const [nomeOk, setNomeOk] = useState(null);

    const [sexo, setSexo] = useState('');
    const [sexoOk, setSexoOk] = useState(null);

    const [data_nasc, setData_nasc] = useState('');
    const [data_nascOk, setData_nascOk] = useState(null);

    const [senha, setSenha] = useState('');
    const [senhaOk, setSenhaOk] = useState(null);

    const [senha_conf, setSenhaConf] = useState('');
    const [senhaConfOk, setSenhaConfOk] = useState(null);

    const [avatarSelecionado, setAvatarSelecionado] = useState('default.png');
    const [avatares, setAvatares] = useState([]);

    const carregarAvatares = async () => {
        const imagens = (await profile_api.get('imagens')).data
        setAvatares(imagens);
    }

    useEffect(()=> {
        carregarAvatares();
    }, []);

    useEffect(() => { 
        enableButton(); 
    });

    useEffect(() => {
        if(props.perfil) {
            const {nome, sexo, data_nasc, avatar} = props.perfil;
            setNome(nome);
            setSexo(sexo);
            setData_nasc(moment(data_nasc, 'DD/MM/YYYY').format('YYYY-MM-DD'));
            setAvatarSelecionado(avatar)
            
            setNomeOk(true);
            setSexoOk(true);
            setData_nascOk(true);
            setSenhaOk(true);
            setSenhaConfOk(true);
        }
    }, [props]);

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

    const handleSexo = e => {
        setSexo(e.target.value);
    }

    const validateSexo = e => {
        if (sexo.length > 0) {
            setSexoOk(true);
        } else {
            setSexoOk(false);
        }
    }

    const handleData_nasc = e => {
        setData_nasc(e.target.value);
    }

    const validateData_nasc = e => {
        const data_nascimento = e.target.value;
        const rgx = new RegExp(/((19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);

        if (rgx.test(data_nascimento) && moment().isSameOrAfter(Date.parse(data_nascimento))) {
            setData_nascOk(true);
        } else {
            setData_nascOk(false);
        }

    }

    const checkSenha = e => {
        const TAM_SENHA = 4;
        if (e.target.value.length === TAM_SENHA) {
            setSenhaOk(true);
        } else {
            setSenhaOk(false);
        }
    }

    const checkSenhaConf = e => {
        const TAM_SENHA = 4;
        if (e.target.value.length === TAM_SENHA) {
            if(senha_conf === senha)
                setSenhaConfOk(true);
            else
                setSenhaConfOk(false);
        } else {
            setSenhaConfOk(false);
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

    const validateSenha = e => {
        if(props.action === 'update') {
            if(senha.length > 0) {
                checkSenha(e);
            } else {
                setSenhaOk(true);
            }
        } else {
            checkSenha(e);
        }
        
    }

    const handleSenhaConf = e => {
        const rgx = new RegExp(/^[0-9]{0,4}$/);
        if (rgx.test(e.target.value)) {
            setSenhaConf(e.target.value);
        } else {
            return false;
        }
    }

    const validateSenhaConf = e => {
        if(props.action === 'update') {
            if(senha.length > 0) {
                checkSenhaConf(e);
            } else {
                setSenhaConfOk(true);
            }
        } else {
           checkSenhaConf(e);
        }
    }

    const enableButton = () => {
        
        if(props.action === 'update') {
            if(props.perfil.nome === nome && props.perfil.avatar === avatarSelecionado) {
                const TAM_SENHA = 4;
                if(senha.length === TAM_SENHA && senhaConfOk) {
                    setButtonDisabled(false);
                    return true;
                } else {
                    setButtonDisabled(true);
                    return false;
                }
            } else {
                if(nomeOk) {
                    setButtonDisabled(false);
                    return true;
                } else {
                    setButtonDisabled(true);
                    return false;
                }
            }
        }
        
        if (nomeOk && sexoOk && data_nascOk && senhaOk && senhaConfOk) {
            setButtonDisabled(false);
            return true;
        } else {
            setButtonDisabled(true);
            return false;
        }
    }
    
    const handleSubmit = async e => {
        e.preventDefault();

        try {
            if(props.action === 'update') {
                const TAM_SENHA = 4;
                const dadosParaAtualizar = {};

                if(nome) {
                    dadosParaAtualizar.nome = nome;
                }
                
                if(senha.length === TAM_SENHA)
                    dadosParaAtualizar.senha = senha;

                if(avatarSelecionado)
                    dadosParaAtualizar.avatar = avatarSelecionado;

                await profile_api.put(`/atualizar/${props.perfil.id_perfil}`, dadosParaAtualizar);
                window.location.reload();
                
            } else {
                await profile_api.post('/cadastrar', {nome, senha, sexo, data_nasc, avatar: avatarSelecionado});
                props.history.push('/perfis');
            }
        } catch (err) {
            setError({status: true, message: getError(err)});
        }
        
    }

    return (
        <div>
            <FormularioCadastro onSubmit={handleSubmit}>
            <FormularioCadastro.Label><span><FaUserAlt /> {props.action === 'update' ? 'ATUALIZAR' : 'CRIAR'} PERFIL</span></FormularioCadastro.Label>

                <FormularioCadastro.Group>
                    <FormularioCadastro.Label>Nome</FormularioCadastro.Label>
                    <FormularioCadastro.Control value={nome} type="text" placeholder="Ex.: João/Maria " onChange={handleNome} onBlur={validateNome} onKeyUp={validateNome} />
                    <Alert show={nomeOk === false} variant="danger"><FormularioCadastro.Text className="text-muted">Forneça um nome ou apelido de 2 a 10 caracteres.</FormularioCadastro.Text></Alert>
                </FormularioCadastro.Group>

                <FormularioCadastro.Group>
                    <Row>
                        <Col md={6}>
                            <FormularioCadastro.Label>Sexo</FormularioCadastro.Label>
                            <FormularioCadastro.Control disabled={props.action === 'update'} readOnly={props.action === 'update'} as="select" value={sexo} onChange={handleSexo} onBlur={validateSexo}>
                                <option disabled value="">Selecione...</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </FormularioCadastro.Control>
                            <Alert show={sexoOk === false} variant="danger"><FormularioCadastro.Text className="text-muted">Por favor, forneça um sexo válido (masculino ou feminino). </FormularioCadastro.Text></Alert>
                        </Col>
                        <Col md={6}>
                            <FormularioCadastro.Label>Data de Nascimento</FormularioCadastro.Label>
                            <FormularioCadastro.Control readOnly={props.action === 'update'} type="date" value={data_nasc} onChange={handleData_nasc} onBlur={validateData_nasc} />
                            <Alert show={data_nascOk === false} variant="danger"><FormularioCadastro.Text className="text-muted">Forneça uma data de nascimento válida.</FormularioCadastro.Text></Alert>
                        </Col>
                    </Row>
                </FormularioCadastro.Group>

                <FormularioCadastro.Group>
                    <Row>
                        <Col md={6}>
                            <FormularioCadastro.Label>Senha numérica de 4 dígitos</FormularioCadastro.Label>
                            <FormularioCadastro.Control type="password" value={senha} onChange={e => {handleSenha(e)}} onBlur={validateSenha} onKeyUp={e => {validateSenha(e); validateSenhaConf(e)}}/>
                            <Alert show={senhaOk === false} variant="danger"><FormularioCadastro.Text className="text-muted">Digite uma senha de 4 dígitos numéricos. </FormularioCadastro.Text></Alert>
                        </Col>
                        <Col md={6}>
                            <FormularioCadastro.Label>Repita a sua senha</FormularioCadastro.Label>
                            <FormularioCadastro.Control type="password" value={senha_conf} onChange={handleSenhaConf} onBlur={validateSenhaConf} onKeyUp={validateSenhaConf}/>
                            <Alert show={(senhaOk === true && senhaConfOk === false)} variant="danger"><FormularioCadastro.Text className="text-muted">Senhas não conferem. Tente novamente. </FormularioCadastro.Text></Alert>
                        </Col>
                    </Row>
                </FormularioCadastro.Group>

                <FormularioCadastro.Group>
                <FormularioCadastro.Label>Avatar</FormularioCadastro.Label>
                    <GrupoOpcoesImagem>
                        {avatares.map(avatar => (
                            <OpcaoImagem key={avatar} ativo={avatar === avatarSelecionado}>
                                <label>
                                    <FormularioCadastro.Check 
                                        type="radio" 
                                        value={avatar} 
                                        name="avatar" 
                                        checked={avatar === avatarSelecionado}
                                        onChange={()=> setAvatarSelecionado(avatar)}
                                    />
                                    <img key={avatar} src={`${avatar_path}${avatar}`} alt={avatar} />
                                </label>
                            </OpcaoImagem>
                        ))}
                    </GrupoOpcoesImagem>
                </FormularioCadastro.Group>

                <BotaoFormularioCadastro type="submit" variant="success" disabled={buttonDisabled}><FaCheckCircle /> SALVAR</BotaoFormularioCadastro>
                <Alert variant="danger" show={error.status}>{error.message}</Alert>
            </FormularioCadastro>
        </div>
    );
}