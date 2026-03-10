const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Bank title is required'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    offer_type: {
        type: String,
        required: [true, 'Offer type is required'],
        enum: ['Cashback', 'Discount', 'Buy 1 Get 1', 'Points', 'Other']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Bank', bankSchema);
