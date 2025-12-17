import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminService } from '../../services/adminService';

export default function PostEditorPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Auto-generate slug from title
    const newSlug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    setSlug(newSlug);
  }, [title]);

  useEffect(() => {
    if (isEditing && id) {
      loadPost();
    }
  }, [id, isEditing]);

  const loadPost = async () => {
    try {
      const post = await adminService.getPostById(id as string);
      setTitle(post.title);
      setSlug(post.slug);
      setContent(post.content);
      setStatus(post.status);
      setTags(post.tags || []);
    } catch (error) {
      toast.error('Failed to load post');
      navigate('/admin/posts');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Content is required');
      return;
    }

    setSaving(true);

    try {
      const postData = { title, slug, content, status, tags };
      
      if (isEditing && id) {
        await adminService.updatePost(id, postData);
        toast.success('Post updated successfully!');
      } else {
        await adminService.createPost(postData);
        toast.success('Post created successfully!');
      }
      
      navigate('/admin/posts');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Operation failed';
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} post: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neon-cyan mb-8">
          {isEditing ? 'Edit Post' : 'New Post'}
        </h1>

        {loading ? (
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-neon w-full"
                placeholder="Post title"
                disabled={saving}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="input-neon w-full"
                placeholder="auto-generated"
                disabled={saving}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input-neon w-full min-h-96 font-mono text-sm"
                placeholder="Markdown content"
                disabled={saving}
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
                disabled={saving}
              />
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <div
                    key={tag}
                    className="tag-neon text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-neon-cyan"
                      disabled={saving}
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
                value={status}
                onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
                className="input-neon w-full"
                disabled={saving}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-bold rounded-lg hover:shadow-neon-glow-cyan transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Post'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/posts')}
                className="px-6 py-3 border border-neon-blue text-neon-blue rounded-lg hover:border-neon-cyan transition-all"
                disabled={saving}
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
