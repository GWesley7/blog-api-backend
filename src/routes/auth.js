const express = require('express');
const {
  register,
  login,
  getProfile
} = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Rotas protegidas
router.get('/me', authMiddleware, getProfile);

module.exports = router;