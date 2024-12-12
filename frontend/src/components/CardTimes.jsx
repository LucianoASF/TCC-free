import axios from '../axios.config';
import { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ModalTime from './ModalTime';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';
import ModalCriarAtualizarTime from './ModalCriarAtualizarTime';

const CardTimes = ({
  time,
  setTimesDisponiveis = null,
  setSeusTimes = null,
  qualTab,
  alterou,
  setAlterou,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showAtualizar, setShowAtualizar] = useState(false);
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

  const entraNoTime = async () => {
    try {
      await axios.post(`/times/${time.id}/desenvolvedor/adiciona-membro`);
      setTimesDisponiveis((prevTimes) =>
        prevTimes.filter((pt) => pt.id !== time.id),
      );
      const novoTime = {
        ...time,
        Usuarios: [
          ...time.Usuarios,
          {
            id: user.id,
            nome: user.nome,
            UsuarioTime: {
              desenvolvedor_id: user.id,
              time_id: time.id,
              admin: false,
            },
          },
        ],
      };

      setSeusTimes((prevSeustimes) => [...prevSeustimes, novoTime]);
      toast.success('Entrou no time com sucesso');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{time.nome}</Card.Title>

        <ul className="list-unstyled m-0">
          {time.Usuarios.map((dev) => (
            <li key={dev.id}>{dev.nome}</li>
          ))}
        </ul>
      </Card.Body>
      <Card.Footer>
        {qualTab === 'seus times' && (
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Ver time
            </Button>
            {ehAdmin && (
              <>
                <Button
                  variant="warning"
                  onClick={() => setShowAtualizar(true)}
                >
                  Atualizar
                </Button>
                <ModalCriarAtualizarTime
                  show={showAtualizar}
                  setShow={setShowAtualizar}
                  setTimes={setSeusTimes}
                  time={time}
                />
              </>
            )}
          </div>
        )}
        {qualTab === 'times disponiveis' && (
          <Button variant="primary" onClick={entraNoTime}>
            Entrar no time
          </Button>
        )}
      </Card.Footer>
      {qualTab === 'seus times' && (
        <ModalTime
          show={showModal}
          setShow={setShowModal}
          time={time}
          setTimes={setSeusTimes}
          setAlterou={setAlterou}
          alterou={alterou}
        />
      )}
    </Card>
  );
};

export default CardTimes;
