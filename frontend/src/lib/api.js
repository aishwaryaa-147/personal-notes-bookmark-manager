const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // Notes API
  notes: {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/notes?${queryString}`);
      if (!response.ok) throw new Error('Failed to fetch notes');
      return response.json();
    },
    
    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`);
      if (!response.ok) throw new Error('Failed to fetch note');
      return response.json();
    },
    
    create: async (noteData) => {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      });
      if (!response.ok) throw new Error('Failed to create note');
      return response.json();
    },
    
    update: async (id, noteData) => {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      });
      if (!response.ok) throw new Error('Failed to update note');
      return response.json();
    },
    
    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete note');
      return response.json();
    },
  },

  // Bookmarks API
  bookmarks: {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/bookmarks?${queryString}`);
      if (!response.ok) throw new Error('Failed to fetch bookmarks');
      return response.json();
    },
    
    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`);
      if (!response.ok) throw new Error('Failed to fetch bookmark');
      return response.json();
    },
    
    create: async (bookmarkData) => {
      const response = await fetch(`${API_BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookmarkData),
      });
      if (!response.ok) throw new Error('Failed to create bookmark');
      return response.json();
    },
    
    update: async (id, bookmarkData) => {
      const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookmarkData),
      });
      if (!response.ok) throw new Error('Failed to update bookmark');
      return response.json();
    },
    
    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete bookmark');
      return response.json();
    },
  },
};
