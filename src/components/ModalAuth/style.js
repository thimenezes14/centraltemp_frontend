import styled from 'styled-components';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {FaSpinner} from 'react-icons/fa';

export const IconeBotaoLoading = styled(FaSpinner)`
   -webkit-animation:spin 2s linear infinite;
    -moz-animation:spin 2s linear infinite;
    animation: spin 2s linear infinite;
    
    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;

export const ModalAuth = styled(Modal)`
    text-align: center;
`;

export const FormAuth = styled(Form)`
    text-align: center;
`;

export const FormAuthInput = styled(Form.Control)`
    text-align: center;
    font-size: 15px;
`;

export const Botao = styled(Button)`
    width: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    font-weight: bold;
    padding: 5px;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;