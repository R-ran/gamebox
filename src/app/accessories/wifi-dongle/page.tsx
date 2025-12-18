'use client';

import Image from 'next/image';
import { useState } from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import StickyProductBar from '../../../components/sticky-product-bar';
import { useCart } from '../../../contexts/CartContext';

const WifiDonglePage = () => {
  const { addItem } = useCart();
  const price = 19.99;
  const original = 28.0;
  const saved = 8.01;

  /* 1. 准备两张图 */
  const images = ['/wifi-dongle.avif', '/wifi-dongle-2.avif'];
  const [activeIdx, setActiveIdx] = useState(0);

  const discountPercent = Math.round(((original - price) / original) * 100);

  const handleStickyAddToCart = () => {
    addItem({
      id: 'wifi-dongle-pack',
      name: 'Wifi Dongle Pack',
      price: price,
      image: images[activeIdx],
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <StickyProductBar
        productName="Multiplayer Kitx2"
        price={price}
        originalPrice={original}
        discountPercent={discountPercent}
        onAddToCart={handleStickyAddToCart}
      />
      <main style={{ paddingBottom: '150px' }}>
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* 左侧：产品图片 */}
            <div className="md:sticky md:top-24 md:self-start">
              {/* 主图：根据 activeIdx 切换 */}
              <div className="mb-4 bg-gray-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={images[activeIdx]}
                    alt="wifi dongle"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* 2. 缩略图：2 张并排 */}
              <div className="grid grid-cols-7 gap-2">
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative w-full aspect-square rounded overflow-hidden cursor-pointer border-2 ${
                      activeIdx === idx ? 'border-purple-500' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={src}
                      alt="wifi dongle thumb"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 右侧信息（与之前相同，省略） */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Multiplayer Kitx2</h1>
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold">£{price.toFixed(2)}</span>
                  <span className="text-2xl text-gray-500 line-through">£{original.toFixed(2)}</span>
                  <span className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-bold">
                    SAVE {Math.round((saved / original) * 100)}%
                  </span>
                </div>
              </div>
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">🎮 2 Wi-Fi Dongles + 2 Adapters</span>
                </div>
              </div>
              <div className="mb-6">
                <div className="border-b border-purple-500 mb-4" />
                <h3 className="font-bold text-lg mb-4 text-purple-400">SQUAD UP & SAVE</h3>
                <div className="p-4 border-2 border-purple-500 rounded-lg bg-purple-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Radio button 装饰 */}
                      <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-purple-600 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <div>
                        <p className="font-bold text-lg">2 Wi-Fi Dongles Pack</p>
                        <p className="text-sm text-white">You save £{saved.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-500">£{price.toFixed(2)}</p>
                      <p className="text-sm text-white line-through">£{original.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                  const itemId = 'wifi-dongle-pack';
                  addItem({
                    id: itemId,
                    name: 'Wifi Dongle Pack',
                    price: price,
                    image: images[activeIdx],
                  });
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold text-lg transition"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WifiDonglePage;