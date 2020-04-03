import styled, {keyframes} from 'styled-components';
import {headShake} from 'react-animations';

import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

export const Carrossel = styled(Carousel)`
    width: 300px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;

    @media (min-width: 768px) {
        width: 350px !important;
    }

`;

export const CarrosselItem = styled(Carousel.Item)`
    padding: 10px;
    width: 100%;
`;

export const CardCarousel = styled(Card)`
    background: rgba(0,0,0,0.25);
    overflow: hidden;
    border-radius: 5%;
    display: flex;
    max-width: 400px;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: center;
    margin: 10px auto;
    padding: 20px;
    cursor: pointer;
    transition: 0.5s;

    img {
        width: 50%;
        margin: 0 auto;

        @media (min-width: 768px) {
            width: 70% !important;
        }
    }

    &:hover {
        background: #3c9dc7;
        color: #004f9a;
        transition: 0.5s;
    }

    animation: 1s ${keyframes `${headShake}`};
`

export const ListaPerfis = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
`;

export const ListaPerfisItem = styled.li`
    padding: 5px;
    cursor: pointer;
    
    img {
        width: 50px;
        filter: grayscale(100%);
        transition: 0.5s;
    }

    @media (min-width: 576px) {
        img {
            width: 60px !important;
        }
    }

    @media (min-width: 768px) {
        img {
            width: 80px !important;
        }
    }

    &:nth-child(${props => props.itemAtivo}) {
        img {
            filter: none;
            transition: 0.5s;
        }
    }
`;