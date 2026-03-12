import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { offerService, bankService } from '../services/api';
import BankCard from '../components/BankCard';
import OfferModal from '../components/OfferModal';
import { ArrowLeft, Landmark, ShoppingBag, Loader2, Lamp, Globe } from 'lucide-react';

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
                bankService.getBank(id).catch(() => null)
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
            <div className="min-h-screen bg-[#052e16] pt-32 flex items-center justify-center">
                <Loader2 className="animate-spin text-[#ca8a04]" size={48} />
            </div>
        );
    }

    return (
        <div className="bg-[#052e16] min-h-screen pt-32 text-white overflow-hidden uppercase">
            <div className="container mx-auto px-6 relative z-10">
                <Link to="/" className="inline-flex items-center text-[#ca8a04] font-black text-xs tracking-widest mb-12 hover:text-white transition-all group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> BACK TO HOME
                </Link>

                <div className="bg-[#064e3b] rounded-[3rem] p-12 md:p-20 mb-20 relative overflow-hidden border border-white/10 shadow-2xl islamic-pattern">
                    <div className="absolute inset-0 opacity-10 pointer-events-none mosque-silhouette scale-150 rotate-12" />

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 border border-white/20 text-[#ca8a04]">
                            <Lamp size={40} />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none font-outfit tracking-tighter">
                            {bank?.title || 'Bank'} <br />
                            <span className="text-[#ca8a04]">EXCLUSIVE</span> OFFERS
                        </h1>
                        <p className="text-gray-400 text-lg max-w-xl font-bold lowercase">
                            Discover {offers.length} active deals curated specifically for {bank?.title || 'this bank'} customers.
                        </p>
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="flex flex-wrap gap-4 mb-16 border-b border-white/5 pb-12">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`px-10 py-4 rounded-full font-black text-xs tracking-widest transition-all border ${activeCategory === 'All' ? 'bg-[#ca8a04] border-[#ca8a04] text-[#052e16]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-[#ca8a04]'}`}
                    >
                        ALL ({offers.length})
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-10 py-4 rounded-full font-black text-xs tracking-widest transition-all border ${activeCategory === cat ? 'bg-[#ca8a04] border-[#ca8a04] text-[#052e16]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-[#ca8a04]'}`}
                        >
                            {cat} ({groupedOffers[cat].length})
                        </button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 px-4">
                    <h2 className="text-3xl md:text-4xl font-black font-outfit tracking-tighter">
                        {activeCategory === 'All' ? 'ALL AVAILABLE OFFERS' : `${activeCategory} CURATIONS`}
                    </h2>
                    <div className="text-gray-500 font-black text-[10px] tracking-widest mt-4 md:mt-0">
                        SHOWING {Math.min(visibleCount, filteredOffers.length)} OF {filteredOffers.length}
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
                    <div className="pb-32 text-center">
                        <button
                            onClick={() => setVisibleCount(prev => prev + 12)}
                            className="bg-transparent border-2 border-white/10 text-white px-16 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#ca8a04] hover:border-[#ca8a04] hover:text-[#052e16] transition-all"
                        >
                            SHOW MORE OFFERS
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Footer Section Style */}
            <div className="mt-16 pt-8 pb-12 border-t border-white/5 text-center">
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em]">
                    © 2026 UTSOB REWARDS. YOUR FESTIVE SAVINGS PARTNER IN BANGLADESH.
                </p>
            </div>
        </div>
    );
};

export default BankDetails;
