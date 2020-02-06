import React, { useEffect, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Button, Collapse } from 'react-bootstrap';
import { CardInfo, AlertMessage } from './style';
import { FaShower, FaArrowLeft, FaSlidersH } from 'react-icons/fa';
import Banheira from '../../components/lotties/animacaoBanheira';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import { Pagina, Logotipo } from './style';

import shower_api from '../../services/shower_api';



function Chuveiro(props) {

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState({ status: null, mensagem: null });
  const [chuveiroEstado, setChuveiroEstado] = useState({ status: null, temperatura: null });

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [tempRange, setTempRange] = useState(35);

  useEffect(() => {
    async function carregarDadosDoChuveiro() {

      await shower_api.get('chuveiro')
        .then(res => {
          setErro({ status: false, mensagem: '' });
          setChuveiroEstado({ status: res.data.ligado, temperatura: res.data.temperatura });
          setTempRange(res.data.temperatura);
        })
        .catch(error => {
          console.log(error.response);
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

          setErro({ status: true, mensagem: `Erro ao comunicar-se com o servidor do chuveiro. ${msg}` });
        })
        .finally(() => {
          setLoading(false);
        })

    }

    carregarDadosDoChuveiro();

  }, []);

  const ligarChuveiro = useCallback(async temperatura => {
    await shower_api.post('chuveiro', {
      ligado: true,
      temperatura
    })
      .then(res => {
        setChuveiroEstado({ status: res.data.ligado, temperatura: res.data.temperatura });
      })
      .catch(err => {
        setErro({ status: true, mensagem: `Erro ao ligar chuveiro. ${err.response.data}` });
      })
  }, []);

  return (
    <div>
      <Pagina>

        <Logotipo src={Logo} />

        {loading
          ? (
            <AlertMessage variant="primary">
              Verificando status do chuveiro, aguarde...
            </AlertMessage>
          ) : erro.status
            ? (<AlertMessage variant="danger" className="text-center"><AlertMessage.Heading>{erro.mensagem}</AlertMessage.Heading><Link to="/"><Button variant="danger">Voltar para o Início</Button></Link></AlertMessage>)
            : (<CardInfo>
              <CardInfo.Body>

                <Banheira />

                <CardInfo.Title className="text-dark text-center"><FaShower /> Chuveiro {chuveiroEstado.status ? 'Ligado' : 'Desligado'}</CardInfo.Title>

                {chuveiroEstado.status ? (
                  <CardInfo.Text className="text-dark text-center">
                    Temperatura: <strong>{chuveiroEstado.temperatura} °C</strong>
                  </CardInfo.Text>
                ) : (
                    <div>
                      <Button block variant="success" onClick={() => ligarChuveiro(tempRange)}>LIGAR CHUVEIRO</Button>
                      <Button onClick={() => setCollapseOpen(!collapseOpen)}
                              aria-controls="caixa-definicao-temperatura"
                              aria-expanded={collapseOpen}
                              variant="info">
                          <FaSlidersH /> Definir Temperatura ({tempRange} °C)
                      </Button>
                      <Collapse in={collapseOpen} className="text-dark">
                        <div id="caixa-definicao-temperatura">
                        <RangeSlider
                          min={29}
                          max={45}
                          value={tempRange}
                          onChange={e => setTempRange(Number(e.target.value))}
                        />
                        <hr />
                        </div>
                      </Collapse>

                      <AlertMessage variant="info">Com o chuveiro desligado, clique em "VOLTAR" para ser redirecionado ao início.</AlertMessage>
                    </div>
                    
                  )}

                <Link to="/"><Button block ><FaArrowLeft /> VOLTAR </Button></Link>
              </CardInfo.Body>
            </CardInfo>)}
      </Pagina>
    </div>
  )
}

export default withRouter(Chuveiro);