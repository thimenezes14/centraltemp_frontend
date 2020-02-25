import React, { useState, useEffect } from 'react';
import { Carrossel, CarrosselItem, CardCarousel, BotaoPainel, GrupoBotoes, ListaPerfis, ListaPerfisItem } from './style';
import {FaArrowLeft, FaEdit} from 'react-icons/fa';
import Modal from './modal';
import avatar_path from '../../services/avatar_path';


export default function SeletorPerfis(props) {

    const [perfis, setPerfis] = useState([]);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [perfilSelecionado, setPerfilSelecionado] = useState({});
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const perfis = [];
        for(let i = 0; i < props.perfis.length; i++) {
            let index = {...props.perfis[i], indexCarousel: i+1};
            perfis.push(index);
        }
        setPerfis(perfis);
    }, [props.perfis]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

    const handleModal = perfil => {
        setPerfilSelecionado(perfil);
        setModalShow(true);
    };

    return (
        <>
        
            <Modal show={modalShow} onHide={()=> setModalShow(false)} perfilauth={perfilSelecionado}/>
            <GrupoBotoes>
                <BotaoPainel variant="primary" onClick={() => props.history.push('/')}><FaArrowLeft /> VOLTAR</BotaoPainel>
                <BotaoPainel variant="info" onClick={() => props.history.push('/perfis/novo')}><FaEdit /> NOVO</BotaoPainel>
            </GrupoBotoes>
            <Carrossel activeIndex={index} direction={direction} onSelect={handleSelect} interval={0} indicators={false}>
                {props.perfis.map(perfil => (
                    <CarrosselItem key={perfil.id} onClick={() => handleModal(perfil)}>
                        <CardCarousel>
                            <img
                                className="img img-responsive"
                                src={avatar_path + perfil.avatar}
                                alt={perfil.nome}
                            />
                            <CardCarousel.Title>
                                <h1>{perfil.nome}</h1>
                            </CardCarousel.Title>
                            <CardCarousel.Text>
                                {perfil.data_nasc}
                            </CardCarousel.Text>
                        </CardCarousel>
                    </CarrosselItem>
                ))}
            </Carrossel>
            <ListaPerfis>

                {perfis.map(perfil => (

                    <ListaPerfisItem itemAtivo={index + 1 === Number(perfil.indexCarousel) ? index + 1 : null} key={perfil.id}><img src={avatar_path + perfil.avatar} alt={perfil.nome} onClick={() => handleSelect(perfil.indexCarousel - 1, 'next')} /></ListaPerfisItem>
                ))}
            </ListaPerfis>
        </>
    )
}