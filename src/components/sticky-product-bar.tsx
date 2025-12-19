'use client';

import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

interface StickyProductBarProps {
  productName: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  selectedColor?: string;
  colors?: string[];
  onColorChange?: (color: string) => void;
  onAddToCart: () => void;
}

const StickyProductBar = ({
  productName,
  price,
  originalPrice,
  discountPercent,
  selectedColor,
  colors,
  onColorChange,
  onAddToCart,
}: StickyProductBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [openColorDropdown, setOpenColorDropdown] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const lastScrollY = useRef(0);
  const colorDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 只有在滚动超过一定距离后才显示/隐藏
      if (currentScrollY > 200) {
        // 向下滚动显示，向上滚动隐藏
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击外部关闭颜色下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target as Node)) {
        setOpenColorDropdown(false);
      }
    };

    if (openColorDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openColorDropdown]);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50 shadow-lg transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* 左侧：产品名称和价格 */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold truncate mb-1">{productName}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl font-bold">£{price.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">£{originalPrice.toFixed(2)}</span>
              <span className="bg-pink-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                SAVE {discountPercent}%
              </span>
            </div>
          </div>

          {/* 中间：颜色选择器（如果有颜色选项） */}
          {colors && colors.length > 0 && selectedColor && onColorChange && (
            <div className="relative" ref={colorDropdownRef}>
              <button
                onClick={() => setOpenColorDropdown(!openColorDropdown)}
                className="bg-purple-600 border-2 border-purple-500 rounded-lg px-4 py-2 text-white flex items-center gap-2 cursor-pointer hover:bg-purple-700 transition whitespace-nowrap"
                style={{ backgroundColor: '#9333ea' }}
              >
                <span className="text-sm">{selectedColor}</span>
                {openColorDropdown ? (
                  <FaChevronUp className="text-xs" />
                ) : (
                  <FaChevronDown className="text-xs" />
                )}
              </button>
              {openColorDropdown && (
                <div className="absolute bottom-full left-0 mb-1 w-full bg-purple-600 border-2 border-purple-500 rounded-lg overflow-hidden shadow-lg z-50" style={{ backgroundColor: '#9333ea' }}>
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        onColorChange(color);
                        setOpenColorDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-white hover:bg-purple-700 transition text-sm ${
                        selectedColor === color ? 'bg-purple-800' : ''
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 右侧：添加到购物车按钮 */}
          <div className="flex flex-col items-end">
            <button
              onClick={() => {
                onAddToCart();
                setShowSuccess(true);
                setTimeout(() => {
                  setShowSuccess(false);
                }, 3000);
              }}
              className="bg-white text-black font-bold px-6 py-2 rounded whitespace-nowrap hover:bg-gray-100 transition"
            >
              ADD TO CART
            </button>
            {showSuccess && (
              <p className="text-green-400 text-xs mt-1 animate-fade-in whitespace-nowrap">
                Added to cart successfully!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyProductBar;

