import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bankService, offerService } from '../services/api';
import BankCard from '../components/BankCard';
import SearchBar from '../components/SearchBar';
import BankSearchSummary from '../components/BankSearchSummary';
import { Loader2, AlertCircle, ShoppingBag, Plane, Utensils, Monitor, LayoutGrid, ArrowRight, ShieldCheck, Star, Landmark } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        fetchBanks();
    }, []);

    const fetchBanks = async () => {
        try {
            setLoading(true);
            const res = await bankService.getBanks();
            setBanks(res.data.data);
            setError(null);
        } catch (err) {
            setError('Failed to load banks. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-0 overflow-hidden bg-hero-pattern bg-no-repeat bg-right-top">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="lg:w-3/5 text-left mb-16 lg:mb-32">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-6xl md:text-8xl font-black text-[#111827] leading-[1.1] mb-8 tracking-tight">
                                    Discover <br />
                                    more than <br />
                                    <span className="text-indigo-600 wavy-underline inline-block pb-2">20+ Banks</span>
                                </h1>
                                <p className="text-lg text-gray-500 max-w-xl leading-relaxed mb-12">
                                    Great platform for the offer seeker that searching for new savings heights and passionate about festivals.
                                </p>

                                <div className="hidden lg:block">
                                    <SearchBar />
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-2/5 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative z-10"
                            >
                                <img
                                    src="/hero-image.png"
                                    alt="Festive Offers"
                                    className="w-full h-auto object-contain"
                                />
                                <div className="absolute top-1/4 -right-10 w-full h-full border-2 border-indigo-50 border-t-0 border-r-0 -z-10 rounded-bl-[10rem]" />
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="lg:hidden px-6 pb-20 mt-[-40px]">
                    <SearchBar />
                </div>
            </section>
            {/* Browse by Category Section */}
            <section className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase mb-3 block">Categories</span>
                            <h2 className="text-4xl font-black text-gray-900">Browse by Category</h2>
                        </div>
                        <button className="hidden md:flex items-center text-indigo-600 font-bold hover:gap-2 transition-all mt-4 md:mt-0">
                            View all categories <ArrowRight size={20} className="ml-2" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { name: 'All Categories', id: '', icon: LayoutGrid, count: '20+' },
                            { name: 'Shopping', id: 'Shopping', icon: ShoppingBag, count: '12' },
                            { name: 'Travel', id: 'Travel', icon: Plane, count: '5' },
                            { name: 'Dining', id: 'Dining', icon: Utensils, count: '8' },
                            { name: 'Electronics', id: 'Electronics', icon: Monitor, count: '4' }
                        ].map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => navigate(`/search?category=${cat.id}`)}
                                className={`p-8 rounded-3xl border transition-all duration-300 text-left group ${filterCategory === cat.id
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100'
                                    : 'bg-white border-gray-100 text-gray-600 hover:border-indigo-600 hover:shadow-lg'
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${filterCategory === cat.id ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                                    }`}>
                                    <cat.icon size={28} />
                                </div>
                                <h3 className="font-bold text-lg mb-1">{cat.name}</h3>
                                <p className={`text-sm ${filterCategory === cat.id ? 'text-indigo-100' : 'text-gray-400'}`}>
                                    {cat.count} Offers
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Banks Section */}
            <section className="py-24 border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">Our Trusted Partners</h2>
                        <p className="text-gray-500">We work with the leading financial institutions to bring you the best exclusive deals during festivals.</p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {banks.slice(0, 6).map((bank) => (
                            <Link key={bank._id} to={`/bank/${bank._id}`} className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                    <ShieldCheck className="text-gray-400" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{bank.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Banks Section */}
            <div className="container mx-auto px-6 py-24">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
                    <div>
                        <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase mb-3 block">Special Curations</span>
                        <h2 className="text-4xl font-black text-gray-900">Exclusive Bank Partners</h2>
                        <p className="text-gray-500 mt-2">Discover banks offering exceptional deals this season</p>
                    </div>
                    {filterCategory && (
                        <button
                            onClick={() => setFilterCategory('')}
                            className="text-indigo-600 font-bold text-sm underline mt-4 md:mt-0"
                        >
                            Reset filters
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-50 h-80 rounded-[2.5rem] animate-pulse" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-red-50 p-16 rounded-[2.5rem] text-center max-w-2xl mx-auto border border-red-100">
                        <AlertCircle size={48} className="text-red-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Encountered an issue</h3>
                        <p className="text-gray-600 mb-8">{error}</p>
                        <button onClick={fetchBanks} className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold">
                            Try Again
                        </button>
                    </div>
                ) : banks.length === 0 ? (
                    <div className="text-center py-32 bg-gray-50 rounded-[3rem]">
                        <p className="text-gray-400 text-xl font-medium">No active bank partners found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {banks.map((bank) => (
                            <Link
                                key={bank._id}
                                to={`/bank/${bank._id}`}
                                className="group bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 group-hover:bg-indigo-600 transition-colors duration-500" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white transition-colors">
                                        <Landmark size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                        {bank.title}
                                    </h3>
                                    <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                                        {bank.description || 'Exclusive festival offers and cashback deals for cardholders.'}
                                    </p>

                                    <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                                        <span className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            {bank.offerCount} Offers
                                        </span>
                                        <span className="text-indigo-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                            View Deals <ArrowRight size={18} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Newsletter Section */}
            <section className="container mx-auto px-6 mb-24">
                <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Don't miss the next festive wave!</h2>
                        <p className="text-indigo-100 text-lg mb-10">Subscribe to our concierge service and get the hottest bank deals delivered straight to your inbox.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <button className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-xl">
                                Join now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-900 py-20 text-white mt-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-10">
                        <div className="flex items-center space-x-2 mb-8 md:mb-0">
                            <div className="bg-indigo-600 p-2 rounded-lg text-white font-bold text-xl h-10 w-10 flex items-center justify-center">
                                F
                            </div>
                            <span className="font-bold text-xl tracking-tight">
                                Festive<span className="text-indigo-400">Edge</span>
                            </span>
                        </div>
                        <div className="flex space-x-8 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">About</a>
                            <a href="#" className="hover:text-white transition-colors">Banks</a>
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>
                    <div className="mt-10 text-center text-sm text-gray-500">
                        © 2026 FestiveEdge. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
