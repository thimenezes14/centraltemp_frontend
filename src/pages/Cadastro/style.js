import styled, { keyframes } from 'styled-components';
import {Form, Button, ButtonGroup } from 'react-bootstrap';
import { headShake } from 'react-animations';

export const FormularioCadastro = styled(Form)`
    margin: 20px;
    background: #FFF;
    padding: 20px;
    border-radius: 5px;
    color: #000;
    font-weight: bolder;

    animation: 1s ${keyframes`${headShake}`};
`;

export const BotaoFormularioCadastro = styled(Button)`
    width: 200px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

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

