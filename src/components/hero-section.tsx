import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-black">
      {/* 背景 banner 图 */}
      <div className="absolute inset-0">
        <img
          src="/banner.avif"
          alt="GameLab retro gaming consoles banner"
          className="w-full h-full object-cover"
        />
        {/* 轻微遮罩，保证文字可读 */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center">
         
          
          {/* 居中内容 */}
          <div className="text-white z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Retro Gaming Reimagined
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              15,000+ classic games in one powerful console
            </p>
            <Link 
              href="/gamelab-console/console"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 shadow-lg shadow-pink-500/50"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

