const mongoose = require('mongoose');
const Bank = require('./models/Bank');
const { getOfferModel, getAllOfferCollections } = require('./models/Offer');
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

        // Clear all offer collections
        const collections = await getAllOfferCollections();
        for (const collName of collections) {
            await mongoose.connection.db.dropCollection(collName);
            console.log(`Dropped collection: ${collName}`);
        }

        // Insert Banks
        const createdBanks = await Bank.insertMany(banks);
        const bracBank = createdBanks.find(b => b.title === 'Brac Bank');
        const dbblBank = createdBanks.find(b => b.title === 'Dutch-Bangla Bank');
        const cityBank = createdBanks.find(b => b.title === 'City Bank');

        // Prepare and Insert BRAC offers into its own collection
        const bracOffers = bracOffersData.map(o => ({
            bank_id: bracBank._id,
            name: o.offer || 'Eid Offer',
            store_name: o.merchant,
            offer_type: o.category,
            festival: 'Ramadan Eid Campaign 2026',
            expiry_date: new Date('2026-04-30'), // Default campaign end
            card_types: ['Credit', 'Debit', 'Platinum', 'Signature'],
            conditions: ['Terms and conditions apply']
        }));

        const BracOfferModel = getOfferModel(bracBank.title);
        await BracOfferModel.insertMany(bracOffers);
        console.log(`Inserted ${bracOffers.length} offers into ${BracOfferModel.collection.name}`);

        // Insert generic offers into their respective collections
        const dbblOffers = [
            {
                bank_id: dbblBank._id,
                name: 'Eid Special Cashback at Aarong',
                store_name: 'Aarong',
                offer_type: 'Cashback',
                card_types: ['Credit', 'Platinum', 'Signature'],
                festival: 'Eid-ul-Fitr 2026',
                discount: 15,
                conditions: ['Minimum spend 5000 BDT', 'Maximum cashback 1000 BDT'],
                expiry_date: new Date('2026-04-15')
            }
        ];
        const DbblOfferModel = getOfferModel(dbblBank.title);
        await DbblOfferModel.insertMany(dbblOffers);

        // Import CITY offers
        const cityOffersData = require('./city_offers.json');
        const cityOffers = [];

        // Recursive parser for City Bank's nested category structure
        const parseCityOffers = (obj, currentCategory = 'Regular') => {
            for (const key in obj) {
                if (Array.isArray(obj[key])) {
                    // It's an array of offers
                    obj[key].forEach(o => {
                        // Extract min_transaction number from string like "BDT 5,000"
                        const minTransMatch = o.min_transaction?.match(/\d+/g);
                        const minTransValue = minTransMatch ? parseInt(minTransMatch.join('')) : 0;

                        cityOffers.push({
                            bank_id: cityBank._id,
                            name: o.offer || 'Eid Offer',
                            store_name: o.merchant || 'Various',
                            offer_type: o.category || 'Discount',
                            lifestyle_category: currentCategory.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                            festival: cityOffersData.campaign || 'Ramadan Eid Campaign 2026',
                            expiry_date: new Date('2026-04-30'),
                            discount: 0, // Could be parsed from 'offer' string if needed
                            conditions: [o.offer, o.max_uses].filter(Boolean),
                            promo_code: o.promo_code,
                            min_transaction: minTransValue,
                            url: o.url,
                            eligible_cards: o.eligible_cards ? [o.eligible_cards] : [],
                            card_types: ['Credit', 'Debit']
                        });
                    });
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    // It's a subcategory
                    parseCityOffers(obj[key], key === 'categories' ? 'Regular' : key);
                }
            }
        };

        parseCityOffers(cityOffersData.categories);

        const CityOfferModel = getOfferModel(cityBank.title);
        await CityOfferModel.insertMany(cityOffers);
        console.log(`Inserted ${cityOffers.length} offers into ${CityOfferModel.collection.name}`);

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
