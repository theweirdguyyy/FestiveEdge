const Offer = require('../models/Offer');
const Bank = require('../models/Bank');

// @desc    Add offer to a bank
// @route   POST /api/offers
// @access  Admin
exports.addOffer = async (req, res) => {
    try {
        const { bank_id } = req.body;
        const bank = await Bank.findById(bank_id);

        if (!bank) {
            return res.status(404).json({ success: false, error: 'Bank not found' });
        }

        const offer = await Offer.create(req.body);
        res.status(201).json({ success: true, data: offer });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get all offers with filters
// @route   GET /api/offers
// @access  Public
exports.getAllOffers = async (req, res) => {
    try {
        const { store, bank, card_type, festival, search } = req.query;
        let query = {};

        if (store) query.store_name = new RegExp(store, 'i');
        if (festival) query.festival = new RegExp(festival, 'i');
        if (card_type) query.card_types = { $in: [card_type] };

        if (search) {
            query.$or = [
                { name: new RegExp(search, 'i') },
                { store_name: new RegExp(search, 'i') },
                { festival: new RegExp(search, 'i') }
            ];
        }

        let offers = await Offer.find(query).populate('bank_id');

        if (bank) {
            offers = offers.filter(offer =>
                offer.bank_id && offer.bank_id.title.toLowerCase().includes(bank.toLowerCase())
            );
        }

        res.status(200).json({ success: true, count: offers.length, data: offers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get offers for a bank
// @route   GET /api/offers/bank/:bankId
// @access  Public
exports.getOffers = async (req, res) => {
    try {
        const offers = await Offer.find({ bank_id: req.params.bankId }).populate('bank_id');
        res.status(200).json({ success: true, count: offers.length, data: offers });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
// @desc    Get unique festivals
// @route   GET /api/offers/festivals
// @access  Public
exports.getFestivals = async (req, res) => {
    try {
        const festivals = await Offer.distinct('festival');
        res.status(200).json({ success: true, count: festivals.length, data: festivals });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
