import React, { useState, useEffect } from 'react';
import { Carrossel, CarrosselItem, CardCarousel, BotaoPainel, GrupoBotoes, ListaPerfis, ListaPerfisItem } from './style';
import {FaArrowLeft, FaEdit} from 'react-icons/fa';
import Modal from './modal';


export default function SeletorPerfis(props) {

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [perfilSelecionado, setPerfilSelecionado] = useState({});
    const [modalShow, setModalShow] = useState(false);

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

                {props.perfis.map(perfil => (

                    <ListaPerfisItem itemAtivo={index + 1 === Number(perfil.id) ? index + 1 : null} key={perfil.id}><img src={perfil.avatar} alt={perfil.nome} onClick={() => handleSelect(perfil.id - 1, 'next')} /></ListaPerfisItem>
                ))}
            </ListaPerfis>
        </>
    )
}