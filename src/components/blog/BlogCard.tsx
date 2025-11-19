import React from 'react';
import { Link } from 'react-router-dom';
import { type BlogPost } from '../../types';
import { formatDate } from '../../utils/dateFormatter';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const coverImageUrl = post.coverImage ? post.coverImage.url : '/placeholder.jpg';
  const altText = post.coverImage ? post.coverImage.altText : post.title;

  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <article className="card-neon cursor-pointer h-full flex flex-col">
        {/* Cover Image with neon border on hover */}
        <div className="relative overflow-hidden rounded-lg mb-4 border-2 border-transparent group-hover:border-neon-cyan transition-all">
          <img
            src={coverImageUrl}
            alt={altText}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300 bg-dark-bg"
            onError={(e) => { e.currentTarget.style.backgroundColor = '#0A0F24'; }}
          />
        </div>

        <div className="flex flex-col flex-grow">
          {/* Title with neon green */}
          <h2 className="text-2xl font-bold text-neon-green mb-2 group-hover:text-glow transition-all">
            {post.title}
          </h2>

          {/* Excerpt with cyan text */}
          <p className="text-neon-cyan mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          {/* Tags with neon blue */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-dark-bg border border-neon-blue rounded-full text-neon-blue hover:border-neon-cyan hover:text-neon-cyan transition-all"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-neon-blue mt-auto">
            <time>{formatDate(post.publishedAt)}</time>
            <span>{post.viewCount} views</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;