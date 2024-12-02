import { useEffect, useState } from 'react';
import axios from '../axios.config';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ModalCandidatos = ({ show, setShow, idPedido }) => {
  const [devs, setDevs] = useState([]);
  const handleClose = () => setShow(false);
  useEffect(() => {
    const carregarDevs = async () => {
      try {
        const res = await axios.get(
          `/usuarios/clientes/pedidos-softwares/${idPedido}/candidatos`,
        );
        console.log(res.data);

        setDevs(res.data);
      } catch (error) {}
    };
    carregarDevs();
  }, [idPedido]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Desenvolvedor(es)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Desenvolvedores e times candidatos</h6>
        {devs.length === 0 && <p>Sem candidatos ainda!</p>}
        <ul>
          {devs.map((dev) => (
            <li key={dev.id}>{dev.nome}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCandidatos;
