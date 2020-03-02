import React, { useState, useEffect } from 'react';
import {AlertMessage } from '../../assets/global/style';
import profile_api from '../../services/profile_api';
import { withRouter } from 'react-router-dom';
import { logout } from '../../services/auth';
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa';

import {ContainerDashboard} from './style';
import FormEditarUsuario from './formEditarUsuario';

import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import { Button, Tabs, Tab, Navbar, Nav } from 'react-bootstrap';

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
                    <Navbar.Brand href="/dashboard"><img width="300" src={Logo} alt="Logotipo CentralTemp" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Item><Button variant="info" onClick={() => {setKey('dados')}}><FaUserAlt /> {perfil.nome} </Button></Nav.Item>
                            <Nav.Item><Button variant="danger" onClick={sair} ><FaSignOutAlt /> Sair</Button></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
                        <ContainerDashboard>
                            <h1>Dashboard</h1>
                            <Tabs activeKey={key} onSelect={k => setKey(k)}>
                                <Tab eventKey="banho" title="BANHO">
                                    BANHO
                                </Tab>
                                <Tab eventKey="estatisticas" title="ESTATÍSTICAS">
                                    ESTATÍSTICAS
                                </Tab>
                                <Tab eventKey="dados" title="MEUS DADOS" >
                                    MEUS DADOS
                                    <FormEditarUsuario usuario={perfil} />
                                </Tab>
                            </Tabs>
                        </ContainerDashboard>
                    </>
            }

        </>
    );
}

export default withRouter(Dashboard);