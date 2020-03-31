import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const CardBotao = styled(Button)`
    width: 100%;
    display: block;
    background: #004f9a;
    outline: none;
`;

export const Icone = styled.p`
    color: #004f9a;
    -webkit-animation:spin 8s linear infinite;
    -moz-animation:spin 8s linear infinite;
    animation: spin 8s linear infinite;
    
    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;

