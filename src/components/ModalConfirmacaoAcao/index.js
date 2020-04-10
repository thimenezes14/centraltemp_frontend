import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export default function ModalConfirmacaoAcao(props) {
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-dark text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           CONFIRMAR AÇÃO
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Você tem certeza em usar a temperatura de <strong>{props.temperatura_escolhida}°C</strong> para o seu banho ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Não</Button>
          <Button variant="success" onClick={()=> {props.sucesso(); props.onHide()}}>Sim</Button>
        </Modal.Footer>
      </Modal>
    );
  }