import { useState } from "react";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Star,
  Clock,
  MapPin,
  ChevronDown,
  CreditCard,
  Check,
  Search,
  Truck,
  Gift,
  Percent,
  ArrowRight,
  Heart,
  Phone,
} from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  popular?: boolean;
  weight: string;
  pieces?: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MangaSushiV2 = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("rolls");
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryType, setDeliveryType] = useState("delivery"); // 'delivery' or 'pickup'
  const [selectedTime, setSelectedTime] = useState("asap"); // 'asap' or specific time
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [useBonusPoints, setUseBonusPoints] = useState(false);
  const [comments, setComments] = useState("");
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);

  // Menu items data
  const menuItems = [
    {
      id: 1,
      name: "Филадельфия классик",
      category: "rolls",
      price: 3500,
      image: "🍣",
      description: "Лосось, сыр филадельфия, огурец",
      popular: true,
      weight: "250г",
      pieces: 8,
    },
    {
      id: 2,
      name: "Калифорния с крабом",
      category: "rolls",
      price: 4200,
      image: "🍣",
      description: "Краб, авокадо, огурец, тобико",
      popular: true,
      weight: "280г",
      pieces: 8,
    },
    {
      id: 3,
      name: "Дракон",
      category: "rolls",
      price: 4800,
      image: "🍣",
      description: "Угорь, огурец, авокадо сверху",
      weight: "300г",
      pieces: 8,
    },
    {
      id: 4,
      name: "Сет Токио",
      category: "sets",
      price: 12500,
      image: "🍱",
      description: "32 шт: Филадельфия, Калифорния, Дракон, Канада",
      popular: true,
      weight: "1200г",
      pieces: 32,
    },
    {
      id: 5,
      name: "Сет Осака",
      category: "sets",
      price: 9900,
      image: "🍱",
      description: "24 шт: Филадельфия, Аляска, Эби",
      weight: "900г",
      pieces: 24,
    },
    {
      id: 6,
      name: "Сашими лосось",
      category: "sashimi",
      price: 5500,
      image: "🐟",
      description: "Свежий норвежский лосось",
      weight: "150г",
      pieces: 5,
    },
    {
      id: 7,
      name: "Том Ям",
      category: "soups",
      price: 2800,
      image: "🍜",
      description: "Острый тайский суп с морепродуктами",
      popular: true,
      weight: "350мл",
    },
    {
      id: 8,
      name: "Мисо суп",
      category: "soups",
      price: 1500,
      image: "🍜",
      description: "Традиционный японский суп",
      weight: "300мл",
    },
    {
      id: 9,
      name: "Темпура креветки",
      category: "hot",
      price: 3200,
      image: "🍤",
      description: "Креветки в кляре, 5 шт",
      weight: "180г",
      pieces: 5,
    },
    {
      id: 10,
      name: "Гёдза",
      category: "hot",
      price: 2100,
      image: "🥟",
      description: "Японские пельмени, 6 шт",
      weight: "150г",
      pieces: 6,
    },
    {
      id: 11,
      name: "Поке с лососем",
      category: "poke",
      price: 3900,
      image: "🥗",
      description: "Рис, лосось, авокадо, эдамаме",
      popular: true,
      weight: "350г",
    },
    {
      id: 12,
      name: "Моти",
      category: "desserts",
      price: 1200,
      image: "🍡",
      description: "Японский десерт, 3 шт",
      weight: "90г",
      pieces: 3,
    },
  ];

  const categories = [
    { id: "rolls", name: "Роллы", count: 24 },
    { id: "sets", name: "Сеты", count: 12 },
    { id: "sashimi", name: "Сашими", count: 8 },
    { id: "soups", name: "Супы", count: 6 },
    { id: "hot", name: "Горячее", count: 15 },
    { id: "poke", name: "Поке", count: 7 },
    { id: "desserts", name: "Десерты", count: 5 },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Payment Form Component
  const PaymentForm = () => {
    const [selectedMethod, setSelectedMethod] = useState("card");
    const [selectedCardOption, setSelectedCardOption] = useState("new");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [saveCard, setSaveCard] = useState(false);
    const [showAllCards, setShowAllCards] = useState(false);

    const savedCards = [
      { id: 1, last4: "4242", brand: "visa", exp: "12/25" },
      { id: 2, last4: "8888", brand: "mastercard", exp: "03/26" },
      { id: 3, last4: "5555", brand: "visa", exp: "08/24" },
    ];

    const formatCardNumber = (value: string) => {
      const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || "";
      const parts = [];
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      return parts.length ? parts.join(" ") : value;
    };

    const formatExpiryDate = (value: string) => {
      const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      if (v.length >= 2) {
        return v.slice(0, 2) + (v.length > 2 ? "/" + v.slice(2, 4) : "");
      }
      return v;
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-black text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
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
            onClick={() => setSelectedMethod("card")}
            className={`py-3 px-2 rounded-xl border-2 transition-all ${
              selectedMethod === "card"
                ? "border-red-500 bg-red-50 text-red-600"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <CreditCard className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs block">Карта</span>
          </button>
          <button
            onClick={() => setSelectedMethod("kaspi")}
            className={`py-3 px-2 rounded-xl border-2 transition-all ${
              selectedMethod === "kaspi"
                ? "border-red-500 bg-red-50 text-red-600"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <div className="w-5 h-5 mx-auto mb-1 bg-red-500 rounded text-white flex items-center justify-center text-xs font-bold">
              K
            </div>
            <span className="text-xs block">Kaspi</span>
          </button>
          <button
            onClick={() => setSelectedMethod("halyk")}
            className={`py-3 px-2 rounded-xl border-2 transition-all ${
              selectedMethod === "halyk"
                ? "border-red-500 bg-red-50 text-red-600"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <div className="w-5 h-5 mx-auto mb-1 bg-green-600 rounded text-white flex items-center justify-center text-xs font-bold">
              H
            </div>
            <span className="text-xs block">Halyk</span>
          </button>
        </div>

        {selectedMethod === "card" && (
          <div className="space-y-3">
            <div
              onClick={() => setSelectedCardOption("new")}
              className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                selectedCardOption === "new"
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Новая карта</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedCardOption === "new"
                      ? "border-red-500 bg-red-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedCardOption === "new" && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              {selectedCardOption === "new" && (
                <div className="space-y-2 mt-3">
                  <input
                    type="text"
                    placeholder="Номер карты"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    maxLength={19}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="ММ/ГГ"
                      value={expiryDate}
                      onChange={(e) =>
                        setExpiryDate(formatExpiryDate(e.target.value))
                      }
                      maxLength={5}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      maxLength={4}
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
                    <span className="text-sm text-gray-600">
                      Сохранить карту
                    </span>
                  </label>
                </div>
              )}
            </div>

            {savedCards
              .slice(0, showAllCards ? savedCards.length : 2)
              .map((card) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCardOption(`saved-${card.id}`)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedCardOption === `saved-${card.id}`
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">💳</div>
                      <div>
                        <div className="text-sm font-medium">
                          •••• {card.last4}
                        </div>
                        <div className="text-xs text-gray-500">{card.exp}</div>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedCardOption === `saved-${card.id}`
                          ? "border-red-500 bg-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedCardOption === `saved-${card.id}` && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {savedCards.length > 2 && (
              <button
                onClick={() => setShowAllCards(!showAllCards)}
                className="w-full py-2 text-sm text-red-600 hover:text-red-700 transition-colors flex items-center justify-center space-x-1"
              >
                <span>{showAllCards ? "Скрыть" : "Показать все карты"}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showAllCards ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        )}

        {(selectedMethod === "kaspi" || selectedMethod === "halyk") && (
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <div className="text-4xl">📱</div>
            </div>
            <p className="text-sm text-gray-600">
              Отсканируйте QR-код в приложении{" "}
              {selectedMethod === "kaspi" ? "Kaspi.kz" : "Halyk Bank"}
            </p>
            <p className="text-xs text-gray-500 mt-2">Код действителен 5:00</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center justify-center"
      >
        <ShoppingCart className="w-6 h-6" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-pulse">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white py-10 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div> */}
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600/50 text-red-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4 sm:mb-6">
              <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Скидка 20% на первый заказ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Настоящие японские <span className="text-red-500">суши</span> с
              доставкой
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8">
              Готовим из свежих продуктов и доставляем за 30 минут
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-semibold text-sm sm:text-base">
                    Бесплатная доставка
                  </p>
                  <p className="text-gray-600 text-xs">от 10 000₸</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-semibold text-sm sm:text-base">
                    30 минут
                  </p>
                  <p className="text-gray-600 text-xs">
                    среднее время доставки
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 sm:col-span-2 lg:col-span-1">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-semibold text-sm sm:text-base">
                    4.9 рейтинг
                  </p>
                  <p className="text-gray-600 text-xs">2000+ отзывов</p>
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2 min-h-[48px]">
              <span>Заказать сейчас</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-full">
        <div className="flex gap-8 max-w-full">
          {/* Categories Sidebar */}
          <aside className="hidden lg:block w-64">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              <h3 className="text-gray-900 font-semibold text-lg mb-4">
                Категории
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
          <main className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Поиск блюд..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors text-base"
                />
              </div>
            </div>

            {/* Mobile Categories */}
            <div className="lg:hidden mb-4 sm:mb-6 overflow-x-auto pb-2">
              <div className="flex space-x-2 sm:space-x-3 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm flex-shrink-0 min-h-[44px] flex items-center ${
                      selectedCategory === category.id
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-4xl sm:text-6xl">{item.image}</span>
                    {item.popular && (
                      <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-600 text-white text-xs px-2 sm:px-3 py-1 rounded-full font-semibold">
                        ХИТ
                      </span>
                    )}
                    <button className="absolute top-2 sm:top-3 left-2 sm:left-3 text-gray-400 hover:text-red-500 transition-colors p-1">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-gray-900 font-semibold text-base sm:text-lg mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                      <span>{item.weight}</span>
                      {item.pieces && <span>{item.pieces} шт</span>}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xl sm:text-2xl font-bold text-gray-900 flex-shrink-0">
                        ₸{item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-1 sm:space-x-2 min-h-[44px] text-sm sm:text-base flex-shrink-0"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
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

      {/* Combined Cart and Payment Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-60"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold">Корзина и Оплата</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6">
                <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
                <p className="text-base sm:text-lg">Корзина пуста</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {/* Cart Items Section */}
                <div className="p-4 sm:p-6 border-b">
                  <h3 className="font-semibold text-base mb-3">Ваш заказ</h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3"
                      >
                        <div className="text-xl sm:text-2xl">{item.image}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            ₸{item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-medium text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Подытог:</span>
                      <span>₸{getTotalPrice().toLocaleString()}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Скидка по промокоду:</span>
                        <span>
                          -₸{Math.round(getTotalPrice() * 0.1).toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Доставка:</span>
                      <span className="text-green-600">
                        {deliveryType === "pickup"
                          ? "Самовывоз"
                          : getTotalPrice() >= 10000
                          ? "Бесплатно"
                          : "₸1000"}
                      </span>
                    </div>
                    {useBonusPoints && (
                      <div className="flex justify-between text-yellow-600">
                        <span>Бонусные баллы:</span>
                        <span>-₸500</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Итого:</span>
                      <span>
                        ₸
                        {(() => {
                          let total = getTotalPrice();
                          if (promoApplied) total *= 0.9; // 10% discount
                          if (deliveryType === "delivery" && total < 10000)
                            total += 1000; // delivery fee
                          if (useBonusPoints) total = Math.max(0, total - 500); // bonus points
                          return Math.round(total).toLocaleString();
                        })()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="p-4 sm:p-6 border-b">
                  <h3 className="font-semibold text-base mb-3">
                    Способ получения
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setDeliveryType("delivery")}
                      className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                        deliveryType === "delivery"
                          ? "border-red-500 bg-red-50 text-red-600"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      <span className="font-medium text-sm">Доставка</span>
                    </button>

                    <button
                      onClick={() => setDeliveryType("pickup")}
                      className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                        deliveryType === "pickup"
                          ? "border-red-500 bg-red-50 text-red-600"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium text-sm">Самовывоз</span>
                    </button>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="p-4 sm:p-6 border-b">
                  <h3 className="font-semibold text-base mb-3 flex items-center">
                    <Clock className="w-5 h-5 text-red-500 mr-2" />
                    Время доставки
                  </h3>
                  <div className="relative">
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-500 appearance-none bg-white"
                    >
                      <option value="asap">Как можно скорее (30-45 мин)</option>
                      <option value="18:00">Запланировать на 18:00</option>
                      <option value="18:30">Запланировать на 18:30</option>
                      <option value="19:00">Запланировать на 19:00</option>
                      <option value="19:30">Запланировать на 19:30</option>
                      <option value="20:00">Запланировать на 20:00</option>
                      <option value="20:30">Запланировать на 20:30</option>
                      <option value="21:00">Запланировать на 21:00</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Upsale Section */}
                <div className="p-4 sm:p-6 border-b">
                  <h3 className="font-semibold text-base mb-3 flex items-center">
                    <Gift className="w-5 h-5 text-red-500 mr-2" />
                    Рекомендуем добавить
                  </h3>
                  <div className="overflow-x-auto pb-2">
                    <div className="flex space-x-3 min-w-max">
                      {[
                        {
                          id: 13,
                          name: "Аляска ролл",
                          price: 2800,
                          image: "🍣",
                          category: "rolls",
                          description: "Краб, огурец, лосось сверху",
                          weight: "220г",
                          pieces: 8,
                        },
                        {
                          id: 14,
                          name: "Канада ролл",
                          price: 3200,
                          image: "🍣",
                          category: "rolls",
                          description: "Лосось, авокадо, икра",
                          weight: "240г",
                          pieces: 8,
                        },
                        {
                          id: 15,
                          name: "Эби ролл",
                          price: 2600,
                          image: "🍣",
                          category: "rolls",
                          description: "Креветка, огурец, спайси соус",
                          weight: "200г",
                          pieces: 8,
                        },
                        {
                          id: 16,
                          name: "Унаги ролл",
                          price: 4100,
                          image: "🍣",
                          category: "rolls",
                          description: "Угорь, огурец, унаги соус",
                          weight: "260г",
                          pieces: 8,
                        },
                      ].map((sushi) => (
                        <div
                          key={sushi.id}
                          className="flex-shrink-0 w-32 bg-white border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <div className="h-24 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-3xl">{sushi.image}</span>
                          </div>
                          <div className="p-2">
                            <h4 className="font-medium text-xs mb-1 line-clamp-1">
                              {sushi.name}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                              {sushi.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-900">
                                ₸{sushi.price.toLocaleString()}
                              </span>
                              <button
                                onClick={() => addToCart(sushi as MenuItem)}
                                className="bg-red-600 text-white p-1.5 rounded-md text-xs hover:bg-red-700 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="p-4 sm:p-6 border-b">
                  <button
                    onClick={() => setShowPromoModal(true)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <Percent className="w-5 h-5 text-red-500" />
                      <div className="text-left">
                        <div className="font-medium text-sm">
                          {promoApplied
                            ? "Промокод применен!"
                            : "У меня есть промокод"}
                        </div>
                        {promoApplied && (
                          <div className="text-xs text-green-600">
                            Скидка 10%
                          </div>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Bonus Points */}
                <div className="p-4 sm:p-6 border-b">
                  <h3 className="font-semibold text-base mb-3 flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    Бонусные баллы
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">
                          Доступно: 500 баллов
                        </div>
                        <div className="text-xs text-gray-500">1 балл = 1₸</div>
                      </div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={useBonusPoints}
                          onChange={(e) => setUseBonusPoints(e.target.checked)}
                          className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                        />
                        <span className="text-sm">Использовать</span>
                      </label>
                    </div>
                    {useBonusPoints && (
                      <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                        К оплате будет списано 500₸ с бонусного счета
                      </div>
                    )}
                  </div>
                </div>

                {/* Comments */}
                <div className="p-4 sm:p-6 border-b">
                  <button
                    onClick={() => setShowCommentsModal(true)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 text-red-500 flex items-center justify-center">
                        💬
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm">
                          {comments
                            ? "Комментарий добавлен"
                            : "Добавить комментарий"}
                        </div>
                        {comments && (
                          <div className="text-xs text-gray-500 truncate max-w-48">
                            {comments}
                          </div>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Payment Section */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-semibold text-base mb-4">
                    Способ оплаты
                  </h3>
                  <PaymentForm />
                </div>
              </div>
            )}

            {/* Sticky Payment Button */}
            {cartItems.length > 0 && (
              <div className="border-t bg-white px-4 sm:px-6 py-4">
                <button className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]">
                  Оплатить ₸
                  {(() => {
                    let total = getTotalPrice();
                    if (promoApplied) total *= 0.9; // 10% discount
                    if (deliveryType === "delivery" && total < 10000)
                      total += 1000; // delivery fee
                    if (useBonusPoints) total = Math.max(0, total - 500); // bonus points
                    return Math.round(total).toLocaleString();
                  })()}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showCommentsModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-60"
            onClick={() => setShowCommentsModal(false)}
          />
          <div className="absolute inset-x-4 top-1/2 transform -translate-y-1/2 bg-white rounded-xl shadow-xl max-w-sm mx-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Комментарий к заказу
              </h3>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Особые пожелания к заказу (острота, аллергии и т.д.)"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-500 resize-vertical"
              />
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => setShowCommentsModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={() => setShowCommentsModal(false)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Promo Code Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-60"
            onClick={() => setShowPromoModal(false)}
          />
          <div className="absolute inset-x-4 top-1/2 transform -translate-y-1/2 bg-white rounded-xl shadow-xl max-w-sm mx-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Введите промокод</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Введите промокод"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-500"
                />
                {promoApplied && (
                  <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-green-700 text-sm font-medium">
                      Промокод применен! Скидка 10%
                    </span>
                  </div>
                )}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Доступные промокоды:</p>
                  <p className="text-xs text-gray-800 font-mono mt-1">
                    SAVE10 - скидка 10%
                  </p>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowPromoModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={() => {
                    if (promoCode.toUpperCase() === "SAVE10") {
                      setPromoApplied(true);
                      setShowPromoModal(false);
                    }
                  }}
                  disabled={!promoCode || promoApplied}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Применить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 sm:py-12 mt-12 sm:mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg sm:text-xl font-bold">
                    M
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-base sm:text-lg">
                    MANGA SUSHI
                  </h3>
                  <p className="text-gray-600 text-xs">
                    Доставка суши в Алматы
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Настоящие японские суши с бесплатной доставкой по городу
              </p>
              <div className="flex space-x-3">
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all min-h-[44px]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all min-h-[44px]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-base">
                Меню
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition-colors py-1 block"
                  >
                    Роллы
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition-colors py-1 block"
                  >
                    Сеты
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition-colors py-1 block"
                  >
                    Горячие блюда
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition-colors py-1 block"
                  >
                    Супы
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition-colors py-1 block"
                  >
                    Десерты
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-base">
                Информация
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition-colors py-1 block"
                  >
                    О компании
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition-colors py-1 block"
                  >
                    Доставка и оплата
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition-colors py-1 block"
                  >
                    Акции
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition-colors py-1 block"
                  >
                    Контакты
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition-colors py-1 block"
                  >
                    Отзывы
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-base">
                Контакты
              </h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <a
                    href="tel:+77271234567"
                    className="hover:text-red-500 transition-colors"
                  >
                    +7 (727) 123-45-67
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>ул. Абая 150, Алматы</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Ежедневно: 10:00 - 23:00</span>
                </li>
              </ul>
              <div className="mt-4">
                <p className="text-gray-600 text-sm mb-2">
                  Принимаем к оплате:
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600">
                    VISA
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600">
                    MC
                  </div>
                  <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-xs text-white font-bold">
                    K
                  </div>
                  <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-xs text-white font-bold">
                    H
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 Manga Sushi. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MangaSushiV2;
