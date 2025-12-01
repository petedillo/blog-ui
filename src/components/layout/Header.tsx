import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from './Container';
import { Menu } from 'lucide-react';
import { useEnvironment } from '../../hooks/useEnvironment';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { info } = useEnvironment();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-colors ${isActive ? 'link-neon-active' : 'link-neon'}`;

  const envBadgeColors = {
    prod: 'bg-red-500/20 border-red-500 text-red-400',
    stage: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
    dev: 'bg-neon-green/20 border-neon-green text-neon-green'
  };

  return (
    <>
      {info && info.environment !== 'prod' && (
        <div className={`text-center py-1 text-xs font-semibold border-b ${envBadgeColors[info.environment]}`}>
          <div className="flex items-center justify-center gap-3">
            <span>{info.environment.toUpperCase()} ENVIRONMENT</span>
            <span className="opacity-70">•</span>
            <span className="opacity-70">{info.name} v{info.version}</span>
          </div>
        </div>
      )}
      <header className="header-neon">
        <Container className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-neon-green hover:text-neon-cyan transition-colors">
            PeteDio Labs
          </Link>
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
            <NavLink to="/search" className={navLinkClass}>Search</NavLink>
          </nav>
          <button className="md:hidden p-2 text-neon-cyan hover:text-neon-green transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </Container>
        {isMenuOpen && (
          <div className="md:hidden border-t border-neon-cyan/30">
              <nav className="flex flex-col items-center space-y-4 py-4">
                  <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                  <NavLink to="/blog" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Blog</NavLink>
                  <NavLink to="/search" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Search</NavLink>
              </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;