import React, { useState, useEffect } from 'react';
import {AlertMessage } from '../../assets/global/style';
import profile_api from '../../services/profile_api';
import { withRouter } from 'react-router-dom';
import { logout } from '../../services/auth';
import { FaSignOutAlt, FaUserAlt, FaShower, FaChartBar, FaEdit } from 'react-icons/fa';

import {Abas} from './style';
import FormEditarUsuario from './formEditarUsuario';

import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import { Button, Tab, Navbar, Nav } from 'react-bootstrap';

function Dashboard(props) {

    const [key, setKey] = useState('banho');

    const [perfil, setPerfil] = useState({});
    const [loading, setLoading] = useState({ status: true, mensagem: 'Carregando sessão. Aguarde...' });
    const [erro, setErro] = useState({ status: null, mensagem: null });

    useEffect(() => {
        const carregarPerfil = async () => {
            const perfil = await profile_api.get(`${props.location.state}/detalhes`);
            return perfil.data;
        }

        carregarPerfil()
            .then(perfil => {
                setPerfil(perfil);
                setLoading({ status: false, mensagem: '' });
            })
            .catch(err => {
                console.error(err);
                if (err.response.status === 403)
                    props.history.push({ pathname: '/perfis', mensagem: err.response.data.err });

                setErro({ status: true, mensagem: `Erro ao comunicar-se com o servidor de perfis.` });
                setLoading({ status: false, mensagem: '' });
            })

    }, [props]);

    const sair = () => {
        logout();
        props.history.push('/perfis');
    }

    return (
        <>

            {loading.status ?
                (<AlertMessage variant="primary"><AlertMessage.Heading>{loading.mensagem}</AlertMessage.Heading></AlertMessage>) :
                erro.status ? (<AlertMessage variant="danger"><AlertMessage.Heading>{erro.mensagem}</AlertMessage.Heading><Button variant="danger" onClick={() => props.history.push('/')}>OK</Button></AlertMessage>) :
                    <>

                    <Navbar expand="lg">
                    <Navbar.Brand href="/dashboard"><img width="250" src={Logo} alt="Logotipo CentralTemp" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Item><Button variant="info" onClick={() => {setKey('dados')}}><FaUserAlt /> {perfil.nome} </Button></Nav.Item>
                            <Nav.Item><Button variant="danger" onClick={sair} ><FaSignOutAlt /> Sair</Button></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
                        <div className="container container-fluid text-center">
                            <h1>Dashboard</h1>
                            <Abas className="bg-secondary nav nav-tabs nav-justified" activeKey={key} onSelect={k => setKey(k)}>
                                <Tab eventKey="banho" title={<FaShower size={30} />}>
                                    BANHO
                                </Tab>
                                <Tab eventKey="estatisticas" title={<FaChartBar size={30} />}>
                                    ESTATÍSTICAS
                                </Tab>
                                <Tab eventKey="dados" title={<FaEdit size={30} />} >
                                    MEUS DADOS
                                    <FormEditarUsuario usuario={perfil} history={props.history} />
                                </Tab>
                            </Abas>
                        </div>
                    </>
            }

        </>
    );
}

export default withRouter(Dashboard);