'use client';

import { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQsPage = () => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const faqs = [
    {
      key: 'save-progress',
      question: 'How Can I Save My Game Progress?',
      content: (
        <div className="space-y-4 text-left">
          <div>
            <p className="text-gray-300 mb-4">
              To properly save and reload your game progress, please follow these steps:
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-2 text-white">Access the RetroArch Quick Menu</h4>
            <p className="text-gray-300">
              While playing a game, press and hold <strong>Select</strong>, then press <strong>X</strong> to open the RetroArch quick menu.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-white">Save State</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 ml-2">
              <li>In the quick menu, scroll down and select <strong>Save State</strong>.</li>
              <li>Choose a save slot (e.g., Slot 1, Slot 2) to store your progress.</li>
            </ol>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-white">Load State</h4>
            <p className="text-gray-300">
              To resume your game later, return to the quick menu and select <strong>Load State</strong>, then choose the save slot you previously used.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-white">Optional: Enable Auto save and Auto Load</h4>
            <p className="text-gray-300 mb-2">For automatic saving and loading:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 ml-2">
              <li>Access the RetroArch settings via <strong>Select + X</strong></li>
              <li>Navigate to <strong>settings &gt; Saving</strong></li>
              <li>Enable <strong>Auto Save State</strong> and <strong>Auto Load State</strong></li>
              <li>Save these preferences by going to <strong>Configuration File &gt; Save Current Configuration</strong></li>
            </ol>
          </div>

          <div className="bg-yellow-500/20 border-l-4 border-yellow-500 p-4 rounded">
            <h4 className="font-bold mb-2 text-yellow-400">Important Tips</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Always exit the emulator properly via the menu before switching off the R36S console to avoid potential data loss.</li>
              <li>Manual save states are a reliable way to keep your progress exactly where you want it.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      key: 'cheat-codes',
      question: 'Can I Use Cheat Codes on Gamelab?',
      content: (
        <div className="space-y-4 text-left">
          <div>
            <p className="text-gray-300 mb-4">
              Yes! Gamelab supports cheat codes, including <strong className="text-purple-400">EXP multipliers</strong>, <strong className="text-purple-400">Rare Candy cheats</strong>, and <strong className="text-purple-400">GameShark/CodeBreaker codes</strong>. You can easily enable cheats using the built-in <strong className="text-purple-400">RetroArch emulator</strong>.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-white text-lg">How to Use Cheats:</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong>Open the RetroArch Menu</strong> – While playing, press <strong>Select + X</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong>Go to "Cheats"</strong> – Scroll down in the menu.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong>Load Cheat File</strong> – Choose the correct cheat file for your game.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong>Enable Your Cheat Codes</strong> – Toggle them to <strong>"On"</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong>Apply & Resume Playing</strong> – Go back and enjoy your game with cheats enabled!</span>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-gray-300 flex items-center gap-2">
              Unlock new possibilities and level up your gameplay!
              <span className="text-purple-400">🎮</span>
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'add-games',
      question: 'How Can I Add More Games to Gamelab?',
      content: (
        <div className="space-y-4 text-left">
          <div>
            <p className="text-gray-300 mb-4">
              Want to expand your game collection? <strong className="text-white">Gamelab</strong> lets you add more games easily! Follow these steps to load your favourite titles onto the console.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-white text-lg">How to Add Games:</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong>Prepare Your Files</strong> – Download compatible ROM files for your favourite retro games.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong>Use a microSD Card</strong> – Insert the microSD card into your computer and create a <strong>"Games"</strong> folder.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong>Transfer Your Games</strong> – Copy the ROM files into the correct console folder inside <strong>"Games"</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong>Insert the microSD Card</strong> – Place it back into your Gamelab console.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span><strong>Refresh Game List</strong> – Open the menu and update the library to find your new games.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-gray-300 flex items-center gap-2">
              Now you're ready to play even more classics!
              <span className="text-purple-400">🎮</span>
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'trade-pokemon',
      question: 'Can I Trade Pokémon on Gamelab?',
      content: (
        <div className="space-y-4 text-left">
          <div>
            <p className="text-gray-300 mb-4">
              Yes! <strong className="text-purple-400">Gamelab</strong> supports Pokémon trading, so you can complete your Pokédex just like in the original games. To trade using <strong className="text-purple-400">Netplay</strong>, follow these steps:
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-white text-lg">How to Trade Pokémon on Gamelab:</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Before launching the ROM, press <strong>Select</strong> to open <strong>Options</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Scroll down and select "<strong>Edit this game's metadata</strong>".</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Set the <strong>emulator</strong> to <strong>Retroarch32</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Choose the <strong>core</strong> as <strong>GPSP</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Save your settings.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Launch the game and go into <strong>Netplay</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Select <strong>Host</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Set <strong>Max Simultaneous Connections</strong> to <strong>2</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Switch <strong>Netplay NAT Traversal</strong> to <strong>OFF</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▶</span>
                <span>Start <strong>Netplay Host</strong> and begin trading!</span>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-gray-300 flex items-center gap-2">
              Now you can evolve trade-exclusive Pokémon and complete your team!
              <span className="text-purple-400">🎮</span>
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="h-10"></div>
      <main className="container mx-auto px-4 py-32">
        {/* 标题 */}
        <h1 className="text-2xl md:text-5xl font-bold text-center mb-20">
          FREQUENTLY ASKED
        </h1>

        <div className="h-10"></div>
        {/* FAQ 列表 */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div key={faq.key} className="bg-purple-500 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(faq.key)}
                className="w-full flex items-center justify-between p-3 hover:bg-purple-600 transition-colors text-left rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {/* 黄色闪电图标 */}
                  <span className="text-2xl text-yellow-400">⚡</span>
                  <span className="text-white font-semibold text-lg">{faq.question}</span>
                </div>
                {expandedItems[faq.key] ? (
                  <FaChevronUp className="text-white flex-shrink-0 ml-4" />
                ) : (
                  <FaChevronDown className="text-white flex-shrink-0 ml-4" />
                )}
              </button>
              
              {expandedItems[faq.key] && (
                <div className="px-6 pb-6 pt-2 bg-gray-900 border-t border-purple-500/30">
                  <div className="text-white">
                    {faq.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-20"></div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQsPage;

