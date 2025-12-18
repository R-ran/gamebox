'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  productType?: 'console' | 'horizon'; // 产品类型，用于动态价格计算
}

export interface AddonItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  selectedAddons: Record<string, boolean>;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleAddon: (id: string) => void;
  getSelectedAddons: () => AddonItem[];
  getAddonsTotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// 固定的附加产品列表（导出供其他组件使用）
export const ADDON_ITEMS: AddonItem[] = [
  {
    id: 'protective-case',
    name: 'Protective Case',
    price: 4.99,
    originalPrice: 11.99,
    image: '/case.avif'
  },
  {
    id: 'protective-case-x2',
    name: 'Protective Casex2',
    price: 9.99,
    originalPrice: 23.99,
    image: '/case.avif'
  },
  {
    id: 'multiplayer-kit-x2',
    name: 'Multiplayer Kitx2',
    price: 19.99,
    originalPrice: 28.00,
    image: '/wifi-dongle.avif'
  },
  {
    id: 'extended-warranty',
    name: 'Extended 5 years warranty',
    price: 6.99,
    image: '/extend.webp'
  },
  {
    id: 'shipping-protection',
    name: 'Shipping Protection',
    price: 4.99,
    image: '/protect.webp'
  }
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setSelectedAddons({});
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getSelectedAddons = (): AddonItem[] => {
    return ADDON_ITEMS.filter(addon => selectedAddons[addon.id]);
  };

  const getAddonsTotal = (): number => {
    return ADDON_ITEMS.reduce((total, addon) => {
      return total + (selectedAddons[addon.id] ? addon.price : 0);
    }, 0);
  };

  // 根据产品类型和数量计算单价
  const getUnitPrice = (productType: string | undefined, totalQuantity: number): number => {
    if (productType === 'horizon') {
      if (totalQuantity === 1) return 54.99;
      if (totalQuantity === 2) return 93.48 / 2; // 46.74
      if (totalQuantity === 4) return 164.97 / 4; // 41.24
      // 如果数量不是1、2、4，使用最接近的定价规则
      if (totalQuantity < 2) return 54.99;
      if (totalQuantity < 4) return 93.48 / 2;
      return 164.97 / 4;
    } else if (productType === 'console') {
      if (totalQuantity === 1) return 39.99;
      if (totalQuantity === 2) return 67.98 / 2; // 33.99
      if (totalQuantity === 4) return 135.96 / 4; // 33.99
      // 如果数量不是1、2、4，使用最接近的定价规则
      if (totalQuantity < 2) return 39.99;
      if (totalQuantity < 4) return 67.98 / 2;
      return 135.96 / 4;
    }
    // 如果没有产品类型，使用原价
    return 0;
  };

  // 计算相同产品的总数量（用于价格计算）
  const getProductTotalQuantity = (productType: string | undefined): number => {
    if (!productType) return 0;
    return items
      .filter(item => item.productType === productType)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotal = () => {
    // 按产品类型分组计算
    const productGroups: { [key: string]: CartItem[] } = {};
    
    items.forEach(item => {
      const key = item.productType || 'other';
      if (!productGroups[key]) {
        productGroups[key] = [];
      }
      productGroups[key].push(item);
    });

    let total = 0;
    
    Object.keys(productGroups).forEach(key => {
      if (key === 'other') {
        // 其他产品使用原价
        productGroups[key].forEach(item => {
          total += item.price * item.quantity;
        });
      } else {
        // 相同类型产品的总数量
        const totalQuantity = productGroups[key].reduce((sum, item) => sum + item.quantity, 0);
        // 根据总数量计算单价
        const unitPrice = getUnitPrice(key, totalQuantity);
        // 计算该类型产品的总价
        total += unitPrice * totalQuantity;
      }
    });

    return total;
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        selectedAddons,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleAddon,
        getSelectedAddons,
        getAddonsTotal,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

