# Personal Notes & Bookmark Manager - Frontend

Frontend application for managing personal notes and bookmarks.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Features

- **Notes Management**
  - Create, edit, delete notes
  - Search and filter by tags
  - Mark favorites
  - Responsive grid layout

- **Bookmarks Management**
  - Add bookmarks with auto-fetched titles
  - URL validation
  - Search and filter
  - External link opening

- **UI/UX**
  - Modern design with Tailwind CSS
  - Responsive for mobile and desktop
  - Loading states and error handling
  - Modal forms for CRUD operations

## Pages

- `/` - Home dashboard
- `/notes` - Notes management
- `/bookmarks` - Bookmarks management

## Technologies

- Next.js 14 with App Router
- React with hooks
- Tailwind CSS
- Lucide React icons
- Axios for API calls
