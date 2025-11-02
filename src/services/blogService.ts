import api from './api';
import { type BlogPost } from '../types/index.ts';

interface SearchResponse {
    query: string;
    results: BlogPost[];
}

export const blogService = {
  getPosts: async (): Promise<BlogPost[]> => {
    const response = await api.get('/posts');
    return response.data;
  },
  searchPosts: async (query: string): Promise<SearchResponse> => {
    const response = await api.get('/search', {
      params: { searchTerm: query },
    });
    return response.data;
  },
};