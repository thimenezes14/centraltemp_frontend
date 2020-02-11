import styled, {keyframes} from 'styled-components';
import {Card, Alert, Container} from 'react-bootstrap';
import {headShake} from 'react-animations';

export const Pagina = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    @media (min-width: 768px) {
        height: 100vh;
    }
    
`;

export const CardInfo = styled(Card)`
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

    a {
        text-decoration: none;
    }

    button {
        width: 100%;
        display: block;
        background: #004f9a;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px auto;
    }

    animation: 1s ${keyframes `${headShake}`};
`;

export const AlertMessage = styled(Alert)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
        font-weight: bold;
    }
`;

export const Logotipo = styled.img`
    width: 300px;
    margin: 30px 10px;

    @media (min-width: 768px) {
        width: 350px !important;
        margin: 10px 10px 50px !important;
    }
`;
