const express = require('express');
const {cmp ,job} = require('../Controllers/CompanyClt');
const router = express.Router();
const { authenticateToken } = require('../Middlewares/authMiddleware');


router.post('/', authenticateToken , cmp.createNewCompany);
router.get('/:id', authenticateToken , cmp.getCompany);
router.get('/:id/follow', authenticateToken , cmp.followCompany);






module.exports = router;