const express = require('express');
const {job,bookMarkJob} = require('../Controllers/CompanyClt');
const router = express.Router();
const { authenticateToken } = require('../Middlewares/authMiddleware');


router.post('/', authenticateToken , job.createJob);
router.put('/', authenticateToken , job.filterJobs);
router.get('/:id', authenticateToken , job.getJobs);
router.post('/save', authenticateToken , bookMarkJob.saveJob);
router.get('/save', authenticateToken , bookMarkJob.getSavedJobs);









module.exports = router;