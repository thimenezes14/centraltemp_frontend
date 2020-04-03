import styled from 'styled-components';
import {Container, Tabs} from 'react-bootstrap';

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

export const MenuDashboard = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: row;
    justify-content: space-between;
`;

export const ContainerExclusao = styled.div`
    display: flex;
    flex-direction: column;
    text-align: justify;
    margin: 5px;
    padding: 5px;
`;
