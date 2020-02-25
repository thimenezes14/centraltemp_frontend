import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Pagina, Logotipo, AlertMessage } from '../../assets/global/style';

import { Botao } from './style';
import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import profile_api from '../../services/profile_api';
import SeletorPerfis from './seletorPerfis';


function Perfis(props) {

    const [loading, setLoading] = useState({ status: true, mensagem: 'Carregando perfis. Aguarde...' });
    const [erro, setErro] = useState({ status: null, mensagem: null });
    const [perfis, setPerfis] = useState([]);
    

    async function carregarPerfis() {
        const perfis = (await profile_api.get('listar')).data;
        console.log(perfis);
        return perfis;
    }

    useEffect(() => {

        carregarPerfis()
            .then(perfis => {
                setPerfis(perfis);
            })
            .catch(error => setErro({ status: true, mensagem: `Erro ao comunicar-se com o servidor de perfis.` }))
            .finally(() => setLoading({ status: false, mensagem: '' }))

    }, []);

    return (
        <div>
            <Pagina>
                <Logotipo src={Logo} />

                {loading.status ?
                    (<AlertMessage variant="primary"><AlertMessage.Heading>{loading.mensagem}</AlertMessage.Heading></AlertMessage>) :
                    erro.status ? (<AlertMessage variant="danger"><AlertMessage.Heading>{erro.mensagem}</AlertMessage.Heading><Botao variant="danger" onClick={()=> props.history.push('/')}>OK</Botao></AlertMessage>) :
                    <SeletorPerfis perfis={perfis} history={props.history}/>
                }

            </Pagina>
        </div>

    )
}

export default withRouter(Perfis);