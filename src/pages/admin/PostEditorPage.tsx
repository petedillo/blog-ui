import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
    if (isEditing) {
      // TODO: Load post data from adminService.getPostById(id) in Task 15
      setLoading(false);
    }
  }, [id, isEditing]);

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
    setLoading(true);

    try {
      // TODO: Implement save logic in Task 15
      // if (isEditing) {
      //   await adminService.updatePost(id, { title, slug, content, status, tags });
      // } else {
      //   await adminService.createPost({ title, slug, content, status, tags });
      // }
      toast.success(`Post ${isEditing ? 'updated' : 'created'}`);
      navigate('/admin/posts');
    } catch (error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} post`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neon-cyan mb-8">
          {isEditing ? 'Edit Post' : 'New Post'}
        </h1>

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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-bold rounded-lg hover:shadow-neon-glow-cyan transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/posts')}
              className="px-6 py-3 border border-neon-blue text-neon-blue rounded-lg hover:border-neon-cyan transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
