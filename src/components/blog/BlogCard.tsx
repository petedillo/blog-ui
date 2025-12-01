import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPost } from '../../types';
import { formatDate } from '../../utils/dateFormatter';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
import ImageSkeleton from '../common/ImageSkeleton';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = post.coverImage ? getImageUrl(post.coverImage.url) : null;
  const altText = post.coverImage ? post.coverImage.altText : post.title;

  return (
    <Link to={`/blog/${post.slug}`} className="block group">
        <article className="card-neon h-full flex flex-col">
            {imageUrl ? (
              <div className="relative w-full h-48 overflow-hidden">
                {!imageLoaded && (
                  <ImageSkeleton className="absolute inset-0 w-full h-48" />
                )}
                <img
                  src={imageUrl}
                  alt={altText}
                  width={400}
                  height={192}
                  className={`w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={handleImageError}
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-t-lg flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-neon-green mb-2 group-hover:text-neon-cyan transition-colors">
                    {post.title}
                </h3>
                <p className="text-neon-body mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag-neon text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-neon-meta">{formatDate(post.publishedAt)}</span>
                    <span className="text-neon-blue font-medium group-hover:text-neon-cyan transition-colors">Read more →</span>
                </div>
            </div>
        </article>
    </Link>
  );
};

export default BlogCard;