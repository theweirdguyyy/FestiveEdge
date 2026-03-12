import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { bankService, offerService } from '../services/api';
import BankCard from '../components/BankCard';
import SearchBar from '../components/SearchBar';
import OfferModal from '../components/OfferModal';
import {
    Loader2, AlertCircle, ShoppingBag, Plane, Utensils,
    Monitor, LayoutGrid, ArrowRight, ShieldCheck, Star,
    Landmark, Lamp, Zap, ChevronLeft, ChevronRight,
    Search, Heart, Facebook, Twitter, Instagram, Globe
} from 'lucide-react';
import heroIllustration from '../assets/hero-illustration.png';

const Home = () => {
    const navigate = useNavigate();
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOffer, setSelectedOffer] = useState(null);

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
        <div className="bg-[#052e16] min-h-screen text-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-bottom bg-no-repeat opacity-40 blur-[8px]"></div>
                <div className="container mx-auto px-6 relative z-10 w-full pt-32 pb-20">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                        <div className="lg:w-1/2 text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <span className="text-[#ca8a04] font-black tracking-[0.3em] text-xs uppercase mb-6 block drop-shadow-sm font-outfit">
                                    CELEBRATE & SAVE!
                                </span>
                                <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8 tracking-tighter font-outfit uppercase">
                                    UNLOCK BEST <br />
                                    <span className="text-[#ca8a04]">FESTIVE BANK</span> <br />
                                    OFFERS <span className="text-[#ca8a04] text-4xl md:text-6xl">&</span> CASHBACKS.
                                </h1>
                                <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed mb-12 italic opacity-80">
                                    Ramadan Mubarak and Happy Festivities from Bangladesh's top banks. Discover exclusive rewards for your holiday shopping.
                                </p>

                                <div className="mt-2 w-full max-w-3xl">
                                    <SearchBar dark={true} />
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2 relative group">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1.2, delay: 0.2 }}
                                className="relative z-10"
                            >
                                <div className="absolute -inset-4 bg-[#ca8a04]/10 rounded-[3rem] blur-2xl group-hover:bg-[#ca8a04]/20 transition-all duration-700" />
                                <img
                                    src={heroIllustration}
                                    alt="Utsob Rewards Illustration"
                                    className="w-full h-auto drop-shadow-[0_35px_45px_rgba(0,0,0,0.6)] relative z-10 scale-110"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Banks Section */}
            <section className="py-24 bg-[#063327] relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-4">
                        <div>
                            <span className="text-[#ca8a04] font-black tracking-[0.2em] text-[10px] uppercase mb-3 block opacity-60">FEATURED PARTNERS</span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter font-outfit">FEATURED BANK OFFERS</h2>
                        </div>
                        <div className="flex gap-4 mt-8 md:mt-0">
                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ca8a04] transition-all group">
                                <ChevronLeft size={24} className="group-hover:text-[#052e16]" />
                            </button>
                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ca8a04] transition-all group">
                                <ChevronRight size={24} className="group-hover:text-[#052e16]" />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-[#ca8a04]" size={48} />
                        </div>
                    ) : (
                        <div className="flex overflow-x-auto gap-8 pb-12 custom-scrollbar no-scrollbar px-4">
                            {banks.map((bank) => (
                                <BankCard
                                    key={bank._id}
                                    bank={bank}
                                    isBestOffer={bank.title === 'City Bank'}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Category Navigation Bar (Bottom Section Style) */}
            <section className="py-12 border-t border-white/5 bg-[#0f141b]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
                            <div className="flex flex-col items-center">
                                <h3 className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">CATEGORIES</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {['RETAIL', 'GROCERY', 'DINING', 'TRAVEL', 'GADGETS'].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => navigate(`/search?category=${cat}`)}
                                            className="px-8 py-3 rounded-full border border-white/10 hover:border-[#ca8a04] hover:text-[#ca8a04] transition-all text-xs font-black tracking-widest uppercase bg-white/5"
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Summary Links */}
                        <div className="hidden lg:flex flex-col items-end gap-2">
                            <div className="flex gap-8">
                                {['HOME', 'OFFERS', 'PARTNERS', 'BROWSE', 'SUPPORT', 'LOG IN'].map(link => (
                                    <Link key={link} to="/" className="text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-widest">{link}</Link>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Facebook className="w-4 h-4 text-gray-600 hover:text-[#ca8a04] cursor-pointer" />
                                <Twitter className="w-4 h-4 text-gray-600 hover:text-[#ca8a04] cursor-pointer" />
                                <Instagram className="w-4 h-4 text-gray-600 hover:text-[#ca8a04] cursor-pointer" />
                                <Globe className="w-4 h-4 text-gray-600 hover:text-[#ca8a04] cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/5 text-center">
                        <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em]">
                            © 2026 UTSOB REWARDS. YOUR FESTIVE SAVINGS PARTNER IN BANGLADESH.
                        </p>
                    </div>
                </div>
            </section>

            <OfferModal
                offer={selectedOffer}
                onClose={() => setSelectedOffer(null)}
            />
        </div>
    );
};

const Tag = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 2 4.5 4.5" />
        <path d="m20.5 8.5-4.5-4.5" />
        <path d="m21 16-9-9" />
        <path d="m16 21-9-9" />
        <path d="m11 21-9-9" />
        <path d="m3 5.5 2.5-2.5" />
    </svg>
);

export default Home;
