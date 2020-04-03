import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

import { AlertMessage, AlertMessageButtonGroup, AlertMessageButton, CardInfo } from '../../assets/global/style';
import { Botao, Status } from './style';
import { FaShower, FaArrowLeft, FaAngleDown, FaSlidersH, FaToggleOn, FaThermometerHalf, FaSyncAlt } from 'react-icons/fa';
import Banheira from '../../assets/lotties/animacaoBanheira';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

import shower_api from '../../services/shower_api';
import errorHandler from '../../helpers/handleErrors';

function Chuveiro(props) {

  const [loading, setLoading] = useState({ status: true, mensagem: 'Verificando estado do chuveiro. Aguarde...' });
  const [erro, setErro] = useState({ status: null, mensagem: null, descricao: null });
  const [chuveiroEstado, setChuveiroEstado] = useState({ status: null, temperatura: null });

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [tempRange, setTempRange] = useState(35);

  async function carregarDadosDoChuveiro() {
    try {
      const chuveiro = (await shower_api.get('/verificarchuveiro')).data;
      return chuveiro;
    } catch (err) {
      throw err;
    }
  }

  function finalizarBanho() {
    shower_api.post('finalizar')
        .then(()=> console.info("Histórico atualizado. "))
        .catch(err => {
            if(err.response.status === 403)
                console.info(err);
            else
                console.log(err);
        })
}

  useEffect(() => {

    finalizarBanho();

    carregarDadosDoChuveiro()
      .then(chuveiro => {
        setChuveiroEstado({ status: chuveiro.ligado, temperatura: chuveiro.temperatura })
        setTempRange(chuveiro.temperatura)
      })
      .catch(error => setErro({ status: true, mensagem: `Erro ao comunicar-se com o servidor do chuveiro.`, descricao: errorHandler(error).toString() }))
      .finally(() => setLoading({ status: false, mensagem: '' }))

  }, []);

  const ligarChuveiro = async temperatura => {

    setLoading({ status: true, mensagem: 'Ligando chuveiro...' });

    await shower_api.post('/ligarchuveiromanual', { temperatura, ligado: true })
      .then(res => setChuveiroEstado({ status: res.data.ligado, temperatura: res.data.temperatura }))
      .catch(err => setErro({ status: true, mensagem: `Erro ao ligar chuveiro. ${err.response.data}` }))
      .finally(() => setLoading({ status: false, mensagem: '' }));
  }

  const handleLigarChuveiro = async temperatura => {
    await carregarDadosDoChuveiro()
      .then(chuveiro => {
        if (chuveiro.ligado) {
          setErro({ status: true, mensagem: 'O chuveiro já foi ligado por outro usuário. Aguarde até que o chuveiro seja desligado para utilizar o sistema. ' });
        } else {
          ligarChuveiro(temperatura);
        }
      })
      .catch(error => setErro({ status: true, mensagem: `Erro ao comunicar-se com o servidor do chuveiro. ${errorHandler(error)}` }))
  }

  return (
    <div>
      {loading.status
        ? (
          <AlertMessage variant="primary">
            {loading.mensagem}
          </AlertMessage>
        ) : erro.status
          ? (<AlertMessage variant="danger">
            <AlertMessage.Heading>
              {erro.mensagem}
            </AlertMessage.Heading>
            <div className="text-muted">
              {erro.descricao}
            </div>
            <AlertMessageButtonGroup>
              <AlertMessageButton variant="danger" onClick={() => props.history.push('/')}>
                <span><FaArrowLeft /> VOLTAR</span>
              </AlertMessageButton>
              <AlertMessageButton variant="dark" onClick={() => window.location.reload()}>
                <span><FaSyncAlt /> REPETIR</span>
              </AlertMessageButton>
            </AlertMessageButtonGroup>
          </AlertMessage>)
          : (<CardInfo>
            <CardInfo.Body>

              <CardInfo.Title className="text-dark text-center">
                <Banheira />
                <Status variant={chuveiroEstado.status ? 'success' : 'danger'}>
                  <FaShower size={25} /><strong>{chuveiroEstado.status ? 'Ligado' : 'Desligado'}</strong>
                </Status>
              </CardInfo.Title>

              {chuveiroEstado.status &&
                <CardInfo.Title className="text-dark text-center">
                  <Status variant="info">
                    <FaThermometerHalf size={25} /><strong>{chuveiroEstado.temperatura} °C</strong>
                  </Status>
                </CardInfo.Title>
              }

              <Botao onClick={() => props.history.push('/')}><FaArrowLeft />VOLTAR</Botao>
              {!chuveiroEstado.status && (
                <div>
                  <Botao variant="success" onClick={() => handleLigarChuveiro(tempRange)}><FaToggleOn /> LIGAR CHUVEIRO</Botao>
                  <Botao onClick={() => setCollapseOpen(!collapseOpen)}
                    aria-controls="caixa-definicao-temperatura"
                    aria-expanded={collapseOpen}
                    variant="info">
                    <FaSlidersH /> <strong> ( {tempRange} °C )</strong> AJUSTAR <FaAngleDown />
                  </Botao>
                  <Collapse in={collapseOpen} className="text-dark">
                    <div id="caixa-definicao-temperatura">
                      <RangeSlider
                        min={21}
                        max={47}
                        tooltip="off"
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
    </div>
  )
}

export default withRouter(Chuveiro);