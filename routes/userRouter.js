const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');
const authMiddleware = require('./middleware/authMiddleware');

router.get('/me', authMiddleware, UserController, getUserDetails);
router.post('/api/users/register', register);
router.post('/api/users/login', login);

module.exports = router;