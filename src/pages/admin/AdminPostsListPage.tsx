import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminService } from '../../services/adminService';

interface PostListPost {
  id: number;
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

interface PostsState {
  posts: PostListPost[];
  loading: boolean;
  page: number;
  hasMore: boolean;
}

interface FilterState {
  search: string;
  statusFilter: 'ALL' | 'DRAFT' | 'PUBLISHED';
}

export default function AdminPostsListPage() {
  const [postsState, setPostsState] = useState<PostsState>({
    posts: [],
    loading: true,
    page: 0,
    hasMore: true,
  });

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    statusFilter: 'ALL',
  });

  const navigate = useNavigate();
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadPosts = useCallback(async (_pageNum: number) => {
    try {
      setPostsState(prev => ({ ...prev, loading: true }));
      const response = await adminService.getPosts(_pageNum, 20, filters.statusFilter, filters.search);
      setPostsState(prev => ({
        ...prev,
        posts: _pageNum === 0 ? response.content : [...prev.posts, ...response.content],
        hasMore: !response.last,
        loading: false,
      }));
    } catch (error) {
      toast.error('Failed to load posts');
      setPostsState(prev => ({ ...prev, loading: false }));
    }
  }, [filters.statusFilter, filters.search]);

  useEffect(() => {
    setPostsState(prev => ({ ...prev, page: 0, hasMore: true }));
    loadPosts(0);
  }, [filters.search, filters.statusFilter, loadPosts]);

  useEffect(() => {
    if (!postsState.hasMore) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !postsState.loading) {
          setPostsState(prev => {
            const nextPage = prev.page + 1;
            loadPosts(nextPage);
            return { ...prev, page: nextPage };
          });
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [postsState.loading, postsState.hasMore, loadPosts]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await adminService.deletePost(id);
        setPostsState(prev => ({ ...prev, posts: prev.posts.filter(p => p.id !== id) }));
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
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="input-neon w-full"
          />

          <div className="flex gap-2">
            {(['ALL', 'DRAFT', 'PUBLISHED'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilters(prev => ({ ...prev, statusFilter: status }))}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filters.statusFilter === status
                    ? 'bg-neon-cyan text-dark-bg'
                    : 'border border-neon-blue text-neon-blue hover:border-neon-cyan'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {postsState.loading && postsState.posts.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-neon-cyan"></div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {postsState.posts.map(post => (
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

            {postsState.hasMore && (
              <div ref={observerTarget} className="py-8 text-center text-text-secondary">
                {postsState.loading ? 'Loading more posts...' : ''}
              </div>
            )}
            {!postsState.hasMore && postsState.posts.length > 0 && (
              <div className="py-8 text-center text-text-secondary">
                No more posts to load
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
