import axios from '../axios.config';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import ModalCriarSoftware from '../components/ModalCriarSoftware';
import ModalAtualizarSoftware from '../components/ModalAtualizarSoftware';
import ModalExcluir from '../components/ModalExcluir';

const SeusPedidosSoftwares = () => {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [showCriar, setShowCriar] = useState(false);
  const [showExcluir, setShowExcluir] = useState(false);
  const [showAtualizar, setShowAtualizar] = useState(false);
  const [idPedidoSoftware, setIdPedidoSoftware] = useState(0);
  useEffect(() => {
    const carregaDados = async () => {
      const res = await axios.get(
        `/usuarios/clientes/${user.id}/pedidos-softwares`,
      );
      setPedidos(res.data);
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.titulo}</td>
                <td>{pedido.descricao}</td>
                <td className="d-flex flex-column flex-md-row  gap-2">
                  <Button
                    onClick={() => {
                      setIdPedidoSoftware(pedido.id);
                      setShowAtualizar(true);
                    }}
                    variant="success"
                  >
                    Atualizar
                  </Button>
                  <Button
                    onClick={() => {
                      setIdPedidoSoftware(pedido.id);
                      setShowExcluir(true);
                    }}
                    variant="danger"
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
            <ModalAtualizarSoftware
              show={showAtualizar}
              setShow={setShowAtualizar}
              pedidos={pedidos}
              setPedidos={setPedidos}
              idPedidoSoftware={idPedidoSoftware}
            />
            <ModalExcluir
              show={showExcluir}
              setShow={setShowExcluir}
              setState={setPedidos}
              id={idPedidoSoftware}
            />
          </tbody>
        </Table>
      )}
    </Container>
  ) : (
    <Container>
      <h1>Olá mundo</h1>
    </Container>
  );
};

export default SeusPedidosSoftwares;
