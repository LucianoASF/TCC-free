import axios from '../axios.config';
import { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';

const ModalCriarTime = ({ show, setShow, times, setTimes }) => {
  const { user } = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [erroNome, setErroNome] = useState('');
  const handleClose = () => setShow(false);

  const valida = () => {
    if (nome.length < 3 || nome.length > 45) {
      setErroNome('O nome deve ter entre 3 e 45 caracteres');
      return false;
    }
    setErroNome('');
    return true;
  };
  const aoSubmeter = async (e) => {
    e.preventDefault();
    if (!valida()) return;
    try {
      const res = await axios.post('/times', { nome });
      if (res.status === 201) {
        toast.success('Time criado com sucesso');
        const res = await axios.get(`/times/desenvolvedor/${user.id}`);
        setTimes(res.data);
        handleClose();
        setNome('');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao criar o Time');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => aoSubmeter(e)}>
          <Form.Group controlId="nome">
            <Form.Floating>
              <Form.Control
                type="text"
                required
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Form.Label>Nome</Form.Label>
            </Form.Floating>
            {erroNome && <span className="text-danger">{erroNome}</span>}
          </Form.Group>
          <Form.Group className="d-flex justify-content-end mt-3">
            <Button type="submit" variant="primary">
              Criar Time
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCriarTime;
