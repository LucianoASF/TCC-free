import { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../context/authContext';
import axios from '../axios.config';
import { toast } from 'react-toastify';

const ModalAtualizarSoftware = ({
  show,
  setShow,
  pedidos,
  setPedidos,
  idPedidoSoftware,
}) => {
  const { user } = useContext(AuthContext);
  const handleClose = () => setShow(false);
  const [titulo, setTitulo] = useState('');
  const [erroTitulo, setErroTitulo] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [erroDescricao, setErroDescricao] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      if (idPedidoSoftware !== 0) {
        const res = await axios.get(
          `/usuarios/clientes/${user.id}/pedidos-softwares/${idPedidoSoftware}`,
        );
        setTitulo(res.data.titulo);
        setDescricao(res.data.descricao);
      }
    };
    carregarDados();
  }, [idPedidoSoftware]);

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
      const res = await axios.put(
        `/usuarios/clientes/${user.id}/pedidos-softwares/${idPedidoSoftware}`,
        dados,
      );
      console.log(res.data);

      if (res.status === 200) {
        toast.success('Pedido de Software atualizado com sucesso');
        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.id === idPedidoSoftware ? res.data : pedido,
          ),
        );
        handleClose();
      }
    } catch (error) {
      toast.error(error.response.data.error);
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
              Atualizar Pedido de Software
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

export default ModalAtualizarSoftware;
