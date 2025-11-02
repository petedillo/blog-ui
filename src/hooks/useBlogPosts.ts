import { useState, useEffect, useCallback } from 'react';
import { blogService } from '../services/blogService';
import { type BlogPost } from '../types/index.ts';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response: BlogPost[] = await blogService.getPosts();
      setPosts(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const refresh = () => {
      fetchPosts();
  }

  return { posts, loading, error, refresh };
};