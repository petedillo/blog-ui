import React from 'react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import BlogList from '../components/blog/BlogList';
import Container from '../components/layout/Container';

const BlogListPage: React.FC = () => {
  const { posts, loading, error } = useBlogPosts();

  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
        All Blog Posts
      </h1>
      <BlogList posts={posts} loading={loading && posts.length === 0} error={error} />
    </Container>
  );
};

export default BlogListPage;