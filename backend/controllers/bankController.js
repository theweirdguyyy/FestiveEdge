const Bank = require('../models/Bank');
const { getOfferModel } = require('../models/Offer');

// @desc    Get all banks with offers
// @route   GET /api/banks
// @access  Public
exports.getBanks = async (req, res) => {
    try {
        const { search, category, offer_type } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) query.category = category;
        if (offer_type) query.offer_type = offer_type;

        const banks = await Bank.find(query);

        // Add offer count for each bank
        const banksWithCounts = await Promise.all(banks.map(async (bank) => {
            const BankOfferModel = getOfferModel(bank.title);
            const count = await BankOfferModel.countDocuments({ bank_id: bank._id });
            return { ...bank._doc, offerCount: count };
        }));

        res.status(200).json({ success: true, count: banksWithCounts.length, data: banksWithCounts });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single bank and its offers
// @route   GET /api/banks/:id
// @access  Public
exports.getBank = async (req, res) => {
    try {
        const bank = await Bank.findById(req.params.id);

        if (!bank) {
            return res.status(404).json({ success: false, error: 'Bank not found' });
        }

        const BankOfferModel = getOfferModel(bank.title);
        const offers = await BankOfferModel.find({ bank_id: req.params.id });

        res.status(200).json({ success: true, data: { ...bank._doc, offers } });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create a bank
// @route   POST /api/banks
// @access  Admin
exports.createBank = async (req, res) => {
    try {
        const bank = await Bank.create(req.body);
        res.status(201).json({ success: true, data: bank });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete a bank
// @route   DELETE /api/banks/:id
// @access  Admin
exports.deleteBank = async (req, res) => {
    try {
        const bank = await Bank.findById(req.params.id);

        if (!bank) {
            return res.status(404).json({ success: false, error: 'Bank not found' });
        }

        // Delete associated offers from its specific collection
        const BankOfferModel = getOfferModel(bank.title);
        await BankOfferModel.deleteMany({ bank_id: req.params.id });
        await bank.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
