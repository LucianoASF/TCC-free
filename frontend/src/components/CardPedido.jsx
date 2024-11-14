import { Button, Card } from 'react-bootstrap';

const CardPedido = ({ titulo, descricao }) => {
  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{descricao}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Go somewhere</Button>
      </Card.Footer>
    </Card>
  );
};

export default CardPedido;
