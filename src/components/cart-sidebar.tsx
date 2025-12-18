'use client';

import { useCart, ADDON_ITEMS } from '../contexts/CartContext';
import { FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const CartSidebar = () => {
  const { 
    isOpen, 
    closeCart, 
    items, 
    getTotal, 
    getItemCount, 
    removeItem, 
    updateQuantity,
    selectedAddons,
    toggleAddon,
    getAddonsTotal
  } = useCart();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 根据产品类型和总数量计算单价
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

  // 获取相同类型产品的总数量
  const getProductTotalQuantity = (productType: string | undefined): number => {
    if (!productType) return 0;
    return items
      .filter(item => item.productType === productType)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  // 计算单个商品应该显示的价格
  const getItemDisplayPrice = (item: typeof items[0]): number => {
    if (!item.productType) {
      return item.price;
    }
    const totalQuantity = getProductTotalQuantity(item.productType);
    return getUnitPrice(item.productType, totalQuantity);
  };


  // 计算商品小计（不包括附加产品）
  const getSubtotal = () => {
    return getTotal();
  };

  // 计算总价（商品 + 附加产品）
  const getGrandTotal = () => {
    return getSubtotal() + getAddonsTotal();
  };

  // 阻止背景滚动并强制设置宽度
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // 强制设置宽度为屏幕的三分之一
      if (sidebarRef.current) {
        const viewportWidth = window.innerWidth;
        const width = Math.min(viewportWidth / 3, 500);
        sidebarRef.current.style.width = `${width}px`;
        sidebarRef.current.style.maxWidth = '500px';
        sidebarRef.current.style.minWidth = '300px';
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* 购物车侧边栏 */}
      <div
        ref={sidebarRef}
        className={`cart-sidebar fixed top-0 right-0 h-full bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full relative">
          {/* 关闭按钮 - 右上角 */}
          <button
            onClick={closeCart}
            className="absolute top-6 right-6 text-white hover:text-gray-400 transition-colors z-10"
            aria-label="Close cart"
          >
            <FaTimes className="text-2xl" />
          </button>

          {/* 头部 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold">Cart • {getItemCount()} items</h2>
          </div>

          {/* 内容区域 */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              // 空购物车
              <div className="px-6 py-8">
                <p className="text-xl font-bold mb-8 text-center">
                  Your cart is empty
                </p>
              </div>
            ) : (
              // 有商品的购物车
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-gray-800 pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm md:text-base pr-2">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2"
                            aria-label="Remove item"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                        {(() => {
                          const unitPrice = getItemDisplayPrice(item);
                          const itemTotal = unitPrice * item.quantity;
                          return (
                            <>
                              <p className="text-gray-400 text-xs mb-3">
                                £{unitPrice.toFixed(2)} each
                              </p>
                              {/* 数量控制 */}
                              <div className="flex items-center gap-3 mb-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded hover:bg-gray-800 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <FaMinus className="text-xs" />
                                </button>
                                <span className="text-white font-semibold min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded hover:bg-gray-800 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <FaPlus className="text-xs" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-white">
                                  £{itemTotal.toFixed(2)}
                                </p>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 固定的附加产品 */}
            <div className="px-6 pb-6 border-t border-gray-800 pt-6">
              <div className="space-y-4">
                {ADDON_ITEMS.map((addon) => (
                  <div
                    key={addon.id}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={addon.image}
                      alt={addon.name}
                      className="w-16 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{addon.name}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-bold text-sm">
                          £{addon.price.toFixed(2)}
                        </p>
                        {addon.originalPrice && (
                          <p className="text-gray-500 text-xs line-through">
                            £{addon.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* 切换开关 */}
                    <button
                      onClick={() => toggleAddon(addon.id)}
                      className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                        selectedAddons[addon.id] ? 'bg-purple-500' : 'bg-gray-700'
                      }`}
                      aria-label={`Toggle ${addon.name}`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          selectedAddons[addon.id] ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 小计和总计 */}
            <div className="px-6 pb-6 border-t border-gray-800 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Subtotal</span>
                <span className="text-white font-semibold">£{getSubtotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="p-6 border-t border-gray-800">
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 text-center transition-colors"
            >
              Check out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;

