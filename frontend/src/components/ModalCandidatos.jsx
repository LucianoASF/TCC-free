import { useEffect, useState } from 'react';
import axios from '../axios.config';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ModalCandidatos = ({ show, setShow, pedido }) => {
  const [devs, setDevs] = useState([]);
  const [times, setTimes] = useState([]);
  const handleClose = () => setShow(false);
  useEffect(() => {
    const carregarDevsETimes = async () => {
      try {
        if (pedido.id) {
          const resDev = await axios.get(
            `/usuarios/clientes/pedidos-softwares/${pedido.id}/candidatos/desenvolvedores`,
          );
          setDevs(resDev.data);
          const resTime = await axios.get(
            `/usuarios/clientes/pedidos-softwares/${pedido.id}/candidatos/times`,
          );
          setTimes(resTime.data);
        }
      } catch (error) {}
    };
    carregarDevsETimes();
  }, [pedido]);

  const aceitar = async (data, devOuTime) => {
    try {
      if (devOuTime === 'time') {
        await axios.put(
          `/usuarios/clientes/pedidos-softwares/${pedido.id}/time/${data.id}/desenvolvedor/0`,
        );
        setTimes((prevTimes) =>
          prevTimes.map(
            (time) =>
              time.id === data.id && {
                ...time,
                TimePedidoSoftware: {
                  ...time.TimePedidoSoftware,
                  aceito: true,
                },
              },
          ),
        );
        setDevs([]);
      } else if (devOuTime === 'dev') {
        await axios.put(
          `/usuarios/clientes/pedidos-softwares/${pedido.id}/time/0/desenvolvedor/${data.id}`,
        );
        setDevs((prevDsetDevs) =>
          prevDsetDevs.map(
            (dev) =>
              dev.id === data.id && {
                ...dev,
                UsuarioPedidoSoftware: {
                  ...dev.UsuarioPedidoSoftware,
                  aceito: true,
                },
              },
          ),
        );
        setTimes([]);
      }
      handleClose();
      toast.success('Desenvolvedor ou time aceito com sucesso');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Desenvolvedor(es)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {devs.length === 0 && times.length === 0 && (
          <p>Sem candidatos ainda!</p>
        )}
        <ul>
          {devs.map((dev) => (
            <li key={'dev_id: ' + dev.id}>
              {dev.nome}{' '}
              {dev.UsuarioPedidoSoftware.aceito ? (
                <strong className="text-primary">Aceito</strong>
              ) : (
                <i
                  className="bi bi-check-lg text-success"
                  style={{ cursor: 'pointer' }}
                  onClick={() => aceitar(dev, 'dev')}
                ></i>
              )}
            </li>
          ))}
          {times.map((time) => (
            <li key={'time_id: ' + time.id}>
              {time.nome}{' '}
              {time.TimePedidoSoftware.aceito ? (
                <strong className="text-primary">Aceito</strong>
              ) : (
                <i
                  className="bi bi-check-lg text-success"
                  style={{ cursor: 'pointer' }}
                  onClick={() => aceitar(time, 'time')}
                ></i>
              )}
            </li>
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
