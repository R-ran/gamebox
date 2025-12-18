import Header from '../components/header';
import Footer from '../components/footer';
import HeroSection from '../components/hero-section';
import ColorPickerSection from '../components/color-picker-section';
import ProductDetailsSection from '../components/product-details-section';
import ReviewsSection from '../components/reviews-section';

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <ColorPickerSection />
        <ProductDetailsSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
