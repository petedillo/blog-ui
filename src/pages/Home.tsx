import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';

const Home: React.FC = () => {
  return (
    <Container className="text-center py-16 md:py-24">
      <h1 className="heading-neon-primary">
        Welcome to My Living Portfolio/Blog
      </h1>
      <p className="mt-4 text-lg md:text-xl text-neon-body max-w-3xl mx-auto">
        I'm Pedro, a software engineer and project manager exploring tech, homelabs, and everything in between. This is where I share my projects, learnings, and thoughts.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/blog" className="btn-primary">
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