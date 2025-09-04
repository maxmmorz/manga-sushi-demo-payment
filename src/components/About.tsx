import { Clock, MapPin, Phone, Star, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 via-gray-50 to-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              О нас
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Мы готовим настоящие японские суши с 2018 года и дарим вам вкус
              подлинной Японии
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Наша история
                </h2>
                <p className="text-gray-700 mb-4">
                  MANGA SUSHI родилась из любви к подлинной японской кухне. Наш
                  основатель, Такеши Ямамото, проработал 15 лет поваром в лучших
                  ресторанах Токио, прежде чем привезти свои секреты в Алматы.
                </p>
                <p className="text-gray-700 mb-4">
                  Мы используем только свежайшие ингредиенты: норвежский лосось
                  доставляется свежим каждый день, рис готовится по традиционной
                  технологии, а соусы делаются вручную по рецептам из Страны
                  восходящего солнца.
                </p>
                <p className="text-gray-700">
                  За 6 лет работы мы обслужили более 100,000 клиентов и стали
                  одним из самых популярных суши-ресторанов в Алматы.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-96 flex items-center justify-center">
                <span className="text-8xl">🍣</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
                <div className="text-gray-600">Рейтинг</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  100K+
                </div>
                <div className="text-gray-600">Довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">30</div>
                <div className="text-gray-600">Минут доставки</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
                <div className="text-gray-600">Лет опыта</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Наша команда
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍🍳</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Такеши Ямамото
                </h3>
                <p className="text-gray-600">Шеф-повар и основатель</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍💼</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Анна Смирнова
                </h3>
                <p className="text-gray-600">Управляющий</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">🚚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Команда доставки
                </h3>
                <p className="text-gray-600">15 курьеров</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Как нас найти
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Адрес
                </h3>
                <p className="text-gray-600">ул. Абая 150, Алматы</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Телефон
                </h3>
                <a
                  href="tel:+77271234567"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  +7 (727) 123-45-67
                </a>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Время работы
                </h3>
                <p className="text-gray-600">Ежедневно: 10:00 - 23:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
