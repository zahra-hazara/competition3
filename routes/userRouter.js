const express = require('express');
const router = express.Router();
const { getUserData, register, login } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/api/users/register', register);
router.post('/api/users/login', login);
router.get('/me', authMiddleware, getUserData);

module.exports = router;