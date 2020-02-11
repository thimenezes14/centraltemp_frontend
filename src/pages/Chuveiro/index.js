import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Button, Collapse } from 'react-bootstrap';
import { CardInfo, AlertMessage } from './style';
import { FaShower, FaArrowLeft, FaAngleDown, FaSlidersH, FaToggleOn, FaThermometerHalf } from 'react-icons/fa';
import Banheira from '../../components/lotties/animacaoBanheira';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import { Pagina, Logotipo } from './style';

import shower_api from '../../services/shower_api';
import errorHandler from '../../helpers/handleErrors';



function Chuveiro(props) {

  const [loading, setLoading] = useState({status: true, mensagem: 'Verificando estado do chuveiro. Aguarde...'});
  const [erro, setErro] = useState({ status: null, mensagem: null });
  const [chuveiroEstado, setChuveiroEstado] = useState({ status: null, temperatura: null });

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [tempRange, setTempRange] = useState(35);

  async function carregarDadosDoChuveiro() {
      const chuveiro = (await shower_api.get('chuveiro')).data;
      return chuveiro;
  }

  useEffect(() => {

    carregarDadosDoChuveiro()
      .then(chuveiro => setChuveiroEstado({status: chuveiro.ligado, temperatura: chuveiro.temperatura}))
      .catch(error => setErro({ status: true, mensagem: `Erro ao comunicar-se com o servidor do chuveiro. ${errorHandler(error)}` }))
      .finally(() => setLoading({status: false, mensagem: ''}))

  }, []);

  const ligarChuveiro = async temperatura => {

    setLoading({status: true, mensagem: 'Ligando chuveiro...'});
    
    await shower_api.post('chuveiro', {ligado: true, temperatura})
      .then(res => setChuveiroEstado({ status: res.data.ligado, temperatura: res.data.temperatura }))
      .catch(err => setErro({ status: true, mensagem: `Erro ao ligar chuveiro. ${err.response.data}` }))
      .finally(()=> setLoading({status: false, mensagem: ''}));
  }

  const handleLigarChuveiro = async temperatura => {
    await carregarDadosDoChuveiro()
      .then(chuveiro => {
        if(chuveiro.ligado) {
          setErro({status: true, mensagem: 'O chuveiro já foi ligado por outro usuário. Aguarde até que o chuveiro seja desligado para utilizar o sistema. '});
        } else {
          ligarChuveiro(temperatura);
        }
      })
      .catch(error => setErro({ status: true, mensagem: `Erro ao comunicar-se com o servidor do chuveiro. ${errorHandler(error)}` }))
  }

  const handleBack = () => {
  
    carregarDadosDoChuveiro()
      .then(chuveiro => {
        setChuveiroEstado({status: chuveiro.ligado, temperatura: chuveiro.temperatura});
        if(!chuveiro.ligado) {
          props.history.push('/');
        }
      })
      .catch(error => setErro({ status: true, mensagem: `Erro ao comunicar-se com o servidor do chuveiro. ${errorHandler(error)}` }));
  
  }

  return (
    <div>
      <Pagina>

        <Logotipo src={Logo} />

        {loading.status
          ? (
            <AlertMessage variant="primary">
              {loading.mensagem}
            </AlertMessage>
          ) : erro.status
            ? (<AlertMessage variant="danger" className="text-center"><AlertMessage.Heading>{erro.mensagem}</AlertMessage.Heading><Link to={chuveiroEstado.status ? '/banho' : '/'}><Button variant="danger">OK</Button></Link></AlertMessage>)
            : (<CardInfo>
              <CardInfo.Body>

                <Banheira />

                <CardInfo.Title className="text-dark text-center">
                  <AlertMessage variant={chuveiroEstado.status ? 'success' : 'danger'}>
                    <FaShower size={25} /><strong>{chuveiroEstado.status ? 'Ligado' : 'Desligado'}</strong>
                  </AlertMessage>
                </CardInfo.Title>
                

                {chuveiroEstado.status && 
                  <CardInfo.Title className="text-dark text-center">
                    <AlertMessage variant="info">
                      <FaThermometerHalf size={25}/><strong>{chuveiroEstado.temperatura} °C</strong>
                    </AlertMessage>
                  </CardInfo.Title>
                }

                <Button block onClick={handleBack}><FaArrowLeft /> VOLTAR </Button>
                {!chuveiroEstado.status && (
                    <div>
                      <Button block variant="success" onClick={() => handleLigarChuveiro(tempRange)}><FaToggleOn /> LIGAR CHUVEIRO</Button>

                      <Button onClick={() => setCollapseOpen(!collapseOpen)}
                              aria-controls="caixa-definicao-temperatura"
                              aria-expanded={collapseOpen}
                              variant="info">
                          <FaSlidersH /> TEMPERATURA <strong>({tempRange} °C)</strong><FaAngleDown />
                      </Button>
                      <Collapse in={collapseOpen} className="text-dark">
                        <div id="caixa-definicao-temperatura">
                        <RangeSlider
                          min={29}
                          max={45}
                          value={tempRange}
                          variant="info"
                          size="lg"
                          onChange={e => setTempRange(Number(e.target.value))}
                        />
                        </div>
                      </Collapse>
                    </div>
                    
                  )}
              </CardInfo.Body>
            </CardInfo>)}
      </Pagina>
    </div>
  )
}

export default withRouter(Chuveiro);