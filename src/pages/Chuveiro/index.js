import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { CardInfo, AlertMessage } from './style';
import { FaShower, FaArrowLeft } from 'react-icons/fa';
import Banheira from '../../components/lotties/animacaoBanheira';

import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import { Pagina, Logotipo } from './style';

//import ReactTooltip from 'react-tooltip';

class Chuveiro extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      chuveiro: {
        status: null,
        temperatura: null
      },

      erro: false
    }

  }

  async componentDidMount() {

    await this.props.showerStatus()
      .then(estado => {
        this.setState({ erro: false });
        this.setState({ chuveiro: { status: estado.ligado, temperatura: estado.temperatura } });
      });

    if (this.state.chuveiroStatus === null) {
      this.setState({ erro: true });
    } 

    this.setState({ loading: false });


    /* 
        <ReactTooltip />
        <p data-tip="hello world" data-place="bottom">Tooltip</p>
    */

  }

  render() {
    return (
      <div>
        <Pagina>
          
          <Logotipo src={Logo} />
          
          {this.state.loading
            ? (
              <AlertMessage variant="primary">
                Verificando status do chuveiro, aguarde...
              </AlertMessage>
            ) : this.state.erro
              ? (<AlertMessage variant="danger" className="text-center"><AlertMessage.Heading>Erro ao carregar estado do chuveiro</AlertMessage.Heading><Link to="/"><Button variant="danger">Voltar para o Início</Button></Link></AlertMessage>)
              : (<CardInfo>
                <CardInfo.Body>

                  <Banheira />

                  <CardInfo.Title className="text-dark text-center"><FaShower /> Chuveiro {this.state.chuveiro.status ? 'Ligado' : 'Desligado'}</CardInfo.Title>

                  {this.state.chuveiro.status ? (
                    <CardInfo.Text className="text-dark text-center">
                      Temperatura: <strong>{this.state.chuveiro.temperatura} °C</strong>
                    </CardInfo.Text>
                  ) : ''}


                  <CardInfo.Text className="text-dark text-center">
                    Com o chuveiro desligado, clique em "VOLTAR" para ser redirecionado ao início.
                  </CardInfo.Text>
                  <Link to="/"><Button block><FaArrowLeft /> VOLTAR </Button></Link>
                </CardInfo.Body>
              </CardInfo>)}
        </Pagina>
      </div>
    )
  }
}

export default withRouter(Chuveiro);