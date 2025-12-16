import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Post {
  id: number;
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export default function AdminPostsListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'DRAFT' | 'PUBLISHED'>('ALL');
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadPosts = useCallback(async (_pageNum: number) => {
    try {
      setLoading(true);
      // TODO: Implement adminService.getPosts() call in Task 14
      // const response = await adminService.getPosts(pageNum, 20, statusFilter, search);
      // setPosts(prev => pageNum === 0 ? response.posts : [...prev, ...response.posts]);
      // setHasMore(response.hasMore);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    loadPosts(0);
  }, [statusFilter, search]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          setPage(p => p + 1);
          loadPosts(page + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, loadPosts, page]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        // TODO: Implement adminService.deletePost(id) in Task 14
        setPosts(posts.filter(p => p.id !== id));
        toast.success('Post deleted');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neon-cyan">Posts</h1>
          <button
            onClick={() => navigate('/admin/posts/new')}
            className="px-6 py-2 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-bold rounded-lg hover:shadow-neon-glow-cyan transition-all"
          >
            New Post
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-neon w-full"
          />

          <div className="flex gap-2">
            {(['ALL', 'DRAFT', 'PUBLISHED'] as const).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  statusFilter === status
                    ? 'bg-neon-cyan text-dark-bg'
                    : 'border border-neon-blue text-neon-blue hover:border-neon-cyan'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading && posts.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-neon-cyan"></div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {posts.map(post => (
                <div
                  key={post.id}
                  className="bg-surface-dark border border-neon-blue/30 rounded-lg p-4 hover:border-neon-cyan transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary mb-1">{post.title}</h3>
                      <p className="text-text-secondary text-sm mb-2">/{post.slug}</p>
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.map(tag => (
                          <span key={tag} className="tag-neon text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <span className={`badge-${post.status.toLowerCase()}`}>
                        {post.status}
                      </span>
                      <button
                        onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                        className="text-neon-cyan hover:text-neon-blue transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-error hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div ref={observerTarget} className="py-8 text-center text-text-secondary">
              Loading more posts...
            </div>
          </>
        )}
      </div>
    </div>
  );
}
