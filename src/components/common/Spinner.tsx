import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-neon-cyan/30 border-t-neon-cyan"></div>
    </div>
  );
};

export default Spinner;