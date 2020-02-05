import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Card, Alert } from 'react-bootstrap';
import { FaShower, FaArrowLeft } from 'react-icons/fa';
import Banheira from '../../components/lotties/animacaoBanheira';
import api from '../../services/api';

import './chuveiro.css';

class Chuveiro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      chuveiroStatus: null,
      erro: false
    }
  }

  async componentDidMount() {

    try {
      const response = await api.get('chuveiro');
      this.setState({ chuveiroStatus: response.data.ligado });
    } catch (err) {
      console.log(err);
      this.setState({erro: true})
    } finally {
      this.setState({loading: false});
    }

  }

  render() {
    return (
      <div>
        <Container className="paginaAlerta">
          {this.state.loading
            ? (
              <Alert variant="primary">
                Verificando status do chuveiro, aguarde...
              </Alert>
            ) : this.state.erro 
            ? (<Alert variant="danger" className="text-center"><Alert.Heading>Erro ao carregar estado do chuveiro</Alert.Heading><Link to="/"><Button variant="danger">Voltar para o Início</Button></Link></Alert>) 
            : (<Card>
              <Card.Body>

                <Banheira />

                <Card.Title className="cardTitulo"><FaShower /> Chuveiro {this.state.chuveiroStatus ? 'Ligado' : 'Desligado'}</Card.Title>

                <Card.Text className="text-dark text-center">
                  Ao desligar o chuveiro, clique em "VOLTAR" para ser redirecionado ao início.
            </Card.Text>
                <Link to={this.state.chuveiroStatus ? '/banho' : '/'}><Button className="cardBotao" block><FaArrowLeft /> VOLTAR </Button></Link>
              </Card.Body>
            </Card>)}


          
        </Container>
      </div>
    )
  }
}

export default withRouter(Chuveiro);