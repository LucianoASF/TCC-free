import { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../context/authContext';
import axios from '../axios.config';
import { toast } from 'react-toastify';

const ModalCriarSoftware = ({ show, setShow, pedidos, setPedidos }) => {
  const { user } = useContext(AuthContext);
  const handleClose = () => setShow(false);
  const [titulo, setTitulo] = useState('');
  const [erroTitulo, setErroTitulo] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [erroDescricao, setErroDescricao] = useState(false);

  const valida = () => {
    if (titulo.length < 5 || titulo.length > 60) {
      setErroTitulo('O título deve ter entre 5 e 60 caracteres');
      return false;
    } else {
      setErroTitulo('');
    }
    if (descricao.length < 10) {
      setErroDescricao('A descrição deve ter pelo menos 10 caracteres');
      return false;
    } else {
      setErroDescricao('');
    }
    return true;
  };

  const aoSubmeter = async (e) => {
    e.preventDefault();
    if (!valida()) return;
    const dados = { titulo, descricao };
    try {
      const res = await axios.post(
        `/usuarios/clientes/${user.id}/pedidos-softwares`,
        dados,
      );
      console.log(res.data);

      if (res.status === 201) {
        toast.success('Pedido de Software criado com sucesso');
        setPedidos([...pedidos, res.data]);
        handleClose();
        setTitulo('');
        setDescricao('');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao criar o Pedido de Software');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Pedido de Software</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => aoSubmeter(e)}>
          <Form.Group controlId="titulo">
            <Form.Floating>
              <Form.Control
                type="text"
                required
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <Form.Label>Título</Form.Label>
            </Form.Floating>
            {erroTitulo && <span className="text-danger">{erroTitulo}</span>}
          </Form.Group>
          <Form.Group className="mt-3" controlId="descrição">
            <Form.Floating>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Descrição"
                style={{ height: '200px' }}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <Form.Label>Descrição</Form.Label>
            </Form.Floating>
            {erroDescricao && (
              <span className="text-danger">{erroDescricao}</span>
            )}
          </Form.Group>
          <Form.Group className="d-flex justify-content-end mt-3">
            <Button type="submit" variant="primary">
              Criar Pedido de Software
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

export default ModalCriarSoftware;
