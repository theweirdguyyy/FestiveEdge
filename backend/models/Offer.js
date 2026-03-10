const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    bank_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank',
        required: [true, 'Bank ID is required']
    },
    name: {
        type: String,
        required: [true, 'Offer name is required'],
        trim: true
    },
    offer_type: {
        type: String,
        required: [true, 'Offer type is required'],
        enum: ['Discount', 'Cashback', 'Buy 1 Get 1', 'Buy 1 Get 1+', 'Reward Points', 'PayFlex (0% EMI)', 'BOGO', 'Fixed Savings', 'Cashback/Discount', 'Other']
    },
    mfs: {
        type: [String],
        default: [],
        enum: ['bKash', 'Nagad', 'Rocket', 'Upay', 'CellFin', 'Other']
    },
    discount: {
        type: Number,
        default: 0
    },
    store_name: {
        type: String,
        required: [true, 'Store name is required'],
        trim: true
    },
    card_types: {
        type: [String],
        default: ['Debit', 'Credit'],
        enum: ['Debit', 'Credit', 'Platinum', 'Signature', 'Titanium', 'Gold', 'Silver']
    },
    festival: {
        type: String,
        default: 'Regular',
        trim: true
    },
    conditions: {
        type: [String],
        required: [true, 'Conditions are required']
    },
    promo_code: {
        type: String,
        trim: true
    },
    min_transaction: {
        type: Number,
        default: 0
    },
    eligible_cards: {
        type: [String],
        default: []
    },
    url: {
        type: String,
        trim: true
    },
    lifestyle_category: {
        type: String,
        trim: true,
        default: 'Regular'
    },
    expiry_date: {
        type: Date,
        required: [true, 'Expiry date is required']
    }
}, {
    timestamps: true
});

// Helper to get a dynamic model
const getOfferModel = (bankName) => {
    // Sanitize bank name for collection name (e.g., "Brac Bank" -> "brac_bank")
    const slug = bankName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const collectionName = `offers.${slug}`;

    // Check if model already exists to avoid OverwriteModelError
    return mongoose.models[collectionName] || mongoose.model(collectionName, offerSchema, collectionName);
};

// Helper to fetch all collections starting with "offers."
const getAllOfferCollections = async () => {
    const collections = await mongoose.connection.db.listCollections().toArray();
    return collections
        .map(c => c.name)
        .filter(name => name.startsWith('offers.'));
};

module.exports = {
    offerSchema,
    getOfferModel,
    getAllOfferCollections
};
