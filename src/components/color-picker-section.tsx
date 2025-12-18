'use client';

import { useState } from 'react';
import Link from 'next/link';

const colors = [
  { name: 'Electric Yellow', value: 'yellow', active: true },
  { name: 'Midnight Dash', value: 'black' },
  { name: 'Crimson Creed', value: 'red' },
  { name: 'Blue Quest', value: 'blue' },
  { name: 'Nitro Blaze', value: 'orange' },
  { name: 'Mystic Flame', value: 'purple' },
  { name: 'White Strike', value: 'white' },
  { name: 'Emerald Modo', value: 'green' },
];

// 首页颜色与 public 中 console-颜色 图片的映射
const colorImageMap: { [key: string]: { src: string; alt: string } } = {
  yellow: {
    src: '/console-yellow.avif',
    alt: 'Gamelab console – Electric Yellow colour'
  },
  black: {
    src: '/console-black.avif',
    alt: 'Gamelab console – Midnight Dash (black) colour'
  },
  red: {
    src: '/console-red.avif',
    alt: 'Gamelab console – Crimson Creed (red) colour'
  },
  blue: {
    src: '/console-blue.avif',
    alt: 'Gamelab console – Blue Quest (blue) colour'
  },
  orange: {
    src: '/console-orange.avif',
    alt: 'Gamelab console – Nitro Blaze (orange) colour'
  },
  purple: {
    src: '/console-purple.avif',
    alt: 'Gamelab console – Mystic Flame (purple) colour'
  },
  white: {
    src: '/console-white.avif',
    alt: 'Gamelab console – White Strike (white) colour'
  },
  green: {
    src: '/console-green.avif',
    alt: 'Gamelab console – Emerald Mode (green) colour'
  }
};

const ColorPickerSection = () => {
  const [selectedColor, setSelectedColor] = useState('yellow');

  const getColorClass = (colorValue: string) => {
    const colorMap: { [key: string]: string } = {
      yellow: 'bg-yellow-400',
      black: 'bg-black',
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
      white: 'bg-white',
      green: 'bg-green-500',
    };
    return colorMap[colorValue] || 'bg-gray-500';
  };

  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Pick Your Perfect Gamelab Colour</h2>
          <p className="text-gray-400 text-lg">Express your style with Gamelab's range of vibrant colours!</p>
        </div>

        {/* 颜色选择按钮 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                selectedColor === color.value
                  ? 'bg-purple-600 text-white border-2 border-purple-400'
                  : 'bg-black text-white border-2 border-gray-700 hover:border-gray-500'
              }`}
            >
              {color.name}
            </button>
          ))}
        </div>

        {/* 产品图片展示 */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-lg overflow-hidden p-8">
            {/* 游戏机展示 - 对应颜色图片 */}
            <div className="flex justify-center items-center py-8">
              <div className="w-full max-w-3xl">
                <img
                  src={colorImageMap[selectedColor]?.src || colorImageMap['yellow'].src}
                  alt={colorImageMap[selectedColor]?.alt || colorImageMap['yellow'].alt}
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* 颜色名称 */}
            <div className="text-center mt-8">
              <h3 className="text-5xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                {colors.find(c => c.value === selectedColor)?.name.toUpperCase()}
              </h3>
            </div>
          </div>
        </div>

        {/* CTA按钮 */}
        <div className="text-center mt-12">
          <Link
            href="/gamelab-console/console"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-12 rounded-lg transition transform hover:scale-105 shadow-lg shadow-pink-500/50"
          >
            Get Yours Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ColorPickerSection;

