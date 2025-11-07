const express = require('express');
const {
  createPost,
  getPosts,
  getPost
} = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Rotas públicas
router.get('/', getPosts);
router.get('/:id', getPost);

// Rotas protegidas
router.post('/', authMiddleware, createPost);

module.exports = router;