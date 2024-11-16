import axios from '../axios.config';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { Container } from 'react-bootstrap';
import CardTimes from '../components/CardTimes';

const Times = () => {
  const { user } = useContext(AuthContext);
  const [seusTimes, setSeusTimes] = useState([]);
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
      {!seusTimes && <div>Você ainda não tem nenhum time...</div>}
      {seusTimes.map((time) => (
        <CardTimes
          key={time.id}
          nome={time.nome}
          desenvolvedores={time.Usuarios}
        />
      ))}
    </Container>
  );
};

export default Times;
