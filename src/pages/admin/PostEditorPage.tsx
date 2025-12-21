import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminService } from '../../services/adminService';
import { MediaUpload } from '../../components/admin/MediaUpload';
import { MediaGallery } from '../../components/admin/MediaGallery';
import api from '../../services/api';

interface PostFormState {
  title: string;
  slug: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  tags: string[];
}

interface UIState {
  loading: boolean;
  saving: boolean;
}

export default function PostEditorPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<PostFormState>({
    title: '',
    slug: '',
    content: '',
    status: 'DRAFT',
    tags: [],
  });

  const [uiState, setUIState] = useState<UIState>({
    loading: isEditing,
    saving: false,
  });

  const [tagInput, setTagInput] = useState('');
  const [media, setMedia] = useState<any[]>([]);

  useEffect(() => {
    // Auto-generate slug from title
    const newSlug = formData.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    setFormData(prev => ({ ...prev, slug: newSlug }));
  }, [formData.title]);

  useEffect(() => {
    if (isEditing && id) {
      loadPost();
    }
  }, [id, isEditing]);

  const loadPost = async () => {
    try {
      const post = await adminService.getPostById(id as string);
      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content,
        status: post.status,
        tags: post.tags || [],
      });
      await loadMedia();
    } catch (error) {
      toast.error('Failed to load post');
      navigate('/admin/posts');
    } finally {
      setUIState(prev => ({ ...prev, loading: false }));
    }
  };

  const loadMedia = async () => {
    if (!id) return;
    try {
      const response = await api.get(`/admin/media/posts/${id}`);
      setMedia(response.data);
    } catch (error) {
      console.error('Failed to load media:', error);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed && !formData.tags.includes(trimmed)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, trimmed] }));
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('Content is required');
      return;
    }

    setUIState(prev => ({ ...prev, saving: true }));

    try {
      if (isEditing && id) {
        await adminService.updatePost(id, formData);
        toast.success('Post updated successfully!');
      } else {
        await adminService.createPost(formData);
        toast.success('Post created successfully!');
      }

      navigate('/admin/posts');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Operation failed';
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} post: ${message}`);
    } finally {
      setUIState(prev => ({ ...prev, saving: false }));
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neon-cyan mb-8">
          {isEditing ? 'Edit Post' : 'New Post'}
        </h1>

        {uiState.loading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-neon-cyan"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="input-neon w-full"
                placeholder="Post title"
                disabled={uiState.saving}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="input-neon w-full"
                placeholder="auto-generated"
                disabled={uiState.saving}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="input-neon w-full min-h-96 font-mono text-sm"
                placeholder="Markdown content"
                disabled={uiState.saving}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tags
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="input-neon w-full mb-2"
                placeholder="Add tags (press Enter)"
                disabled={uiState.saving}
              />
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <div
                    key={tag}
                    className="tag-neon text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-neon-cyan"
                      disabled={uiState.saving}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'DRAFT' | 'PUBLISHED' }))}
                className="input-neon w-full"
                disabled={uiState.saving}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>

            {isEditing && id && (
              <div className="border-t border-neon-blue/30 pt-6">
                <h2 className="text-xl font-bold text-neon-cyan mb-4">Media</h2>

                <div className="mb-6">
                  <MediaUpload postId={parseInt(id)} onUploadComplete={loadMedia} />
                </div>

                {media.length > 0 && (
                  <div>
                    <p className="text-text-secondary text-sm mb-4">
                      Drag to reorder • First image is the cover
                    </p>
                    <MediaGallery media={media} postId={parseInt(id)} onUpdate={loadMedia} />
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uiState.saving}
                className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-bold rounded-lg hover:shadow-neon-glow-cyan transition-all disabled:opacity-50"
              >
                {uiState.saving ? 'Saving...' : 'Save Post'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/posts')}
                className="px-6 py-3 border border-neon-blue text-neon-blue rounded-lg hover:border-neon-cyan transition-all"
                disabled={uiState.saving}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
