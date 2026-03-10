import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { offerService } from '../services/api';
import BankCard from '../components/BankCard';
import { Loader2, Calendar, PartyPopper, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FestivalCollections = () => {
    const [festivals, setFestivals] = useState([]);
    const [selectedFestival, setSelectedFestival] = useState('');
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFestivals();
    }, []);

    useEffect(() => {
        if (selectedFestival) {
            fetchFestivalOffers();
        }
    }, [selectedFestival]);

    const fetchFestivals = async () => {
        try {
            const res = await offerService.getFestivals();
            const festivalList = res.data.data;
            setFestivals(festivalList);
            if (festivalList.length > 0) {
                // Prioritize Ramadan Eid Campaign 2026 if available
                const preferred = festivalList.find(f => f.includes('Ramadan Eid'));
                setSelectedFestival(preferred || festivalList[0]);
            }
        } catch (err) {
            console.error('Failed to load festivals');
        }
    };

    const fetchFestivalOffers = async () => {
        try {
            setLoading(true);
            const res = await offerService.getAllOffers({ festival: selectedFestival });
            setOffers(res.data.data);
        } catch (err) {
            console.error('Failed to load festival offers');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen pt-20">
            <div className="container mx-auto px-6">
                <Link to="/" className="inline-flex items-center text-indigo-600 font-bold mb-8 hover:gap-2 transition-all">
                    <ArrowLeft size={20} className="mr-2" /> Back to Home
                </Link>

                <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-white mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
                            <PartyPopper size={14} className="mr-2" /> Festival Collections
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">Celebrate with <br /> Exclusive Deals</h1>
                        <p className="text-indigo-100 text-lg max-w-xl">Find all the special offers grouped by your favorite festivals in one place.</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-16">
                    {festivals.map(fest => (
                        <button
                            key={fest}
                            onClick={() => setSelectedFestival(fest)}
                            className={`px-8 py-4 rounded-2xl text-sm font-bold border transition-all ${selectedFestival === fest
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100'
                                : 'bg-white border-gray-100 text-gray-600 hover:border-indigo-600 hover:bg-indigo-50'
                                }`}
                        >
                            {fest}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3].map(i => <div key={i} className="bg-gray-50 h-80 rounded-[2.5rem] animate-pulse" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                        {offers.length > 0 ? (
                            offers.map(offer => <BankCard key={offer._id} bank={offer} />)
                        ) : (
                            <div className="col-span-full py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                                <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-400 font-bold">No offers found for {selectedFestival} yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FestivalCollections;
