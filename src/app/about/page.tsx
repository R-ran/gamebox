'use client';

import Header from '../../components/header';
import Footer from '../../components/footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="h-10"></div>
      <main className="container mx-auto px-4 py-16">
        {/* 标题 */}
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-16">
          About Us
        </h1>

        <div className="h-20"></div>
        {/* Welcome to the Lab 部分 */}
        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Welcome to the Lab
          </h2>
          
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              At GameLab, our mission is simple: to bring back the magic of retro gaming—without the hassle.
            </p>
            
            <p>
              We believe great games don't need subscriptions, constant updates, or internet access. That's why we built a portable, plug-and-play console with over 15,000 classic titles from systems like Nintendo, PlayStation, SEGA, and more—all ready to play, anytime, anywhere.
            </p>
            
            <p>
              GameLab was created to make retro gaming accessible again. No downloads. No emulators. No complicated setup. Just a straightforward experience designed for nostalgic players, modern families, and curious newcomers alike.
            </p>
            
            <p>
              We're committed to quality, ease of use, and community. Every console is preloaded, tested, and shipped directly from the UK with responsive support and a 1-year warranty included.
            </p>
            
            <p>
              Whether you're revisiting your favourite childhood titles or introducing timeless games to a new generation, GameLab is your gateway to real gaming.
            </p>
          </div>
        </div>

        {/* Our Vision 部分 */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Our Vision:
          </h2>
          <p className="text-gray-300 text-lg text-left">
            To become the go-to platform for retro gaming, known for simplicity, reliability, and delivering fun without barriers.
          </p>
        </div>

        {/* Our Promise 部分 */}
        <div className="max-w-4xl mx-auto mb-16 mt-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Our Promise:
          </h2>
          <p className="text-gray-300 text-lg text-left">
            Fast setup. Real games. Zero nonsense.
          </p>
        </div>

        {/* 结尾语句 */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-white">
            Welcome to GameLab—where classic gaming lives on.
          </p>
        </div>

        <div className="h-20"></div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

