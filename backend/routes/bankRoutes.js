const express = require('express');
const router = express.Router();
const { getBanks, getBank, createBank, deleteBank } = require('../controllers/bankController');

router.route('/')
    .get(getBanks)
    .post(createBank);

router.route('/:id')
    .get(getBank)
    .delete(deleteBank);

module.exports = router;
