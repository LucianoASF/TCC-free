import axios from '../axios.config';
import { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';

const ModalCriarAtualizarTime = ({ show, setShow, time = null, setTimes }) => {
  const { user } = useContext(AuthContext);
  const [nome, setNome] = useState(time?.nome || '');
  const [erroNome, setErroNome] = useState('');
  const [novosMembros, setNovosMembros] = useState(
    time?.aceitando_membros !== undefined ? time.aceitando_membros : true,
  );

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
    if (!time) {
      try {
        const res = await axios.post('/times', {
          nome,
          aceitando_membros: novosMembros,
        });
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
    } else {
      try {
        const res = await axios.put(`/times/${time.id}`, {
          nome,
          aceitando_membros: novosMembros,
        });
        if (res.status === 200) {
          setTimes((prevTimes) => prevTimes.filter((pt) => pt.id !== time.id));
          setTimes((prevtimes) => [...prevtimes, res.data]);
          toast.success('Time Atualizado com sucesso');
          handleClose();
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
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
          <Form.Check
            type="checkbox"
            label="Aceitar novos membros?"
            checked={novosMembros}
            onChange={(e) => {
              setNovosMembros(e.target.checked);
            }}
          />
          <Form.Group className="d-flex justify-content-end mt-3">
            <Button type="submit" variant="primary">
              {time ? 'Atualizar Time' : 'Criar Time'}
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

export default ModalCriarAtualizarTime;
