// App.tsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import FavoritesPage from "./pages/FavoritesPage";
import "../src/App.css"; // Add this import for specific App styles

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <nav className="bg-fairway-green shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-3">
                <span className="text-3xl text-white">⛳</span>
                <h1 className="text-2xl font-golf-heading text-white hover:text-golf-gold transition-colors duration-300">
                  Golf Course Explorer
                </h1>
              </Link>
              
              {/* Mobile menu button */}
              <button
                className="md:hidden text-white focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Desktop menu */}
              <ul className="hidden md:flex space-x-8">
                <li>
                  <Link
                    to="/"
                    className="text-lg font-medium text-white hover:text-golf-gold transition-all duration-300 nav-link"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className="text-lg font-medium text-white hover:text-golf-gold transition-all duration-300 nav-link"
                  >
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link
                    to="/"
                    className="block text-lg font-medium text-white hover:text-golf-gold transition-all duration-300 nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className="block text-lg font-medium text-white hover:text-golf-gold transition-all duration-300 nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="flex-grow bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
        <footer className="bg-fairway-green text-white">
          <div className="container mx-auto px-6 py-4 text-center">
            <p className="text-sm">
              <span className="text-golf-gold">🏌️‍♂️</span> by Ryan Tetro
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;