import styled, { keyframes } from 'styled-components';
import {Button, Card } from 'react-bootstrap';
import { headShake } from 'react-animations';

export const Painel = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px;
    animation: 1s ${keyframes`${headShake}`};
`;

export const ChuveiroStatus = styled.div`
    display: flex;
    padding: 10px;
    display: flex;
    align-content: center;
    align-items: center;
    background-color: ${props => props.status === null ? 'gray' : props.status === true ? 'red' : 'green'};
    border-radius: 5px;

`;

export const CardTemperatura = styled(Card)`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    font-weight: bold;
    background-color: ${props => props.color};
    padding: 5px;
    margin-bottom: 10px;
`;

export const CardTemperaturaInfo = styled.div`
    width: 80px;
    height: auto;
    padding: 10px;
    color: ${props => props.color};
    font-size: 2rem;
    display: flex;
    flex-direction: row;

    span {
        font-size: 1rem;
        display: flex;
    }
`
export const CardTemperaturaBotao = styled(Button)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 2px;
    width: 100%;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;