import styled, {keyframes}  from 'styled-components';
import Table from 'react-bootstrap/Table';
import {slideInDown} from 'react-animations';
import { Form } from 'react-bootstrap';

export const PaginaFiltro = styled.div`
    max-width: 768px;
    margin: auto;

`;

export const FormFiltro = styled(Form)`
    width: 50%;
    margin: auto;

    @media(max-width: 576px) {
        width: 100%;
    }
`;

export const CampoPagina = styled(Form.Control)`
    font-size: 1.25rem;
    font-weight: bold;
    color: blue;
`;

export const TabelaRegistros = styled(Table)`
    animation: 1s ${keyframes`${slideInDown}`};

    tr {
        :hover {
            background-color: gray;
            color: white;
        }
    }
`;

export const Classificador = styled.span`
    padding: 5px; 
    border-radius: 2px;
    background-color: ${props => {
        switch(props.classificacao) {
            case 1:
                return 'green';
            case 2: 
                return 'blue';
            case 3:
                return 'yellow';
            default:
                return 'red';
        }
    }};
    color: ${props => {
        if(props.classificacao === 3) {
            return 'black';
        } else {
            return 'white';
        }
    }}
`;