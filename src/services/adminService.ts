import api from './api';

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  featuredImageUrl?: string;
}

export interface PostsPageResponse {
  content: Post[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
}

export interface CreatePostRequest {
  title: string;
  slug: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  tags: string[];
  featuredImageUrl?: string;
}

export interface UpdatePostRequest extends CreatePostRequest {
  id: number;
}

export const adminService = {
  async getPosts(
    page: number = 0,
    pageSize: number = 20,
    status?: 'DRAFT' | 'PUBLISHED' | 'ALL',
    search?: string
  ): Promise<PostsPageResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (status && status !== 'ALL') {
      params.append('status', status);
    }
    if (search) {
      params.append('search', search);
    }

    const response = await api.get<PostsPageResponse>(`/admin/posts?${params.toString()}`);
    return response.data;
  },

  async getPostById(id: number | string): Promise<Post> {
    const response = await api.get<Post>(`/admin/posts/${id}`);
    return response.data;
  },

  async createPost(data: CreatePostRequest): Promise<Post> {
    const response = await api.post<Post>('/admin/posts', data);
    return response.data;
  },

  async updatePost(id: number | string, data: CreatePostRequest): Promise<Post> {
    const response = await api.put<Post>(`/admin/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: number | string): Promise<void> {
    await api.delete(`/admin/posts/${id}`);
  },

  async getTags(): Promise<string[]> {
    const response = await api.get<string[]>('/admin/posts/tags');
    return response.data;
  },
};
