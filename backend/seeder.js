const mongoose = require('mongoose');
const Bank = require('./models/Bank');
const { getOfferModel, getAllOfferCollections } = require('./models/Offer');
require('dotenv').config();

const banks = [
    {
        title: 'Dhaka Bank PLC',
        company: 'Dhaka Bank PLC',
        location: 'Dhaka, Bangladesh',
        category: 'Lifestyle',
        description: 'Ramadan Offer 2026 - Exclusive discounts and cashback for Dhaka Bank cardholders.',
        offer_type: 'Other',
        email: 'info@dhakabank.com.bd'
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
    },
    {
        title: 'Prime Bank PLC',
        company: 'Prime Bank PLC',
        location: 'Dhaka, Bangladesh',
        category: 'Lifestyle',
        description: 'Ramadan 2026 Offers with amazing Cashbacks and Discounts.',
        offer_type: 'Other',
        email: 'support@primebank.com.bd'
    }
];

// Import offers from JSON files
const bracOffersData = require('./brac_offers.json');
const cityOffersData = require('./city_offers.json');
const primeOffersData = require('./prime_offers.json');
const dhakaOffersData = require('./dhaka_offers.json');

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
        const dhakaBank = createdBanks.find(b => b.title === 'Dhaka Bank PLC');
        const cityBank = createdBanks.find(b => b.title === 'City Bank');
        const primeBank = createdBanks.find(b => b.title === 'Prime Bank PLC');

        // Restore BRAC offers logic
        const bracOffers = bracOffersData.map(o => ({
            bank_id: bracBank._id,
            name: o.offer || 'Eid Offer',
            store_name: o.merchant,
            offer_type: o.category,
            festival: 'Ramadan Eid Campaign 2026',
            expiry_date: new Date('2026-04-30'),
            card_types: ['Credit', 'Debit', 'Platinum', 'Signature'],
            conditions: ['Terms and conditions apply']
        }));
        const BracOfferModel = getOfferModel(bracBank.title);
        await BracOfferModel.insertMany(bracOffers);
        console.log(`Inserted ${bracOffers.length} offers into ${BracOfferModel.collection.name}`);

        // Restore City Bank offers logic
        const cityOffers = [];
        const parseCityOffers = (obj, currentCategory = 'Regular') => {
            for (const key in obj) {
                if (Array.isArray(obj[key])) {
                    obj[key].forEach(o => {
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
                            discount: 0,
                            conditions: [o.offer, o.max_uses].filter(Boolean),
                            promo_code: o.promo_code,
                            min_transaction: minTransValue,
                            url: o.url,
                            eligible_cards: o.eligible_cards ? [o.eligible_cards] : [],
                            card_types: ['Credit', 'Debit']
                        });
                    });
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    parseCityOffers(obj[key], key === 'categories' ? 'Regular' : key);
                }
            }
        };
        parseCityOffers(cityOffersData.categories);
        const CityOfferModel = getOfferModel(cityBank.title);
        await CityOfferModel.insertMany(cityOffers);
        console.log(`Inserted ${cityOffers.length} offers into ${CityOfferModel.collection.name}`);

        // Dhaka Bank logic
        const dhakaOffers = [];
        Object.keys(dhakaOffersData.categories).forEach(catKey => {
            const cat = dhakaOffersData.categories[catKey];
            if (cat.offers && Array.isArray(cat.offers)) {
                cat.offers.forEach(o => {
                    let discountValue = 0;
                    if (o.discount) {
                        const match = o.discount.match(/\d+/);
                        if (match) discountValue = parseInt(match[0]);
                    } else if (o.cashback) {
                        const match = o.cashback.match(/\d+/);
                        if (match) discountValue = parseInt(match[0]);
                    }
                    dhakaOffers.push({
                        bank_id: dhakaBank._id,
                        name: `${o.offer_type} at ${o.merchant}`,
                        store_name: o.merchant,
                        offer_type: o.offer_type === 'EMI' ? 'PayFlex (0% EMI)' : 
                                   o.offer_type === 'Cashback' ? 'Cashback' : 'Discount',
                        lifestyle_category: cat.label,
                        festival: 'Eid-ul-Fitr 2026',
                        expiry_date: new Date('2026-03-21'), // Valid till Eid-ul-Fitr 2026 (Approx Mar 20/21)
                        discount: discountValue,
                        conditions: [
                            o.on && `Valid on ${o.on}`,
                            o.note,
                            o.max_cashback_bdt && `Max Cashback: BDT ${o.max_cashback_bdt}`,
                            o.max_discount_bdt && `Max Discount: BDT ${o.max_discount_bdt}`,
                            o.min_order_bdt && `Min Order: BDT ${o.min_order_bdt}`,
                            o.emi_months && `EMI up to ${o.emi_months} months`
                        ].filter(Boolean),
                        url: o.url,
                        card_types: o.offer_type === 'Cashback' ? ['Credit'] : ['Credit', 'Debit']
                    });
                });
            }
        });
        const DhakaOfferModel = getOfferModel(dhakaBank.title);
        await DhakaOfferModel.insertMany(dhakaOffers);
        console.log(`Inserted ${dhakaOffers.length} offers into ${DhakaOfferModel.collection.name}`);

        // Restore Prime Bank logic
        const primeOffers = [];
        primeOffersData.categories.forEach(cat => {
            let offerDetails = cat.max_cashback ? `Up to ${cat.max_cashback}` : cat.max_discount ? `Up to ${cat.max_discount}` : 'Best offers';
            let validOfferType = cat.offer_type;
            if (validOfferType === 'Buy 1 Get up to 4') validOfferType = 'Buy 1 Get 1+';
            const pushMerchant = (m, subCatLabel) => {
                const merchantOfferName = m.discount ? `${m.discount} at ${m.name}` : `${offerDetails} at ${m.name}`;
                const merchantConditions = [m.discount || offerDetails];
                if (m.note) merchantConditions.push(m.note);
                primeOffers.push({
                    bank_id: primeBank._id,
                    name: merchantOfferName,
                    store_name: m.name || 'Unknown Merchant',
                    offer_type: validOfferType,
                    lifestyle_category: subCatLabel || cat.category,
                    festival: primeOffersData.campaign || 'Ramadan Eid Campaign 2026',
                    expiry_date: new Date('2026-04-30'),
                    conditions: merchantConditions,
                    url: cat.url,
                    card_types: ['Credit', 'Debit']
                });
            };
            if (cat.merchants && cat.merchants.length > 0) {
                cat.merchants.forEach(m => pushMerchant(m, cat.category));
            } else if (cat.sub_categories && cat.sub_categories.length > 0) {
                cat.sub_categories.forEach(sub => {
                    const subLabel = `${cat.category} – ${sub.sub_category}`;
                    sub.merchants.forEach(m => pushMerchant(m, subLabel));
                });
            } else {
                primeOffers.push({
                    bank_id: primeBank._id,
                    name: `${offerDetails} on ${cat.category.replace('Lifestyle – ', '')}`,
                    store_name: 'Various Merchants',
                    offer_type: validOfferType,
                    lifestyle_category: cat.category,
                    festival: primeOffersData.campaign || 'Ramadan Eid Campaign 2026',
                    expiry_date: new Date('2026-04-30'),
                    conditions: [offerDetails],
                    url: cat.url,
                    card_types: ['Credit', 'Debit']
                });
            }
        });
        const PrimeOfferModel = getOfferModel(primeBank.title);
        await PrimeOfferModel.insertMany(primeOffers);
        console.log(`Inserted ${primeOffers.length} offers into ${PrimeOfferModel.collection.name}`);

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
