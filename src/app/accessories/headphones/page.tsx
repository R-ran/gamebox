'use client';

import Image from 'next/image';
import { useState } from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import StickyProductBar from '../../../components/sticky-product-bar';
import { FaStar, FaChevronUp, FaChevronDown, FaMemory, FaMicrochip, FaCog, FaSave, FaBatteryFull, FaDesktop, FaTag } from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';

const HeadphonesPage = () => {
  const { addItem } = useCart();

  /* -------- 图片 & 切换 -------- */
  const images = ['/headphones1.avif', '/headphones2.avif'];
  const [activeIdx, setActiveIdx] = useState(1);

  /* -------- 数量加减 -------- */
  const [qty, setQty] = useState(1);
  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q) => (q > 1 ? q - 1 : 1));

  /* -------- 折叠 FAQ -------- */
  const [openFaq, setOpenFaq] = useState<Record<string, boolean>>({});
  const toggleFaq = (key: string) =>
    setOpenFaq((o) => ({ ...o, [key]: !o[key] }));

  /* -------- 添加成功提示 -------- */
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);

  /* -------- 星级展示 -------- */
  const renderStars = () => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className="text-yellow-400 text-xl" />
      ))}
    </div>
  );

  const [expandedSections, setExpandedSections] = useState({
    shippingInfo: false,
    consoleSpecs: false,
    games: false
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  /* -------- 数量选择 -------- */
  const [selectedQuantity, setSelectedQuantity] = useState(2);

  const getPrice = (qty: number) => {
    if (qty === 1) return { price: 30.00, original: 45.00, discount: 15.00 };
    if (qty === 2) return { price: 45.00, original: 90.00, discount: 45.00 };
    return { price: 30.00, original: 45.00, discount: 15.00 };
  };

  const singlePriceInfo = getPrice(1);
  const discountPercent = Math.round(((singlePriceInfo.original - singlePriceInfo.price) / singlePriceInfo.original) * 100);

  const handleStickyAddToCart = () => {
    addItem({
      id: 'gamelab-retro-headphones',
      name: 'Gamelab Retro Headphones',
      price: singlePriceInfo.price,
      image: images[activeIdx],
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <StickyProductBar
        productName="Gamelab Retro Headphones"
        price={singlePriceInfo.price}
        originalPrice={singlePriceInfo.original}
        discountPercent={discountPercent}
        onAddToCart={handleStickyAddToCart}
      />

      <main className="container mx-auto px-4 py-12" style={{ paddingBottom: '180px' }}>
        <div className="grid md:grid-cols-2 gap-12">
          {/* ---------- 左侧图片 ---------- */}
          <div className="md:sticky md:top-24 self-start">
            {/* 主图 */}
            <div className="mb-4 bg-gray-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={images[activeIdx]}
                  alt="headphones"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* 缩略图 */}
            <div className="grid grid-cols-7 gap-2">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative aspect-square rounded overflow-hidden cursor-pointer border-2 ${
                    activeIdx === idx ? 'border-purple-500' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={src}
                    alt="headphones thumb"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ---------- 右侧信息 ---------- */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gamelab Retro Headphones</h1>

            {/* 价格信息 */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold text-white">£30.00</span>
                <span className="text-2xl text-purple-500 line-through">£45.00</span>
                <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-2">
                  <FaTag className="text-white" />
                  SAVE 33%
                </span>
              </div>
            </div>

            {/* 促销标签 */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                <span className="font-semibold">Retro-futurist 80s design</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                <span className="font-semibold">15-hour battery, Bluetooth 5.0</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                <span className="font-semibold">High-fidelity 40mm titanium drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                <span className="font-semibold">Includes 3 swapable ear-pad colors</span>
              </div>
            </div>

            <div className="mb-6" style={{ position: 'relative', overflow: 'visible' }}>
              {/* SQUAD UP & SAVE 标题 */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 border-t border-purple-500"></div>
                <h3 className="font-bold text-lg text-white whitespace-nowrap">SQUAD UP & SAVE</h3>
                <div className="flex-1 border-t border-purple-500"></div>
              </div>
              
              {/* Single Console */}
              <div 
                onClick={() => setSelectedQuantity(1)}
                className={`mb-4 p-4 border border-purple-500 rounded-lg cursor-pointer transition-all ${
                  selectedQuantity === 1
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-purple-500/50 bg-gray-900 hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Radio button */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedQuantity === 1
                      ? 'border-purple-600 bg-purple-500'
                      : 'border-purple-600 bg-transparent'
                  }`}>
                    {selectedQuantity === 1 && (
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    )}
                  </div>
                  {/* Game console icon */}
                  <div className="text-2xl flex-shrink-0">🎮</div>
                  {/* Product details */}
                  <div className="flex-1">
                    <p className="font-bold text-lg text-white">Single Console</p>
                    <p className="text-sm text-white">You save £15</p>
                  </div>
                  {/* Pricing */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold text-white">£30</p>
                    <p className="text-sm text-white line-through">£45</p>
                  </div>
                </div>
              </div>

              {/* 2 Consoles */}
              <div 
                onClick={() => setSelectedQuantity(2)}
                className={`mb-4 p-4 border border-purple-500 rounded-lg cursor-pointer transition-all relative ${
                  selectedQuantity === 2
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-purple-500/50 bg-gray-900 hover:bg-gray-800'
                }`}
                style={{ overflow: 'visible' }}
              >
                {/* Save An Extra 50%! Banner */}
                <div 
                  className="absolute bg-purple-500 text-white px-3 py-1 text-xs font-bold z-50 whitespace-nowrap"
                  style={{ 
                    top: '-8px',
                    right: '8px',
                    transform: 'rotate(5deg)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  SAVE AN EXTRA 50%!
                </div>
                <div className="flex items-center gap-3">
                  {/* Radio button */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedQuantity === 2
                      ? 'border-purple-600 bg-purple-500'
                      : 'border-purple-600 bg-transparent'
                  }`}>
                    {selectedQuantity === 2 && (
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    )}
                  </div>
                  {/* Two game consoles with plus sign */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-2xl">🎮</span>
                    <span className="text-purple-500 text-xl font-bold">+</span>
                    <span className="text-2xl">🎮</span>
                  </div>
                  {/* Product details */}
                  <div className="flex-1">
                    <p className="font-bold text-lg text-white">2 Consoles</p>
                    <p className="text-sm text-white">You save £45</p>
                  </div>
                  {/* Pricing */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold text-white">£45</p>
                    <p className="text-sm text-white line-through">£90</p>
                  </div>
                </div>
              </div>
            </div>



            {/* 加入购物车 */}
            <div className="mb-6">
              <button
                onClick={() => {
                  const priceInfo = getPrice(selectedQuantity);
                  const itemId = 'gamelab-retro-headphones';
                  // 添加指定数量的商品
                  for (let i = 0; i < selectedQuantity; i++) {
                    addItem({
                      id: itemId,
                      name: 'Gamelab Retro Headphones',
                      price: priceInfo.price / selectedQuantity,
                      image: images[activeIdx],
                    });
                  }
                  setShowAddToCartSuccess(true);
                  setTimeout(() => {
                    setShowAddToCartSuccess(false);
                  }, 3000);
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold text-lg transition"
              >
                ADD TO CART
              </button>
              {showAddToCartSuccess && (
                <p className="text-green-400 text-sm mt-2 text-center animate-fade-in">
                  Added to cart successfully!
                </p>
              )}
            </div>

            {/* 折叠信息部分 */}
            <div className="space-y-0 border-b border-gray-700">
              {/* Shipping Information */}
              <div className="border-b border-gray-700">
                <button
                  onClick={() => toggleSection('shippingInfo')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    <span className="font-semibold">Shipping Information</span>
                  </div>
                  {expandedSections.shippingInfo ? (
                    <FaChevronUp className="text-gray-400" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                {expandedSections.shippingInfo && (
                  <div className="px-4 pb-4 border-t border-gray-700">
                    <p className="text-gray-300 pt-4">
                      Our standard delivery is 3-8 business days within the United Kingdom, with tracking provided. Free standard shipping is included, and express shipping is available for £9.99.
                    </p>
                  </div>
                )}
              </div>

              {/* Product Specs */}
              <div className="border-b border-gray-700">
                <button
                  onClick={() => toggleSection('consoleSpecs')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Product Specs</span>
                  </div>
                  {expandedSections.consoleSpecs ? (
                    <FaChevronUp className="text-gray-400" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                {expandedSections.consoleSpecs && (
                  <div className="px-4 pb-4 border-t border-gray-700">
                    <div className="pt-4 space-y-2 text-gray-300">
                      <p><span className="font-semibold">Driver:</span> 40mm Titanium Drivers</p>
                      <p><span className="font-semibold">Battery:</span> 15 hours playback</p>
                      <p><span className="font-semibold">Connectivity:</span> Bluetooth 5.0, 3.5mm Jack</p>
                      <p><span className="font-semibold">Design:</span> Retro-futurist 80s style</p>
                      <p><span className="font-semibold">Ear Pads:</span> 3 interchangeable colors included</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Included Games */}
              <div className="border-b-0">
                <button
                  onClick={() => toggleSection('games')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="6" width="20" height="12" rx="2"/>
                      <circle cx="7" cy="12" r="1.5"/>
                      <circle cx="17" cy="12" r="1.5"/>
                      <rect x="10" y="9" width="4" height="6" rx="1"/>
                    </svg>
                    <span className="font-semibold">Included Games</span>
                  </div>
                  {expandedSections.games ? (
                    <FaChevronUp className="text-gray-400" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                {expandedSections.games && (
                  <div className="px-4 pb-4 border-t border-gray-700">
                    <p className="text-gray-300 pt-4 mb-4">
                      The Gamelab console comes packed with over 15,000 classic games, spanning decades and genres. Relive gaming history with legendary titles from a variety of consoles, including:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-purple-500 fill-current mt-0.5 flex-shrink-0" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span>Capcom Play Systems (1, 2, and 3)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-purple-500 fill-current mt-0.5 flex-shrink-0" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span>M.A.M.E 2003</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-purple-500 fill-current mt-0.5 flex-shrink-0" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span>PC Engine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-purple-500 fill-current mt-0.5 flex-shrink-0" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span>Famicom Disk System</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-purple-500 fill-current mt-0.5 flex-shrink-0" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span>Nintendo Systems – NES, SNES, N64, Game Boy, Game Boy Color, Game Boy Advance, and Nintendo DS</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-purple-500 fill-current mt-0.5 flex-shrink-0" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span>SEGA Systems – Mega Drive, Dreamcast, and Game Gear</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-purple-500 fill-current mt-0.5 flex-shrink-0" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span>Neo Geo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-purple-500 fill-current mt-0.5 flex-shrink-0" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span>Sony – PlayStation and PSP</span>
                      </li>
                    </ul>
                    <p className="text-gray-300 pt-4">
                      Looking for a specific game? Use our{' '}
                      <button
                        type="button"
                        className="text-purple-400 hover:text-purple-300 underline font-semibold cursor-pointer"
                      >
                        Game Search Tool
                      </button>
                      {' '}to check if your favourites are included!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        

         {/* Section 1: Every game you grew up with. All on one console. */}
         <section className="container mx-auto px-4 py-12 ">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左侧：Sonic 主图 */}
            <div>
              <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden">
                <Image
                  src="/beijing.avif"
                  alt="Sonic the Hedgehog with handheld gaming consoles"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>

            {/* 右侧：标题和文字 */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Meet Gamelab
              </h2>
              
              <p className="text-white text-lg mb-4 leading-relaxed">
                Love classic games? <strong className="font-bold">Gamelab</strong> is your all-in-one handheld console, packed with <strong className="font-bold">15,000+ retro games</strong> from <strong className="font-bold">PlayStation</strong>, <strong className="font-bold">NES</strong>, <strong className="font-bold">SNES</strong>, <strong className="font-bold">SEGA</strong>, <strong className="font-bold">Game Boy</strong>, and more.
              </p>
              
              <p className="text-white text-lg leading-relaxed">
                It&apos;s small, easy to carry, and works anywhere, <strong className="font-bold">no Wi-Fi needed</strong>. Just turn it on, pick a game, and enjoy hours of fun!
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Play Together. Trade Together. */}
        <section className="container mx-auto px-4 py-16 ">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左侧文字 */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Play Together. Trade<br className="hidden md:block" />Together.
              </h2>
              <p className="text-gray-300 text-lg mb-4">
                Pair two GameLabs and jump into head-to-head fun, racing, fighters, party chaos.
              </p>
              <p className="text-gray-300 text-lg">
                When you want evolutions and swaps, add the Wi-Fi dongle, connect both consoles to the same home network, and trade in supported titles.
              </p>
            </div>

            {/* 右侧图片占位（用户后续替换为真实图） */}
            <div>
              <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden">
                <Image
                  src="/beijing2.avif"
                  alt="Sonic the Hedgehog with handheld gaming consoles"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>

            
          </div>
        </section>

        {/* Section 5: Built Like the Games That Made You. */}
        <section className="container mx-auto px-4 py-16 ">
         
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左侧：技术规格 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <FaMemory className="text-purple-400 text-2xl" />
                <div>
                  <div className="font-bold text-lg">RAM</div>
                  <div className="text-gray-300">1GB DDR3L</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <FaMicrochip className="text-purple-400 text-2xl" />
                <div>
                  <div className="font-bold text-lg">CPU</div>
                  <div className="text-gray-300">RK3326 64-Bit Quad-Core 1.5GHz</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <FaCog className="text-purple-400 text-2xl" />
                <div>
                  <div className="font-bold text-lg">GPU</div>
                  <div className="text-gray-300">Mali-G31 MP2</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <FaSave className="text-purple-400 text-2xl" />
                <div>
                  <div className="font-bold text-lg">Storage</div>
                  <div className="text-gray-300">64GB + Slot For More Storage</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <FaBatteryFull className="text-purple-400 text-2xl" />
                <div>
                  <div className="font-bold text-lg">Battery</div>
                  <div className="text-gray-300">12 Hours per Charge</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <FaDesktop className="text-purple-400 text-2xl" />
                <div>
                  <div className="font-bold text-lg">Display</div>
                  <div className="text-gray-300">3.5" bright LCD screen</div>
                </div>
              </div>
            </div>

            {/* 右侧：游戏机图片 */}
            <div className="relative flex flex-col items-center">
              <div 
                className="relative w-full max-w-xl rounded-lg p-[3px]"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(236, 72, 153, 0.3), 0 0 60px rgba(249, 115, 22, 0.2)',
                }}
              >
                {/* 内层容器 */}
                <div className="relative rounded-lg bg-gray-900 overflow-hidden">
                  <Image
                    src="/beijing3.avif"
                    alt="Gamelab console"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-contain"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              </div>
              {/* 文字内容 */}
              <div className="mt-8 flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-center">
                  Built Like the Games<br />That Made You.
                </h2>
                
                <div className="space-y-3 text-lg text-gray-300 text-center max-w-lg">
                  <p>Every frame, every press, responsive, crisp, and smooth.</p>
                  <p>GameLab feels like the consoles you grew up on, but better.</p>
                  <p>No lag. No clunk. Just gameplay that hits like it used to.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <section className="max-w-4xl mx-auto mt-10">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl px-4">
            <Image
              src="/console.avif"
              alt="All-In-One Retro Gaming Console detailed diagram - front, back and three-quarter views with labels"
              width={1600}
              height={1200}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>
        </div>

        </section>
      </main>

      <Footer hasStickyBar={true} />
    </div>
  );
};

export default HeadphonesPage;
