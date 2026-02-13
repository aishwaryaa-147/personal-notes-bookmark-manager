# Personal Notes & Bookmark Manager

A full-stack web application for managing personal notes and bookmarks with search, filtering, and tagging capabilities.

## Tech Stack

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose** ODM
- **Express-validator** for input validation
- **Axios** for URL metadata fetching
- **Helmet** for security headers
- **Morgan** for HTTP request logging
- **CORS** for cross-origin requests

### Frontend
- **Next.js 14** with App Router
- **React** with hooks
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API calls

## Features

### Notes Management
- ✅ Create, read, update, delete notes
- ✅ Search notes by title, content, and tags
- ✅ Filter notes by tags
- ✅ Mark notes as favorites
- ✅ Tag-based organization
- ✅ Responsive grid layout

### Bookmarks Management
- ✅ Create, read, update, delete bookmarks
- ✅ Auto-fetch metadata (title, description) from URLs
- ✅ URL validation
- ✅ Search bookmarks by title, URL, description, and tags
- ✅ Filter bookmarks by tags
- ✅ Mark bookmarks as favorites
- ✅ Tag-based organization
- ✅ External link opening

### General Features
- ✅ Real-time search and filtering
- ✅ Responsive design for mobile and desktop
- ✅ Clean, modern UI with Tailwind CSS
- ✅ Error handling and validation
- ✅ Loading states
- ✅ Modal forms for CRUD operations

## Project Structure

```
personal-notes-bookmark-manager/
├── backend/
│   ├── models/
│   │   ├── Note.js          # Note schema and model
│   │   └── Bookmark.js      # Bookmark schema and model
│   ├── routes/
│   │   ├── notes.js         # Notes API routes
│   │   └── bookmarks.js     # Bookmarks API routes
│   ├── server.js            # Express server setup
│   ├── package.json
│   └── .env                 # Environment variables
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.js      # Home page
    │   │   ├── notes/
    │   │   │   └── page.js  # Notes management page
    │   │   └── bookmarks/
    │   │       └── page.js  # Bookmarks management page
    │   └── lib/
    │       └── api.js       # API client functions
    ├── package.json
    └── tailwind.config.js
```

## API Documentation

### Notes API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes (supports `?q=search&tags=tag1,tag2&favorite=true`) |
| GET | `/api/notes/:id` | Get a single note by ID |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update an existing note |
| DELETE | `/api/notes/:id` | Delete a note |

### Bookmarks API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookmarks` | Get all bookmarks (supports `?q=search&tags=tag1,tag2&favorite=true`) |
| GET | `/api/bookmarks/:id` | Get a single bookmark by ID |
| POST | `/api/bookmarks` | Create a new bookmark (auto-fetches title if not provided) |
| PUT | `/api/bookmarks/:id` | Update an existing bookmark |
| DELETE | `/api/bookmarks/:id` | Delete a bookmark |

### Data Models

#### Note
```javascript
{
  title: String (required, max 200 chars),
  content: String (required, max 5000 chars),
  tags: [String],
  isFavorite: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

#### Bookmark
```javascript
{
  title: String (required, max 200 chars),
  url: String (required, validated URL),
  description: String (optional, max 500 chars),
  tags: [String],
  isFavorite: Boolean (default: false),
  metadata: {
    fetchedTitle: String,
    favicon: String,
    description: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-bookmarks
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## Usage

1. **Home Page**: Navigate to `http://localhost:3000` to see the main dashboard
2. **Notes Management**: Click "Manage Notes" or go to `/notes`
   - Create new notes with title, content, and tags
   - Search and filter existing notes
   - Edit or delete notes
   - Mark notes as favorites
3. **Bookmarks Management**: Click "Manage Bookmarks" or go to `/bookmarks`
   - Add new bookmarks with URLs (title auto-fetched)
   - Search and filter bookmarks
   - Edit or delete bookmarks
   - Mark bookmarks as favorites

## Sample API Requests

### Create a Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meeting Notes",
    "content": "Discuss project timeline and deliverables",
    "tags": ["work", "meetings"],
    "isFavorite": true
  }'
```

### Create a Bookmark
```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://github.com",
    "description": "GitHub - Where the world builds software",
    "tags": ["development", "tools"],
    "isFavorite": false
  }'
```

### Search Notes
```bash
curl "http://localhost:5000/api/notes?q=meeting&tags=work"
```

## Development Notes

- The backend uses MongoDB with Mongoose for data modeling
- Search functionality uses MongoDB text indexes for efficient searching
- URL metadata fetching is handled server-side with Axios
- Frontend uses React hooks for state management
- Responsive design implemented with Tailwind CSS
- Error handling and loading states throughout the application

## Future Enhancements

- User authentication with JWT
- User-specific data isolation
- Export/import functionality
- Advanced search with filters
- Bookmark categories/folders
- Note templates
- Rich text editor for notes
- Bookmark preview thumbnails
- API rate limiting
- Data analytics dashboard

## License

This project is open source and available under the MIT License.
