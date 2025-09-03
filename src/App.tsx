import React, { useState } from 'react';
import { 
  ShoppingCart, X, Plus, Minus, Star, Clock, MapPin, Phone, 
  ChevronDown, CreditCard, Check, Search, Menu,
  Truck, Gift, Percent, ArrowRight, User, Heart
} from 'lucide-react';

const MangaSushiSite = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('rolls');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Menu items data
  const menuItems = [
    { id: 1, name: 'Филадельфия классик', category: 'rolls', price: 3500, image: '🍣', description: 'Лосось, сыр филадельфия, огурец', popular: true, weight: '250г', pieces: 8 },
    { id: 2, name: 'Калифорния с крабом', category: 'rolls', price: 4200, image: '🍣', description: 'Краб, авокадо, огурец, тобико', popular: true, weight: '280г', pieces: 8 },
    { id: 3, name: 'Дракон', category: 'rolls', price: 4800, image: '🍣', description: 'Угорь, огурец, авокадо сверху', weight: '300г', pieces: 8 },
    { id: 4, name: 'Сет Токио', category: 'sets', price: 12500, image: '🍱', description: '32 шт: Филадельфия, Калифорния, Дракон, Канада', popular: true, weight: '1200г', pieces: 32 },
    { id: 5, name: 'Сет Осака', category: 'sets', price: 9900, image: '🍱', description: '24 шт: Филадельфия, Аляска, Эби', weight: '900г', pieces: 24 },
    { id: 6, name: 'Сашими лосось', category: 'sashimi', price: 5500, image: '🐟', description: 'Свежий норвежский лосось', weight: '150г', pieces: 5 },
    { id: 7, name: 'Том Ям', category: 'soups', price: 2800, image: '🍜', description: 'Острый тайский суп с морепродуктами', popular: true, weight: '350мл' },
    { id: 8, name: 'Мисо суп', category: 'soups', price: 1500, image: '🍜', description: 'Традиционный японский суп', weight: '300мл' },
    { id: 9, name: 'Темпура креветки', category: 'hot', price: 3200, image: '🍤', description: 'Креветки в кляре, 5 шт', weight: '180г', pieces: 5 },
    { id: 10, name: 'Гёдза', category: 'hot', price: 2100, image: '🥟', description: 'Японские пельмени, 6 шт', weight: '150г', pieces: 6 },
    { id: 11, name: 'Поке с лососем', category: 'poke', price: 3900, image: '🥗', description: 'Рис, лосось, авокадо, эдамаме', popular: true, weight: '350г' },
    { id: 12, name: 'Моти', category: 'desserts', price: 1200, image: '🍡', description: 'Японский десерт, 3 шт', weight: '90г', pieces: 3 }
  ];

  const categories = [
    { id: 'rolls', name: 'Роллы', count: 24 },
    { id: 'sets', name: 'Сеты', count: 12 },
    { id: 'sashimi', name: 'Сашими', count: 8 },
    { id: 'soups', name: 'Супы', count: 6 },
    { id: 'hot', name: 'Горячее', count: 15 },
    { id: 'poke', name: 'Поке', count: 7 },
    { id: 'desserts', name: 'Десерты', count: 5 }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i);
      }
      return [...prev, {...item, quantity: 1}];
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? {...item, quantity: newQty} : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Payment Form Component
  const PaymentForm = () => {
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [selectedCardOption, setSelectedCardOption] = useState('new');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [saveCard, setSaveCard] = useState(false);
    const [showAllCards, setShowAllCards] = useState(false);

    const savedCards = [
      { id: 1, last4: '4242', brand: 'visa', exp: '12/25' },
      { id: 2, last4: '8888', brand: 'mastercard', exp: '03/26' },
      { id: 3, last4: '5555', brand: 'visa', exp: '08/24' }
    ];

    const formatCardNumber = (value) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || '';
      const parts = [];
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      return parts.length ? parts.join(' ') : value;
    };

    const formatExpiryDate = (value) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      if (v.length >= 2) {
        return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
      }
      return v;
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-black text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
            <span>🍎</span>
            <span>Apple Pay</span>
          </button>
          <button className="bg-white border border-gray-200 text-gray-800 py-3 rounded-xl text-sm font-medium flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
            <span>G</span>
            <span>Google Pay</span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-xs text-gray-400">или</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedMethod('card')}
            className={`py-3 px-2 rounded-xl border-2 transition-all ${
              selectedMethod === 'card' 
                ? 'border-red-500 bg-red-50 text-red-600' 
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <CreditCard className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs block">Карта</span>
          </button>
          <button
            onClick={() => setSelectedMethod('kaspi')}
            className={`py-3 px-2 rounded-xl border-2 transition-all ${
              selectedMethod === 'kaspi' 
                ? 'border-red-500 bg-red-50 text-red-600' 
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="w-5 h-5 mx-auto mb-1 bg-red-500 rounded text-white flex items-center justify-center text-xs font-bold">K</div>
            <span className="text-xs block">Kaspi</span>
          </button>
          <button
            onClick={() => setSelectedMethod('halyk')}
            className={`py-3 px-2 rounded-xl border-2 transition-all ${
              selectedMethod === 'halyk' 
                ? 'border-red-500 bg-red-50 text-red-600' 
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="w-5 h-5 mx-auto mb-1 bg-green-600 rounded text-white flex items-center justify-center text-xs font-bold">H</div>
            <span className="text-xs block">Halyk</span>
          </button>
        </div>

        {selectedMethod === 'card' && (
          <div className="space-y-3">
            <div
              onClick={() => setSelectedCardOption('new')}
              className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                selectedCardOption === 'new' 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Новая карта</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedCardOption === 'new' ? 'border-red-500 bg-red-500' : 'border-gray-300'
                }`}>
                  {selectedCardOption === 'new' && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              {selectedCardOption === 'new' && (
                <div className="space-y-2 mt-3">
                  <input
                    type="text"
                    placeholder="Номер карты"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength="19"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="ММ/ГГ"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                      maxLength="5"
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      maxLength="4"
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="w-4 h-4 text-red-500 rounded focus:ring-red-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="text-sm text-gray-600">Сохранить карту</span>
                  </label>
                </div>
              )}
            </div>

            {savedCards.slice(0, showAllCards ? savedCards.length : 2).map(card => (
              <div
                key={card.id}
                onClick={() => setSelectedCardOption(`saved-${card.id}`)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedCardOption === `saved-${card.id}` 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">💳</div>
                    <div>
                      <div className="text-sm font-medium">•••• {card.last4}</div>
                      <div className="text-xs text-gray-500">{card.exp}</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedCardOption === `saved-${card.id}` ? 'border-red-500 bg-red-500' : 'border-gray-300'
                  }`}>
                    {selectedCardOption === `saved-${card.id}` && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </div>
            ))}

            {savedCards.length > 2 && (
              <button
                onClick={() => setShowAllCards(!showAllCards)}
                className="w-full py-2 text-sm text-red-600 hover:text-red-700 transition-colors flex items-center justify-center space-x-1"
              >
                <span>{showAllCards ? 'Скрыть' : 'Показать все карты'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAllCards ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        )}

        {(selectedMethod === 'kaspi' || selectedMethod === 'halyk') && (
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <div className="text-4xl">📱</div>
            </div>
            <p className="text-sm text-gray-600">
              Отсканируйте QR-код в приложении {selectedMethod === 'kaspi' ? 'Kaspi.kz' : 'Halyk Bank'}
            </p>
            <p className="text-xs text-gray-500 mt-2">Код действителен 5:00</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">M</span>
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg">MANGA SUSHI</h1>
                  <p className="text-gray-400 text-xs">Доставка суши в Алматы</p>
                </div>
              </div>
              <nav className="hidden lg:flex space-x-6">
                <button className="text-gray-300 hover:text-white transition-colors text-sm">Меню</button>
                <button className="text-gray-300 hover:text-white transition-colors text-sm">Акции</button>
                <button className="text-gray-300 hover:text-white transition-colors text-sm">О нас</button>
                <button className="text-gray-300 hover:text-white transition-colors text-sm">Доставка</button>
                <button className="text-gray-300 hover:text-white transition-colors text-sm">Контакты</button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col text-right">
                <a href="tel:+77271234567" className="text-white font-semibold text-lg hover:text-red-500 transition-colors">+7 (727) 123-45-67</a>
                <span className="text-gray-400 text-xs">Ежедневно с 10:00 до 23:00</span>
              </div>
              <button
                onClick={() => setShowCart(true)}
                className="relative bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden md:inline font-medium">₸{getTotalPrice().toLocaleString()}</span>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden text-white p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div> */}
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600/50 text-red-400 px-4 py-2 rounded-full text-sm mb-6">
              <Gift className="w-4 h-4" />
              <span>Скидка 20% на первый заказ</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Настоящие японские <span className="text-red-500">суши</span> с доставкой
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Готовим из свежих продуктов и доставляем за 30 минут
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur px-4 py-3 rounded-lg">
                <Truck className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-white font-semibold">Бесплатная доставка</p>
                  <p className="text-gray-400 text-xs">от 10 000₸</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur px-4 py-3 rounded-lg">
                <Clock className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-white font-semibold">30 минут</p>
                  <p className="text-gray-400 text-xs">среднее время доставки</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur px-4 py-3 rounded-lg">
                <Star className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-white font-semibold">4.9 рейтинг</p>
                  <p className="text-gray-400 text-xs">2000+ отзывов</p>
                </div>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center space-x-2">
              <span>Заказать сейчас</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Categories Sidebar */}
          <aside className="hidden lg:block w-64">
            <div className="bg-gray-800 rounded-xl p-6 sticky top-24">
              <h3 className="text-white font-semibold text-lg mb-4">Категории</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm opacity-75">{category.count}</span>
                  </button>
                ))}
              </div>
              
              {/* Promo Card */}
              <div className="mt-6 p-4 bg-gradient-to-br from-red-600 to-red-700 rounded-lg">
                <Percent className="w-8 h-8 text-white mb-2" />
                <p className="text-white font-semibold mb-1">Скидка дня</p>
                <p className="text-red-100 text-sm mb-3">−30% на все сеты</p>
                <button className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors w-full">
                  Подробнее
                </button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск блюд..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Mobile Categories */}
            <div className="lg:hidden mb-6 flex overflow-x-auto space-x-3 pb-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all">
                  <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <span className="text-6xl">{item.image}</span>
                    {item.popular && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        ХИТ
                      </span>
                    )}
                    <button className="absolute top-3 left-3 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                      <span>{item.weight}</span>
                      {item.pieces && <span>{item.pieces} шт</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">₸{item.price.toLocaleString()}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>В корзину</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-60" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Корзина</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <ShoppingCart className="w-16 h-16 mb-4" />
                <p className="text-lg">Корзина пуста</p>
              </div>
            ) : (
              <>
                {!showPayment ? (
                  <>
                    {/* Cart Items - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-3">
                          <div className="text-3xl">{item.image}</div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">₸{item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Sticky Bottom Section */}
                    <div className="border-t bg-white">
                      <div className="px-6 py-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Подытог:</span>
                          <span>₸{getTotalPrice().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Доставка:</span>
                          <span className="text-green-600">{getTotalPrice() >= 10000 ? 'Бесплатно' : '₸1000'}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t">
                          <span>Итого:</span>
                          <span>₸{(getTotalPrice() + (getTotalPrice() >= 10000 ? 0 : 1000)).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="px-6 pb-6">
                        <button
                          onClick={() => setShowPayment(true)}
                          className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
                        >
                          Оформить заказ
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Payment Section - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold">Оплата</h3>
                        <button
                          onClick={() => setShowPayment(false)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Назад к корзине
                        </button>
                      </div>
                      <PaymentForm />
                    </div>

                    {/* Sticky Payment Button */}
                    <div className="border-t bg-white px-6 py-4">
                      <button 
                        className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Оплатить ₸{(getTotalPrice() + (getTotalPrice() >= 10000 ? 0 : 1000)).toLocaleString()}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">M</span>
                </div>
                <div>
                  <h3 className="text-white font-bold">MANGA SUSHI</h3>
                  <p className="text-gray-400 text-xs">Доставка суши в Алматы</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Настоящие японские суши с бесплатной доставкой по городу
              </p>
              <div className="flex space-x-3">
                <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Меню</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">Роллы</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Сеты</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Горячие блюда</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Супы</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Десерты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Доставка и оплата</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Акции</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Отзывы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Контакты</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  <a href="tel:+77271234567" className="hover:text-red-500 transition-colors">+7 (727) 123-45-67</a>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>ул. Абая 150, Алматы</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>Ежедневно: 10:00 - 23:00</span>
                </li>
              </ul>
              <div className="mt-4">
                <p className="text-gray-400 text-sm mb-2">Принимаем к оплате:</p>
                <div className="flex space-x-3">
                  <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">VISA</div>
                  <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">MC</div>
                  <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-xs text-white font-bold">K</div>
                  <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-xs text-white font-bold">H</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 Manga Sushi. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MangaSushiSite;