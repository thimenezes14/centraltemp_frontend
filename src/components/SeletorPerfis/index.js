import React, { useState, useEffect } from 'react';
import { Carrossel, CarrosselItem, CardCarousel, ListaPerfis, ListaPerfisItem } from './style';

import ModalAuth from '../ModalAuth';
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
        
            <ModalAuth show={modalShow} onHide={()=> setModalShow(false)} perfilauth={perfilSelecionado} history={props.history}/>

            <Carrossel activeIndex={index} direction={direction} onSelect={handleSelect} interval={0} indicators={false}>
                {props.perfis.map(perfil => (
                    <CarrosselItem key={perfil.id_perfil} onClick={() => handleModal(perfil)}>
                        <CardCarousel>
                            <img
                                src={avatar_path + perfil.avatar}
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
                    <ListaPerfisItem itemAtivo={index + 1 === Number(perfil.indexCarousel) ? index + 1 : null} key={perfil.id_perfil}>
                        <img src={avatar_path + perfil.avatar} 
                             alt={perfil.nome} 
                             onClick={() => handleSelect(perfil.indexCarousel - 1, perfil.indexCarousel - 1 > index ? 'prev' : 'next') } 
                        />
                    </ListaPerfisItem>
                ))}
            </ListaPerfis>
        </>
    )
}