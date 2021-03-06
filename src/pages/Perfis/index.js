import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { AlertMessage, AlertMessageButton, AlertMessageButtonGroup } from '../../assets/global/style';

import { FaArrowLeft, FaEdit, FaSyncAlt } from 'react-icons/fa';

import { GrupoBotoes, BotaoPainel } from './style';
import profile_api from '../../services/profile_api';
import shower_api from '../../services/shower_api';
import SeletorPerfis from '../../components/SeletorPerfis';

import getError from '../../helpers/handleErrors';

function Perfis(props) {

    const [alertShow, setAlertShow] = useState(true);
    const [loading, setLoading] = useState({ status: true, mensagem: 'Carregando perfis. Aguarde...' });
    const [erro, setErro] = useState({ status: null, mensagem: null, descricao: null });
    const [perfis, setPerfis] = useState([]);


    async function carregarPerfis() {
        const perfis = (await profile_api.get('listar')).data;
        return perfis;
    }

    function finalizarBanho() {
        shower_api.post('finalizar')
            .then(()=> console.info("Histórico atualizado. "))
            .catch(err => {
                console.log(getError(err));
            })
    }

    useEffect(() => {

        finalizarBanho();

        carregarPerfis()
            .then(perfis => {
                setPerfis(perfis);
            })
            .catch(err => setErro({ status: true, mensagem: `Erro ao comunicar-se com o servidor de perfis.`, descricao: getError(err) }))
            .finally(() => setLoading({ status: false, mensagem: '', descricao: '' }))

    }, []);

    return (
        <div>
            <GrupoBotoes>
                <BotaoPainel variant="primary" onClick={() => props.history.push('/')}><FaArrowLeft /> VOLTAR</BotaoPainel>
                <BotaoPainel variant="info" onClick={() => props.history.push('/perfis/novo')}><FaEdit /> NOVO</BotaoPainel>
            </GrupoBotoes>

            {props.location.mensagem && <AlertMessage variant="info" dismissible show={alertShow} onClose={() => setAlertShow(false)}>{props.location.mensagem}</AlertMessage>}

            {loading.status && <AlertMessage variant="primary"><AlertMessage.Heading>{loading.mensagem}</AlertMessage.Heading></AlertMessage>}
            
            {
                !loading.status && erro.status && 
                    <AlertMessage variant="danger">
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
                    </AlertMessage>
            }

            {!loading.status && !erro.status && perfis.length > 0 &&
                <SeletorPerfis perfis={perfis} history={props.history} />
            }
                    
        </div>

    )
}

export default withRouter(Perfis);