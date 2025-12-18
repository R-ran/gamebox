'use client';

import { CartProvider } from '../contexts/CartContext';
import CartSidebar from './cart-sidebar';

export default function CartProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
      <CartSidebar />
    </CartProvider>
  );
}

