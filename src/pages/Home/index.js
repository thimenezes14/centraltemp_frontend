import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { CardInfo } from '../../assets/global/style';
import { Icone, CardBotao } from './style';

import { FaCog, FaHandPointUp } from 'react-icons/fa';

function Home() {
    return (
        <div>
            <Row>
                <Col xs={12} md={6}>
                    <CardInfo>
                        <Icone><FaHandPointUp size={128} /></Icone>
                        <CardInfo.Body>
                            <CardInfo.Title className="text-dark text-center">Modo Manual</CardInfo.Title>
                            <CardInfo.Text className="text-dark text-center">
                                Escolha este modo se deseja apenas ligar o chuveiro de forma rápida e fácil, sem se preocupar. Não requer nenhum perfil para funcionar.
                                            </CardInfo.Text>
                            <Link to="/banho"><CardBotao>SELECIONAR</CardBotao></Link>
                        </CardInfo.Body>
                    </CardInfo>
                </Col>
                <Col xs={12} md={6}>
                    <CardInfo>
                        <Icone><FaCog size={128} /></Icone>
                        <CardInfo.Body>
                            <CardInfo.Title className="text-dark text-center">Modo Automático</CardInfo.Title>
                            <CardInfo.Text className="text-dark text-center">
                                Escolha este modo se deseja banhos personalizados de acordo com suas preferências. Um perfil será necessário para isso.
                                            </CardInfo.Text>
                            <Link to="/perfis"><CardBotao>SELECIONAR</CardBotao></Link>
                        </CardInfo.Body>
                    </CardInfo>
                </Col>
            </Row>
        </div>
    );
}


export default withRouter(Home);