const express = require('express');

const ReviewLegalDocumentClt = require('../Controllers/ReviewLegalDocument');

// const { authenticateToken } = require('../Middlewares/authMiddleware');




const router = express.Router();

router.route('/').post(ReviewLegalDocumentClt.createReviewLegalDocument);
router.route('/').get(ReviewLegalDocumentClt.getReviewLegalDocument);
router.route('/').put(ReviewLegalDocumentClt.updateReviewLegalDocument);

module.exports = router;