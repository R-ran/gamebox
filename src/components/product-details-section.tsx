import Link from 'next/link';
import { FaGamepad, FaBatteryFull, FaTruck, FaTag } from 'react-icons/fa';

const ProductDetailsSection = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左侧产品信息 */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">All-In-One Gamelab Console</h2>
            
            {/* 价格 */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold">£39.99</span>
              <span className="text-2xl text-gray-500 line-through">£80.00</span>
              <span className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-bold">SAVE 50%</span>
            </div>

            {/* 特性列表 */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <FaTag className="text-yellow-400 text-xl" />
                <span>Cyber Monday B3G1 FREE</span>
              </li>
              <li className="flex items-center gap-3">
                <FaGamepad className="text-green-400 text-xl" />
                <span>15,000+ Games Ready</span>
              </li>
              <li className="flex items-center gap-3">
                <FaBatteryFull className="text-blue-400 text-xl" />
                <span>12-Hr Battery</span>
              </li>
              <li className="flex items-center gap-3">
                <FaTruck className="text-purple-400 text-xl" />
                <span>Tracked Shipping + Warranty</span>
              </li>
            </ul>

            {/* 添加到购物车按钮 */}
            <button className="w-full md:w-auto bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-12 rounded-lg transition transform hover:scale-105 shadow-lg shadow-pink-500/50 mb-4">
              ADD TO CART
            </button>
            
            <Link
              href="/gamelab-console/console"
              className="text-gray-400 hover:text-white transition block"
            >
              View full details
            </Link>
          </div>

          {/* 右侧产品图片（去掉背景框，仅展示产品图） */}
          <div className="relative flex justify-center items-center">
            <div className="w-full max-w-3xl">
              <img
                src="/console-blue.avif"
                alt="Gamelab console – Blue Quest product image"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSection;

