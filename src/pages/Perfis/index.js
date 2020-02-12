import React, { useState, useCallback, useEffect } from 'react';
import Logo from '../../assets/images/centralTemp-logotipo-final-alternativo-2019.png';
import { Pagina, Logotipo, ListaPerfis, ListaPerfisItem, AlertMessage } from '../../assets/global/style';
import { Carrossel, CarrosselItem, CardCarousel } from './style';
import { withRouter } from 'react-router-dom';

import profile_api from '../../services/profile_api';

function Perfis() {

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const [loading, setLoading] = useState({ status: true, mensagem: 'Carregando perfis. Aguarde...' });
    const [erro, setErro] = useState({ status: null, mensagem: null });
    const [perfis, setPerfis] = useState([]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

    async function carregarPerfis() {
        const perfis = (await profile_api.get('perfis')).data;
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
                    erro.status ? (<AlertMessage variant="primary"><AlertMessage.Heading>{erro.mensagem}</AlertMessage.Heading></AlertMessage>) :

                        <>
                            <Carrossel activeIndex={index} direction={direction} onSelect={handleSelect} interval={0} indicators={false}>
                                {perfis.map(perfil => (
                                    <CarrosselItem key={perfil.id}>
                                        <CardCarousel>
                                            <img
                                                className="img img-responsive"
                                                src={perfil.avatar}
                                                alt={perfil.nome}
                                            />
                                            <CardCarousel.Title>
                                                <h1>{perfil.nome}</h1>
                                            </CardCarousel.Title>
                                        </CardCarousel>
                                    </CarrosselItem>
                                ))}
                            </Carrossel>
                            <ListaPerfis>

                                {perfis.map(perfil => (

                                    <ListaPerfisItem itemAtivo={index + 1 === Number(perfil.id) ? index + 1 : null} key={perfil.id}><img src={perfil.avatar} alt={perfil.nome} onClick={() => handleSelect(perfil.id - 1, 'next')} /></ListaPerfisItem>
                                ))}
                            </ListaPerfis>
                        </>
                }


            </Pagina>
        </div>

    )
}

export default withRouter(Perfis);