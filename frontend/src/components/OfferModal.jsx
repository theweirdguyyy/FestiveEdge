import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, ExternalLink, Calendar, CreditCard, Info, Tag, Wallet, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const OfferModal = ({ offer, onClose }) => {
    const [copied, setCopied] = useState(false);

    if (!offer) return null;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                />

                {/* Modal Card */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header Banner */}
                    <div className="bg-indigo-600 p-8 md:p-10 text-white relative h-40 flex flex-col justify-end">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative z-10">
                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/20 border border-white/30 mb-3 inline-block">
                                {offer.lifestyle_category || 'Exclusive Offer'}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black leading-tight line-clamp-2">
                                {offer.name}
                            </h2>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                            {/* Merchant & Basic Info */}
                            <div className="md:col-span-12 flex items-center gap-5">
                                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                                    <Tag size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 leading-none mb-1">
                                        {offer.store_name}
                                    </h3>
                                    <p className="text-gray-500 font-bold flex items-center gap-1.5">
                                        Active Campaign • {offer.festival}
                                    </p>
                                </div>
                            </div>

                            {/* Detailed Sections */}
                            <div className="md:col-span-7 space-y-8">
                                {/* Terms & Conditions */}
                                <div>
                                    <h4 className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-wider text-xs mb-4">
                                        <Info size={16} /> Terms & Conditions
                                    </h4>
                                    <ul className="space-y-3">
                                        {offer.conditions?.map((condition, idx) => (
                                            <li key={idx} className="flex items-start gap-3 group">
                                                <div className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform" />
                                                <span className="text-gray-600 font-medium leading-relaxed italic">
                                                    {condition}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Promo Code Box */}
                                {offer.promo_code && (
                                    <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                                            <Tag size={64} className="rotate-12" />
                                        </div>
                                        <h4 className="text-amber-700 font-black uppercase tracking-wider text-[10px] mb-3 relative z-10 flex items-center gap-2">
                                            <Zap size={14} /> Promo Code
                                        </h4>
                                        <div className="flex items-center justify-between gap-4 relative z-10">
                                            <code className="text-2xl font-black text-amber-900 tracking-wider">
                                                {offer.promo_code}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(offer.promo_code)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all ${copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white text-amber-700 hover:bg-amber-100 shadow-sm'}`}
                                            >
                                                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                                                {copied ? 'Copied' : 'Copy'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Info */}
                            <div className="md:col-span-5 space-y-6">
                                {/* Status Cards */}
                                <div className="space-y-3">
                                    <div className="bg-gray-50 rounded-2xl p-5 border border-transparent hover:border-indigo-100 transition-colors">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Wallet size={12} /> Minimum Transaction
                                        </p>
                                        <p className="text-xl font-black text-gray-900">
                                            {offer.min_transaction > 0 ? `৳ ${offer.min_transaction.toLocaleString()}` : 'No Minimum'}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-2xl p-5 border border-transparent hover:border-indigo-100 transition-colors">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Calendar size={12} /> Validity Until
                                        </p>
                                        <p className="text-xl font-black text-gray-900">
                                            {formatDate(offer.expiry_date)}
                                        </p>
                                    </div>
                                </div>

                                {/* Eligible Cards */}
                                <div>
                                    <h4 className="flex items-center gap-2 text-gray-400 font-black uppercase tracking-wider text-[10px] mb-4">
                                        <CreditCard size={14} /> Eligible Cards
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(offer.eligible_cards?.length > 0 ? offer.eligible_cards : offer.card_types)?.map(card => (
                                            <span key={card} className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg border border-indigo-100/50">
                                                {card}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 md:p-10 border-t border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4">
                        {offer.url && (
                            <a
                                href={offer.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-indigo-600 text-white py-5 px-8 rounded-2xl font-black text-center flex items-center justify-center gap-3 hover:bg-indigo-700 hover:scale-[1.02] transition-all shadow-xl shadow-indigo-200"
                            >
                                <ExternalLink size={20} />
                                Redeem Offer Now
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="flex-1 bg-white border-2 border-gray-200 text-gray-500 py-5 px-8 rounded-2xl font-black hover:border-indigo-600 hover:text-indigo-600 transition-all"
                        >
                            Close Details
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const Zap = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);

export default OfferModal;
