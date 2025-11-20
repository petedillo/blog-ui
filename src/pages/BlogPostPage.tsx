import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlogPost } from '../hooks/useBlogPost';
import Container from '../components/layout/Container';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatDate } from '../utils/dateFormatter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  NeonTable,
  NeonTableHead,
  NeonTableBody,
  NeonTableRow,
  NeonTableHeader,
  NeonTableCell,
} from '../components/markdown/MarkdownTable';

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
          <h1 className="heading-neon-primary mb-4">
            {post.title}
          </h1>
          <div className="text-neon-meta">
            <span>Published on {formatDate(post.publishedAt)}</span>
            <span className="mx-2">•</span>
            <span>{post.viewCount} views</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="tag-neon">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="prose prose-invert lg:prose-xl max-w-none prose-headings:text-neon-green prose-p:text-neon-cyan prose-a:text-neon-blue prose-strong:text-neon-green prose-code:text-neon-cyan prose-pre:bg-overlay prose-pre:border prose-pre:border-neon-cyan/30 prose-li:text-neon-cyan prose-blockquote:text-neon-blue prose-blockquote:border-neon-cyan">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: NeonTable,
              thead: NeonTableHead,
              tbody: NeonTableBody,
              tr: NeonTableRow,
              th: NeonTableHeader,
              td: NeonTableCell,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </Container>
  );
};

export default BlogPostPage;