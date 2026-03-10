const { getOfferModel, getAllOfferCollections } = require('../models/Offer');
const Bank = require('../models/Bank');
const mongoose = require('mongoose');

// Helper to find a bank's slug for collection naming
const getBankSlug = async (bankId) => {
    const bank = await Bank.findById(bankId);
    return bank ? bank.title.toLowerCase().replace(/[^a-z0-9]/g, '_') : null;
};

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

        const BankOfferModel = getOfferModel(bank.title);
        const offer = await BankOfferModel.create(req.body);
        res.status(201).json({ success: true, data: offer });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get all offers with filters across all collections
// @route   GET /api/offers
// @access  Public
exports.getAllOffers = async (req, res) => {
    try {
        const { store, bank, card_type, festival, search } = req.query;
        let match = {};

        if (store) match.store_name = new RegExp(store, 'i');
        if (festival) match.festival = new RegExp(festival, 'i');
        if (card_type) match.card_types = { $in: [card_type] };

        if (search) {
            match.$or = [
                { name: new RegExp(search, 'i') },
                { store_name: new RegExp(search, 'i') },
                { festival: new RegExp(search, 'i') }
            ];
        }

        const collections = await getAllOfferCollections();
        if (collections.length === 0) {
            return res.status(200).json({ success: true, count: 0, data: [] });
        }

        // Use the first collection as the base for the aggregation
        const BaseOfferModel = mongoose.model(collections[0], require('../models/Offer').offerSchema, collections[0]);

        const pipeline = [
            { $match: match }
        ];

        // Union with all other collections
        for (let i = 1; i < collections.length; i++) {
            pipeline.push({
                $unionWith: {
                    coll: collections[i],
                    pipeline: [{ $match: match }]
                }
            });
        }

        // Populate bank info after union
        pipeline.push({
            $lookup: {
                from: 'banks',
                localField: 'bank_id',
                foreignField: '_id',
                as: 'bank_id'
            }
        });
        pipeline.push({ $unwind: '$bank_id' });

        let offers = await BaseOfferModel.aggregate(pipeline);

        if (bank) {
            offers = offers.filter(o =>
                o.bank_id && o.bank_id.title.toLowerCase().includes(bank.toLowerCase())
            );
        }

        res.status(200).json({ success: true, count: offers.length, data: offers });
    } catch (error) {
        console.error('Error in getAllOffers:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get offers for a specific bank
// @route   GET /api/offers/bank/:bankId
// @access  Public
exports.getOffers = async (req, res) => {
    try {
        const bank = await Bank.findById(req.params.bankId);
        if (!bank) {
            return res.status(404).json({ success: false, error: 'Bank not found' });
        }

        const BankOfferModel = getOfferModel(bank.title);
        const offers = await BankOfferModel.find({ bank_id: req.params.bankId }).populate('bank_id');

        res.status(200).json({ success: true, count: offers.length, data: offers });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get unique festivals across all collections
// @route   GET /api/offers/festivals
// @access  Public
exports.getFestivals = async (req, res) => {
    try {
        const collections = await getAllOfferCollections();
        let allFestivals = new Set();

        for (const collName of collections) {
            const Model = mongoose.model(collName, require('../models/Offer').offerSchema, collName);
            const festivals = await Model.distinct('festival');
            festivals.forEach(f => allFestivals.add(f));
        }

        res.status(200).json({ success: true, count: allFestivals.size, data: Array.from(allFestivals) });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
