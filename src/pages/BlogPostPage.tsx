import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogPost } from '../hooks/useBlogPost';
import Container from '../components/layout/Container';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ImageSkeleton from '../components/common/ImageSkeleton';
import { formatDate } from '../utils/dateFormatter';
import { getImageUrl, handleImageError } from '../utils/imageUtils';
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
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);
  const [galleryImagesLoaded, setGalleryImagesLoaded] = useState<Record<number, boolean>>({});

  if (loading) {
    return <Spinner />;
  }

  if (error || !post) {
    return <ErrorMessage message={error || 'Post not found.'} />;
  }

  // Filter gallery images (excludes cover image which has displayOrder = 0)
  const galleryImages = post.media 
    ? post.media
        .filter(media => media.displayOrder != null && media.displayOrder > 0)
        .filter(media => getImageUrl(media.url))
    : [];

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
        
        {/* Cover Image */}
        {post.coverImage && getImageUrl(post.coverImage.url) && (
          <div className="mb-8 rounded-lg overflow-hidden border border-neon-blue/30 shadow-neon-glow">
            <div className="relative">
              {!coverImageLoaded && (
                <ImageSkeleton className="absolute inset-0 w-full" aspectRatio="wide" />
              )}
              <img
                src={getImageUrl(post.coverImage.url)!}
                alt={post.coverImage.altText || post.title}
                className={`w-full h-auto object-cover transition-opacity duration-300 ${!coverImageLoaded ? 'opacity-0' : 'opacity-100'}`}
                loading="eager"
                onLoad={() => setCoverImageLoaded(true)}
                onError={handleImageError}
              />
            </div>
          </div>
        )}

        {/* Content */}
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

        {/* Media Gallery */}
        {galleryImages.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-2xl font-bold text-neon-blue mb-6">Media Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map(media => (
                  <div 
                    key={media.id} 
                    className="group relative rounded-lg overflow-hidden border border-neon-purple/30 hover:border-neon-pink transition-all duration-300"
                  >
                    <div className="relative h-64">
                      {!galleryImagesLoaded[media.id] && (
                        <ImageSkeleton className="absolute inset-0 w-full h-64" />
                      )}
                      <img
                        src={getImageUrl(media.url)!}
                        alt={media.altText || ''}
                        width={400}
                        height={256}
                        className={`w-full h-64 object-cover group-hover:scale-105 transition-all duration-300 ${!galleryImagesLoaded[media.id] ? 'opacity-0' : 'opacity-100'}`}
                        loading="lazy"
                        onLoad={() => setGalleryImagesLoaded(prev => ({ ...prev, [media.id]: true }))}
                        onError={handleImageError}
                      />
                    </div>
                    {media.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                        <p className="text-sm text-gray-300">{media.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </article>
    </Container>
  );
};

export default BlogPostPage;