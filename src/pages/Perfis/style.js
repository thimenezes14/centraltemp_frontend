import styled, {keyframes} from 'styled-components';
import {Carousel, Card, Button, ButtonGroup, Modal} from 'react-bootstrap';
import {headShake} from 'react-animations';
import { Form } from 'react-bootstrap';
import {FaSpinner} from 'react-icons/fa';

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
    padding: 10px;
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
        border-radius: 50%;

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
export const GrupoBotoes = styled(ButtonGroup)`
    width: 80%;

    @media (min-width: 768px) {
        width: auto;
    }
`;

export const BotaoPainel = styled(Button)`
    margin-top: -10px;
    padding: 10px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 768px) {
        width: 150px;
    }
`;

export const IconeBotaoLoading = styled(FaSpinner)`
   -webkit-animation:spin 2s linear infinite;
    -moz-animation:spin 2s linear infinite;
    animation: spin 2s linear infinite;
    
    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;

export const Botao = styled(Button)`
    width: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    font-weight: bold;
    padding: 5px;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const ModalAuth = styled(Modal)`
    text-align: center;
`;

export const FormAuth = styled(Form)`
    text-align: center;
`;

export const FormAuthInput = styled(Form.Control)`
    text-align: center;
    font-size: 15px;
`;

export const ListaPerfis = styled.ul`

    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;

`;

export const ListaPerfisItem = styled.li`

    cursor: pointer;
    
    img {
        width: 50px;
        border-radius: 50%;
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