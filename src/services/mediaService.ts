import api from './api';

export interface MediaFile {
  id: number;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  width?: number;
  height?: number;
  uploadedAt: string;
}

export interface UploadResponse {
  id: number;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  width?: number;
  height?: number;
}

export const mediaService = {
  async uploadMedia(postId: number, file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<UploadResponse>(
      `/admin/media/upload?postId=${postId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  async getMediaForPost(postId: number): Promise<MediaFile[]> {
    const response = await api.get<MediaFile[]>(`/admin/media/posts/${postId}`);
    return response.data;
  },

  async deleteMedia(id: number): Promise<void> {
    await api.delete(`/admin/media/${id}`);
  },

  async updateMediaMetadata(
    id: number,
    metadata: { filename?: string; altText?: string }
  ): Promise<MediaFile> {
    const response = await api.put<MediaFile>(`/admin/media/${id}/metadata`, metadata);
    return response.data;
  },

  async reorderMedia(postId: number, mediaIds: number[]): Promise<void> {
    await api.put(`/admin/media/posts/${postId}/reorder`, { mediaIds });
  },
};
