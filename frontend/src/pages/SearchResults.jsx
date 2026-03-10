import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { offerService } from '../services/api';
import BankCard from '../components/BankCard';
import BankSearchSummary from '../components/BankSearchSummary';
import SearchBar from '../components/SearchBar';
import OfferModal from '../components/OfferModal';
import { Loader2, AlertCircle, ArrowLeft, Star } from 'lucide-react';

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
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center text-indigo-600 font-bold mb-8 hover:gap-2 transition-all">
                        <ArrowLeft size={20} className="mr-2" /> Back to Home
                    </Link>
                    <SearchBar />
                </div>

                <div className="mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Search Results</h1>
                    <p className="text-gray-500">
                        {loading ? 'Searching...' : `Found ${offers.length} offers for your criteria`}
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-gray-50 h-80 rounded-[2.5rem] animate-pulse" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-red-50 p-16 rounded-[2.5rem] text-center max-w-2xl mx-auto">
                        <AlertCircle size={48} className="text-red-500 mx-auto mb-6" />
                        <p className="text-gray-900 font-bold text-xl">{error}</p>
                    </div>
                ) : offers.length === 0 ? (
                    <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-[3rem] bg-gray-50/30">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Star size={40} className="text-gray-300" />
                        </div>
                        <p className="text-gray-400 text-xl font-medium">No offers found matching your search.</p>
                    </div>
                ) : (
                    <>
                        {bank && (
                            <BankSearchSummary
                                bankName={bank}
                                offerCount={offers.length}
                                bankId={offers[0]?.bank_id?._id}
                            />
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
                            <div className="mt-16 text-center">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 12)}
                                    className="bg-white border-2 border-indigo-600 text-indigo-600 px-12 py-5 rounded-2xl font-black hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-indigo-50"
                                >
                                    Show More Results
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
