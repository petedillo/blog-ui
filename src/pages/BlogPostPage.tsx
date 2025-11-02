import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlogPost } from '../hooks/useBlogPost';
import Container from '../components/layout/Container';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatDate } from '../utils/dateFormatter';
import ReactMarkdown from 'react-markdown';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug);

  if (loading) {
    return <Spinner />;
  }

  if (error || !post) {
    return <ErrorMessage message={error || 'Post not found.'} />;
  }

  return (
    <Container className="py-12 max-w-4xl mx-auto">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <div className="text-gray-500 text-sm">
            <span>Published on {formatDate(post.publishedAt)}</span>
            <span className="mx-2">•</span>
            <span>{post.viewCount} views</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </header>
        <div className="prose lg:prose-xl max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </Container>
  );
};

export default BlogPostPage;