import React, { useState, useEffect } from 'react';
import moment from 'moment';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ModalConfirmacaoAcao from '../../components/ModalConfirmacaoAcao';

import {FaStepBackward, FaBackward, FaStepForward, FaForward, FaClock, FaHome, FaShower, FaCalendarDay, FaSearch, FaEraser, FaRedo} from 'react-icons/fa';
import {MdTimer} from 'react-icons/md';

import {AlertMessage} from '../../assets/global/style';
import {Classificador, TabelaRegistros, PaginaFiltro, FormFiltro, CampoPagina} from './style';

import shower_api from '../../services/shower_api';
import profile_api from '../../services/profile_api';
import getError from '../../helpers/handleErrors';
import Filtro from '../../helpers/Filtro';
import converteParaHoraMinutoSegundo from '../../helpers/converterSegundos';

export default function HistBanho(props) {
    const DEFAULT_PER_PAGE = 5;
    const DEFAULT_CLASSIFICATION = 0;
    const perfil = props.perfil;
    
    const [isLoading, setIsLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [error, setError] = useState({status: false});
    
    const [totalPorPagina, setTotalPorPagina] = useState(DEFAULT_PER_PAGE);
    const [data_inicio, setData_inicio] = useState('');
    const [data_fim, setData_fim] = useState('');
    const [classificacao, setClassificacao] = useState(DEFAULT_CLASSIFICATION);
    const [classificacao_duracao, setClassificacao_duracao] = useState(DEFAULT_CLASSIFICATION);

    const [registros, setRegistros] = useState([]);
    const [registrosFiltrados, setRegistrosFiltrados] = useState(registros.slice(0, totalPorPagina));
    const [registrosBusca, setRegistrosBusca] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [paginaFiltro, setPaginaFiltro] = useState(pagina);
    const [totaldePaginas, setTotaldePaginas] = useState(1);

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
                setRegistrosFiltrados(historico.slice(0, totalPorPagina));
                setIsLoading(false);
                setError({status: false});
            })
            .catch(err => {
                console.error(err);
                setError({status: true, message: `Erro ao buscar histórico.`, descricao: getError(err)})
            })
    }, [totalPorPagina, perfil]);

    useEffect(()=> {
        const totalPaginas = Math.ceil(registrosBusca.length / totalPorPagina);
        setTotaldePaginas(totalPaginas);
    }, [totalPorPagina, registrosBusca]);

    const resetPaginaFiltro = () => {
        setPagina(1);
        setPaginaFiltro(1);
    }

    const filtrar = () => {
        checkDate();
        let filtro = new Filtro(registros);
        setRegistrosFiltrados(filtro.aplicarFiltros([data_inicio, data_fim], classificacao, classificacao_duracao).slice(0, totalPorPagina));
        setRegistrosBusca(filtro.aplicarFiltros([data_inicio, data_fim], classificacao, classificacao_duracao));
        resetPaginaFiltro();
    }

    const filtrarPorPagina = limite => {
        setTotalPorPagina(limite);
        setRegistrosFiltrados(registrosBusca.slice(0, limite));
        resetPaginaFiltro();
    }

    const limparFiltros = () => {
        setClassificacao_duracao(DEFAULT_CLASSIFICATION);
        setClassificacao(DEFAULT_CLASSIFICATION);
        setData_inicio('');
        setData_fim('');
        filtrar();
    }

    const mudarDePagina = paginaMudar => {
        if(paginaMudar > totaldePaginas) {
            paginaMudar = totaldePaginas;
        }
        if(paginaMudar < 1) {
            paginaMudar = 1;
        }
        setPagina(paginaMudar);
        setPaginaFiltro(paginaMudar);
        setRegistrosFiltrados(registrosBusca.slice(totalPorPagina * (paginaMudar - 1), totalPorPagina * paginaMudar));
    }

    const handleMudarPagina = e => {
        e.preventDefault();
        const pg = typeof e.target.value === 'number' ? e.target.value : pagina;
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

    const checkDate = () => {

        if(!Date.parse(data_inicio) && !Date.parse(data_fim)) {
            return;
        }

        if(!Date.parse(data_inicio)) {
            setData_inicio(moment(data_fim, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD'));
        }

        if(!Date.parse(data_fim)) {
            setData_fim(moment(data_inicio, 'YYYY-MM-DD').endOf('month').format('YYYY-MM-DD'));
        }
        
        let dt_ini = moment(data_inicio, 'YYYY-MM-DD');
        let dt_fim = moment(data_fim, 'YYYY-MM-DD');

        if(dt_fim.isBefore(dt_ini)) {
            setData_inicio(dt_fim.format('YYYY-MM-DD'));
            setData_fim(dt_ini.format('YYYY-MM-DD'));

            if(dt_ini.diff(dt_fim, 'years', true) > 1) {
                setData_fim(moment(data_fim).add(1, 'years').format('YYYY-MM-DD'));
            }
        } else {
            if(dt_fim.diff(dt_ini, 'years', true) > 1) {
                setData_fim(moment(dt_ini).add(1, 'years').format('YYYY-MM-DD'));
            }
        }
    }

    const excluirHistorico = async () => {
        await profile_api.delete(`/excluirhistorico/${perfil.id_perfil}`)
            .then(()=> {
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
                setError({status: true, message: `Erro ao excluir histórico.`, descricao: getError(err)});
            })
    }

    return (
        <PaginaFiltro>
            <hr />
            <FormFiltro onSubmit={handleFiltragem}>
                <FormGroup>
                    <Form.Label>Mostrar por Página</Form.Label>
                    <Form.Control as="select" value={totalPorPagina} onChange={e => filtrarPorPagina(e.target.value)}>
                        <option value={DEFAULT_PER_PAGE}>{DEFAULT_PER_PAGE} registros</option>
                        <option value={10}>10 registros</option>
                        <option value={15}>15 registros</option>
                        <option value={20}>20 registros</option>
                    </Form.Control>
                </FormGroup>
                <Form.Label>Filtrar por Data</Form.Label>
                <FormGroup>
                    <Row>
                        <Col md={6}>
                            <Form.Label>Início</Form.Label>
                            <Form.Control type="date" value={data_inicio} onChange={e => {setData_inicio(e.target.value)}} onBlur={checkDate}/>
                        </Col>
                        <Col md={6}>
                            <Form.Label>Fim (máx. 1 ano)</Form.Label>
                            <Form.Control type="date" value={data_fim} onChange={e => {setData_fim(e.target.value)}} onBlur={checkDate} />
                        </Col>
                    </Row>
                </FormGroup>
                <Form.Label>Filtrar por Classificação</Form.Label>
                <FormGroup>
                    <Row>
                        <Col md={6}>
                            <Form.Label>Temperatura</Form.Label>
                            <Form.Control as="select" value={classificacao} onChange={e => setClassificacao(Number(e.target.value))}>
                                <option value={0}>Todos</option>
                                <option value={5}>Adequados (ideal + bom)</option>
                                <option value={6}>Não adequados (ruim + crítico)</option>
                                <option value={1}>Ideal</option>
                                <option value={2}>Bom</option>
                                <option value={3}>Ruim</option>
                                <option value={4}>Crítico</option>
                            </Form.Control>
                        </Col>
                        <Col md={6}>
                            <Form.Label>Duração</Form.Label>
                            <Form.Control as="select" value={classificacao_duracao} onChange={e => setClassificacao_duracao(Number(e.target.value))}>
                                <option value={0}>Todos</option>
                                <option value={4}>Adequados (ideal + bom)</option>
                                <option value={1}>Ideal</option>
                                <option value={2}>Bom</option>
                                <option value={3}>Ruim</option>
                            </Form.Control>
                        </Col>
                    </Row>
                </FormGroup>
                <Button className="p-2 m-2" variant="success" onClick={() => filtrar()}><span><FaSearch/> Aplicar Filtros</span></Button>
                <Button className="p-2 m-2" variant="info" onClick={() => limparFiltros()}><span><FaRedo/> Limpar Filtros</span></Button>
            </FormFiltro>
            
            <hr />
            <ButtonGroup>
                {
                    <>
                    <Button variant="info" onClick={()=> mudarDePagina(1)}><FaBackward /></Button>
                    <Button onClick={()=> handlePrevNext('prev')}><FaStepBackward /></Button>
                    
                    <Form onSubmit={handleMudarPagina}>
                        
                        <CampoPagina className="text-center" type="number" step="1" value={paginaFiltro} onBlur={handleMudarPagina} onChange={e => mudarDePagina(e.target.value)} />
                        <Button variant="dark" type="submit" block><FaSearch /></Button>
                        
                    </Form>

                    <Button onClick={()=> handlePrevNext('next')}><FaStepForward /></Button>
                    <Button variant="info" onClick={()=> mudarDePagina(totaldePaginas)}><FaForward /></Button>
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
                    {registrosBusca.length > 0 && <div className="container bg-primary"> Pág. {pagina}-{totaldePaginas} | {(totalPorPagina * (pagina - 1)) + 1}-{(totalPorPagina * pagina) > registrosBusca.length ? registrosBusca.length : (totalPorPagina * pagina)} de {registrosBusca.length} </div>}
                    
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
                                        <td><Classificador classificacao={registro.classificacao_temperatura}>{registro.temp_utilizada}</Classificador></td>
                                        <td><Classificador classificacao={registro.classificacao_duracao}>{converteParaHoraMinutoSegundo(registro.duracao_seg)}</Classificador></td>
                                        <td>{registro.dia}</td>
                                        <td>{registro.hora}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </TabelaRegistros>
                    {registros.length > 0 && <Button variant="danger" className="m-2" onClick={()=> setModalShow(true)}><span><FaEraser /> Excluir Histórico</span></Button> }
                    <ModalConfirmacaoAcao 
                        show={modalShow} 
                        onHide={() => setModalShow(false)} 
                        sucesso={excluirHistorico}
                        message={
                                    <>
                                        <p>Você tem certeza que pretende excluir o seu histórico? Essa ação <strong>não poderá ser desfeita!</strong></p>
                                        <h5>Excluir seu histórico poderá redefinir suas preferências!</h5>
                                    </>
                                }
                    />
                    {error.status && 
                        <AlertMessage variant="danger">
                            <AlertMessage.Heading>
                                {error.message}
                            </AlertMessage.Heading>
                            <div className="text-muted">
                                {error.descricao}
                            </div>
                        </AlertMessage>
                    }
                </>
            }

        </PaginaFiltro>
    );
}