import styled, {keyframes} from 'styled-components';
import {headShake} from 'react-animations';

import Card from 'react-bootstrap/Card';

export const Grafico = styled(Card)`
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    overflow: hidden;

    @media(max-width: 576px) {
        padding-top: 20px;
    }

    animation: 1s ${keyframes `${headShake}`};
`;