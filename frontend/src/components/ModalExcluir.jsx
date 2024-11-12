import { useContext } from 'react';
import axios from '../axios.config';
import { Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';

const ModalExcluir = ({ show, setShow, id, setState }) => {
  const { user } = useContext(AuthContext);
  const handleClose = () => setShow(false);
  const excluir = async () => {
    try {
      const res = await axios.delete(
        `/usuarios/clientes/${user.id}/pedidos-softwares/${id}`,
      );
      setState((prevState) => prevState.filter((item) => item.id !== id));
      if (res.status === 204) {
        toast.success('Pedido de software excluído com sucesso');
      }
    } catch (error) {
      toast.error(
        'Ocorreu um erro ao excluir o pedido de software ' +
          error.response.data.error,
      );
    }
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Pedido de Software</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja excluir o pedido de software?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button onClick={excluir} variant="danger">
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalExcluir;
