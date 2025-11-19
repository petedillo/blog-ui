export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'PUBLISHED' | 'DRAFT';
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags?: string[];
  media?: Media[];
  coverImage?: {
    url: string;
    altText: string;
  };
}

export interface Media {
  id: number;
  type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'EXTERNAL_IMAGE';
  url: string;
  altText: string;
  caption: string;
  displayOrder: number;
}

export interface Page<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}