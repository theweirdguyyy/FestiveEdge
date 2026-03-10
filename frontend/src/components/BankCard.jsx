import { Link } from 'react-router-dom';
import { ChevronRight, Landmark, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const BankCard = ({ bank, isBestOffer }) => {
    // For general listing, the 'bank' object might actually be an 'offer' object if we fetch from /api/offers
    const bankDetails = bank.bank_id || bank;
    const isOffer = !!bank.bank_id;

    // Calculate days left
    const getDaysLeft = (date) => {
        const diff = new Date(date) - new Date();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const daysLeft = isOffer ? getDaysLeft(bank.expiry_date) : null;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group"
        >
            <Link to={`/bank/${bankDetails._id}`} className="block h-full">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 job-search-shadow h-full flex flex-col transition-all group-hover:border-indigo-200 relative overflow-hidden">
                    {isBestOffer && (
                        <div className="absolute top-0 right-0 bg-amber-400 text-white px-4 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-tighter z-10">
                            Best Offer
                        </div>
                    )}

                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                            <Landmark size={28} />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100 mb-2">
                                {bank.offer_type || bankDetails.offer_type}
                            </span>
                            {daysLeft !== null && (
                                <span className={`text-[10px] font-bold ${daysLeft < 7 ? 'text-red-500' : 'text-gray-400'}`}>
                                    {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-6 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                {isOffer ? bank.name : bankDetails.title}
                            </h3>
                        </div>
                        <p className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-1">
                            {bankDetails.company} {isOffer && <span className="text-gray-300">• {bank.store_name}</span>}
                        </p>
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed h-10">
                            {isOffer ? bank.conditions[0] : bankDetails.description}
                        </p>
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1 max-w-[70%]">
                            {isOffer && bank.card_types?.map(card => (
                                <span key={card} className="text-[9px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                                    {card}
                                </span>
                            )) || (
                                    <div className="flex items-center space-x-2 text-indigo-600">
                                        <Sparkles size={14} />
                                        <span className="text-xs font-bold uppercase tracking-tight">{bankDetails.category}</span>
                                    </div>
                                )}
                        </div>
                        <div className="text-gray-300 group-hover:text-indigo-600 transition-colors">
                            <ChevronRight size={18} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const LandmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);

export default BankCard;
