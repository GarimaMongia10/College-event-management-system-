const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { authMiddleware } = require('../middleware/auth');

// GET /api/users - Admin only
router.get('/', authMiddleware(['admin', 'Admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;