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
        <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden h-full flex flex-col">
            <img
                src={coverImageUrl}
                alt={altText}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 bg-gray-200"
                onError={(e) => { e.currentTarget.style.backgroundColor = '#e5e7eb'; }}
            />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-gray-500">{formatDate(post.publishedAt)}</span>
                    <span className="text-blue-600 font-medium">Read more →</span>
                </div>
            </div>
        </article>
    </Link>
  );
};

export default BlogCard;