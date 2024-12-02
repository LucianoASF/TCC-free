import { useContext, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ModalExcluir from './ModalExcluir';
import ModalAtualizarSoftware from './ModalAtualizarSoftware';
import { AuthContext } from '../context/authContext';
import ModalCandidatos from './ModalCandidatos';

const TableDataPedido = ({ th, pedidos, setPedidos }) => {
  const { user } = useContext(AuthContext);
  const [showExcluir, setShowExcluir] = useState(false);
  const [showAtualizar, setShowAtualizar] = useState(false);
  const [showCandidatos, setShowCandidatos] = useState(false);
  const [idPedidoSoftware, setIdPedidoSoftware] = useState(0);
  return (
    <Table bordered hover>
      <thead>
        <tr>
          {th.map((t) => (
            <th key={t}>{t}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {pedidos.map((pedido) => (
          <tr key={pedido.id}>
            <td>{pedido.titulo}</td>
            <td>{pedido.descricao}</td>
            {th.includes('time') && <td>{pedido.nomeTime}</td>}
            <td className="d-flex flex-column flex-md-row  gap-2">
              {user.role === 'cliente' && (
                <>
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
                  <Button
                    onClick={() => {
                      setIdPedidoSoftware(pedido.id);
                      setShowCandidatos(true);
                    }}
                    variant="warning"
                  >
                    Desenvolvedor(es)
                  </Button>
                </>
              )}
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
        {user.role === 'cliente' && (
          <ModalCandidatos
            show={showCandidatos}
            setShow={setShowCandidatos}
            idPedido={idPedidoSoftware}
          />
        )}
      </tbody>
    </Table>
  );
};

export default TableDataPedido;
