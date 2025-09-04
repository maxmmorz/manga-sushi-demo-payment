import { useState } from 'react';
import { Search, Plus, Heart } from 'lucide-react';

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

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems: MenuItem[] = [
    { id: 1, name: 'Филадельфия классик', category: 'rolls', price: 3500, image: '🍣', description: 'Лосось, сыр филадельфия, огурец', popular: true, weight: '250г', pieces: 8 },
    { id: 2, name: 'Калифорния с крабом', category: 'rolls', price: 4200, image: '🍣', description: 'Краб, авокадо, огурец, тобико', popular: true, weight: '280г', pieces: 8 },
    { id: 3, name: 'Дракон', category: 'rolls', price: 4800, image: '🍣', description: 'Угорь, огурец, авокадо сверху', weight: '300г', pieces: 8 },
    { id: 4, name: 'Аляска', category: 'rolls', price: 3800, image: '🍣', description: 'Лосось, авокадо, огурец', weight: '260г', pieces: 8 },
    { id: 5, name: 'Канада', category: 'rolls', price: 4500, image: '🍣', description: 'Угорь, огурец, кунжут', weight: '290г', pieces: 8 },
    { id: 6, name: 'Сет Токио', category: 'sets', price: 12500, image: '🍱', description: '32 шт: Филадельфия, Калифорния, Дракон, Канада', popular: true, weight: '1200г', pieces: 32 },
    { id: 7, name: 'Сет Осака', category: 'sets', price: 9900, image: '🍱', description: '24 шт: Филадельфия, Аляска, Эби', weight: '900г', pieces: 24 },
    { id: 8, name: 'Сет для двоих', category: 'sets', price: 15900, image: '🍱', description: '40 шт: ассорти из популярных роллов', popular: true, weight: '1500г', pieces: 40 },
    { id: 9, name: 'Сашими лосось', category: 'sashimi', price: 5500, image: '🐟', description: 'Свежий норвежский лосось', weight: '150г', pieces: 5 },
    { id: 10, name: 'Сашими тунец', category: 'sashimi', price: 6200, image: '🐟', description: 'Свежий тунец', weight: '150г', pieces: 5 },
    { id: 11, name: 'Сашими микс', category: 'sashimi', price: 8900, image: '🐟', description: 'Лосось, тунец, морской окунь', weight: '200г', pieces: 9 },
    { id: 12, name: 'Том Ям', category: 'soups', price: 2800, image: '🍜', description: 'Острый тайский суп с морепродуктами', popular: true, weight: '350мл' },
    { id: 13, name: 'Мисо суп', category: 'soups', price: 1500, image: '🍜', description: 'Традиционный японский суп', weight: '300мл' },
    { id: 14, name: 'Суп с лососем', category: 'soups', price: 2200, image: '🍜', description: 'Кремовый суп с кусочками лосося', weight: '350мл' },
    { id: 15, name: 'Темпура креветки', category: 'hot', price: 3200, image: '🍤', description: 'Креветки в кляре, 5 шт', weight: '180г', pieces: 5 },
    { id: 16, name: 'Гёдза', category: 'hot', price: 2100, image: '🥟', description: 'Японские пельмени, 6 шт', weight: '150г', pieces: 6 },
    { id: 17, name: 'Курица терияки', category: 'hot', price: 2800, image: '🍗', description: 'Куриное филе в соусе терияки', weight: '200г' },
    { id: 18, name: 'Поке с лососем', category: 'poke', price: 3900, image: '🥗', description: 'Рис, лосось, авокадо, эдамаме', popular: true, weight: '350г' },
    { id: 19, name: 'Поке с тунцом', category: 'poke', price: 4200, image: '🥗', description: 'Рис, тунец, авокадо, огурец', weight: '350г' },
    { id: 20, name: 'Вегетарианское поке', category: 'poke', price: 2900, image: '🥗', description: 'Рис, авокадо, огурец, эдамаме', weight: '300г' },
    { id: 21, name: 'Моти', category: 'desserts', price: 1200, image: '🍡', description: 'Японский десерт, 3 шт', weight: '90г', pieces: 3 },
    { id: 22, name: 'Дораяки', category: 'desserts', price: 1800, image: '🥞', description: 'Японские блинчики с начинкой', weight: '120г', pieces: 2 },
    { id: 23, name: 'Зеленый чай мороженое', category: 'desserts', price: 1500, image: '🍨', description: 'Мороженое со вкусом зеленого чая', weight: '100г' },
  ];

  const categories = [
    { id: 'all', name: 'Все блюда', count: menuItems.length },
    { id: 'rolls', name: 'Роллы', count: menuItems.filter(item => item.category === 'rolls').length },
    { id: 'sets', name: 'Сеты', count: menuItems.filter(item => item.category === 'sets').length },
    { id: 'sashimi', name: 'Сашими', count: menuItems.filter(item => item.category === 'sashimi').length },
    { id: 'soups', name: 'Супы', count: menuItems.filter(item => item.category === 'soups').length },
    { id: 'hot', name: 'Горячее', count: menuItems.filter(item => item.category === 'hot').length },
    { id: 'poke', name: 'Поке', count: menuItems.filter(item => item.category === 'poke').length },
    { id: 'desserts', name: 'Десерты', count: menuItems.filter(item => item.category === 'desserts').length }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-100 via-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Наше меню
            </h1>
            <p className="text-xl text-gray-700">
              Выберите из более чем 20 видов роллов, сетов и других японских блюд
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Categories Sidebar */}
          <aside className="hidden lg:block w-64">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              <h3 className="text-gray-900 font-semibold text-lg mb-4">Категории</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm opacity-75">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Menu Items */}
          <main className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск блюд..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Mobile Categories */}
            <div className="lg:hidden mb-6 overflow-x-auto pb-2">
              <div className="flex space-x-3 min-w-max">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm ${
                      selectedCategory === category.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-6xl">{item.image}</span>
                    {item.popular && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        ХИТ
                      </span>
                    )}
                    <button className="absolute top-3 left-3 text-gray-400 hover:text-red-500 transition-colors p-1">
                      <Heart className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-gray-900 font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                      <span>{item.weight}</span>
                      {item.pieces && <span>{item.pieces} шт</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">₸{item.price.toLocaleString()}</span>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>В корзину</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Блюда не найдены</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Menu;