import { toast } from 'react-toastify';
import axios from '../axios.config';
import { Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../context/authContext';
import { useContext, useEffect, useState } from 'react';

const ModalTime = ({ show, setShow, time, setTimes }) => {
  const { user } = useContext(AuthContext);
  const [ehAdmin, setEhAdmin] = useState(false);
  useEffect(() => {
    time.Usuarios.forEach(
      (usuario) =>
        usuario.UsuarioTime.admin &&
        usuario.UsuarioTime.desenvolvedor_id === user.id &&
        setEhAdmin(true),
    );
  }, [user]);
  const deletarMembro = async (usuario) => {
    try {
      const res = await axios.delete(
        `/times/${usuario.UsuarioTime.time_id}/desenvolvedor/${usuario.id}/membro`,
      );
      setTimes((prevTimes) =>
        prevTimes.map((time) =>
          time.id === usuario.UsuarioTime.time_id
            ? {
                ...time,
                Usuarios: time.Usuarios.filter(
                  (user) => usuario.id !== user.id,
                ),
              }
            : time,
        ),
      );
      toast.success('Membro excluído com sucesso');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const deletarTime = async () => {
    try {
      const res = await axios.delete(
        `/times/${time.id}/desenvolvedor/${user.id}`,
      );
      setTimes((prevtimes) =>
        prevtimes.filter((prevTime) => prevTime.id !== time.id),
      );
      toast.success('Time excluído com sucesso');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Time: {time.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Membros:</h6>
        <ul>
          {time.Usuarios.map((usuario) => (
            <li key={usuario.id}>
              {usuario.nome}
              {ehAdmin && usuario.UsuarioTime.desenvolvedor_id !== user.id && (
                <i
                  className="bi bi-trash-fill text-danger"
                  style={{ cursor: 'pointer' }}
                  onClick={() => deletarMembro(usuario)}
                ></i>
              )}
              {!ehAdmin && usuario.UsuarioTime.desenvolvedor_id === user.id && (
                <i
                  className="bi bi-trash-fill text-danger"
                  style={{ cursor: 'pointer' }}
                  onClick={() => deletarMembro(usuario)}
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
        {ehAdmin && (
          <Button variant="danger" onClick={deletarTime}>
            Excluir Time
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTime;
