import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TableDataPedido from './TableDataPedido';

function TabsPedidos({
  pedidos,
  setPedidos,
  pedidosTimes,
  setPedidosTimes,
  pedidosPendentes,
  setPedidosPendentes,
  pedidosPendentesTimes,
  setPedidosPendentesTimes,
}) {
  return (
    <Tabs defaultActiveKey="Pedidos de Software individuais" id="example-tabs">
      <Tab
        eventKey="Pedidos de Software individuais"
        title="Pedidos de Software individuais"
      >
        <h3 className="text-center">Seus Pedidos de Software individuais</h3>
        {pedidos.length === 0 ? (
          <div className="text-center">Não há nenhum Pedido de Software</div>
        ) : (
          <TableDataPedido
            th={['Título', 'Descrição', 'Ações']}
            pedidos={pedidos}
            setPedidos={setPedidos}
          />
        )}
      </Tab>
      <Tab
        eventKey="Pedidos de Softwares por times"
        title="Pedidos de Softwares por times"
      >
        <h3 className="text-center">Seus Pedidos de Softwares por times</h3>
        {pedidosTimes.length === 0 ? (
          <div className="text-center">Não há nenhum Pedido de Software</div>
        ) : (
          <TableDataPedido
            th={['Título', 'Descrição', 'time', 'Ações']}
            pedidos={pedidosTimes}
            setPedidos={setPedidosTimes}
          />
        )}
      </Tab>
      <Tab
        eventKey="Pedidos de Software Individuais pendentes"
        title="Pedidos de Software Individuais pendentes"
      >
        <h3 className="text-center">
          Seus Pedidos de Software Individuais pendentes
        </h3>
        {pedidosPendentes.length === 0 ? (
          <div className="text-center">Não há nenhum Pedido de Software</div>
        ) : (
          <TableDataPedido
            th={['Título', 'Descrição', 'Ações']}
            pedidos={pedidosPendentes}
            setPedidos={setPedidosPendentes}
          />
        )}
      </Tab>
      <Tab
        eventKey="Pedidos de Softwares pendentes por times"
        title="Pedidos de Softwares pendentes por times"
      >
        <h3 className="text-center">
          Seus Pedidos de Softwares pendentes por times
        </h3>
        {pedidosPendentesTimes.length === 0 ? (
          <div className="text-center">Não há nenhum Pedido de Software</div>
        ) : (
          <TableDataPedido
            th={['Título', 'Descrição', 'time', 'Ações']}
            pedidos={pedidosPendentesTimes}
            setPedidos={setPedidosPendentesTimes}
          />
        )}
      </Tab>
    </Tabs>
  );
}

export default TabsPedidos;
