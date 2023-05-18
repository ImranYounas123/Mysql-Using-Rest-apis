const express = require('express');
const Quiz = require('../Controllers/QuizController');
const router = express.Router();
const { authenticateToken } = require('../Middlewares/authMiddleware');


router.post('/', authenticateToken , Quiz.createQuiz);
router.get('/coins', authenticateToken , Quiz.totalUserCoins);
router.put('/:id', authenticateToken , Quiz.createAnswersQuiz);
router.get('/:id', authenticateToken , Quiz.getQuiz);
router.get('/top/:id', authenticateToken , Quiz.allLeaderBoardQuizData);



module.exports = router;