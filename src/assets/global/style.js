import styled, { keyframes } from 'styled-components';
import { Card, Alert, Button } from 'react-bootstrap';
import { headShake } from 'react-animations';

export const CardInfo = styled(Card)`
    overflow: hidden;
    display: flex;
    max-width: 400px;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: space-between;
    margin: 10px auto;
    padding: 20px;

    a {
        text-decoration: none;
    }

    animation: 1s ${keyframes `${headShake}`};
`;

export const AlertMessage = styled(Alert)`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: auto;
    
    h1 {
        font-weight: bold;
    }

    @media (min-width: 768px) {
        width: 60%;
    }
`;

export const AlertMessageButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const AlertMessageButton = styled(Button)`
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
    padding: 5px;
`;

