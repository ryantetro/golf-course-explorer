// App.tsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import FavoritesPage from "./pages/FavoritesPage";
import "../src/App.css"; // Add this import for specific App styles

const App: React.FC = () => (
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
            <ul className="flex space-x-8">
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
            © {new Date().getFullYear()} Golf Course Explorer. All rights reserved. | 
            Designed with <span className="text-golf-gold">🏌️‍♂️</span> by Ryan Tetro
          </p>
        </div>
      </footer>
    </div>
  </Router>
);

export default App;