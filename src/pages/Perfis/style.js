import styled from 'styled-components';
import { Button, ButtonGroup } from 'react-bootstrap';

export const GrupoBotoes = styled(ButtonGroup)`
    width: 80%;
    padding: 10px;

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
