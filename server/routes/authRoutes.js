// server/routes/authRoutes.js
const express = require('express');
const { register, login,getUserByDisplayName } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:displayName', getUserByDisplayName);

module.exports = router;
