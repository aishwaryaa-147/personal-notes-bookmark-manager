'use client';

import Link from 'next/link';
import { FileText, Bookmark, Home } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Personal Notes & Bookmark Manager
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Organize your thoughts and save your favorite links in one place
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              href="/notes"
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 text-left group"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Notes</h2>
              <p className="text-gray-600 mb-4">
                Create, edit, and organize your notes with tags. Search through your thoughts and mark favorites.
              </p>
              <div className="text-blue-600 font-medium group-hover:text-blue-700">
                Manage Notes →
              </div>
            </Link>
            
            <Link
              href="/bookmarks"
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 text-left group"
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Bookmark className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Bookmarks</h2>
              <p className="text-gray-600 mb-4">
                Save and organize your favorite links. Auto-fetch titles and add descriptions for easy reference.
              </p>
              <div className="text-green-600 font-medium group-hover:text-green-700">
                Manage Bookmarks →
              </div>
            </Link>
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-white/80 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="text-center">
                  <div className="font-medium text-gray-900 mb-1">Search & Filter</div>
                  Find exactly what you need
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900 mb-1">Tag Organization</div>
                  Categorize with custom tags
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900 mb-1">Favorites</div>
                  Mark important items
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
