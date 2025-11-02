import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';

const NotFound: React.FC = () => {
  return (
    <Container className="text-center py-16 md:py-24">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Go back home
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;