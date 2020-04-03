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

export const GrupoOpcoesImagem = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
`;

export const OpcaoImagem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.ativo ? 'rgba(0, 79, 154, 0.25)' : 'none'};
    padding: 10px;
    margin: 10px;
    border-radius: 3px;
    cursor: pointer;

    img {
        max-width: 60px;
        cursor: pointer;
    }

    input[type=radio] {
        display: none;
    }

    transition: 0.5s;

`;

