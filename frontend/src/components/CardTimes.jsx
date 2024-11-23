import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ModalTime from './ModalTime';

const CardTimes = ({ time, setTimes }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{time.nome}</Card.Title>
        <Card.Text>
          {time.Usuarios.map((dev) => (
            <ul className="list-unstyled m-0">
              <li>{dev.nome}</li>
            </ul>
          ))}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Ver time
        </Button>
      </Card.Footer>
      <ModalTime
        show={showModal}
        setShow={setShowModal}
        time={time}
        setTimes={setTimes}
      />
    </Card>
  );
};

export default CardTimes;
