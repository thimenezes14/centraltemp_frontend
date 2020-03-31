import styled from 'styled-components';
import {Container, Form, Tabs} from 'react-bootstrap';

export const ContainerDashboard = styled(Container)`
    width: 80%;
    margin: auto;
    display: flex;
    align-content: center;
    flex-direction: column;
    text-align: center;
    justify-content: center;
`;

export const Abas = styled(Tabs)`
    a {
        text-decoration: none;
        color: black;
    }

    a:active {
        color: #0049fa;
    }
`;

export const FormularioEdicao = styled(Form)`
    display: flex;
    align-content: center;
    flex-direction: column;
    text-align: center;
    width: 100%;
    margin: auto;
`;

export const FormularioEdicaoGrupo = styled(Form.Group)`
    display: flex;
    align-content: center;
    text-align: center;
    justify-content: center;
    padding: 5px;
    margin: 5px;

    button {
        padding: 5px;
        width: 50%;
        margin: 5px;
        @media (max-width: 768px) {
            width: 100%;
        }
    }
`;

export const MenuDashboard = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: row;
    justify-content: space-between;
`;