import React, { useState, useEffect } from 'react';
import {AlertMessage} from '../../assets/global/style';
import shower_api from '../../services/shower_api';
import {FaRegCheckCircle, FaShower, FaThermometerHalf, FaSyncAlt, FaCalculator} from 'react-icons/fa';
import {logout} from '../../services/auth';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

import {CardTemperatura, CardTemperaturaInfo, CardTemperaturaBotao, Painel, ChuveiroStatus} from './style';

import ModalConfirmacaoAcao from '../ModalConfirmacaoAcao';

import getError from '../../helpers/handleErrors';


export default function PainelBanho(props) {
    const [recomendacao, setRecomendacao] = useState({});
    const [temperatura, setTemperatura] = useState(37);
    const [loading, setLoading] = useState({status: true});
    const [error, setError] = useState({status: false});
    const [alertError, setAlertError] = useState(false);
    const [chuveiro, setChuveiro] = useState({});
    const [modalShow, setModalShow] = useState(false);

    const carregarRecomendacoes = async () => {
        //console.clear();
        try {
            setLoading({status: true, message: 'Carregando recomendações...'});
            const recomendacao = (await shower_api.get('/recomendartemperatura')).data;
            setRecomendacao(recomendacao);
            setTemperatura(recomendacao.temperatura_recomendada);
            setError({status: false});
            setAlertError(false);
            
        } catch (err) {
            setError({status: true, message: 'Não foi possível carregar preferências individuais. A recomendação genérica ideal será utilizada. ', descricao: getError(err)});
            setAlertError(true);
            setRecomendacao({temperatura_recomendada: 37, limites: {min: 30, max: 44}})
            setLoading(false);
        }

        try {
            setLoading({status: true, message: 'Obtendo estado do chuveiro...'});
            const chuveiro = (await shower_api.get('/verificarchuveiro')).data;
            setChuveiro(chuveiro);
        } catch (err) {
            setError({status: true, message: 'Não foi possível obter estado do chuveiro. ', descricao: getError(err)});
            setAlertError(true);
            setRecomendacao({temperatura_recomendada: 37, limites: {min: 30, max: 44}})
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        carregarRecomendacoes();
    }, []);

    const registrar = async () => {
        setLoading({status: true, message: 'Registrando banho...'});
        setAlertError(false);
        await shower_api.post('/registrar', {id_perfil: props.perfil.id_perfil, temp_escolhida: temperatura})
            .then(()=> {
                logout();
                setLoading({status: false});
                props.history.push('/banho');
            })
            .catch(err => {
                setError({status: true, message: `Não foi possível completar a operação. `, descricao: getError(err)});
                setLoading({status: false});
                setAlertError(true);
                
                if(err.response) {
                    if(err.response.status === 403) {
                        setChuveiro({ligado: true});
                    }
                }
                
            })
    }


    return (
        <>
        {error.status && 
            <AlertMessage variant="danger" dismissible show={alertError} onClose={() => setAlertError(false)}>
                <AlertMessage.Heading>
                    {error.message}
                </AlertMessage.Heading>
                <div className="text-muted">
                    {error.descricao}
                </div>
            </AlertMessage>
        }
        <Painel>
            <ModalConfirmacaoAcao show={modalShow} onHide={() => setModalShow(false)} temperatura_escolhida={temperatura} sucesso={registrar}/>
            {loading.status && <AlertMessage variant="info">{loading.message}</AlertMessage>}
            {!loading.status && 
            <>
                <CardTemperatura color="#9dc6a7">
                    <h6 className="text-dark">RECOMENDADO:</h6>
                    <CardTemperaturaInfo color="#2b580c">
                        {recomendacao.temperatura_recomendada}
                        <span>°C</span>
                    </CardTemperaturaInfo>
                    <div className="text-dark text-center p-1"><span><FaCalculator /> <strong>{recomendacao.precisao_aproximada}%</strong></span></div>
                    <CardTemperaturaBotao variant="success" disabled={chuveiro.ligado} onClick={() => {setModalShow(true); setTemperatura(recomendacao.temperatura_recomendada)}}><span><FaRegCheckCircle /> ACEITAR</span></CardTemperaturaBotao>
                    <CardTemperaturaBotao variant="info" onClick={carregarRecomendacoes}><span><FaSyncAlt /> ATUALIZAR </span></CardTemperaturaBotao>
                </CardTemperatura>
                <CardTemperatura color="#424874">
                    <h6 className="text-white">PERSONALIZAR:</h6>
                    <CardTemperaturaInfo color="#a6b1e1">
                        {temperatura}
                        <span>°C</span>
                    </CardTemperaturaInfo>
                    <CardTemperaturaBotao variant="success" disabled={chuveiro.ligado} onClick={() => {setModalShow(true); setTemperatura(temperatura)}}><span><FaThermometerHalf /> DEFINIR</span></CardTemperaturaBotao>
                    <RangeSlider
                        min={recomendacao.limites.min}
                        max={recomendacao.limites.max}
                        tooltip="off"
                        value={temperatura}
                        variant="info"
                        size="lg"
                        onChange={e => setTemperatura(Number(e.target.value))}
                        disabled={chuveiro.ligado}
                      />
                </CardTemperatura>

            </>
                
            }
        </Painel>
        <Painel>
            {!loading.status && 
                <>
                    <ChuveiroStatus status={chuveiro.ligado}>
                        <FaShower size={32} />
                    </ChuveiroStatus>
                </>
            }
        </Painel>
    </>
    );
}