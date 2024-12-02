import axios from '../axios.config';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import ModalCriarSoftware from '../components/ModalCriarSoftware';
import TableDataPedido from '../components/TableDataPedido';
import TabsPedidos from '../components/TabsPedidos';

const SeusPedidosSoftwares = () => {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [pedidosTimes, setPedidosTimes] = useState([]);
  const [pedidosPendentes, setPedidosPendentes] = useState([]);
  const [pedidosPendentesTimes, setPedidosPendentesTimes] = useState([]);
  const [showCriar, setShowCriar] = useState(false);

  useEffect(() => {
    const carregaDados = async () => {
      if (user.role === 'cliente') {
        const res = await axios.get(
          `/usuarios/clientes/${user.id}/pedidos-softwares`,
        );
        setPedidos(res.data);
      } else if (user.role === 'desenvolvedor') {
        let res = await axios.get(
          `/usuarios/desenvolvedor/${user.id}/pedidos-softwares`,
        );
        setPedidos(res.data);
        res = await axios.get(`/usuarios/${user.id}/times/pedidos-softwares`);
        setPedidosTimes(res.data);
        res = await axios.get(
          `/usuarios/desenvolvedor/${user.id}/pedidos-softwares/candidatados`,
        );
        setPedidosPendentes(res.data);
        res = await axios.get(
          `/usuarios/${user.id}/times/pedidos-softwares/pendentes`,
        );
        setPedidosPendentesTimes(res.data);
      }
    };
    carregaDados();
  }, [user]);

  return user.role === 'cliente' ? (
    <Container>
      <Row>
        <Col className="mt-2 d-flex justify-content-end">
          <Button
            variant="primary"
            className="mb-2"
            onClick={() => setShowCriar(true)}
          >
            Criar Pedido de Software
          </Button>
          <ModalCriarSoftware
            show={showCriar}
            setShow={setShowCriar}
            pedidos={pedidos}
            setPedidos={setPedidos}
          />
        </Col>
      </Row>
      {pedidos.length === 0 ? (
        <div className="text-center mt-5">Não há nenhum Pedido de Software</div>
      ) : (
        <TableDataPedido
          th={['Título', 'Descrição', 'Ações']}
          pedidos={pedidos}
          setPedidos={setPedidos}
        />
      )}
    </Container>
  ) : (
    <Container>
      <h1 className="text-center">Seus Pedidos</h1>
      <TabsPedidos
        pedidos={pedidos}
        setPedidos={setPedidos}
        pedidosTimes={pedidosTimes}
        setPedidosTimes={pedidosTimes}
        pedidosPendentes={pedidosPendentes}
        setPedidosPendentes={setPedidosPendentes}
        pedidosPendentesTimes={pedidosPendentesTimes}
        setPedidosPendentesTimes={setPedidosPendentesTimes}
      />
    </Container>
  );
};

export default SeusPedidosSoftwares;
