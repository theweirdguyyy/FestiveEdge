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
        enum: ['Cashback', 'Discount', 'Buy 1 Get 1', 'Points', 'Other']
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
    expiry_date: {
        type: Date,
        required: [true, 'Expiry date is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Offer', offerSchema);
