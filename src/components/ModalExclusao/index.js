import React, { useState } from 'react';
import { logout } from "../../services/auth";

import profile_api from '../../services/profile_api';
import { Modal, Button } from 'react-bootstrap';
import {FaExclamationTriangle} from 'react-icons/fa';

import {AlertMessage} from '../../assets/global/style';

export default function ModalExclusao(props) {

    const [error, setError] = useState(false);

    const handleAcao = async () => {
        try {
            await profile_api.delete(`excluir/${props.perfil.id_perfil}`);
            setError(false);
            logout();
            props.history.push('/perfis');
        } catch (err) {
            setError(true);
            console.log(err);
        }
    }

    return (
        <>
          <Modal {...props} centered className="bg-dark" onHide={()=> {props.onHide(); setError(false)}}>
            <div className="bg-warning text-dark">
                <Modal.Header closeButton>
                <Modal.Title><FaExclamationTriangle /> CONFIRMAR EXCLUSÃO?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.perfil.nome}, tem certeza que deseja excluir este perfil? Esta ação NÃO poderá ser desfeita.
                    <AlertMessage variant="danger" show={error}><span><FaExclamationTriangle /> Ocorreu um problema ao tentar excluir seu perfil. </span></AlertMessage>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={()=> handleAcao()}>
                    CONFIRMAR EXCLUSÃO
                </Button>
                </Modal.Footer>
            </div>
          </Modal>
        </>
      );
}