import axios from '../axios.config';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { Button, Container } from 'react-bootstrap';
import CardTimes from '../components/CardTimes';
import ModalCriarTime from '../components/ModalCriarTime';

const Times = () => {
  const { user } = useContext(AuthContext);
  const [seusTimes, setSeusTimes] = useState([]);
  const [showModalCriarTime, setShowModalCriarTime] = useState(false);
  useEffect(() => {
    const carregaDados = async () => {
      const res = await axios.get(`/times/desenvolvedor/${user.id}`);
      setSeusTimes(res.data);
    };
    carregaDados();
  }, []);
  return (
    <Container>
      <h1 className="text-center">Seus Times</h1>
      <div className="d-flex justify-content-end me-5 mb-2">
        <Button variant="primary" onClick={() => setShowModalCriarTime(true)}>
          Criar Time
        </Button>
        <ModalCriarTime
          show={showModalCriarTime}
          setShow={setShowModalCriarTime}
          times={seusTimes}
          setTimes={setSeusTimes}
        />
      </div>
      {!seusTimes && <div>Você ainda não tem nenhum time...</div>}
      <Container
        fluid
        className="d-flex flex-wrap flex-sm-column flex-md-row justify-content-center justify-content-md-start"
      >
        {seusTimes.map((time) => (
          <CardTimes
            key={time.id}
            nome={time.nome}
            desenvolvedores={time.Usuarios}
          />
        ))}
      </Container>
    </Container>
  );
};

export default Times;
