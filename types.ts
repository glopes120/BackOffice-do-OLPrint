
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

export type TabView = 'dashboard' | 'products' | 'orders' | 'settings';