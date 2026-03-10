import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { offerService, bankService } from '../services/api';
import BankCard from '../components/BankCard';
import OfferModal from '../components/OfferModal';
import { ArrowLeft, Landmark, ShoppingBag, Loader2 } from 'lucide-react';

const BankDetails = () => {
    const { id } = useParams();
    const [offers, setOffers] = useState([]);
    const [bank, setBank] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(12);
    const [selectedOffer, setSelectedOffer] = useState(null);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [offersRes, bankRes] = await Promise.all([
                offerService.getOffers(id),
                bankService.getBank(id).catch(() => null) // Bank might not exist as a separate doc if we only have offers
            ]);

            setOffers(offersRes.data.data);
            if (bankRes) {
                setBank(bankRes.data.data);
            } else if (offersRes.data.data.length > 0) {
                setBank(offersRes.data.data[0].bank_id);
            }
        } catch (err) {
            console.error('Failed to load bank details');
        } finally {
            setLoading(false);
        }
    };

    const groupedOffers = offers.reduce((acc, offer) => {
        const cat = offer.lifestyle_category || 'Regular';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(offer);
        return acc;
    }, {});

    const categories = Object.keys(groupedOffers).sort();
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredOffers = activeCategory === 'All'
        ? offers
        : groupedOffers[activeCategory] || [];

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-20">
            <div className="container mx-auto px-6">
                <Link to="/" className="inline-flex items-center text-indigo-600 font-bold mb-8 hover:gap-2 transition-all">
                    <ArrowLeft size={20} className="mr-2" /> Back to Home
                </Link>

                <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-white mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-8">
                            <Landmark size={40} />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            {bank?.title || 'Bank'} <br /> Exclusive Offers
                        </h1>
                        <p className="text-indigo-100 text-lg max-w-xl">
                            Discover {offers.length} active deals curated specifically for {bank?.title || 'this bank'} customers.
                        </p>
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="flex flex-wrap gap-4 mb-12">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`px-8 py-3 rounded-2xl font-black transition-all ${activeCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                        All ({offers.length})
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-2xl font-black transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            {cat} ({groupedOffers[cat].length})
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-gray-900">
                        {activeCategory === 'All' ? 'All Offers' : `${activeCategory} Offers`}
                    </h2>
                    <div className="text-gray-500 font-medium">
                        Showing {Math.min(visibleCount, filteredOffers.length)} of {filteredOffers.length}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                    {filteredOffers.slice(0, visibleCount).map(offer => (
                        <BankCard
                            key={offer._id}
                            bank={offer}
                            onClick={(off) => setSelectedOffer(off)}
                        />
                    ))}
                </div>

                <OfferModal
                    offer={selectedOffer}
                    onClose={() => setSelectedOffer(null)}
                />

                {visibleCount < filteredOffers.length && (
                    <div className="pb-24 text-center">
                        <button
                            onClick={() => setVisibleCount(prev => prev + 12)}
                            className="bg-white border-2 border-indigo-600 text-indigo-600 px-12 py-5 rounded-2xl font-black hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-indigo-50"
                        >
                            Show More Offers
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BankDetails;
