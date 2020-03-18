import React from 'react';
import { logout } from "../../services/auth";

import profile_api from '../../services/profile_api';
import { Modal, Button } from 'react-bootstrap';
import {FaExclamationTriangle} from 'react-icons/fa';

export default function ModalConfirmacao(props) {

    const handleAcao = async () => {
        try {
            await profile_api.delete(`excluir/${props.idusuario}`);
            logout();
            props.history.push('/perfis');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
          <Modal {...props} centered className="bg-dark">
            <div className="bg-warning text-dark">
                <Modal.Header closeButton>
                <Modal.Title><FaExclamationTriangle /> CONFIRMAR EXCLUSÃO?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Você tem certeza que deseja excluir este perfil? Esta ação NÃO poderá ser desfeita.</Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={()=> handleAcao()}>
                    Confirmar Exclusão
                </Button>
                </Modal.Footer>
            </div>
          </Modal>
        </>
      );
}