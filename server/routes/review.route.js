const express = require('express');
const { createReview, getReviews } = require('../controllers/review.controller')

const reviewRouter = express.Router();

reviewRouter.post('/new-review/:userId', createReview)
reviewRouter.get('/', getReviews)

module.exports = reviewRouter