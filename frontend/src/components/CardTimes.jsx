import { Button, Card } from 'react-bootstrap';

const CardTimes = ({ nome, desenvolvedores }) => {
  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{nome}</Card.Title>
        <Card.Text>{desenvolvedores.map((dev) => dev.nome)}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Ver time</Button>
      </Card.Footer>
    </Card>
  );
};

export default CardTimes;
