import React, { useState, useEffect } from 'react';
import moment from 'moment';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Spinner from 'react-bootstrap/Spinner';

import {FaStepBackward, FaBackward, FaStepForward, FaForward, FaClock, FaHome, FaShower, FaCalendarDay, FaSearch} from 'react-icons/fa';
import {MdTimer} from 'react-icons/md';

import {Classificador, TabelaRegistros, PaginaFiltro, FormFiltro, CampoPagina} from './style';

import shower_api from '../../services/shower_api';


export default function HistBanho(props) {
    const DEFAULT_PER_PAGE = 5;
    const DEFAULT_CLASSIFICATION = 0;
    const perfil = props.perfil;
    
    const [isLoading, setIsLoading] = useState(true);
    
    const [totalPorPagina, setTotalPorPagina] = useState(DEFAULT_PER_PAGE);
    const [data_inicio, setData_inicio] = useState(moment().startOf('month').format('YYYY-MM-DD'));
    const [data_fim, setData_fim] = useState(moment().endOf('month').format('YYYY-MM-DD'));
    const [classificacao, setClassificacao] = useState(DEFAULT_CLASSIFICATION);

    const [registros, setRegistros] = useState([]);
    const [registrosFiltrados, setRegistrosFiltrados] = useState(registros.slice(0, totalPorPagina));
    const [registrosBusca, setRegistrosBusca] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [paginaFiltro, setPaginaFiltro] = useState(pagina);
    const [botoes, setBotoes] = useState([]);

    function pad(num) {
        return ("0" + num).slice(-2);
    }
    
    function converteParaHoraMinutoSegundo(segundos) {
        let minutos = Math.floor(segundos / 60);
        segundos = segundos % 60;
        let horas = Math.floor(minutos / 60);
        minutos = minutos % 60;

        if(horas === 0) {
            horas = ''
        } else {
            horas += 'h'
        }

        return `${horas}${pad(minutos)}m${pad(segundos)}s`;
    }

    useEffect(()=> {
        const carregarHistorico = async () => {
            try {
                const historico = await shower_api.get('/historico/perfil', {params: {id_perfil: perfil.id_perfil}});
                return historico.data;
            } catch (err) {
                throw err;
            }
        }

        carregarHistorico()
            .then(historico => {
                setRegistros(historico);
                setRegistrosBusca(historico);
                setRegistrosFiltrados(historico.slice(0, DEFAULT_PER_PAGE));
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
            })
    }, [perfil]);

    useEffect(()=> {
        const botoes = [];
        const totalPaginas = Math.ceil(registrosBusca.length / totalPorPagina);
        for(let i = 0; i < totalPaginas; i++) {
            botoes.push(i + 1);
        }
        setBotoes(botoes);
    }, [totalPorPagina, registrosBusca]);

    const limparFiltros = () => {
        setRegistrosBusca(registros);
        setRegistrosFiltrados(registros.slice(0, totalPorPagina));
    }

    const filtrar = criterio => {
        limparFiltros();
        
        let filtrados = [];

        function filtrarPorData() {
            if(!Date.parse(data_inicio)) {
                setData_inicio(moment().startOf('month').format('YYYY-MM-DD'));
                return;
            }
    
            if(!Date.parse(data_fim)) {
                setData_fim(moment().endOf('month').format('YYYY-MM-DD'));
                return;
            }
    
            let dt_ini = moment(data_inicio, 'YYYY-MM-DD');
            let dt_fim = moment(data_fim, 'YYYY-MM-DD');
    
            if(dt_ini.isAfter(dt_fim)) {
                dt_ini = moment().startOf('month').format('YYYY-MM-DD');
                setData_inicio(dt_ini);
            }
    
            if(dt_fim.isBefore(dt_ini)) {
                dt_fim = moment().endOf('month').format('YYYY-MM-DD');
                setData_fim(dt_fim);
            }
            
            filtrados = registros.filter(f => {
                const data_comparacao = moment(f.dia, 'DD/MM/YYYY');
                return data_comparacao.isBetween(dt_ini, dt_fim, null, '[]');
            })
    
        }

        function filtrarPorClassificacao() {
            
            const cl = Number(criterio);
            setClassificacao(cl);

            switch (cl) {
                case 0:
                    break;
                case 1:                    
                case 2:
                case 3:
                case 4:
                    filtrados = filtrados.filter(f => f.classificacao === cl);
                    break;
                case 5:
                    filtrados = filtrados.filter(f => f.classificacao === 1 || f.classificacao === 2);
                    break;
                case 6:
                    filtrados = filtrados.filter(f => f.classificacao === 3 || f.classificacao === 4);
                    break;
                default: return;
            }

            setRegistrosBusca(filtrados);
            setRegistrosFiltrados(filtrados.slice(0, totalPorPagina));
        }

        filtrarPorData();
        filtrarPorClassificacao();
        
        setPagina(1);
        setPaginaFiltro(1);
    }

    const filtrarPorPagina = limite => {
        setTotalPorPagina(limite);
        setRegistrosFiltrados(registrosBusca.slice(0, limite));
        setPagina(1);
        setPaginaFiltro(1);
    }

    const mudarDePagina = paginaMudar => {
        if(paginaMudar > botoes.length) {
            paginaMudar = botoes.length;
        }
        if(paginaMudar < 1) {
            paginaMudar = 1;
        }
        setPagina(paginaMudar);
        setPaginaFiltro(paginaMudar);
        setRegistrosFiltrados(registrosBusca.slice(totalPorPagina * (paginaMudar - 1), totalPorPagina * paginaMudar));
    }

    const handlePagina = e => {
        if(e.target.value.length !== 0) {
            if(e.target.value > botoes.length || e.target.value < 1) {
                return false;
            }
            setPagina(e.target.value);
        }

        setPaginaFiltro(e.target.value);
        
    }

    const handleMudarPagina = e => {
        e.preventDefault();
        const pg = typeof e.target.value === 'number' ? e.target.value : pagina;
        setPagina(e.target.value);
        mudarDePagina(pg);
    }

    const handlePrevNext = action => {
        switch (action) {
            case 'prev':
                mudarDePagina(paginaFiltro - 1);
            break;
            case 'next':
                mudarDePagina(paginaFiltro + 1);
            break;
            default:
                console.error("Ação não informada. ");
            break;
        }
    }
    
    const handleFiltragem = e => {
        e.preventDefault();
    }

    return (
        <PaginaFiltro>
            <hr />
            <FormFiltro onSubmit={handleFiltragem}>
                <FormGroup>
                    <Form.Label>Mostrar por Página</Form.Label>
                    <Form.Control as="select" value={totalPorPagina} onChange={e => filtrarPorPagina(e.target.value)}>
                        <option value={5}>5 registros</option>
                        <option value={10}>10 registros</option>
                        <option value={15}>15 registros</option>
                        <option value={20}>20 registros</option>
                    </Form.Control>
                </FormGroup>
                <Form.Label>Filtrar por Data</Form.Label>
                <FormGroup>
                    
                    <Form.Label>
                        Início
                        <Form.Control type="date" value={data_inicio} onChange={e => {setData_inicio(e.target.value); filtrar(classificacao);}} onBlur={()=> filtrar(classificacao)} />
                        Fim
                        <Form.Control type="date" value={data_fim} onChange={e => {setData_fim(e.target.value); filtrar(classificacao);}} onBlur={()=> filtrar(classificacao)} />
                    </Form.Label>
                    
                </FormGroup>
                <FormGroup>
                    <Form.Label>Filtrar por Classificação</Form.Label>
                    <Form.Control as="select" value={classificacao} onChange={e => filtrar(Number(e.target.value))}>
                        <option value={0}>Todos</option>
                        <option value={5}>Adequados (ideal + bom)</option>
                        <option value={6}>Não adequados (ruim + crítico)</option>
                        <option value={1}>Ideal</option>
                        <option value={2}>Bom</option>
                        <option value={3}>Ruim</option>
                        <option value={4}>Crítico</option>
                    </Form.Control>
                </FormGroup>
            </FormFiltro>
            
            <hr />
            <ButtonGroup>
                {
                    <>
                    <Button variant="info" onClick={()=> mudarDePagina(1)}><FaBackward /></Button>
                    <Button onClick={()=> handlePrevNext('prev')}><FaStepBackward /></Button>
                    
                    <Form onSubmit={handleMudarPagina}>
                        
                        <CampoPagina className="text-center" type="number" step="1" value={paginaFiltro} onBlur={handleMudarPagina} onChange={handlePagina} />
                        <Button variant="dark" type="submit" block><FaSearch /></Button>
                        
                    </Form>

                    <Button onClick={()=> handlePrevNext('next')}><FaStepForward /></Button>
                    <Button variant="info" onClick={()=> mudarDePagina(botoes.length)}><FaForward /></Button>
                    </>
                }
            </ButtonGroup>
            {
                isLoading &&
                <Spinner animation="border" role="status">
                    <span className="sr-only">Carregando...</span>
                </Spinner> 
            
            }
            {
                !isLoading &&
                <>
                    <hr />
                    <div className="container bg-info">Total: {registros.length} - Filtrados: {registrosBusca.length}</div>
                    {registrosBusca.length > 0 && <div className="container bg-primary"> Pág. {pagina}-{botoes.length} | {(totalPorPagina * (pagina - 1)) + 1}-{(totalPorPagina * pagina) > registrosBusca.length ? registrosBusca.length : (totalPorPagina * pagina)} de {registrosBusca.length} </div>}
                    
                    <TabelaRegistros variant="light" responsive="lg" bordered>
                        <thead>
                            <tr>
                                <th><FaHome /></th>
                                <th><FaShower /></th>
                                <th><MdTimer /></th>
                                <th><FaCalendarDay /></th>
                                <th><FaClock /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                registrosFiltrados.map((registro, index) => (
                                    <tr key={index}>
                                        <td>{registro.temp_ambiente}</td>
                                        <td><Classificador classificacao={registro.classificacao}>{registro.temp_utilizada}</Classificador></td>
                                        <td>{converteParaHoraMinutoSegundo(registro.duracao_seg)}</td>
                                        <td>{registro.dia}</td>
                                        <td>{registro.hora}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </TabelaRegistros>
                </>
            }

        </PaginaFiltro>
    );
}