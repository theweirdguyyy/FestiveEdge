const mongoose = require('mongoose');
const Bank = require('./models/Bank');
const Offer = require('./models/Offer');
require('dotenv').config();

const banks = [
    {
        title: 'Dutch-Bangla Bank',
        company: 'DBBL',
        location: 'Dhaka, Bangladesh',
        category: 'Shopping',
        description: 'Enjoy exclusive cashback and discounts on various retail partners.',
        offer_type: 'Cashback',
        email: 'info@dbbl.com'
    },
    {
        title: 'City Bank',
        company: 'City Bank PLC',
        location: 'Dhaka, Bangladesh',
        category: 'Travel',
        description: 'Best travel offers and discounts on flight bookings and hotels.',
        offer_type: 'Discount',
        email: 'support@thecitybank.com'
    },
    {
        title: 'Brac Bank',
        company: 'Brac Bank PLC',
        location: 'Dhaka, Bangladesh',
        category: 'Dining',
        description: 'Savor the flavors with amazing dining offers across the country.',
        offer_type: 'Buy 1 Get 1',
        email: 'info@bracbank.com'
    }
];

// Import BRAC offers from the generated file
const bracOffersData = require('./brac_offers.json');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Clear existing data
        await Bank.deleteMany();
        await Offer.deleteMany();

        // Insert Banks
        const createdBanks = await Bank.insertMany(banks);
        const bracBankId = createdBanks.find(b => b.title === 'Brac Bank')._id;
        const dbblBankId = createdBanks.find(b => b.title === 'Dutch-Bangla Bank')._id;
        const cityBankId = createdBanks.find(b => b.title === 'City Bank')._id;

        // Prepare BRAC offers
        const bracOffers = bracOffersData.map(o => ({
            ...o,
            bank_id: bracBankId,
            expiry_date: new Date(o.expiry_date)
        }));

        // Add some sample offers for other banks to keep generic data
        const genericOffers = [
            {
                bank_id: dbblBankId,
                name: 'Eid Special Cashback at Aarong',
                store_name: 'Aarong',
                offer_type: 'Cashback',
                card_types: ['Credit', 'Platinum', 'Signature'],
                festival: 'Eid-ul-Fitr 2026',
                discount: 15,
                conditions: ['Minimum spend 5000 BDT', 'Maximum cashback 1000 BDT'],
                expiry_date: new Date('2026-04-15')
            },
            {
                bank_id: cityBankId,
                name: 'Mega Discount at Aarong',
                store_name: 'Aarong',
                offer_type: 'Discount',
                card_types: ['Debit', 'Credit'],
                festival: 'Eid-ul-Fitr 2026',
                discount: 20,
                conditions: ['No minimum spend', 'Valid on selected items'],
                expiry_date: new Date('2026-04-10')
            }
        ];

        await Offer.insertMany([...bracOffers, ...genericOffers]);

        console.log(`Data Seeded Successfully! Total offers: ${bracOffers.length + genericOffers.length}`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
