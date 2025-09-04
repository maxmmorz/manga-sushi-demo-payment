import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 via-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Свяжитесь с нами
            </h1>
            <p className="text-xl text-gray-700">
              Мы всегда рады помочь вам с заказом или ответить на любые вопросы
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Телефон
                </h3>
                <a
                  href="tel:+77271234567"
                  className="text-gray-600 hover:text-red-500 transition-colors text-lg"
                >
                  +7 (727) 123-45-67
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Для заказов и справок
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Адрес
                </h3>
                <p className="text-gray-600">ул. Абая 150</p>
                <p className="text-gray-600">Алматы, Казахстан</p>
                <p className="text-sm text-gray-500 mt-1">050000</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Режим работы
                </h3>
                <p className="text-gray-600">Ежедневно</p>
                <p className="text-gray-600 font-semibold">10:00 - 23:00</p>
                <p className="text-sm text-gray-500 mt-1">Без выходных</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Email
                </h3>
                <a
                  href="mailto:info@mangasushi.kz"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  info@mangasushi.kz
                </a>
                <p className="text-sm text-gray-500 mt-1">Для предложений</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Напишите нам
                </h2>
                <p className="text-gray-700 mb-6">
                  Есть вопросы или предложения? Заполните форму, и мы свяжемся с
                  вами в ближайшее время.
                </p>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="+7 (700) 000-00-00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тема
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors">
                      <option value="">Выберите тему</option>
                      <option value="order">Вопрос по заказу</option>
                      <option value="delivery">Доставка</option>
                      <option value="quality">Качество продукции</option>
                      <option value="suggestion">Предложение</option>
                      <option value="other">Другое</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Сообщение *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors resize-vertical"
                      placeholder="Опишите ваш вопрос подробно..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Отправить сообщение
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Как нас найти
                </h2>

                {/* Map placeholder */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-64 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Интерактивная карта</p>
                    <p className="text-sm text-gray-400">
                      ул. Абая 150, Алматы
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Быстрые способы связи
                  </h3>

                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp</p>
                      <a
                        href="https://wa.me/77271234567"
                        className="text-gray-600 hover:text-red-500 transition-colors"
                      >
                        +7 (727) 123-45-67
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">T</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Telegram</p>
                      <a
                        href="https://t.me/mangasushi"
                        className="text-gray-600 hover:text-red-500 transition-colors"
                      >
                        @mangasushi
                      </a>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">
                      Время доставки
                    </h4>
                    <p className="text-red-700 text-sm">
                      Стандартная доставка: 30-45 минут
                      <br />
                      Экспресс-доставка: 20-30 минут (+500₸)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Частые вопросы
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Какая минимальная сумма заказа?
                </h3>
                <p className="text-gray-700">
                  Минимальная сумма заказа составляет 3000₸. При заказе от
                  10000₸ доставка бесплатная.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  В какие районы вы доставляете?
                </h3>
                <p className="text-gray-700">
                  Мы доставляем по всему Алматы в пределах города. Стоимость
                  доставки зависит от района.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Можно ли оплатить картой?
                </h3>
                <p className="text-gray-700">
                  Да, мы принимаем оплату наличными, картами Visa/MasterCard, а
                  также через Kaspi и Halyk.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Есть ли скидки для постоянных клиентов?
                </h3>
                <p className="text-gray-700">
                  У нас действует программа лояльности. Каждый 10-й заказ со
                  скидкой 20%!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
