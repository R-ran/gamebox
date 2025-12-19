'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import StickyProductBar from '../../../components/sticky-product-bar';
import { useCart } from '../../../contexts/CartContext';
import { 
  FaFire, 
  FaGamepad, 
  FaBatteryFull, 
  FaShieldAlt,
  FaMemory,
  FaCog,
  FaMicrochip,
  FaSave,
  FaDesktop,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaChevronDown,
  FaChevronUp,
  FaTimes
} from 'react-icons/fa';

const HorizonPage = () => {
  const { addItem } = useCart();
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({ 0: 'White Strike' });
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openColorDropdowns, setOpenColorDropdowns] = useState<{ [key: number]: boolean }>({});
  const [expandedSections, setExpandedSections] = useState({
    shipping: false,
    specs: false,
    games: false
  });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    rating: 0,
    title: '',
    content: '',
    displayName: '',
    email: ''
  });
  const reviewsPerPage = 5;

  // 为每个颜色创建图片索引映射
  const colorImageMap: Record<string, number> = {
    'Blue Quest': 0,
    'Emerald Mode (Green)': 1,
    'Midnight Dash (Black)': 2,
    'Mystic Flame (Purple)': 3,
    'Nitro Blaze (Orange)': 4,
    'Crimson Greed (Red)': 5,
    'White Strike': 6
  };

  const colors = [
    'Blue Quest',
    'Emerald Mode (Green)',
    'Midnight Dash (Black)',
    'Mystic Flame (Purple)',
    'Nitro Blaze (Orange)',
    'Crimson Greed (Red)',
    'White Strike'
  ];

  // 对应每种颜色的实际产品图片
  const productImages = [
    {
      src: '/horizon-blue.avif',
      alt: 'Gamelab Horizon console - Blue Quest'
    },
    {
      src: '/horizon-green.avif',
      alt: 'Gamelab Horizon console - Emerald Mode (Green)'
    },
    {
      src: '/horizon-black.avif',
      alt: 'Gamelab Horizon console - Midnight Dash (Black)'
    },
    {
      src: '/horizon-purple.avif',
      alt: 'Gamelab Horizon console - Mystic Flame (Purple)'
    },
    {
      src: '/horizon-orange.avif',
      alt: 'Gamelab Horizon console - Nitro Blaze (Orange)'
    },
    {
      src: '/horizon-red.avif',
      alt: 'Gamelab Horizon console - Crimson Greed (Red)'
    },
    {
      src: '/horizon-white.avif',
      alt: 'Gamelab Horizon console - White Strike'
    }
  ];

  const initialReviews = [
    {
      name: 'Sean',
      handle: 'Sean123',
      rating: 5,
      title: 'Great console with amazing game library',
      text: 'Learn how to save before diving in to you first game and you will be delighted. Screen quality is great and battery lasts forever. I do find charging to 100% a bit inconsistent, very efficient whilst on, less so when off but it gets there in the end. Only played one game so far (Pokemon Emerald like many others) but excited to explore the collection. Because of the complicated save, shut down procedure younger children might need help, but easy for adults. The build quality feels solid and the controls are responsive. Overall, this is a fantastic retro gaming device that brings back so many memories!'
    },
    {
      name: 'Stuart Logsdail-Oliver',
      handle: 'Discostu1960',
      rating: 5,
      title: 'Amazing service',
      text: 'Amazing console works well and honestly so many games it\'s unreal. But my main review reason is for the outstanding customer service I received from Luke. I had ordered two R36S, blue and yellow. But I got a blue one and a white one. Was so gutted as the yellow was going to be a gift. After contacting Luke he assured me he would get it sorted asap and he did in unbelievable time. I can not fault these guys and I will definitely be returning for future buys. The console itself is brilliant - plays all my favorite classics perfectly!'
    },
    {
      name: 'Jason',
      handle: 'JasonGamer',
      rating: 5,
      title: 'Perfect for long journeys',
      text: 'Brilliant!! Hours of fun playing all the old childhood games be perfect for long journeys 👍👌 10/10. The battery life is incredible - lasted the entire 8-hour flight without needing a charge. Screen is bright and clear even in direct sunlight. All the classic games I remember from my childhood are here: Super Mario, Sonic, Street Fighter, and so many more. The controls feel just like the original consoles. Highly recommend for anyone who loves retro gaming!'
    },
    {
      name: 'Keith',
      handle: 'KeithReviews',
      rating: 5,
      title: 'Everyone wants one!',
      text: 'Absolutely awsome everyone I\'ve shown mine to wants one or is now getting one. I\'ve purchased 6 in total for friends and family and everyone loves them. Screens great, buttons work well and the pre installed games are incredible. The variety of games is mind-blowing - from NES to PlayStation, there\'s something for everyone. The device feels premium and the emulation quality is spot on. Best purchase I\'ve made this year!'
    },
    {
      name: 'adrian',
      handle: 'adrianplayer',
      rating: 4,
      title: 'Great fun!',
      text: 'Took a week to come works fine and plays games very smoothly great fun and you will waste away hours playing it. The screen is decent size and the sound quality is good through headphones. Some games take a moment to load but once they\'re running, everything is smooth. The only minor issue is the menu navigation could be slightly more intuitive, but once you get used to it, it\'s fine. Overall, great value for money and brings back so many gaming memories!'
    },
    {
      name: 'Alexander',
      handle: 'AlexGaming',
      rating: 5,
      title: 'Exceeded expectations',
      text: 'Much better than expected, I love it! The build quality is solid, the screen is crisp, and the game library is massive. I\'ve been playing Pokemon games non-stop since I got it. The battery life is impressive - easily lasts a full day of gaming. The controls are responsive and feel authentic. Setup was straightforward and within minutes I was playing my favorite childhood games. This is exactly what I was looking for in a retro gaming handheld!'
    },
    {
      name: 'Michael',
      handle: 'MikeRetro',
      rating: 5,
      title: 'Nostalgia overload!',
      text: 'Let\'s be honest, it\'s pretty crazy how many games these have. I bought it mainly for the pokemon games and so far it hasn\'t disappointed. The "technical" menus can be a little confusing but really there\'s not much, if any need to be messing with these settings. I switched the device on, and within minutes I was catching my first Pidgey. The emulation is perfect, no lag, no glitches. The screen quality is excellent and the battery lasts forever. This is a must-have for any retro gaming enthusiast!'
    },
    {
      name: 'Sarah',
      handle: 'SarahGamer',
      rating: 5,
      title: 'Perfect gift for gamers',
      text: 'Bought this as a gift for my husband who loves retro games, and he absolutely adores it! The console arrived quickly and was well packaged. The game selection is incredible - over 15,000 games pre-installed. He\'s been playing it every evening since he got it. The controls feel great and the screen is bright and clear. The battery life is fantastic too. Highly recommend this console to anyone who wants to relive their gaming childhood!'
    },
    {
      name: 'David',
      handle: 'DavidRetro',
      rating: 5,
      title: 'Best retro console I\'ve owned',
      text: 'I\'ve tried several retro gaming handhelds and this one is by far the best. The screen quality is outstanding, the controls are responsive, and the game library is massive. I love that it includes games from so many different systems. The battery life is excellent - I can play for hours without needing to charge. The build quality feels premium and it\'s comfortable to hold for long gaming sessions. Highly recommended!'
    },
    {
      name: 'Emma',
      handle: 'EmmaGaming',
      rating: 5,
      title: 'Amazing value for money',
      text: 'This console is absolutely fantastic! For the price, you get so much. The game library is incredible - I\'ve been discovering games I never knew existed. The screen is bright and clear, and the sound quality is great through headphones. The controls feel authentic and responsive. Setup was super easy and within minutes I was playing my favorite childhood games. This is a must-have for any retro gaming fan!'
    },
    {
      name: 'Robert',
      handle: 'RobGames',
      rating: 5,
      title: 'Perfect for retro gaming enthusiasts',
      text: 'As someone who grew up with these classic games, this console brings back so many memories. The emulation quality is spot-on - games play exactly as I remember them. The screen is crisp and the controls are responsive. The battery lasts forever and the device feels solid in your hands. I\'ve already recommended it to several friends who are also loving it. Great purchase!'
    },
    {
      name: 'Lisa',
      handle: 'LisaPlayer',
      rating: 5,
      title: 'Exceeded all expectations',
      text: 'I was a bit skeptical at first, but this console has completely exceeded my expectations. The game selection is mind-blowing - over 15,000 games! The screen quality is excellent and the controls feel just like the original consoles. The battery life is impressive and the device is well-built. I\'ve been playing it every day since I got it. Highly recommend!'
    },
    {
      name: 'Tom',
      handle: 'TomRetro',
      rating: 4,
      title: 'Great console with minor issues',
      text: 'Overall, this is a great retro gaming console. The game library is extensive and the screen quality is good. The controls are responsive and the battery life is decent. My only complaints are that some games take a while to load and the menu system could be more intuitive. But once you get used to it, it\'s fine. Good value for money!'
    },
    {
      name: 'Jennifer',
      handle: 'JenGamer',
      rating: 4,
      title: 'Solid retro gaming device',
      text: 'This console does what it promises - plays retro games well. The screen is clear, the controls work great, and there are tons of games to choose from. The battery life is good enough for long gaming sessions. The only thing I wish was better is the menu navigation, which can be a bit clunky at times. But overall, I\'m happy with my purchase!'
    },
    {
      name: 'Mark',
      handle: 'MarkGames',
      rating: 4,
      title: 'Good value, some improvements needed',
      text: 'The console works well and has a huge game library. The screen quality is decent and the controls are responsive. I like that it includes games from multiple systems. However, I found the save system a bit confusing at first, and some games have minor emulation issues. But for the price, it\'s a good deal. Would recommend with minor reservations.'
    },
    {
      name: 'Nicole',
      handle: 'NicolePlayer',
      rating: 4,
      title: 'Fun retro gaming experience',
      text: 'I\'ve been enjoying this console a lot. The game selection is amazing and I love being able to play all my childhood favorites. The screen is bright and the controls feel good. The battery life is decent. My only minor gripe is that the menu could be more user-friendly, but it\'s not a deal-breaker. Overall, great fun!'
    },
    {
      name: 'Amanda',
      handle: 'AmandaGaming',
      rating: 3,
      title: 'Decent but has room for improvement',
      text: 'The console works okay and has a good selection of games. The screen is acceptable and controls are functional. However, I\'ve experienced some lag in certain games and the menu system is not very intuitive. The battery life is average. It\'s okay for the price, but I expected a bit more polish. Still, it does play games, so there\'s that.'
    },
    {
      name: 'James',
      handle: 'JamesPlayer',
      rating: 3,
      title: 'Average retro gaming console',
      text: 'This console is functional but not exceptional. The game library is large which is good, but I\'ve noticed some emulation issues with certain games. The screen quality is okay but not great. The controls work but don\'t feel as responsive as I\'d like. The battery life is average. It\'s an okay purchase if you\'re on a budget, but there might be better options out there.'
    },
    {
      name: 'Rachel',
      handle: 'RachelGames',
      rating: 2,
      title: 'Disappointed with quality',
      text: 'I was excited to get this console but have been somewhat disappointed. While it does have a large game library, I\'ve experienced several issues: some games don\'t run smoothly, the screen quality is not as good as advertised, and the controls feel cheap. The battery life is also shorter than expected. The concept is great, but the execution leaves something to be desired.'
    },
    {
      name: 'Kevin',
      handle: 'KevinRetro',
      rating: 1,
      title: 'Not what I expected',
      text: 'Unfortunately, this console did not meet my expectations. I\'ve had multiple issues: games frequently crash, the screen has dead pixels, and the controls are unresponsive at times. The battery drains very quickly and the device gets hot during use. Customer service was not helpful when I tried to get support. I would not recommend this product based on my experience.'
    }
  ];

  const [reviews, setReviews] = useState(initialReviews);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  const renderPurpleStars = (rating: number, showPartial: boolean = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-purple-500" />);
      } else if (i === Math.ceil(rating) && showPartial && rating % 1 > 0) {
        stars.push(<FaStarHalfAlt key={i} className="text-purple-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  const getPrice = (qty: number) => {
    if (qty === 1) return { price: 54.99, original: 100, discount: 45.01 };
    if (qty === 2) return { price: 93.48, original: 200, discount: 106.52 };
    if (qty === 4) return { price: 164.97, original: 400, discount: 235.03 };
    return { price: 54.99, original: 100, discount: 45.01 };
  };

  const priceInfo = getPrice(selectedQuantity);

  // 添加到购物车
  const handleAddToCart = () => {
    for (let i = 0; i < selectedQuantity; i++) {
      let colorIndex: number;
      if (selectedQuantity === 1) {
        colorIndex = 0;
      } else if (selectedQuantity === 2) {
        colorIndex = i + 1; // 1, 2
      } else {
        colorIndex = i + 11; // 11, 12, 13, 14
      }
      const color = selectedColors[colorIndex] || selectedColors[0] || 'White Strike';
      const imageIndex = colorImageMap[color] || 0;
      addItem({
        id: `horizon-${color}-${Date.now()}-${i}`,
        name: `Gamelab Horizon (${color})`,
        price: priceInfo.price / selectedQuantity,
        image: productImages[imageIndex].src,
        productType: 'horizon',
      });
    }
    setShowAddToCartSuccess(true);
    setTimeout(() => {
      setShowAddToCartSuccess(false);
    }, 3000);
  };

  // 当颜色改变时，更新对应索引的颜色
  const handleColorChange = (color: string, index: number) => {
    setSelectedColors(prev => ({ ...prev, [index]: color }));
    // 如果是第一个颜色选择框（索引0），也更新主图片
    if (index === 0) {
      const imageIndex = colorImageMap[color] || 0;
      setSelectedImageIndex(imageIndex);
    }
    setOpenColorDropdowns(prev => ({ ...prev, [index]: false }));
  };

  const toggleColorDropdown = (index: number) => {
    setOpenColorDropdowns(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const colorDropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(openColorDropdowns).forEach((key) => {
        const index = parseInt(key);
        const ref = colorDropdownRefs.current[index];
        if (ref && !ref.contains(event.target as Node) && openColorDropdowns[index]) {
          setOpenColorDropdowns(prev => ({ ...prev, [index]: false }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openColorDropdowns]);

  const toggleSection = (section: 'shipping' | 'specs' | 'games') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 计算折扣百分比
  const currentColor = selectedColors[0] || 'White Strike';

  // 处理粘性栏的颜色变更
  const handleStickyColorChange = (color: string) => {
    setSelectedColors(prev => ({ ...prev, 0: color }));
    const imageIndex = colorImageMap[color] || 0;
    setSelectedImageIndex(imageIndex);
  };

  // 处理粘性栏的添加到购物车（只添加单个产品）
  const handleStickyAddToCart = () => {
    const color = selectedColors[0] || 'White Strike';
    const imageIndex = colorImageMap[color] || 0;
    addItem({
      id: `horizon-${color}-${Date.now()}`,
      name: `Gamelab Horizon (${color})`,
      price: getPrice(1).price,
      image: productImages[imageIndex].src,
      productType: 'horizon',
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <StickyProductBar
        productName="Gamelab Horizon"
        price={getPrice(1).price}
        originalPrice={getPrice(1).original}
        discountPercent={Math.round(((getPrice(1).original - getPrice(1).price) / getPrice(1).original) * 100)}
        selectedColor={currentColor}
        colors={colors}
        onColorChange={handleStickyColorChange}
        onAddToCart={handleStickyAddToCart}
      />
      <main style={{ paddingBottom: '180px' }}>
        {/* 产品主区域 */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* 左侧：产品图片 */}
            <div className="md:sticky md:top-24 md:self-start">
              {/* 主图 */}
              <div className="mb-4 bg-gray-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={productImages[selectedImageIndex].src}
                    alt={productImages[selectedImageIndex].alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* 缩略图 */}
              <div className="grid grid-cols-7 gap-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      // 根据图片索引找到对应的颜色
                      const color = colors[index];
                      if (color) {
                        setSelectedColors(prev => ({ ...prev, 0: color }));
                      }
                    }}
                    className={`aspect-square bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center border-2 ${
                      selectedImageIndex === index ? 'border-purple-400' : 'border-transparent'
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img.src}
                        alt={`${img.alt} thumbnail`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 右侧：产品信息 */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Gamelab Horizon</h1>
              
              {/* 评价 */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {renderStars(5)}
                </div>
                <span className="text-gray-400">1149 reviews</span>
              </div>

              {/* 价格 */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold">£{priceInfo.price.toFixed(2)}</span>
                  <span className="text-2xl text-gray-500 line-through">£{priceInfo.original.toFixed(2)}</span>
                  <span className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-bold">SAVE 45%</span>
                </div>
               
              </div>

              {/* 促销标签 */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2">
                  
                  <span className="font-semibold">🔥 Cyber Monday B1G1 50% OFF!</span>
                </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">🎮 Over 15,000 Games Included</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">🔋 12-Hr Battery Life</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">🛡️ Tracked Shipping + Warranty</span>
              </div>
              </div>

              {/* CYBER MONDAY SALE */}
              <div className="mb-6" style={{ position: 'relative', overflow: 'visible' }}>
                <div className="border-b border-purple-500 mb-4"></div>
                <h3 className="font-bold text-lg mb-4 text-purple-400">CYBER MONDAY SALE ON NOW</h3>
                
                {/* 单件购买 */}
                <div 
                  onClick={() => setSelectedQuantity(1)}
                  className={`mb-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedQuantity === 1
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-purple-500/50 bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedQuantity === 1
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-purple-500 bg-transparent'
                    }`}>
                      {selectedQuantity === 1 && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="text-2xl">🎮</div>
                    <div className="flex-1">
                      <p className="font-bold text-lg">Single Console</p>
                      <p className="text-sm text-white">You save £45.01</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">£54.99</p>
                      <p className="text-sm text-gray-500 line-through">£100</p>
                    </div>
                  </div>
                  
                  {selectedQuantity === 1 && (
                    <div className="mt-3 pt-3 border-t border-[#300133]">
                      <label className="block text-sm mb-2 text-white">Colour</label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">#1</span>
                        <div 
                          ref={(el) => { colorDropdownRefs.current[0] = el; }}
                          className="flex-1 relative"
                        >
                          <button
                            type="button"
                            onClick={() => toggleColorDropdown(0)}
                            className="w-full bg-purple-600 border-2 border-purple-500 rounded-lg px-4 py-2 text-white flex items-center justify-between cursor-pointer hover:bg-purple-700 transition"
                            style={{ backgroundColor: '#9333ea' }}
                          >
                            <span>{selectedColors[0] || 'White Strike'}</span>
                            <FaChevronDown className="text-white" />
                          </button>
                          {openColorDropdowns[0] && (
                            <div className="absolute z-50 w-full mt-1 bg-purple-600 border-2 border-purple-500 rounded-lg overflow-hidden shadow-lg" style={{ backgroundColor: '#9333ea' }}>
                              {colors.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => handleColorChange(color, 0)}
                                  className={`w-full px-4 py-2 text-left text-white hover:bg-purple-700 transition ${
                                    (selectedColors[0] || 'White Strike') === color ? 'bg-purple-800' : ''
                                  }`}
                                >
                                  {color}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2件购买 */}
                <div 
                  onClick={() => setSelectedQuantity(2)}
                  className={`mb-4 p-4 border-2 rounded-lg cursor-pointer transition-all relative ${
                    selectedQuantity === 2
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-purple-500/50 bg-gray-900 hover:bg-gray-800'
                  }`}
                  style={{ overflow: 'visible', position: 'relative' }}
                >
                  <div 
                    className="absolute bg-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-bold z-50 whitespace-nowrap"
                    style={{ 
                      top: '-10px',
                      right: '8px',
                      position: 'absolute'
                    }}
                  >
                    Buy 2, Save 15%!
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedQuantity === 2
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-purple-500 bg-transparent'
                    }`}>
                      {selectedQuantity === 2 && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="text-2xl flex-shrink-0">🎮🎮</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-lg">2 Consoles</p>
                      <p className="text-sm text-white">You save £106.52</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4" style={{ minWidth: '120px' }}>
                      <p className="text-2xl font-bold">£93.48</p>
                      <p className="text-sm text-gray-500 line-through">£200</p>
                    </div>
                  </div>
                  
                  {selectedQuantity === 2 && (
                    <div className="mt-3 pt-3 border-t border-purple-500/30 space-y-2">
                      {[1, 2].map((num) => {
                        const dropdownIndex = num; // 使用1和2作为索引
                        const selectedColorForIndex = selectedColors[dropdownIndex] || selectedColors[0] || 'White Strike';
                        return (
                          <div key={num}>
                            <label className="block text-sm mb-2">Colour #{num}</label>
                            <div 
                              ref={(el) => { colorDropdownRefs.current[dropdownIndex] = el; }}
                              className="flex-1 relative"
                            >
                              <button
                                type="button"
                                onClick={() => toggleColorDropdown(dropdownIndex)}
                                className="w-full bg-purple-600 border-2 border-purple-500 rounded-lg px-4 py-2 text-white flex items-center justify-between cursor-pointer hover:bg-purple-700 transition"
                                style={{ backgroundColor: '#9333ea' }}
                              >
                                <span>{selectedColorForIndex}</span>
                                <FaChevronDown className="text-white" />
                              </button>
                              {openColorDropdowns[dropdownIndex] && (
                                <div className="absolute z-50 w-full mt-1 bg-purple-600 border-2 border-purple-500 rounded-lg overflow-hidden shadow-lg" style={{ backgroundColor: '#9333ea' }}>
                                  {colors.map((color) => (
                                    <button
                                      key={color}
                                      type="button"
                                      onClick={() => handleColorChange(color, dropdownIndex)}
                                      className={`w-full px-4 py-2 text-left text-white hover:bg-purple-700 transition ${
                                        selectedColorForIndex === color ? 'bg-purple-800' : ''
                                      }`}
                                    >
                                      {color}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 4件购买 */}
                <div 
                  onClick={() => setSelectedQuantity(4)}
                  className={`mb-4 p-4 border-2 rounded-lg cursor-pointer transition-all relative ${
                    selectedQuantity === 4
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-purple-500/50 bg-gray-900 hover:bg-gray-800'
                  }`}
                  style={{ overflow: 'visible', position: 'relative' }}
                >
                  <div 
                    className="absolute bg-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-bold z-50 whitespace-nowrap"
                    style={{ 
                      top: '-10px',
                      right: '8px',
                      position: 'absolute'
                    }}
                  >
                    BUY 3, GET 1 FREE!
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedQuantity === 4
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-purple-500 bg-transparent'
                    }`}>
                      {selectedQuantity === 4 && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="text-2xl flex-shrink-0">🎮🎮🎮🎮</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-lg">4 Consoles</p>
                      <p className="text-sm text-white">You save £235.03</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4" style={{ minWidth: '120px' }}>
                      <p className="text-2xl font-bold">£164.97</p>
                      <p className="text-sm text-gray-500 line-through">£400</p>
                    </div>
                  </div>
                  
                  {selectedQuantity === 4 && (
                    <div className="mt-3 pt-3 border-t border-purple-500/30 space-y-2">
                      {[1, 2, 3, 4].map((num) => {
                        const dropdownIndex = num + 10; // 使用11-14作为索引，避免与单件和2件购买冲突
                        const selectedColorForIndex = selectedColors[dropdownIndex] || selectedColors[0] || 'White Strike';
                        return (
                          <div key={num}>
                            <label className="block text-sm mb-2">Colour #{num}</label>
                            <div 
                              ref={(el) => { colorDropdownRefs.current[dropdownIndex] = el; }}
                              className="flex-1 relative"
                            >
                              <button
                                type="button"
                                onClick={() => toggleColorDropdown(dropdownIndex)}
                                className="w-full bg-purple-600 border-2 border-purple-500 rounded-lg px-4 py-2 text-white flex items-center justify-between cursor-pointer hover:bg-purple-700 transition"
                                style={{ backgroundColor: '#9333ea' }}
                              >
                                <span>{selectedColorForIndex}</span>
                                <FaChevronDown className="text-white" />
                              </button>
                              {openColorDropdowns[dropdownIndex] && (
                                <div className="absolute z-50 w-full mt-1 bg-purple-600 border-2 border-purple-500 rounded-lg overflow-hidden shadow-lg" style={{ backgroundColor: '#9333ea' }}>
                                  {colors.map((color) => (
                                    <button
                                      key={color}
                                      type="button"
                                      onClick={() => handleColorChange(color, dropdownIndex)}
                                      className={`w-full px-4 py-2 text-left text-white hover:bg-purple-700 transition ${
                                        selectedColorForIndex === color ? 'bg-purple-800' : ''
                                      }`}
                                    >
                                      {color}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* 添加到购物车按钮 */}
              <div className="mb-6">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 shadow-lg shadow-purple-500/50"
                >
                  ADD TO CART
                </button>
                {showAddToCartSuccess && (
                  <p className="text-green-400 text-sm mt-2 text-center animate-fade-in">
                    Added to cart successfully!
                  </p>
                )}
              </div>

              {/* 可折叠的信息部分 */}
              <div className="space-y-0">
                {/* Shipping Information */}
                <div className="border-b border-gray-700">
                  <button
                    onClick={() => toggleSection('shipping')}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚚</span>
                      <span className="font-semibold">Shipping Information</span>
                    </div>
                    {expandedSections.shipping ? (
                      <FaChevronUp className="text-gray-400" />
                    ) : (
                      <FaChevronDown className="text-gray-400" />
                    )}
                  </button>
                  {expandedSections.shipping && (
                    <div className="px-4 pb-4 border-t border-gray-700">
                      <p className="text-gray-300 pt-4">
                        Our standard delivery is <strong>2–8 business days</strong> within the United Kingdom and comes with free tracking. 
                        <strong> Express shipping</strong> is available for <strong>£9.99</strong> and arrives in <strong>1–3 business days</strong>.
                      </p>
                    </div>
                  )}
                </div>

                {/* Console Specs */}
                <div className="border-b border-gray-700">
                  <button
                    onClick={() => toggleSection('specs')}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⚙️</span>
                      <span className="font-semibold">Console Specs</span>
                    </div>
                    {expandedSections.specs ? (
                      <FaChevronUp className="text-gray-400" />
                    ) : (
                      <FaChevronDown className="text-gray-400" />
                    )}
                  </button>
                  {expandedSections.specs && (
                    <div className="px-4 pb-4 border-t border-gray-700 space-y-3">
                      <div className="flex items-center gap-3 pt-4">
                        <FaMicrochip className="text-blue-400" />
                        <div className="text-gray-300">
                          <strong>CPU:</strong> RK3326 64-bit Quad-Core 1.5GHz
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaMemory className="text-green-400" />
                        <div className="text-gray-300">
                          <strong>RAM:</strong> 1GB DDR3L
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaDesktop className="text-purple-400" />
                        <div className="text-gray-300">
                          <strong>Display:</strong> 3.5" IPS HD
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCog className="text-yellow-400" />
                        <div className="text-gray-300">
                          <strong>GPU:</strong> Mali-G31MP2
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaSave className="text-pink-400" />
                        <div className="text-gray-300">
                          <strong>Storage:</strong> 64GB internal + expandable slot for more
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaBatteryFull className="text-orange-400" />
                        <div className="text-gray-300">
                          <strong>Battery:</strong> 3200 mAh – reliable power for longer gaming sessions
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Included Games */}
                <div className="border-b border-gray-700">
                  <button
                    onClick={() => toggleSection('games')}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎮</span>
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
                      <p className="text-gray-300 mb-4 pt-4">
                        The Gamelab console comes packed with over 15,000 classic games, spanning decades and genres. 
                        Relive gaming history with legendary titles from a variety of consoles, including:
                      </p>
                      <div className="space-y-2">
                        <p className="mb-2 text-gray-300">🕹️ <strong>Capcom Play Systems</strong> (1, 2, and 3)</p>
                        <p className="mb-2 text-gray-300">🕹️ <strong>M.A.M.E 2003</strong></p>
                        <p className="mb-2 text-gray-300">🕹️ <strong>PC Engine</strong></p>
                        <p className="mb-2 text-gray-300">🕹️ <strong>Famicom Disk System</strong></p>
                        <p className="mb-2 text-gray-300">🎮 <strong>Nintendo Systems</strong> – NES, SNES, N64, Game Boy, Game Boy Color, Game Boy Advance, and Nintendo DS</p>
                        <p className="mb-2 text-gray-300">🎮 <strong>SEGA Systems</strong> – Mega Drive, Dreamcast, and Game Gear</p>
                        <p className="mb-2 text-gray-300">🎮 <strong>Neo Geo</strong></p>
                        <p className="mb-2 text-gray-300">🎮 <strong>Sony</strong> – PlayStation and PSP</p>
                      </div>
                      <p className="mt-4 text-gray-300">
                        Looking for a specific game? Use our <strong className="text-pink-400">Game Search Tool</strong> to check if your favourites are included!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

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
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
           
           {/* 右侧图片占位（用户后续替换为真实图） */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Every game you grew up with. All on one console.
              </h2>
              
              <p className="text-gray-300 mb-4">
                From Pokémon Red to Fallout 3. Countless games preloaded with 15,000+ legendary titles from Playstation, Nintendo, SEGA and more.
              </p>
              
              <p className="mb-2">
                <strong className="text-lg">No downloads. No subscriptions. No Wi-Fi.</strong>
              </p>
              
              <p className="text-pink-400 font-bold text-lg">
                🔥 Ships from our UK warehouse. Limited stock.
              </p>
            </div>
          </div>
        </section>


        {/* Section 3: Relive the Classics. Anywhere. Anytime. */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Relive the Classics. Anywhere. Anytime.
              </h2>
              <p className="text-2xl font-bold text-purple-400 mb-6">15,000+ GAMES</p>
              <p className="text-gray-300 text-lg mb-4">
                GameLab puts the golden age of gaming in your pocket. 
              </p>
              <p className="text-gray-300 text-lg mb-2">
              15,000+ legendary games, no setups, no downloads, and zero internet required.
              </p>
              <p className="text-gray-300 text-lg mb-2">
                It is fast, portable, and incredibly easy.
              </p>
              <p className="text-gray-300 text-lg">
                Power it on, pick your game, and disappear for hours.
              </p>
            </div>
            <div className="relative">
              {/* 大型游戏插图占位符 */}
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
          </div>
        </section>

        
        {/* Section 5: Built Like the Games That Made You. */}
        <section className="container mx-auto px-4 py-16">
          
          
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

        {/* Section 6: Console Diagram and Key Descriptions */}
        <section className="container mx-auto px-4 py-16">
          

          {/* 游戏机三视图主图 - 居中显示，宽度不要布满整屏 */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl px-4">
              <Image
                src="/horizon.avif"
                alt="Gamelab Horizon console detailed diagram - front, back and three-quarter views with labels"
                width={1600}
                height={1200}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        </section>

        {/* Section 7: Real Gamers Real Nostalgia Real Reviews */}
        <section className="container mx-auto px-4 py-16 ">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Real Gamers Real Nostalgia Real Reviews
          </h2>
          
          {/* 评分摘要和详细分解 */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* 左侧：评分摘要 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {renderPurpleStars(4.61, true)}
              </div>
              <div className="text-2xl font-bold mb-1">4.61 out of 5</div>
              <div className="text-gray-400">Based on 1149 reviews</div>
            </div>

            {/* 中间：详细星级评分分解 */}
            <div className="space-y-2">
              {(() => {
                // 计算实际评论的评分分布
                const ratingCounts = reviews.reduce((acc, review) => {
                  acc[review.rating] = (acc[review.rating] || 0) + 1;
                  return acc;
                }, {} as Record<number, number>);
                
                const totalReviews = reviews.length;
                
                return [5, 4, 3, 2, 1].map((stars) => {
                  const count = ratingCounts[stars] || 0;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  const isSelected = selectedRatingFilter === stars;
                  
                  return (
                    <button
                      key={stars}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedRatingFilter(null);
                        } else {
                          setSelectedRatingFilter(stars);
                        }
                        setCurrentPage(1); // 重置到第一页
                      }}
                      className={`w-full flex items-center gap-3 p-2 rounded transition cursor-pointer ${
                        isSelected ? 'bg-purple-500/40 border-2 border-purple-500' : 'hover:bg-gray-800/50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-1 w-20 flex-shrink-0">
                        {renderPurpleStars(stars)}
                      </div>
                      <div className="flex-1 bg-gray-800 rounded-full h-3 relative overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            stars >= 4 ? 'bg-purple-500' : 'bg-gray-600'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400 w-12 text-right flex-shrink-0">{count}</span>
                    </button>
                  );
                });
              })()}
            </div>

            {/* 右侧：Write a review / Cancel review 按钮 */}
            <div className="flex items-start justify-center">
              <button 
                onClick={() => {
                  if (showReviewForm) {
                    setShowReviewForm(false);
                    setReviewFormData({ rating: 0, title: '', content: '', displayName: '', email: '' });
                  } else {
                    setShowReviewForm(true);
                  }
                }}
                style={{ 
                  backgroundColor: '#9333ea',
                  color: 'white',
                  fontWeight: 'bold',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  height: '40px',
                  lineHeight: '40px',
                  fontSize: '14px',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  border: 'none',
                  transition: 'background-color 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7e22ce';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#9333ea';
                }}
              >
                {showReviewForm ? 'Cancel review' : 'Write a review'}
              </button>
            </div>
          </div>

          {/* See all reviews 链接 - 只在有筛选时显示 */}
          {selectedRatingFilter !== null && (
            <div className="text-center mb-8">
              <button
                onClick={() => {
                  setSelectedRatingFilter(null);
                  setCurrentPage(1);
                }}
                className="text-purple-400 hover:text-purple-300 underline text-base cursor-pointer transition"
              >
                See all reviews
              </button>
            </div>
          )}

          {/* 评论表单 */}
          {showReviewForm && (
            <div className="mb-12 bg-gray-900 p-8 rounded-lg border border-gray-700 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-white">Write a review</h3>
              
              {/* 评分选择 */}
              <div className="mb-6">
                <label className="block text-white mb-3">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewFormData(prev => ({ ...prev, rating: star }))}
                      className="cursor-pointer"
                    >
                      {reviewFormData.rating >= star ? (
                        <FaStar className="text-purple-500 text-2xl" />
                      ) : (
                        <FaRegStar className="text-purple-500 text-2xl" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 评论标题 */}
              <div className="mb-6">
                <label className="block text-white mb-2">
                  Review Title <span className="text-gray-400">(100)</span>
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={reviewFormData.title}
                  onChange={(e) => setReviewFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your review a title"
                  className="w-full bg-white text-gray-900 px-4 py-3 rounded border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 评论内容 */}
              <div className="mb-6">
                <label className="block text-white mb-2">Review content</label>
                <textarea
                  value={reviewFormData.content}
                  onChange={(e) => setReviewFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Start writing here..."
                  rows={6}
                  className="w-full bg-white text-gray-900 px-4 py-3 rounded border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* 图片/视频上传 */}
              <div className="mb-6">
                <label className="block text-white mb-2">Picture/Video (optional)</label>
                <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:border-purple-500 transition">
                  <div className="text-center text-gray-400">
                    <div className="text-3xl mb-2">📤</div>
                    <div className="text-xs">Upload</div>
                  </div>
                </div>
              </div>

              {/* 显示名称 */}
              <div className="mb-6">
                <label className="block text-white mb-2">
                  Display name <span className="text-purple-400">(displayed publicly like John Smith ∨)</span>
                </label>
                <input
                  type="text"
                  value={reviewFormData.displayName}
                  onChange={(e) => setReviewFormData(prev => ({ ...prev, displayName: e.target.value }))}
                  placeholder="Display name"
                  className="w-full bg-white text-gray-900 px-4 py-3 rounded border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 邮箱地址 */}
              <div className="mb-6">
                <label className="block text-white mb-2">Email address</label>
                <input
                  type="email"
                  value={reviewFormData.email}
                  onChange={(e) => setReviewFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Your email address"
                  className="w-full bg-white text-gray-900 px-4 py-3 rounded border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 隐私条款 */}
              <div className="mb-6 text-gray-400 text-sm">
                <p>
                  How we use your data: We'll only contact you about the review you left, and only if necessary. 
                  By submitting your review, you agree to{' '}
                  <span className="text-purple-400 underline cursor-pointer">Judge.me's terms, privacy and content policies</span>.
                </p>
              </div>

              {/* 提交按钮 */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setReviewFormData({ rating: 0, title: '', content: '', displayName: '', email: '' });
                  }}
                  className="bg-white border-2 border-purple-500 text-purple-500 font-bold px-6 py-3 rounded hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel review
                </button>
                <button
                  onClick={() => {
                    if (reviewFormData.rating > 0 && reviewFormData.title && reviewFormData.content && reviewFormData.displayName) {
                      const newReview = {
                        name: reviewFormData.displayName,
                        handle: reviewFormData.displayName.replace(/\s+/g, '') + Math.floor(Math.random() * 1000),
                        rating: reviewFormData.rating,
                        title: reviewFormData.title,
                        text: reviewFormData.content
                      };
                      setReviews(prev => [newReview, ...prev]); // 添加到列表开头
                      setReviewFormData({ rating: 0, title: '', content: '', displayName: '', email: '' });
                      setShowReviewForm(false);
                      setCurrentPage(1); // 重置到第一页
                      setSelectedRatingFilter(null); // 清除筛选
                    }
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded transition cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}

          {/* Customer photos & videos */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-300">Customer photos & videos</h3>
            <div className="flex items-center justify-center gap-4 flex-wrap pb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedReviewIndex((i - 1) % reviews.length);
                    setShowReviewModal(true);
                  }}
                  className="relative flex-shrink-0 w-24 h-24 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden hover:border-purple-500 transition cursor-pointer"
                >
                  <Image
                    src={`/customer${i}.avif`}
                    alt={`Customer photo ${i}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Most Recent 评论部分 */}
          <div>
            

            {/* 评论列表 */}
            <div className="space-y-6">
              {(() => {
                // 根据选中的星级筛选评论
                const filteredReviews = selectedRatingFilter !== null
                  ? reviews.filter(review => review.rating === selectedRatingFilter)
                  : reviews;
                
                const paginatedReviews = filteredReviews.slice(
                  (currentPage - 1) * reviewsPerPage,
                  currentPage * reviewsPerPage
                );
                
                return paginatedReviews.map((review, index) => (
                  <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        {renderPurpleStars(review.rating)}
                      </div>
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">👤</span>
                      </div>
                      <span className="font-bold text-white">{review.name}</span>
                    </div>
                    <p className="text-gray-300">{review.text}</p>
                  </div>
                ));
              })()}
            </div>

            {/* 分页 */}
            {(() => {
              const filteredReviews = selectedRatingFilter !== null
                ? reviews.filter(review => review.rating === selectedRatingFilter)
                : reviews;
              
              if (filteredReviews.length <= reviewsPerPage) return null;
              
              return (
                <div 
                  className="flex items-center justify-center gap-2 mt-8"
                  style={{ marginBottom: '30px' }}
                >
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                      currentPage === 1
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.ceil(filteredReviews.length / reviewsPerPage) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded ${
                        currentPage === page
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredReviews.length / reviewsPerPage), prev + 1))}
                    disabled={currentPage === Math.ceil(filteredReviews.length / reviewsPerPage)}
                    className={`px-4 py-2 rounded ${
                      currentPage === Math.ceil(filteredReviews.length / reviewsPerPage)
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    Next
                  </button>
                </div>
              );
            })()}
          </div>
        </section>

        {/* 增加底部间距 */}
        <div style={{ height: '10px', minHeight: '10px' }}></div>

        {/* 评价弹窗 - 左右布局，占满整页 */}
        {showReviewModal && (
          <div 
            className="fixed inset-0 z-50 flex"
            onClick={(e) => {
              // 点击背景区域关闭弹窗
              if (e.target === e.currentTarget) {
                setShowReviewModal(false);
              }
            }}
          >
            {/* 左侧：评价图片区域 - 占2/3，固定宽度 */}
            <div className="w-2/3 h-full bg-gray-900 p-6 md:p-8 relative flex-shrink-0 flex flex-col" style={{ width: '66.666667%' }}>
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 left-4 text-white hover:text-gray-300 z-10"
              >
                <FaTimes className="text-2xl" />
              </button>
              
              {/* 主图 - 自适应高度，留出空间给缩略图 */}
              <div className="flex-1 min-h-0 mb-4 flex items-center">
                <div className="relative w-full h-full max-h-[calc(100vh-200px)] overflow-hidden">
                  <Image
                    src={`/customer${(selectedReviewIndex % 8) + 1}.avif`}
                    alt={`Customer photo ${(selectedReviewIndex % 8) + 1}`}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 66vw, 100vw"
                  />
                </div>
              </div>

              {/* 缩略图 - 横向一排，固定在底部 */}
              <div className="flex-shrink-0 flex gap-3 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                  const reviewIndex = (i - 1) % reviews.length;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedReviewIndex(reviewIndex)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition ${
                        selectedReviewIndex === reviewIndex
                          ? 'border-purple-500'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <Image
                        src={`/customer${i}.avif`}
                        alt={`Customer photo ${i}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 右侧：评价内容 - 占1/3，固定宽度 */}
            <div 
              className="w-1/3 h-full bg-white shadow-2xl relative flex-shrink-0 flex flex-col"
              style={{ width: '33.333333%' }}
            >
                {/* 关闭按钮 */}
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-20 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md"
                >
                  <FaTimes className="text-xl" />
                </button>

                {/* 顶部紫色条 - 固定高度 */}
                <div className="bg-purple-500 p-4 h-20 flex items-center flex-shrink-0 relative z-10">
                  <div className="flex items-center gap-3 w-full pr-12">
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {renderPurpleStars(reviews[selectedReviewIndex]?.rating || 5)}
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-sm">👤</span>
                    </div>
                    <span className="font-bold text-white text-base truncate">{reviews[selectedReviewIndex]?.name || 'Unknown'}</span>
                  </div>
                </div>

                {/* 评价内容 - 自适应高度 */}
                <div className="flex-1 overflow-y-auto bg-white relative" style={{ minHeight: '200px' }}>
                  <div className="p-6" style={{ color: '#000', backgroundColor: '#fff' }}>
                    {(() => {
                      const review = reviews[selectedReviewIndex];
                      if (!review) {
                        return (
                          <div style={{ color: 'red' }}>
                            <p>Error: Review not found</p>
                            <p style={{ fontSize: '12px', marginTop: '8px' }}>
                              Index: {selectedReviewIndex}, Total: {reviews.length}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <>
                          <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#000' }}>
                            {review.title}
                          </h4>
                          <p style={{ color: '#1f2937', marginBottom: '16px', lineHeight: '1.75', fontSize: '16px' }}>
                            {review.text}
                          </p>
                          <p style={{ color: '#4b5563', marginTop: '16px', fontSize: '14px' }}>
                            {review.handle}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
        )}
      </main>
      <Footer hasStickyBar={true} />
    </div>
  );
};

export default HorizonPage;

