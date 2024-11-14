import axios from '../axios.config';
import { useEffect, useState } from 'react';
import CardPedido from '../components/CardPedido';
import { Container } from 'react-bootstrap';

const PedidosSoftware = () => {
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    const carregaPedidos = async () => {
      const res = await axios.get('/usuarios/pedidos-softwares/disponiveis');
      setPedidos(res.data);
    };
    carregaPedidos();
  }, []);

  return (
    <>
      <h1 className="text-center mt-2">Pedidos de Software</h1>
      <Container className="d-flex flex-wrap">
        {pedidos.map((pedido) => (
          <CardPedido
            key={pedido.id}
            titulo={pedido.titulo}
            descricao={pedido.descricao}
          />
        ))}
      </Container>
    </>
  );
};

export default PedidosSoftware;
