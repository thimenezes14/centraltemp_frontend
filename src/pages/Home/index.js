import React, { Component } from 'react';
import './home.css';
import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import { FaCog, FaHandPointUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Row, Button, Card, Col, Container, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { withRouter } from 'react-router-dom';


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        try {
            const response = await api.get('chuveiro');
            if (response.data.ligado) {
                this.props.history.push('/banho');
            } else {
                this.setState({loading: false});
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <div className="teste">
                        <img src={Logo} alt="logotipo CentralTemp" />
                    </div>
                    {this.state.loading
                        ? (<Alert variant="primary">Carregando...</Alert>) :
                        (
                            <Row>
                                <Col xs={12} md={6}>
                                    <Card className="cardModo">
                                        <FaHandPointUp size={128} className="cardIcone" />
                                        <Card.Body>
                                            <Card.Title className="cardTitulo">Modo Manual</Card.Title>
                                            <Card.Text className="cardTexto">
                                                Escolha este modo se deseja apenas ligar o chuveiro de forma rápida e fácil, sem se preocupar. Não requer nenhum perfil para funcionar.
                                            </Card.Text>
                                            <Link to="/banho"><Button className="cardBotao" block>SELECIONAR</Button></Link>
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
                            </Row>)}
                </Container>

            </div>
        )
    }
}

export default withRouter(Home);