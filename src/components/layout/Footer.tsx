import React from 'react';
import Container from './Container';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <Container className="py-8 text-center">
        <p>&copy; {new Date().getFullYear()} PeteDillo.com. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">
          Built with React, Spring Boot, and a lot of coffee.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;