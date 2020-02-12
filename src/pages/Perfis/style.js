import styled, {keyframes} from 'styled-components';
import {Carousel, Card} from 'react-bootstrap';
import {headShake} from 'react-animations';

export const Carrossel = styled(Carousel)`
    width: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;

    @media (min-width: 768px) {
        width: 60% !important;
    }

`;

export const CarrosselItem = styled(Carousel.Item)`
    img {
        width: 80%;
        margin: 0 auto;
        border-radius: 50%;
    }
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

    &:hover {
        background: #3c9dc7;
        color: #004f9a;
        transition: 0.5s;
    }

    animation: 1s ${keyframes `${headShake}`};
`