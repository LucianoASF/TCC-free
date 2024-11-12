import axios from '../axios.config';
import { useContext, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';

const Register = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  if (user) {
    return <Navigate to="/" />;
  }

  const [nome, setNome] = useState('');
  const [erroNome, setErroNome] = useState('');
  const [email, setEmail] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [select, setSelect] = useState('');
  const [erroSelect, setErroSelect] = useState('');

  const valida = () => {
    if (nome.length < 5 || nome.length > 80) {
      setErroNome('O nome deve ter entre 5 e 80 caracteres');
      return false;
    } else {
      setErroNome('');
    }
    if (email.length < 3 || email.length > 80) {
      setErroEmail('O email deve ter entre 3 e 80 caracteres');
      return false;
    } else {
      setErroEmail('');
    }
    if (senha.length < 3 || senha.length > 60) {
      setErroSenha('A senha deve ter entre 3 e 60 caracteres');
      return false;
    } else {
      setErroSenha('');
    }
    if (select !== 'desenvolvedor' && select !== 'cliente') {
      setErroSelect('Selecione uma opção');
      return false;
    } else {
      setErroSelect('');
    }
    return true;
  };

  const aoSubmeter = async (e) => {
    e.preventDefault();
    if (!valida()) return;
    const dados = { nome, email, senha, role: select };
    try {
      const res = await axios.post('/usuarios', dados);
      toast.success('Usuário criado com sucesso');
      navigate('/login');
    } catch (error) {
      toast.error('Ocorreu um erro');
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center">Registre-se</Card.Title>
          <Form onSubmit={(e) => aoSubmeter(e)}>
            <Form.Group className="mt-3 mb-3" controlId="nome">
              <Form.Floating>
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Label>Nome</Form.Label>
              </Form.Floating>
              {erroNome && <span className="text-danger">{erroNome}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
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
                {erroEmail && <span className="text-danger">{erroEmail}</span>}
              </Form.Floating>
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
                {erroSenha && <span className="text-danger">{erroSenha}</span>}
              </Form.Floating>
            </Form.Group>
            <Form.Select
              size="lg"
              required
              value={select}
              onChange={(e) => setSelect(e.target.value)}
              className="mb-3"
            >
              <option>Selecione uma opção</option>
              <option value="cliente">Cliente</option>
              <option value="desenvolvedor">Desenvolvedor</option>
            </Form.Select>
            {erroSelect && (
              <span className="text-danger d-block">{erroSelect}</span>
            )}

            <Link to="/login">Já tem conta? faça Login</Link>

            <Button
              variant="primary"
              type="submit"
              size="lg"
              className=" mt-3 w-100"
            >
              Registrar-se
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
