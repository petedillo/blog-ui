import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';

const Home: React.FC = () => {
  return (
    <Container className="text-center py-16 md:py-24 relative">
      {/* Decorative neon accents */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-neon-pink/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-neon-orange/10 rounded-full blur-3xl"></div>

      <h1 className="heading-neon-primary relative z-10">
        Welcome to My Living <span className="text-neon-pink">Portfolio</span>/<span className="text-neon-orange">Blog</span>
      </h1>
      <p className="mt-4 text-lg md:text-xl text-neon-body max-w-3xl mx-auto relative z-10">
        I'm <span className="text-neon-pink font-semibold">Pedro</span>, a software engineer and project manager exploring tech, homelabs, and everything in between. This is where I share my projects, learnings, and thoughts.
      </p>
      <div className="mt-8 flex justify-center gap-4 relative z-10">
        <Link to="/blog" className="px-6 py-3 bg-gradient-to-r from-neon-pink to-neon-orange text-dark-bg font-bold rounded-lg hover:shadow-neon-glow-orange hover:from-neon-orange hover:to-neon-pink transition-all duration-300 transform hover:scale-105 !text-dark-bg hover:!text-dark-bg">
          Explore the Blog
        </Link>
        <Link to="/search" className="btn-secondary">
          Search Posts
        </Link>
      </div>
    </Container>
  );
};

export default Home;