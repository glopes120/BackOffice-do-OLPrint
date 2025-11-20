
import { Product, Order } from './types';
import { LayoutDashboard, Package, ShoppingCart, Settings, PieChart, TrendingUp, Users } from 'lucide-react';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Epson EcoTank L3250',
    brand: 'Epson',
    category: 'Impressoras',
    price: 249.90,
    stock: 12,
    description: 'Impressora multifuncional com tanque de tinta, conexão Wi-Fi Direct e alta economia.',
    imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '2',
    name: 'Kit Tinta Epson 664 (CMYK)',
    brand: 'Epson',
    category: 'Tinteiros',
    price: 39.90,
    stock: 45,
    description: 'Kit completo de tintas originais Epson T664 para linha EcoTank.',
    imageUrl: 'https://images.unsplash.com/photo-1585351065103-89f772420bb8?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '3',
    name: 'Papel Fotográfico Glossy A4 180g',
    brand: 'Outras',
    category: 'Papéis',
    price: 12.50,
    stock: 100,
    description: 'Pacote com 50 folhas de papel fotográfico alto brilho, secagem instantânea.',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '4',
    name: 'Canon Mega Tank G3110',
    brand: 'Canon',
    category: 'Impressoras',
    price: 189.00,
    stock: 5,
    description: 'Multifuncional tanque de tinta com LCD e conexão sem fio.',
    imageUrl: 'https://images.unsplash.com/photo-1562254492-377a3ac576f4?auto=format&fit=crop&w=300&q=80'
  }
];

export const RECENT_ORDERS: Order[] = [
  { id: 'ORD-001', customerName: 'Carlos Silva', date: '2024-05-20', total: 249.90, status: 'Em Produção', items: 1 },
  { id: 'ORD-002', customerName: 'Escritório Contábil Ltda', date: '2024-05-19', total: 85.00, status: 'Enviado', items: 10 },
  { id: 'ORD-003', customerName: 'Ana Maria', date: '2024-05-18', total: 12.50, status: 'Entregue', items: 1 },
  { id: 'ORD-004', customerName: 'João Pedro', date: '2024-05-18', total: 45.50, status: 'Pendente', items: 3 },
  { id: 'ORD-005', customerName: 'Studio Design', date: '2024-05-17', total: 350.00, status: 'Em Produção', items: 2 },
];

export const DASHBOARD_STATS = [
  { label: 'Receita Total', value: '€ 28.500', icon: TrendingUp, change: '+12%', color: 'text-emerald-600' },
  { label: 'Pedidos Ativos', value: '45', icon: ShoppingCart, change: '+5%', color: 'text-blue-600' },
  { label: 'Novos Clientes', value: '120', icon: Users, change: '+18%', color: 'text-purple-600' },
  { label: 'Estoque Crítico', value: '3', icon: Package, change: '-2', color: 'text-orange-600' },
];

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Produtos', icon: Package },
  { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
  { id: 'settings', label: 'Configurações', icon: Settings },
];