import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from './Container';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`;

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200">
      <Container className="flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          PeteDillo.com
        </Link>
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
          <NavLink to="/search" className={navLinkClass}>Search</NavLink>
        </nav>
        <button className="md:hidden p-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </Container>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="flex flex-col items-center space-y-4 py-4">
                <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                <NavLink to="/blog" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Blog</NavLink>
                <NavLink to="/search" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Search</NavLink>
            </nav>
        </div>
      )}
    </header>
  );
};

export default Header;