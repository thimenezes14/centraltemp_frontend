import React, { useState, useEffect } from 'react';
import { AlertMessage, AlertMessageButtonGroup, AlertMessageButton } from '../../assets/global/style';
import profile_api from '../../services/profile_api';
import { withRouter } from 'react-router-dom';
import { FaShower, FaChartBar, FaEdit, FaArrowLeft, FaSyncAlt } from 'react-icons/fa';
import { Abas } from './style';
import FormDados from '../../components/FormDados';
import Tab from 'react-bootstrap/Tab';
import NavbarDashboard from '../../components/NavbarDashboard';

function Dashboard(props) {

    const [key, setKey] = useState('banho');

    const [perfil, setPerfil] = useState({});
    const [loading, setLoading] = useState({ status: true, mensagem: 'Carregando sessão. Aguarde...' });
    const [erro, setErro] = useState({ status: null, mensagem: null });

    useEffect(() => {
        const carregarPerfil = async () => {
            const perfil = await profile_api.get(`${props.location.state}`);
            return perfil.data;
        }

        carregarPerfil()
            .then(perfil => {
                setPerfil(perfil);
                setLoading({ status: false, mensagem: '' });
            })
            .catch(err => {
                setErro({ status: true, mensagem: `Erro ao comunicar-se com o servidor de perfis.`, descricao: err.toString() });
                setLoading({ status: false, mensagem: '' });
                if (err.response.status === 403) {
                    props.history.push({ pathname: '/perfis', mensagem: err.response.data });
                }
            })

    }, [props]);

    return (
        <>

            {loading.status ?
                (<AlertMessage variant="primary"><AlertMessage.Heading>{loading.mensagem}</AlertMessage.Heading></AlertMessage>) :
                erro.status ?
                    (<AlertMessage variant="danger">
                        <AlertMessage.Heading>
                            {erro.mensagem}
                        </AlertMessage.Heading>
                        <div className="text-muted">
                            {erro.descricao}
                        </div>
                        <AlertMessageButtonGroup>
                            <AlertMessageButton variant="danger" onClick={() => props.history.push('/')}>
                                <span><FaArrowLeft /> VOLTAR</span>
                            </AlertMessageButton>
                            <AlertMessageButton variant="dark" onClick={() => window.location.reload()}>
                                <span><FaSyncAlt /> REPETIR</span>
                            </AlertMessageButton>
                        </AlertMessageButtonGroup>
                    </AlertMessage>) :
                    <>
                        <NavbarDashboard perfil={perfil} history={props.history} />


                        <div className="container container-fluid text-center">

                            <Abas className="bg-secondary nav nav-tabs nav-justified" activeKey={key} onSelect={k => setKey(k)}>
                                <Tab eventKey="banho" title={<FaShower size={30} />}>
                                    BANHO
                                </Tab>
                                <Tab eventKey="estatisticas" title={<FaChartBar size={30} />}>
                                    ESTATÍSTICAS
                                </Tab>
                                <Tab eventKey="dados" title={<FaEdit size={30} />} >
                                    MEUS DADOS
                                    <FormDados action="update" perfil={perfil} />
                                </Tab>
                            </Abas>
                        </div>
                    </>
            }

        </>
    );
}

export default withRouter(Dashboard);