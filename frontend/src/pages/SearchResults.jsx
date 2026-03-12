import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { offerService } from '../services/api';
import BankCard from '../components/BankCard';
import BankSearchSummary from '../components/BankSearchSummary';
import SearchBar from '../components/SearchBar';
import OfferModal from '../components/OfferModal';
import { Loader2, AlertCircle, ArrowLeft, Star, Ghost } from 'lucide-react';

const SearchResults = () => {
    const location = useLocation();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(12);
    const [selectedOffer, setSelectedOffer] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const store = queryParams.get('store') || '';
    const bank = queryParams.get('bank') || '';
    const category = queryParams.get('category') || '';

    useEffect(() => {
        fetchResults();
        setVisibleCount(12);
    }, [location.search]);

    const fetchResults = async () => {
        try {
            setLoading(true);
            const res = await offerService.getAllOffers({ store, bank, category });
            setOffers(res.data.data);
            setError(null);
        } catch (err) {
            setError('Failed to load search results.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#052e16] min-h-screen pt-32 pb-20 text-white">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <Link to="/" className="inline-flex items-center text-[#ca8a04] font-black text-xs uppercase tracking-widest mb-8 hover:text-white transition-all group">
                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> BACK TO HOME
                    </Link>
                    <SearchBar dark={true} />
                </div>

                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter font-outfit mb-2">SEARCH RESULTS</h1>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">
                            {loading ? 'SEARCHING THE VAULT...' : `FOUND ${offers.length} EXCLUSIVE OFFERS FOR YOU`}
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white/5 h-64 rounded-[2rem] animate-pulse border border-white/5" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-red-900/20 p-16 rounded-[2.5rem] text-center max-w-2xl mx-auto border border-red-500/20">
                        <AlertCircle size={48} className="text-red-500 mx-auto mb-6" />
                        <p className="text-white font-bold text-xl uppercase tracking-tight">{error}</p>
                    </div>
                ) : offers.length === 0 ? (
                    <div className="text-center py-32 bg-white/5 rounded-[3rem] border border-white/5 islamic-pattern">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                            <Ghost size={48} className="text-white/20" />
                        </div>
                        <h3 className="text-2xl font-black uppercase font-outfit mb-2">NO OFFERS MATCHED</h3>
                        <p className="text-gray-400 font-medium max-w-md mx-auto">We couldn't find any offers matching your criteria. Try adjusting your search or browsing by category.</p>
                    </div>
                ) : (
                    <>
                        {bank && (
                            <div className="mb-12">
                                <BankSearchSummary
                                    bankName={bank}
                                    offerCount={offers.length}
                                    bankId={offers[0]?.bank_id?._id}
                                />
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {offers.slice(0, visibleCount).map(offer => (
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

                        {visibleCount < offers.length && (
                            <div className="mt-20 text-center">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 12)}
                                    className="bg-transparent border-2 border-white/10 text-white px-16 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#ca8a04] hover:border-[#ca8a04] hover:text-[#052e16] transition-all"
                                >
                                    SHOW MORE RESULTS
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
