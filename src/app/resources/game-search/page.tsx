'use client';

import Image from 'next/image';
import { useState } from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';

const HeadphonesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');

  const platforms = [
    'All Platforms',
    'Nintendo NES',
    'Nintendo SNES',
    'Nintendo 64',
    'Game Boy',
    'Game Boy Color',
    'Game Boy Advance',
    'Nintendo DS',
    'Sega Mega Drive',
    'Sega Dreamcast',
    'Sega Game Gear',
    'PlayStation',
    'PSP',
    'Neo Geo',
    'Capcom Play System',
    'M.A.M.E',
    'PC Engine',
    'Famicom Disk System'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main>
        {/* Hero Section - Sonic + 7 Consoles */}
        <section className="relative bg-black py-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative w-full">
              <Image
                src="/beijing.avif"
                alt="Sonic the Hedgehog with handheld gaming consoles"
                width={1920}
                height={1080}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* Game Search Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
                Looking for a Specific Game?
              </h2>
              
              {/* Subtitle */}
              <p className="text-lg text-gray-700 mb-8">
                Type it in. Hit play. Let nostalgia do the rest.
              </p>

              {/* Search Bar */}
              <div className="mb-6">
                <label htmlFor="game-search" className="block text-sm font-semibold text-gray-800 mb-2">
                  Search for Games:
                </label>
                <input
                  id="game-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter a game title... (Crash Bandicoot, Pokémon, GoldenEye, etc.)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
                />
              </div>

              {/* Filter by Platform */}
              <div className="mb-8">
                <label htmlFor="platform-filter" className="block text-sm font-semibold text-gray-800 mb-2">
                  Filter by Platform:
                </label>
                <select
                  id="platform-filter"
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black bg-white"
                >
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              {/* SHOP NOW Button */}
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg transition mb-8">
                SHOP NOW
              </button>

              {/* Help Text */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Having trouble finding a specific game? Don&apos;t worry, we can help. Just tell us what you&apos;re looking for. Simply send us an email at{' '}
                  <a href="mailto:contact@gamelabconsoles.com" className="text-purple-600 hover:underline font-semibold">
                    contact@gamelabconsoles.com
                  </a>
                  {' '}or fill out our{' '}
                  <a href="/contact" className="text-purple-600 hover:underline font-semibold">
                    contact form here
                  </a>
                  . We&apos;re here to help you find the game you want.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HeadphonesPage;
