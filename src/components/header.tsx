'use client';

import { FaShoppingCart, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { openCart, getItemCount } = useCart();
  
  // 下拉菜单配置
  const dropdownMenus = {
    console: [
      { label: 'Gamelab Horizon', href: '/gamelab-console/horizon' },
      { label: 'Gamelab Console', href: '/gamelab-console/console' },
    ],
    accessories: [
      { label: 'Wifi Dongle Pack', href: '/accessories/wifi-dongle' },
      { label: 'GameLab Protective Case', href: '/accessories/case' },
      { label: 'Gamelab Retro Headphones', href: '/accessories/headphones' },
    ],
    resources: [
      { label: 'Game Search', href: '/resources/game-search' },
     
    ],
  };

  // 点击外部区域关闭下拉菜单
  const dropdownRefs = {
    console: useRef<HTMLDivElement>(null),
    accessories: useRef<HTMLDivElement>(null),
    resources: useRef<HTMLDivElement>(null),
  };
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdownRef = dropdownRefs[openDropdown as keyof typeof dropdownRefs];
      
      // 检查点击是否在下拉菜单区域或导航栏内
      if (
        navRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }
      
      setOpenDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };
  return (
    <header className="bg-black text-white">
      {/* 顶部促销横幅 */}
      <div className="bg-black border-b border-gray-800 py-2 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          <div className="flex space-x-8">
            {['15,000 GAMES, 1 CONSOLE', 'BUY 3, GET 1 FREE!', '20+ LEGENDARY CONSOLES'].map((text, idx) => (
              <span key={idx} className="text-white text-xl font-medium mx-4 font-bold">{text}</span>
            ))}
          </div>
          <div className="flex space-x-8">
            {['15,000 GAMES, 1 CONSOLE', 'BUY 3, GET 1 FREE!', '20+ LEGENDARY CONSOLES'].map((text, idx) => (
              <span key={idx} className="text-white text-xl font-medium mx-4 font-bold">{text}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 主导航栏 */}
  <div className="container mx-auto px-4 py-4 space-y-4">
  {/* 第一行：仅 Logo，居中 */}
  <div className="flex justify-center">
    <Link href="/" className="text-6xl font-bold tracking-wide py-6">
      GAMELAB
    </Link>
  </div>

  {/* 第二行：菜单（居中） + 购物车（最右） */}
  <div className="flex flex-col" ref={navRef}>
    <div className="flex items-center">
      {/* 占位，让菜单真正居中 */}
      <div className="flex-1" />

      {/* 导航菜单 – 水平居中 */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/" className="hover:text-pink-400 transition">Home</Link>

        {/* Gamelab Console 下拉菜单 */}
        <div className="relative" ref={dropdownRefs.console}>
          <button
            onClick={() => toggleDropdown('console')}
            className={`hover:text-pink-400 transition flex items-center ${
              openDropdown === 'console' ? 'text-pink-400 underline' : ''
            }`}
          >
            Gamelab Console
            {openDropdown === 'console' ? (
              <FaChevronUp className="ml-1 text-xs" />
            ) : (
              <FaChevronDown className="ml-1 text-xs" />
            )}
          </button>
        </div>

        {/* Accessories 下拉菜单 */}
        <div className="relative" ref={dropdownRefs.accessories}>
          <button
            onClick={() => toggleDropdown('accessories')}
            className={`hover:text-pink-400 transition flex items-center ${
              openDropdown === 'accessories' ? 'text-pink-400 underline' : ''
            }`}
          >
            Accessories
            {openDropdown === 'accessories' ? (
              <FaChevronUp className="ml-1 text-xs" />
            ) : (
              <FaChevronDown className="ml-1 text-xs" />
            )}
          </button>
        </div>

        <Link href="/faqs" className="hover:text-pink-400 transition">FAQs</Link>

        {/* Resources 下拉菜单 */}
        <div className="relative" ref={dropdownRefs.resources}>
          <button
            onClick={() => toggleDropdown('resources')}
            className={`hover:text-pink-400 transition flex items-center ${
              openDropdown === 'resources' ? 'text-pink-400 underline' : ''
            }`}
          >
            Resources
            {openDropdown === 'resources' ? (
              <FaChevronUp className="ml-1 text-xs" />
            ) : (
              <FaChevronDown className="ml-1 text-xs" />
            )}
          </button>
        </div>

        <Link href="/about" className="hover:text-pink-400 transition">About Us</Link>
        <Link href="/contact" className="hover:text-pink-400 transition">Contact</Link>
        <Link href="/order" className="hover:text-pink-400 transition">Track Your Order</Link>
      </nav>

      {/* 占位，保证菜单居中 */}
      <div className="flex-1 flex justify-end">
        {/* 购物车 */}
        <button
          onClick={openCart}
          className="text-2xl hover:text-pink-400 transition relative"
          aria-label="Open shopping cart"
        >
          <FaShoppingCart />
          {getItemCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {getItemCount()}
            </span>
          )}
        </button>
      </div>
    </div>

    {/* 全宽下拉菜单 */}
    {openDropdown && (
      <div className="w-full bg-black border-t border-gray-800 py-4" ref={dropdownRefs[openDropdown as keyof typeof dropdownRefs]}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-2">
            {dropdownMenus[openDropdown as keyof typeof dropdownMenus].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 hover:text-pink-400 transition text-left"
                onClick={() => setOpenDropdown(null)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
</div>
    </header>
  );
};

export default Header;
