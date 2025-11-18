import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';

const Home: React.FC = () => {
  return (
    <Container className="text-center py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Welcome to My Living Portfolio/Blog
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        I'm Pedro, a software engineer and project manager exploring tech, homelabs, and everything in between. This is where I share my projects, learnings, and thoughts.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/blog"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Explore the Blog
        </Link>
        <Link
          to="/search"
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors duration-200"
        >
          Search Posts
        </Link>
      </div>
    </Container>
  );
};

export default Home;