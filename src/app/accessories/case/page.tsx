'use client';

import Image from 'next/image';
import { useState } from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import StickyProductBar from '../../../components/sticky-product-bar';
import { FaStar, FaChevronUp, FaChevronDown, FaDesktop, FaBatteryFull, FaSave, FaCog, FaMicrochip, FaMemory } from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';

const CasePage = () => {
  const { addItem } = useCart();
  /* -------- 价格常量 -------- */
  const unitPrice = 4.99;
  const original = 11.99;

  /* -------- 图片 & 切换 -------- */
  const images = ['/case.avif', '/case-2.avif', '/case-3.avif'];
  const [activeIdx, setActiveIdx] = useState(0);

  /* -------- 数量加减 -------- */
  const [qty, setQty] = useState(1);
  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q) => (q > 1 ? q - 1 : 1));

  /* -------- 折叠 FAQ -------- */
  const [openFaq, setOpenFaq] = useState<Record<string, boolean>>({});
  const toggleFaq = (key: string) =>
    setOpenFaq((o) => ({ ...o, [key]: !o[key] }));

  /* -------- 提示 -------- */
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
    shipping: false,
    specs: false,
    games: false,
    shippingInfo: false,
    consoleSpecs: false
  });
  /* -------- FAQ 数据 -------- */
  const faqs = [
    {
      key: 'save-progress',
      question: 'How Can I Save My Game Progress?',
      content: (
        <div className="space-y-4 text-left text-gray-300">
          <p>
            To properly save and reload your game progress, please follow these steps:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <div>
                <strong className="text-white">Save In-Game:</strong> While playing, press <strong className="text-white">Select + X</strong> to save your progress.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <div>
                <strong className="text-white">Exit the Game Correctly:</strong> After saving, press <strong className="text-white">Start + X</strong> to return to the main menu instead of turning off the console immediately. This ensures your save file is properly written.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <div>
                <strong className="text-white">Load the Saved Game:</strong> When you restart the game, your saved progress should be available.
              </div>
            </li>
          </ul>
          <p>
            Following these steps will keep your progress safe so you can pick up right where you left off!
          </p>
        </div>
      ),
    },
    {
      key: 'cheat-codes',
      question: 'Can I Use Cheat Codes on Gamelab?',
      content: (
        <div className="space-y-4 text-left text-gray-300">
          <p>
            Yes! Gamelab supports cheat codes, including <strong className="text-purple-400">EXP multipliers</strong>, <strong className="text-purple-400">Rare Candy cheats</strong>, and <strong className="text-purple-400">GameShark/CodeBreaker codes</strong>. You can easily enable cheats using the built-in <strong className="text-purple-400">RetroArch emulator</strong>.
          </p>
          <div>
            <h4 className="font-bold mb-3 text-white text-lg">How to Use Cheats:</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong className="text-white">Open the RetroArch Menu</strong> – While playing, press <strong className="text-white">Select + X</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong className="text-white">Go to &quot;Cheats&quot;</strong> – Scroll down in the menu.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong className="text-white">Load Cheat File</strong> – Choose the correct cheat file for your game.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong className="text-white">Enable Your Cheat Codes</strong> – Toggle them to <strong className="text-white">&quot;On&quot;</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong className="text-white">Apply & Resume Playing</strong> – Go back and enjoy your game with cheats enabled!</span>
              </li>
            </ul>
          </div>
          <p className="flex items-center gap-2">
            Unlock new possibilities and level up your gameplay!
          </p>
        </div>
      ),
    },
    {
      key: 'add-games',
      question: 'How Can I Add More Games to Gamelab?',
      content: (
        <div className="space-y-4 text-left text-gray-300">
          <p>
            Want to expand your game collection? <strong className="text-white">Gamelab</strong> lets you add more games easily! Follow these steps to load your favourite titles onto the console.
          </p>
          <div>
            <h4 className="font-bold mb-3 text-white text-lg">How to Add Games:</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong className="text-white">Prepare Your Files</strong> – Download compatible ROM files for your favourite retro games.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong className="text-white">Use a microSD Card</strong> – Insert the microSD card into your computer and create a &quot;Games&quot; folder.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong className="text-white">Transfer Your Games</strong> – Copy the ROM files into the correct console folder inside &quot;Games&quot;.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong className="text-white">Insert the microSD Card</strong> – Place it back into your Gamelab console.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong className="text-white">Refresh Game List</strong> – Open the menu and update the library to find your new games.</span>
              </li>
            </ul>
          </div>
          <p>
            Now you&apos;re ready to play even more classics!
          </p>
        </div>
      ),
    },
    {
      key: 'trade-pokemon',
      question: 'Can I Trade Pokémon on Gamelab?',
      content: (
        <div className="space-y-4 text-left text-gray-300">
          <p>
            Yes! <strong className="text-purple-400">Gamelab</strong> supports Pokémon trading, so you can complete your Pokédex just like in the original games. To trade using <strong className="text-purple-400">Netplay</strong>, follow these steps:
          </p>
          <div>
            <h4 className="font-bold mb-3 text-white text-lg">How to Trade Pokémon on Gamelab:</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Before launching the ROM, press <strong className="text-white">Select</strong> to open <strong className="text-white">Options</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Scroll down and select &quot;<strong className="text-white">Edit this game&apos;s metadata</strong>&quot;.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Set the <strong className="text-white">emulator</strong> to <strong className="text-white">Retroarch32</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Choose the <strong className="text-white">core</strong> as <strong className="text-white">GPSP</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Save your settings.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Launch the game and go into <strong className="text-white">Netplay</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Select <strong className="text-white">Host</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Set <strong className="text-white">Max Simultaneous Connections</strong> to <strong className="text-white">2</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Switch <strong className="text-white">Netplay NAT Traversal</strong> to <strong className="text-white">OFF</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Start <strong className="text-white">Netplay Host</strong> and begin trading!</span>
              </li>
            </ul>
          </div>
          <p>
            Now you can evolve trade-exclusive Pokémon and complete your team!
          </p>
        </div>
      ),
    },
  ];

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const discountPercent = Math.round(((original - unitPrice) / original) * 100);

  const handleStickyAddToCart = () => {
    addItem({
      id: 'gamelab-protective-case',
      name: 'GameLab Protective Case',
      price: unitPrice,
      image: images[activeIdx],
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <StickyProductBar
        productName="Protective Case"
        price={unitPrice}
        originalPrice={original}
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
                  alt="case"
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
                    alt="case thumb"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Protective Case</h1>

            {/* 评价 */}
            <div className="flex items-center gap-2 mb-6">
              {renderStars()}
              <span className="text-gray-400">3 reviews</span>
            </div>

            {/* 价格 */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold">£{unitPrice.toFixed(2)}</span>
                <span className="text-2xl text-gray-500 line-through">
                  £{original.toFixed(2)}
                </span>
                <span className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-bold">
                  50% OFF LIMITED TIME ONLY!
                </span>
              </div>
            </div>

            {/* ======== 数量选择 ======== */}
            <div className="mb-6">
              <p className="text-xl font-bold text-gray-400 mb-2">Quantity :</p>
              <div className="flex items-center gap-3 w-max">
                <button
                  onClick={dec}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-xl font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center text-xl font-semibold">{qty}</span>
                <button
                  onClick={inc}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* 加入购物车 */}
            <div>
              <button
                onClick={() => {
                  const itemId = 'gamelab-protective-case';
                  // 添加指定数量的商品
                  for (let i = 0; i < qty; i++) {
                    addItem({
                      id: itemId,
                      name: 'GameLab Protective Case',
                      price: unitPrice,
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

              {/* Console Specs */}
              <div className="border-b border-gray-700">
                <button
                  onClick={() => toggleSection('consoleSpecs')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <FaCog className="w-5 h-5 text-white" />
                    <span className="font-semibold">Console Specs</span>
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
                      <p><span className="font-semibold">CPU:</span> RK3326 64-bit Quad-Core 1.5GHz</p>
                      <p><span className="font-semibold">RAM:</span> 1GB DDR3L</p>
                      <p><span className="font-semibold">Display:</span> 3.5&quot; IPS HD</p>
                      <p><span className="font-semibold">GPU:</span> Mali-G31MP2</p>
                      <p><span className="font-semibold">Storage:</span> 64GB internal + expandable slot for more</p>
                      <p><span className="font-semibold">Battery:</span> 3200 mAh - lasts all day for uninterrupted gameplay</p>
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

        {/* Game Logos Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="flex-shrink-0">
                <Image
                  src={`/logo${num}.avif`}
                  alt={`Game logo ${num}`}
                  width={120}
                  height={60}
                  className="h-auto object-contain max-h-16 md:max-h-20"
                  sizes="(min-width: 1024px) 120px, 100px"
                />
              </div>
            ))}
          </div>
        </section>

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
                Old-School Gaming,<br className="hidden md:block" />New Experience
              </h2>
              <p className="text-white text-lg mb-4 leading-relaxed">
                Gamelab lets you relive the classics with a portable, easy-to-use console packed with <strong className="font-bold">15,000+ retro games</strong>. Whether you&apos;re into fast arcade action or nostalgic adventures, every game runs smoothly with <strong className="font-bold">clear graphics</strong> and <strong className="font-bold">responsive controls</strong>.
              </p>
              <p className="text-white text-lg leading-relaxed">
                With a <strong className="font-bold">long-lasting battery</strong> and a <strong className="font-bold">lightweight, travel-friendly design</strong>, you can play anytime, anywhere. No setup, no internet, just power it on, pick a game, and jump back into the golden age of gaming!
              </p>
            </div>

            {/* 右侧图片占位（用户后续替换为真实图） */}
            <div>
              <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden">
                <Image
                  src="/beijing2.avif"
                  alt="Two Gamelab consoles linked together for trading"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
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
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-center text-white">
                  SPEED, PRECISION, AND ENDLESS PLAY
                </h2>
                
                <div className="text-lg text-white text-center max-w-md">
                  <p>
                    Every pixel, every movement, built for peak gaming. Enjoy razor-sharp visuals, ultra-responsive controls, and seamless gameplay for the ultimate retro experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>





        {/* ---------- FAQ 区域 ---------- */}
        <section className="max-w-4xl mx-auto mt-10">
          <h2 className="text-3xl font-bold text-center mb-8">FREQUENTLY ASKED</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div
                key={f.key}
                className="bg-purple-500 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(f.key)}
                  className="w-full flex items-center justify-between p-3 hover:bg-purple-600 transition-colors text-left rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-yellow-400">⚡</span>
                    <span className="text-white font-semibold text-lg">{f.question}</span>
                  </div>
                  {openFaq[f.key] ? (
                    <FaChevronUp className="text-white flex-shrink-0 ml-4" />
                  ) : (
                    <FaChevronDown className="text-white flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFaq[f.key] && (
                  <div className="px-6 pb-6 pt-2 bg-gray-900 border-t border-purple-500/30">
                    <div className="text-white">
                      {f.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Real Gamers Real Nostalgia Real Reviews */}
        <section className="container mx-auto px-4 py-12 ">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Real Gamers Real Nostalgia Real Reviews
          </h2>
          
          <div className="grid md:grid-cols-1 gap-6 max-w-6xl mx-auto">
            {/* Review 1 */}
            <div className="bg-gray-900 rounded-lg p-6">
              {/* Star Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-purple-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              
              {/* User Info */}
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-purple-400 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
                <span className="text-purple-400 text-sm">Wulfric Raper</span>
                <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">Verified</span>
              </div>
              
              {/* Review Title */}
              <h3 className="font-bold text-white text-lg mb-2">Absolutely amazing</h3>
              
              {/* Review Body */}
              <p className="text-white text-sm leading-relaxed">
                Got the buy one get one free offer, absolutely amazing. Use one for GBA, PSX, DS and PSP games, and the other for stuff like Megadrive and Gameboy/GBC. Absolutely amazing and well worth the price. Perfect for gaming on my lunch breaks at work!
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-gray-900 rounded-lg p-6">
              {/* Star Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-purple-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              
              {/* User Info */}
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-purple-400 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
                <span className="text-purple-400 text-sm">Lucia</span>
                <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">Verified</span>
              </div>
              
              {/* Review Title */}
              <h3 className="font-bold text-white text-lg mb-2">Great product just as described</h3>
              
              {/* Review Body */}
              <p className="text-white text-sm leading-relaxed">
                Great product just as described and very useful
              </p>
            </div>

            {/* Review 3 */}
            <div className="bg-gray-900 rounded-lg p-6">
              {/* Star Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-purple-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              
              {/* User Info */}
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-purple-400 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
                <span className="text-purple-400 text-sm">duane frankish</span>
                <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">Verified</span>
              </div>
              
              {/* Review Title */}
              <h3 className="font-bold text-white text-lg mb-2">Good zipper and fits well no issues thanks</h3>
              
              {/* Review Body */}
              <p className="text-white text-sm leading-relaxed">
                Good zipper and fits well no issues thanks 🙏
              </p>
            </div>
          </div>
        </section>

        
      </main>

      <Footer hasStickyBar={true} />
    </div>
  );
};

export default CasePage;