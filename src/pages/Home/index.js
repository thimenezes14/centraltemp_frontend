import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Row, Button, Col } from 'react-bootstrap';
import { CardInfo, AlertMessage, Logotipo, Pagina, Icone } from './style';
import { FaCog, FaHandPointUp } from 'react-icons/fa';

import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            erro: {
                status: null,
                mensagem: null
            },
            chuveiroEstado: null
        }
    }

    async componentDidMount() {
        await this.props.showerStatus()
            .then(res => {
                this.setState({ erro: {status: false, mensagem: ''} });
                this.setState({ chuveiroEstado: res.data.ligado });
                if(this.state.chuveiroEstado) {
                    this.props.history.push('/banho');
                }
            })
            .catch(error => {
                let msg = '';
               
                if (error.response) {
                    msg = `Status HTTP recebido: ${error.response.status}`;
                  } else if (error.request) {
                    msg = `O servidor do chuveiro não respondeu.`;
                    console.log(error.request);
                  } else {
                    msg = `Ocorreu um problema durante a requisição dos dados.`;
                    console.log('Error', error.message);
                  }

                  this.setState({erro: {status: true, mensagem: `Erro ao comunicar-se com o servidor do chuveiro. ${msg}`}});
                
            })
            .finally(() => {
                this.setState({ loading: false });
            })

    }

    render() {
        return (
            <div>
                <Pagina>
                
                    <Logotipo src={Logo} /> 

                    {this.state.erro.status ? (<AlertMessage variant="danger">{this.state.erro.mensagem}</AlertMessage>) : ''}
                 
                    {this.state.loading
                        ? (<AlertMessage variant="primary"><AlertMessage.Heading>Carregando...</AlertMessage.Heading></AlertMessage>) :
                        (
                            <Row>
                                <Col xs={12} md={6}>
                                    <CardInfo>
                                        <Icone><FaHandPointUp size={128} /></Icone>
                                        <CardInfo.Body>
                                            <CardInfo.Title className="text-dark text-center">Modo Manual</CardInfo.Title>
                                            <CardInfo.Text className="text-dark text-center">
                                                Escolha este modo se deseja apenas ligar o chuveiro de forma rápida e fácil, sem se preocupar. Não requer nenhum perfil para funcionar.
                                            </CardInfo.Text>
                                            <Link to="/banho"><Button className="cardBotao" block>SELECIONAR</Button></Link>
                                        </CardInfo.Body>
                                    </CardInfo>
                                </Col>
                                <Col xs={12} md={6}>
                                    <CardInfo>
                                        <Icone><FaCog size={128}/></Icone>
                                        <CardInfo.Body>
                                            <CardInfo.Title className="text-dark text-center">Modo Automático</CardInfo.Title>
                                            <CardInfo.Text className="text-dark text-center">
                                                Escolha este modo se deseja banhos personalizados de acordo com suas preferências. Um perfil será necessário para isso.
                                            </CardInfo.Text>
                                            <Link to="/perfis"><Button className="cardBotao" block>SELECIONAR</Button></Link>
                                        </CardInfo.Body>
                                    </CardInfo>
                                </Col>
                            </Row>)
                    }
                </Pagina>

            </div>
        )
    }
}

export default withRouter(Home);