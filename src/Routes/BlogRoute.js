const express = require('express');
const Blog = require('../Controllers/BlogController');
const router = express.Router();
const { authenticateToken } = require('../Middlewares/authMiddleware');


router.post('/', authenticateToken , Blog.createBlog);
router.post('/like', authenticateToken , Blog.blogLike);
router.post('/comments/:id', authenticateToken , Blog.blogComments);
router.put('/:id/view', authenticateToken , Blog.blogViews);






module.exports = router;