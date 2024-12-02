import axios from '../axios.config';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { Button, Container, Tab, Tabs } from 'react-bootstrap';
import CardTimes from '../components/CardTimes';
import ModalCriarTime from '../components/ModalCriarTime';

const Times = () => {
  const { user } = useContext(AuthContext);
  const [seusTimes, setSeusTimes] = useState([]);
  const [timesDisponiveis, setTimesDisponiveis] = useState([]);
  const [showModalCriarTime, setShowModalCriarTime] = useState(false);
  const [alterou, setAlterou] = useState(0);
  useEffect(() => {
    const carregaDados = async () => {
      const res = await axios.get(`/times/desenvolvedor/${user.id}`);
      setSeusTimes(res.data);
    };
    carregaDados();
  }, []);
  useEffect(() => {
    const carregaTimes = async () => {
      const res = await axios.get('/times/disponiveis');
      setTimesDisponiveis(res.data);
    };
    carregaTimes();
  }, [alterou]);

  return (
    <Container>
      <h1 className="text-center">Times</h1>
      <Tabs defaultActiveKey="Seus Times">
        <Tab eventKey="Seus Times" title="Seus Times">
          <div className="d-flex justify-content-end me-5 mb-2 mt-2">
            <Button
              variant="primary"
              onClick={() => setShowModalCriarTime(true)}
            >
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
                time={time}
                setSeusTimes={setSeusTimes}
                qualTab="seus times"
                alterou={alterou}
                setAlterou={setAlterou}
              />
            ))}
          </Container>
        </Tab>
        <Tab eventKey="Times disponíveis" title="Times disponíveis">
          {!timesDisponiveis && <div>Você ainda não tem nenhum time...</div>}
          <Container
            fluid
            className="d-flex flex-wrap flex-sm-column flex-md-row justify-content-center justify-content-md-start mt-2"
          >
            {timesDisponiveis.map((time) => (
              <CardTimes
                key={time.id}
                time={time}
                setTimesDisponiveis={setTimesDisponiveis}
                setSeusTimes={setSeusTimes}
                qualTab="times disponiveis"
              />
            ))}
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Times;
