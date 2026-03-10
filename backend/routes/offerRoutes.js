const express = require('express');
const router = express.Router();
const { addOffer, getAllOffers, getOffers, getFestivals } = require('../controllers/offerController');

router.post('/', addOffer);
router.get('/', getAllOffers);
router.get('/festivals', getFestivals);
router.get('/bank/:bankId', getOffers);

module.exports = router;
