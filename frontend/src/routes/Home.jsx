import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>Título</Col>
        <Col>
          Descrição Descrição Descrição Descrição Descrição Descrição Descrição
          Descrição Descrição
        </Col>
        <Col className="d-flex align-items-center justify-content-center gap-2">
          <Button variant="success">Atualizar</Button>
          <Button variant="danger">Excluir</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
