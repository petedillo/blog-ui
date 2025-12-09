import api from './api';
import { type BlogPost, type Page } from '../types/index.ts';

export const blogService = {
  getPosts: async (): Promise<BlogPost[]> => {
    const response = await api.get<Page<BlogPost>>('/posts');
    return response.data.content;
  },
  searchPosts: async (query: string): Promise<BlogPost[]> => {
    const response = await api.get<Page<BlogPost>>('/search', {
      params: { q: query },
    });
    return response.data.content;
  },
  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await api.get<BlogPost>(`/posts/${slug}`);
    return response.data;
  },
};