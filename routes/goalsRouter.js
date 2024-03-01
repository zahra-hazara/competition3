const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const authMiddleware = require('./middleware/authMiddleware');

router.get('/', authMiddleware, goalController.getGoals);
router.post('/', authMiddleware, goalController.createGoal);
router.put('/:id', authMiddleware, goalController.updateGoal);
router.delete('/:id', authMiddleware, goalController.deleteGoal);


module.exports = router;
