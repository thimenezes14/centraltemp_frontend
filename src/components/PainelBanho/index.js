import React, { useState, useEffect } from 'react';
import {AlertMessage} from '../../assets/global/style';
import shower_api from '../../services/shower_api';
import {FaRegCheckCircle, FaShower, FaThermometerHalf, FaSyncAlt} from 'react-icons/fa';


import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

import {CardTemperatura, CardTemperaturaInfo, CardTemperaturaBotao, Painel, ChuveiroStatus} from './style';

import ModalConfirmacaoAcao from '../ModalConfirmacaoAcao';


export default function PainelBanho() {
    const [recomendacao, setRecomendacao] = useState({});
    const [temperatura, setTemperatura] = useState(37);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({status: false});
    const [alertError, setAlertError] = useState(false);
    const [chuveiroLigado, setChuveiroLigado] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    const carregarRecomendacoes = async () => {
        try {
            setLoading(true);
            const recomendacao = (await shower_api.get('/recomendartemperatura')).data;
            setRecomendacao(recomendacao);
            setTemperatura(recomendacao.temperatura_recomendada);
            setError({status: false});
            setAlertError(false);
        } catch (err) {
            setError({status: true, message: 'Não foi possível carregar preferências individuais. A recomendação genérica ideal será utilizada. '});
            setAlertError(true);
            setRecomendacao({temperatura_recomendada: 37, limites: {min: 30, max: 44}})
            console.log(err);
        } finally {
            setLoading(false);
        }

        try {
            setLoading(true);
            const chuveiroLigado = (await shower_api.get('/verificarchuveiro')).data;
            setChuveiroLigado(chuveiroLigado);
        } catch (err) {
            setError({status: true, message: 'Não foi possível obter estado do chuveiro. '});
            setAlertError(true);
            setRecomendacao({temperatura_recomendada: 37, limites: {min: 30, max: 44}})
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        carregarRecomendacoes();
    }, []);


    return (
        <>
        <Painel>
            <ModalConfirmacaoAcao show={modalShow} onHide={() => setModalShow(false)} temperatura_escolhida={temperatura} />
            {loading && <AlertMessage variant="info">Obtendo preferências de usuário. Aguarde...</AlertMessage>}
            {error.status && <AlertMessage variant="danger" dismissible show={alertError} onClose={() => setAlertError(false)}>{error.message}</AlertMessage>}
            {!loading && 
            <>
                <CardTemperatura color="#9dc6a7">
                    <h6 className="text-dark">RECOMENDADO:</h6>
                    <CardTemperaturaInfo color="#2b580c">
                        {recomendacao.temperatura_recomendada}
                        <span>°C</span>
                    </CardTemperaturaInfo>
                    <CardTemperaturaBotao variant="success" disabled={chuveiroLigado} onClick={() => {setModalShow(true); setTemperatura(recomendacao.temperatura_recomendada)}}><span><FaRegCheckCircle /> ACEITAR</span></CardTemperaturaBotao>
                    <CardTemperaturaBotao variant="info" disabled={chuveiroLigado} onClick={carregarRecomendacoes}><span><FaSyncAlt /> ATUALIZAR </span></CardTemperaturaBotao>
                </CardTemperatura>
                <CardTemperatura color="#424874">
                    <h6 className="text-white">PERSONALIZAR:</h6>
                    <CardTemperaturaInfo color="#a6b1e1">
                        {temperatura}
                        <span>°C</span>
                    </CardTemperaturaInfo>
                    <CardTemperaturaBotao variant="success" disabled={chuveiroLigado} onClick={() => {setModalShow(true); setTemperatura(temperatura)}}><span><FaThermometerHalf /> DEFINIR</span></CardTemperaturaBotao>
                    <RangeSlider
                        min={recomendacao.limites.min}
                        max={recomendacao.limites.max}
                        tooltip="off"
                        value={temperatura}
                        variant="info"
                        size="lg"
                        onChange={e => setTemperatura(Number(e.target.value))}
                      />
                </CardTemperatura>

            </>
                
            }
        </Painel>
        <Painel>
            {!loading && 
                <>
                    <ChuveiroStatus status={chuveiroLigado}>
                        <FaShower size={32} />
                    </ChuveiroStatus>
                </>
            }
        </Painel>
    </>
    );
}