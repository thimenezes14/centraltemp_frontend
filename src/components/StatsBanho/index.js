import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import {AlertMessage} from '../../assets/global/style';

import shower_api from '../../services/shower_api';
import {Grafico} from './style';

export default function StatsBanho(props) {
  const perfil = props.perfil;
  
  const [classificacaoTemperatura, setClassificacaoTemperatura] = useState([0,0,0,0]);
  const [classificacaoDuracao, setClassificacaoDuracao] = useState([0,0,0]);
  const [isLoading, setIsLoading] = useState(true);

  const porcentagem_temperatura = ((classificacaoTemperatura[0] + classificacaoTemperatura[1]) / classificacaoTemperatura.reduce((acc, val) => acc + val) * 100).toFixed(1);
  const porcentagem_duracao = ((classificacaoDuracao[0] + classificacaoDuracao[1]) / classificacaoDuracao.reduce((acc, val) => acc + val) * 100).toFixed(1);
  
  const config_temperatura = {
    options: {
      labels: ['Ideal', 'Bom', 'Ruim', 'Crítico'],
      colors: ['#0F9D58', '#4285F4', '#F4B400', '#DB4437'],
      chart: {
        type: 'donut',
        animations: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'Muli Regular',
        }
      },
      legend: {
        show: true,
        fontSize: '13px',
        fontFamily: 'Muli Regular',
        horizontalAlign: 'left',
        formatter: function (val, opts) {
          return val + " - Banhos: <strong>" + opts.w.globals.series[opts.seriesIndex] + '</strong>'
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '40%'
          }
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            width: 200,
            offsetX: 75,
            offsetY: -30,
            horizontalAlign: 'center'
          }
        }
      }]
    },
  };

  const config_duracao = {
    options: {
      labels: ['Ideal', 'Bom', 'Ruim'],
      colors: ['#0F9D58', '#4285F4', '#F4B400'],
      chart: {
        type: 'donut',
        animations: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'Muli Regular',
        }
      },
      legend: {
        show: true,
        fontSize: '13px',
        fontFamily: 'Muli Regular',
        horizontalAlign: 'left',
        formatter: function (val, opts) {
          return val + " - Banhos: <strong>" + opts.w.globals.series[opts.seriesIndex] + '</strong>'
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '40%'
          }
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            width: 200,
            offsetX: 75,
            offsetY: -30,
            horizontalAlign: 'center'
          }
        }
      }]
    },
  };

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
        .then(async historico => {
            let cl = {
              ideal: 0,
              bom: 0,
              ruim: 0,
              critico: 0
            };
            let cl_duracao = {
              ideal: 0,
              bom: 0,
              ruim: 0
            };
            await historico.map(h => {
              switch (h.classificacao_temperatura) {
                case 1:
                  cl.ideal++;
                break;
                case 2:
                  cl.bom++;
                break;
                case 3:
                  cl.ruim++;
                break;
                case 4:
                  cl.critico++;
                break;
                default:
                  console.error("Não foi possível obter classificação de temperatura do item " + h);
                break;
              }

              switch (h.classificacao_duracao) {
                case 1:
                  cl_duracao.ideal++;
                break;
                case 2:
                  cl_duracao.bom++;
                break;
                case 3:
                  cl_duracao.ruim++;
                break;
                default:
                  console.error("Não foi possível obter classificação de duração do item " + h);
                break;
              }

              return cl;
            });
            
            setClassificacaoTemperatura([cl.ideal, cl.bom, cl.ruim, cl.critico]);
            setClassificacaoDuracao([cl_duracao.ideal, cl_duracao.bom, cl_duracao.ruim]);
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
}, [perfil]);

  return (
    <div>
      <Grafico>
        {
          !isLoading &&
            <>
            {
              !isNaN(porcentagem_temperatura) && 
              <><AlertMessage variant="info">{porcentagem_temperatura}% dos banhos estão dentro da temperatura adequada!</AlertMessage>
              <ReactApexChart options={config_temperatura.options} series={classificacaoTemperatura} type="donut" width="400" /></>
            }
            {
              isNaN(porcentagem_temperatura) &&
              <p className="text-muted">Nada para mostrar.</p>
            }
            </>
        }
        {isLoading && <p>Obtendo dados...</p>}
      </Grafico>
      {
        !isNaN(porcentagem_duracao) &&
        <Grafico>
          {
            !isLoading &&
              <>
              <AlertMessage variant="info">{porcentagem_duracao}% dos banhos estão dentro do tempo adequado!</AlertMessage>
              <ReactApexChart options={config_duracao.options} series={classificacaoDuracao} type="donut" width="400" />
              </>
          }
          {isLoading && <p>Obtendo dados...</p>}
        </Grafico>  

      }
      
    </div>
  );
}