import { Button, Card } from 'react-bootstrap';
import axios from '../axios.config';
import { toast } from 'react-toastify';
import ModalCandidatar from './ModalCandidatar';
import { useState } from 'react';

const CardPedido = ({ titulo, descricao, id }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{descricao}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => setShowModal(true)} variant="primary">
          Candidatar
        </Button>
        <ModalCandidatar
          show={showModal}
          setShow={setShowModal}
          titulo={titulo}
          id={id}
        />
      </Card.Footer>
    </Card>
  );
};

export default CardPedido;
