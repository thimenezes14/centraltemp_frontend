import React from 'react';
import './home.css';
import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import { FaCog, FaHandPointUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Row, Button, Card, Col, Container } from 'react-bootstrap';


export default function Home() {
    return (
        <div>
            <Container>
                <div className="teste">
                    <img src={Logo} alt="logotipo CentralTemp" />
                </div>
                <Row>
                    <Col xs={12} md={6}>
                        <Card className="cardModo">
                            <FaHandPointUp size={128} className="cardIcone" />
                            <Card.Body>
                                <Card.Title className="cardTitulo">Modo Manual</Card.Title>
                                <Card.Text className="cardTexto">
                                    Escolha este modo se deseja apenas ligar o chuveiro de forma rápida e fácil, sem se preocupar. Não requer nenhum perfil para funcionar.
                        </Card.Text>
                                <Link to="/"><Button className="cardBotao" block>SELECIONAR</Button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6}>
                        <Card className="cardModo">
                            <FaCog size={128} className="cardIcone" />
                            <Card.Body>
                                <Card.Title className="cardTitulo">Modo Automático</Card.Title>
                                <Card.Text className="cardTexto">
                                    Escolha este modo se deseja banhos personalizados de acordo com suas preferências. Um perfil será necessário para isso.
                                </Card.Text>
                                <Link to="/perfis"><Button className="cardBotao" block>SELECIONAR</Button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}