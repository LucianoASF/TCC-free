import axios from '../axios.config';
import { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ModalExcluir from './ModalExcluir';
import ModalAtualizarSoftware from './ModalAtualizarSoftware';
import { AuthContext } from '../context/authContext';
import ModalCandidatos from './ModalCandidatos';
import { toast } from 'react-toastify';

const TableDataPedido = ({ th, pedidos, setPedidos, timeOuDev = null }) => {
  const { user } = useContext(AuthContext);
  const [showExcluir, setShowExcluir] = useState(false);
  const [showAtualizar, setShowAtualizar] = useState(false);
  const [showCandidatos, setShowCandidatos] = useState(false);
  const [idPedidoSoftware, setIdPedidoSoftware] = useState(0);
  const [finalizados, setFinalizados] = useState({}); // Armazena o estado de finalização de cada pedido
  const [pedi, setPedi] = useState([]);

  // useEffect para verificar o estado de finalização de todos os pedidos
  useEffect(() => {
    const fetchFinalizados = async () => {
      const estados = {};
      for (const pedido of pedidos) {
        let res;
        if (user.role === 'cliente') {
          res = await axios.get(
            `/usuarios/clientes/pedidos-softwares/${pedido.id}`,
          );
        } else if (user.role === 'desenvolvedor') {
          res = await axios.get(
            `/usuarios/desenvolvedor/pedidos-softwares/${pedido.id}`,
          );
        }
        estados[pedido.id] = res.data.finalizado;
      }
      setFinalizados(estados);
    };

    fetchFinalizados();
  }, [pedidos, user.role]);

  // Função para finalizar um pedido
  const finaliza = async (id) => {
    try {
      if (user.role === 'cliente') {
        await axios.put(`/usuarios/clientes/pedidos-softwares/${id}`);
      } else if (user.role === 'desenvolvedor') {
        if (timeOuDev === 'time') {
          const res = await axios.get(
            `/usuarios/desenvolvedor/pedidos-softwares/${id}/aceito`,
          );
          await axios.put(
            `/usuarios/desenvolvedor/0/pedidos-softwares/${id}/time/${res.data.id}`,
          );
        } else if (timeOuDev === 'dev') {
          await axios.put(
            `/usuarios/desenvolvedor/${user.id}/pedidos-softwares/${id}/time/0`,
          );
        }
      }
      setFinalizados((prev) => ({ ...prev, [id]: true })); // Atualiza o estado local para refletir a mudança
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error);
      toast.error(error.response.data.error);
    }
  };

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
          <tr
            key={
              pedido.TimePedidoSoftware
                ? 'pedido_id:' +
                  String(pedido.id) +
                  'time_id:' +
                  String(pedido.TimePedidoSoftware.time_id)
                : pedido.id
            }
          >
            <td>{pedido.titulo}</td>
            <td>{pedido.descricao}</td>
            {th.includes('time') && <td>{pedido.nomeTime}</td>}
            {user.role === 'cliente' && (
              <td className="d-flex flex-column flex-md-row gap-2">
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
                      setPedi(pedido);
                      setShowCandidatos(true);
                    }}
                    variant="warning"
                  >
                    Desenvolvedor(es)
                  </Button>
                  {finalizados[pedido.id] ? (
                    <Button variant="info" disabled>
                      Finalizado
                    </Button>
                  ) : (
                    <Button
                      variant="info"
                      onClick={() => finaliza(pedido.id)}
                      disabled={finalizados[pedido.id]}
                    >
                      Finalizar
                    </Button>
                  )}
                </>
              </td>
            )}
            {user.role === 'desenvolvedor' && th.includes('Ações') && (
              <td className="d-flex flex-column flex-md-row gap-2">
                <>
                  {finalizados[pedido.id] ? (
                    <Button variant="info" disabled>
                      Finalizado
                    </Button>
                  ) : (
                    <Button
                      variant="info"
                      onClick={() => finaliza(pedido.id)}
                      disabled={finalizados[pedido.id]}
                    >
                      Finalizar
                    </Button>
                  )}
                </>
              </td>
            )}
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
            pedido={pedi}
          />
        )}
      </tbody>
    </Table>
  );
};

export default TableDataPedido;
