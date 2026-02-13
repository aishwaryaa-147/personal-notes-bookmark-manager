# Personal Notes & Bookmark Manager - Backend

Backend API for the Personal Notes & Bookmark Manager application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-bookmarks
NODE_ENV=development
```

3. Start the server:
```bash
npm start
```

## API Endpoints

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Bookmarks
- `GET /api/bookmarks` - Get all bookmarks
- `GET /api/bookmarks/:id` - Get single bookmark
- `POST /api/bookmarks` - Create bookmark
- `PUT /api/bookmarks/:id` - Update bookmark
- `DELETE /api/bookmarks/:id` - Delete bookmark

## Features

- RESTful API design
- Input validation with express-validator
- MongoDB with Mongoose ODM
- Auto-fetch URL metadata for bookmarks
- Search and filter functionality
- Error handling and logging
- Security headers with Helmet
