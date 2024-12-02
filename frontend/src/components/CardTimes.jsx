import axios from '../axios.config';
import { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ModalTime from './ModalTime';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';

const CardTimes = ({
  time,
  setTimesDisponiveis = null,
  setSeusTimes = null,
  qualTab,
  alterou,
  setAlterou,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  const entraNoTime = async () => {
    try {
      await axios.post(`/times/${time.id}/desenvolvedor/adiciona-membro`);
      setTimesDisponiveis((prevTimes) =>
        prevTimes.filter((pt) => pt.id !== time.id),
      );
      const novoTime = {
        ...time,
        Usuarios: [
          {
            id: user.id,
            nome: user.nome,
            UsuarioTime: { desenvolvedor_id: user.id, time_id: time.id },
          },
        ],
      };
      console.log(novoTime);

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
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Ver time
          </Button>
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
