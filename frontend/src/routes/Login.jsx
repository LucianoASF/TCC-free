import axios from '../axios.config';
import React, { useContext, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  if (user) {
    return <Navigate to="/" />;
  }
  function validaFormulario() {
    if (email.length < 3 || email.length > 80) {
      setErroEmail('O Email deve ter entre 3 e 80 caracteres');
      return false;
    } else {
      setErroSenha('');
    }
    if (senha.length < 3 || senha.length > 60) {
      setErroSenha('A senha deve ter entre 3 e 60 caracteres');
      return false;
    } else {
      setErroSenha('');
    }
    return true;
  }
  async function aoSubmeter(e) {
    e.preventDefault();
    if (!validaFormulario()) return;
    const dados = { email, senha };
    try {
      const res = await axios.post('/login', dados);
      const token = res.data;
      login(token);
      console.log(user);

      navigate('/');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center">Login</Card.Title>
          <Form onSubmit={(e) => aoSubmeter(e)}>
            <Form.Group className="mt-3 mb-3" controlId="email">
              <Form.Floating>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Label>Email</Form.Label>
              </Form.Floating>
              {erroEmail && <span className="text-danger">{erroEmail}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="Senha">
              <Form.Floating>
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  autoComplete="current-password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <Form.Label>Senha</Form.Label>
              </Form.Floating>
              {erroSenha && <span className="text-danger">{erroSenha}</span>}
            </Form.Group>

            <Link to="/register">Não tem conta? Registre-se</Link>

            <Button
              variant="primary"
              type="submit"
              size="lg"
              className=" mt-3 w-100"
            >
              Entrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
