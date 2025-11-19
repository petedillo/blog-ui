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
        <article className="card-neon h-full flex flex-col">
            <img
                src={coverImageUrl}
                alt={altText}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 bg-overlay"
                onError={(e) => { e.currentTarget.style.backgroundColor = '#1a1a2e'; }}
            />
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