const express = require('express');
const { body, validationResult } = require('express-validator');
const axios = require('axios');
const Bookmark = require('../models/Bookmark');

const router = express.Router();

// Validation middleware
const validateBookmark = [
  body('title').optional().trim().isLength({ max: 200 }),
  body('url').notEmpty().withMessage('URL is required').trim().isURL(),
  body('description').optional().trim().isLength({ max: 500 }),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().trim().isLength({ max: 50 }),
  body('isFavorite').optional().isBoolean()
];

// Helper function to fetch URL metadata
async function fetchUrlMetadata(url) {
  try {
    // Ensure URL has protocol
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    
    const response = await axios.get(formattedUrl, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = response.data;
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    
    return {
      fetchedTitle: titleMatch ? titleMatch[1].trim() : null,
      description: descriptionMatch ? descriptionMatch[1].trim() : null
    };
  } catch (error) {
    console.error('Error fetching URL metadata:', error.message);
    return null;
  }
}

// GET /api/bookmarks - Get all bookmarks with optional search and filter
router.get('/', async (req, res) => {
  try {
    const { q, tags, favorite } = req.query;
    let query = {};

    // Search functionality
    if (q) {
      query.$text = { $search: q };
    }

    // Filter by tags
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      query.tags = { $in: tagArray };
    }

    // Filter by favorites
    if (favorite === 'true') {
      query.isFavorite = true;
    }

    const bookmarks = await Bookmark.find(query)
      .sort({ createdAt: -1 })
      .limit(50); // Limit to prevent performance issues

    res.json({
      success: true,
      count: bookmarks.length,
      data: bookmarks
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookmarks'
    });
  }
});

// GET /api/bookmarks/:id - Get a single bookmark
router.get('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    
    if (!bookmark) {
      return res.status(404).json({
        success: false,
        error: 'Bookmark not found'
      });
    }

    res.json({
      success: true,
      data: bookmark
    });
  } catch (error) {
    console.error('Error fetching bookmark:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookmark'
    });
  }
});

// POST /api/bookmarks - Create a new bookmark
router.post('/', validateBookmark, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { title, url, description, tags, isFavorite } = req.body;
    
    // Auto-fetch title if not provided
    let finalTitle = title;
    let metadata = {};
    
    if (!title) {
      const fetchedMetadata = await fetchUrlMetadata(url);
      if (fetchedMetadata && fetchedMetadata.fetchedTitle) {
        finalTitle = fetchedMetadata.fetchedTitle;
        metadata = fetchedMetadata;
      } else {
        finalTitle = url; // Fallback to URL if title fetch fails
      }
    }

    const bookmark = new Bookmark({
      title: finalTitle,
      url,
      description,
      tags,
      isFavorite,
      metadata
    });

    await bookmark.save();

    res.status(201).json({
      success: true,
      data: bookmark
    });
  } catch (error) {
    console.error('Error creating bookmark:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create bookmark'
    });
  }
});

// PUT /api/bookmarks/:id - Update a bookmark
router.put('/:id', validateBookmark, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const bookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        error: 'Bookmark not found'
      });
    }

    res.json({
      success: true,
      data: bookmark
    });
  } catch (error) {
    console.error('Error updating bookmark:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update bookmark'
    });
  }
});

// DELETE /api/bookmarks/:id - Delete a bookmark
router.delete('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id);

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        error: 'Bookmark not found'
      });
    }

    res.json({
      success: true,
      message: 'Bookmark deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete bookmark'
    });
  }
});

module.exports = router;
