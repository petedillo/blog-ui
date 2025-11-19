import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from './Container';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-all ${isActive ? 'text-neon-cyan shadow-neon-cyan' : 'text-neon-blue hover:text-neon-cyan'}`;

  return (
    <header className="bg-overlay border-b border-neon-cyan/30 sticky top-0 z-40 backdrop-blur-sm">
      <Container className="flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-neon-green hover:text-glow transition-all">
          PeteDio Labs
        </Link>
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
          <NavLink to="/search" className={navLinkClass}>Search</NavLink>
        </nav>
        <button
          className="md:hidden p-2 text-neon-blue hover:text-neon-cyan transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </Container>
      {isMenuOpen && (
        <div className="md:hidden bg-overlay border-t border-neon-cyan/30">
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