import React from 'react';

interface ImageSkeletonProps {
  className?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'tall';
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ 
  className = '', 
  aspectRatio = 'video' 
}) => {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    tall: 'aspect-[9/16]'
  };

  return (
    <div 
      className={`animate-pulse bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 ${aspectClasses[aspectRatio]} ${className}`}
      role="status"
      aria-label="Loading image"
    >
      <div className="flex items-center justify-center h-full">
        <svg 
          className="w-12 h-12 text-gray-600 animate-pulse" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    </div>
  );
};

export default ImageSkeleton;
