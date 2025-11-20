
import React, { useState } from 'react';
import { RECENT_ORDERS } from '../constants';
import { Order } from '../types';
import { Eye, Trash2, X, CheckCircle, Clock, Truck, Package, AlertCircle, ChevronDown, Filter, Calendar } from 'lucide-react';

const STATUS_OPTIONS = [
  'Pendente',
  'Em Produção',
  'Enviado',
  'Entregue',
  'Cancelado'
];

export const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(RECENT_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('Todos');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400';
      case 'Em Produção': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400';
      case 'Enviado': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400';
      case 'Cancelado': return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400';
      default: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400';
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (newStatus: string) => {
    if (selectedOrder) {
      const updatedOrder = { ...selectedOrder, status: newStatus };
      setSelectedOrder(updatedOrder);
      setOrders(orders.map(o => o.id === selectedOrder.id ? updatedOrder : o));
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Tem a certeza que deseja eliminar este pedido? Esta ação não pode ser desfeita.')) {
      setOrders(orders.filter(o => o.id !== orderId));
      if (selectedOrder?.id === orderId) {
        handleCloseModal();
      }
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'Todos' || order.status === filterStatus;
    const matchesStart = startDate ? order.date >= startDate : true;
    const matchesEnd = endDate ? order.date <= endDate : true;
    return matchesStatus && matchesStart && matchesEnd;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pedidos</h2>
          <p className="text-slate-500 dark:text-slate-400">Gira e acompanhe o status dos pedidos.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
            {/* Date Filter */}
            <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-sm">
                <div className="px-2 text-slate-400 border-r border-slate-100 dark:border-slate-700">
                    <Calendar className="w-4 h-4" />
                </div>
                <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent border-none text-slate-600 dark:text-slate-300 text-sm px-2 py-1.5 focus:ring-0 outline-none w-32"
                    placeholder="Início"
                />
                <span className="text-slate-300 dark:text-slate-600">-</span>
                <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-transparent border-none text-slate-600 dark:text-slate-300 text-sm px-2 py-1.5 focus:ring-0 outline-none w-32"
                    placeholder="Fim"
                />
            </div>

            {/* Status Filter */}
            <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full sm:w-auto appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 pl-10 pr-10 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer shadow-sm h-[42px]"
                >
                    <option value="Todos">Todos os Status</option>
                    {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Itens</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  #{order.id}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {new Date(order.date).toLocaleDateString('pt-PT')}
                </td>
                 <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {order.items}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                  € {order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition-colors"
                      title="Ver Detalhes"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteOrder(order.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                      title="Eliminar Pedido"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                  Nenhum pedido encontrado para os filtros selecionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Pedido #{selectedOrder.id}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Realizado em {new Date(selectedOrder.date).toLocaleDateString('pt-PT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Updater */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                <label className="block text-sm font-medium text-indigo-900 dark:text-indigo-300 mb-2">
                  Atualizar Status do Pedido
                </label>
                <div className="relative">
                  <select 
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateStatus(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-slate-900 dark:text-white py-2.5 px-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none cursor-pointer"
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Customer & Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                   <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                     <Package className="w-4 h-4" /> Cliente
                   </h4>
                   <p className="font-medium text-slate-900 dark:text-white text-lg">{selectedOrder.customerName}</p>
                   <p className="text-slate-500 dark:text-slate-400 text-sm">cliente@email.com</p>
                   <p className="text-slate-500 dark:text-slate-400 text-sm">+351 912 345 678</p>
                </div>
                <div className="space-y-1">
                   <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                     <Truck className="w-4 h-4" /> Entrega
                   </h4>
                   <p className="text-slate-700 dark:text-slate-300 text-sm">Rua das Flores, 123</p>
                   <p className="text-slate-700 dark:text-slate-300 text-sm">1200-001 Lisboa</p>
                   <p className="text-slate-700 dark:text-slate-300 text-sm">Portugal</p>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-700" />

              {/* Mocked Items List */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Itens do Pedido</h4>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                   {Array.from({ length: selectedOrder.items }).map((_, i) => (
                     <div key={i} className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                              <Package className="w-5 h-5 text-slate-400" />
                           </div>
                           <div>
                              <p className="text-sm font-medium text-slate-900 dark:text-white">Produto Exemplo {i + 1}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Categoria: Impressão</p>
                           </div>
                        </div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">€ {(selectedOrder.total / selectedOrder.items).toFixed(2)}</p>
                     </div>
                   ))}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="font-medium text-slate-900 dark:text-white">Total do Pedido</span>
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">€ {selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex justify-between">
              <button 
                onClick={() => handleDeleteOrder(selectedOrder.id)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4" /> Eliminar Pedido
              </button>
              <button 
                onClick={handleCloseModal}
                className="px-6 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};