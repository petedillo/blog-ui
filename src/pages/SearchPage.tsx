import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import BlogList from '../components/blog/BlogList';
import Container from '../components/layout/Container';
import { Search } from 'lucide-react';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const { query, setQuery, results, loading, error } = useSearch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q') || '';
    setQuery(q);
    setInputValue(q);
  }, [location.search, setQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
  };

  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
        Search Posts
      </h1>
      <form onSubmit={handleSearch} className="relative w-full max-w-lg mx-auto mb-12">
        <input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Search by title or tag..."
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </form>

      {query && (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
                Results for "{query}"
            </h2>
            <BlogList posts={results} loading={loading} error={error} />
        </div>
      )}
    </Container>
  );
};

export default SearchPage;