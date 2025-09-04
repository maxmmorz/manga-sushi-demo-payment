import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Menu as MenuIcon } from "lucide-react";
import Home from "./components/Home";
import Menu from "./components/Menu";
import About from "./components/About";
import Contact from "./components/Contact";
import MangaSushiV1 from "./components/MangaSushiV1";
import MangaSushiV2 from "./components/MangaSushiV2";

const Navigation = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-8">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg sm:text-xl font-bold">
                  M
                </span>
              </div>
              <div>
                <h1 className="text-gray-900 font-bold text-base sm:text-lg">
                  MANGA SUSHI
                </h1>
                <p className="text-gray-600 text-xs hidden sm:block">
                  Доставка суши в Алматы
                </p>
              </div>
            </Link>
            <nav className="hidden lg:flex space-x-6">
              <Link
                to="/v1"
                className={`transition-colors text-sm ${
                  isActive("/v1") || isActive("/")
                    ? "text-red-600 font-semibold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                V1
              </Link>
              <Link
                to="/v2"
                className={`transition-colors text-sm ${
                  isActive("/v2")
                    ? "text-red-600 font-semibold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                V2
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:flex flex-col text-right">
              <a
                href="tel:+77271234567"
                className="text-gray-900 font-semibold text-lg hover:text-red-500 transition-colors"
              >
                +7 (727) 123-45-67
              </a>
              <span className="text-gray-600 text-xs">
                Ежедневно с 10:00 до 23:00
              </span>
            </div>
            <Link
              to="/v1"
              className="relative bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all transform hover:scale-105 flex items-center space-x-1 sm:space-x-2 min-h-[44px]"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline font-medium text-white">
                Заказать
              </span>
              <span className="sm:hidden text-sm font-medium">Заказ</span>
            </Link>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden text-gray-900 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3">
            <div className="flex flex-col space-y-3">
              <a
                href="tel:+77271234567"
                className="flex items-center space-x-3 text-gray-900 font-semibold hover:text-red-500 transition-colors py-2"
              >
                <span>+7 (727) 123-45-67</span>
              </a>
              <div className="flex flex-col gap-2">
                <Link
                  to="/v1"
                  className={`transition-colors text-sm py-2 ${
                    isActive("/v1") || isActive("/")
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  V1
                </Link>
                <Link
                  to="/v2"
                  className={`transition-colors text-sm py-2 ${
                    isActive("/v2")
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  V2
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<MangaSushiV1 />} />
          <Route path="/v1" element={<MangaSushiV1 />} />
          <Route path="/v2" element={<MangaSushiV2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
