import styled, { keyframes } from 'styled-components';
import {Form, Button } from 'react-bootstrap';
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
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

