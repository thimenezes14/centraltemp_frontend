import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import {AlertMessage} from '../../assets/global/style';

import shower_api from '../../services/shower_api';
import {Grafico} from './style';

export default function StatsBanho(props) {
  const perfil = props.perfil;
  
  const [classificacao, setClassificacao] = useState([0,0,0,0]);
  const [isLoading, setIsLoading] = useState(true);
  
  const config = {
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
            await historico.map(h => {
              switch (h.classificacao) {
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
                  console.error("Não foi possível obter classificação do item " + h);
                break;
              }
              return cl;
            });
            
            setClassificacao([cl.ideal, cl.bom, cl.ruim, cl.critico]);
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
            <AlertMessage variant="info">{((classificacao[0] + classificacao[1]) / classificacao.reduce((acc, val) => acc + val) * 100).toFixed(1) }% dos banhos são adequados!</AlertMessage>
            <ReactApexChart options={config.options} series={classificacao} type="donut" width="400" />
            </>
        }
        {isLoading && <p>Obtendo dados...</p>}
      </Grafico>
    </div>
  );
}