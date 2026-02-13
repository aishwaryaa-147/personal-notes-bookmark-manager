'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Star, X, Save, ExternalLink, Globe } from 'lucide-react';
import { api } from '@/lib/api';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    tags: '',
    isFavorite: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookmarks();
  }, [searchTerm, tags, showFavorites]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.q = searchTerm;
      if (tags) params.tags = tags;
      if (showFavorites) params.favorite = 'true';
      
      const response = await api.bookmarks.getAll(params);
      setBookmarks(response.data);
    } catch (err) {
      setError('Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const bookmarkData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (editingBookmark) {
        await api.bookmarks.update(editingBookmark._id, bookmarkData);
      } else {
        await api.bookmarks.create(bookmarkData);
      }

      resetForm();
      fetchBookmarks();
    } catch (err) {
      setError('Failed to save bookmark');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bookmark) => {
    setEditingBookmark(bookmark);
    setFormData({
      title: bookmark.title,
      url: bookmark.url,
      description: bookmark.description || '',
      tags: bookmark.tags.join(', '),
      isFavorite: bookmark.isFavorite
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      try {
        await api.bookmarks.delete(id);
        fetchBookmarks();
      } catch (err) {
        setError('Failed to delete bookmark');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      description: '',
      tags: '',
      isFavorite: false
    });
    setEditingBookmark(null);
    setIsFormOpen(false);
  };

  const getDomainFromUrl = (url) => {
    try {
      const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Bookmarks</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search bookmarks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Filter by tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showFavorites
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Star className="h-5 w-5 inline mr-2" />
              Favorites
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-5 w-5 inline mr-2" />
              Add Bookmark
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Bookmarks Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">Loading bookmarks...</div>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">No bookmarks found. Add your first bookmark!</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
              <div key={bookmark._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{bookmark.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Globe className="h-4 w-4 mr-1" />
                      {getDomainFromUrl(bookmark.url)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={bookmark.url.startsWith('http') ? bookmark.url : `https://${bookmark.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => handleEdit(bookmark)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(bookmark._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {bookmark.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{bookmark.description}</p>
                )}
                
                {bookmark.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {bookmark.tags.map((tag, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(bookmark.createdAt).toLocaleDateString()}</span>
                  {bookmark.isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingBookmark ? 'Edit Bookmark' : 'Add New Bookmark'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title (optional - will be auto-fetched if empty)
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Leave empty to auto-fetch from URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of this bookmark"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="development, tools, reference"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isFavorite}
                        onChange={(e) => setFormData({ ...formData, isFavorite: e.target.checked })}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Mark as favorite</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 inline mr-2" />
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
