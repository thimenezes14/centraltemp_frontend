import React, { useState, useEffect } from 'react';
import {Pagina, Logotipo, AlertMessage} from '../../assets/global/style';
import profile_api from '../../services/profile_api';
import { withRouter } from 'react-router-dom';
import {logout} from '../../services/auth';
import {FaSignOutAlt} from 'react-icons/fa';

import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import { Button } from 'react-bootstrap';

function Dashboard(props) {

    const [perfil, setPerfil] = useState({});
    const [loading, setLoading] = useState({ status: true, mensagem: 'Carregando sessão. Aguarde...' });
    const [erro, setErro] = useState({ status: null, mensagem: null });

    useEffect(() => {
        const carregarPerfil = async () => {
            const perfil = await profile_api.get(`${props.location.state}/detalhes`);
            return perfil.data;
        }

        carregarPerfil()
            .then(perfil => {
                setPerfil(perfil);
            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 403)
                    props.history.push({pathname: '/perfis', mensagem: err.response.data.err});
                
                    setErro({ status: true, mensagem: `Erro ao comunicar-se com o servidor de perfis.` });
            })
            .finally(() => setLoading({ status: false, mensagem: '' }))

    }, [props]);

    const sair = () => {
        logout();
        props.history.push('/perfis');
    }

    return (
        <Pagina>
            <Logotipo src={Logo}/>
            <h1>Dashboard</h1>
            {loading.status ?
                    (<AlertMessage variant="primary"><AlertMessage.Heading>{loading.mensagem}</AlertMessage.Heading></AlertMessage>) :
                    erro.status ? (<AlertMessage variant="danger"><AlertMessage.Heading>{erro.mensagem}</AlertMessage.Heading><Button variant="danger" onClick={()=> props.history.push('/')}>OK</Button></AlertMessage>) :
                    <><p>Logado com usuário {perfil.nome}</p>
                    <Button variant="primary" onClick={sair}><FaSignOutAlt /> Sair</Button></>
                }
            
        </Pagina>
    );
}

export default withRouter(Dashboard);