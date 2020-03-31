import styled from 'styled-components';
import { Button, Alert } from 'react-bootstrap';

export const Botao = styled(Button)`
    width: 100%;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px auto;
`;

export const Status = styled(Alert)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
        font-weight: bold;
    }
`;