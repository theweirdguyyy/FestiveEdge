import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, ExternalLink, Calendar, CreditCard, Info, Tag, Wallet, CheckCircle2, Lamp, Sparkles } from 'lucide-react';
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
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-[#022c22]/80 backdrop-blur-xl"
                />

                {/* Modal Card */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl bg-[#022c22] rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh] border border-white/10 uppercase"
                >
                    {/* Header Banner */}
                    <div className="bg-[#064e3b] p-8 md:p-10 text-white relative h-48 flex flex-col justify-end border-b border-white/10 islamic-pattern">
                        <div className="absolute inset-0 opacity-20 mosque-silhouette scale-150 pointer-events-none" />
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-[#ca8a04] hover:text-[#052e16] rounded-full transition-all z-20 border border-white/10"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative z-10">
                            <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-[#ca8a04]/20 text-[#ca8a04] border border-[#ca8a04]/30 mb-4 inline-block">
                                {offer.lifestyle_category || 'EXCLUSIVE REWARD'}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black leading-none font-outfit tracking-tighter">
                                {offer.name}
                            </h2>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar text-white">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                            {/* Merchant & Basic Info */}
                            <div className="md:col-span-12 flex items-center gap-6 border-b border-white/5 pb-8">
                                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#ca8a04] shrink-0 shadow-inner">
                                    <Lamp size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black leading-none mb-2 font-outfit tracking-tight">
                                        {offer.store_name}
                                    </h3>
                                    <p className="text-gray-500 font-black text-[10px] tracking-widest flex items-center gap-2">
                                        <Sparkles size={12} className="text-[#ca8a04]" /> {offer.festival} CAMPAIGN 2026
                                    </p>
                                </div>
                            </div>

                            {/* Detailed Sections */}
                            <div className="md:col-span-7 space-y-10">
                                {/* Terms & Conditions */}
                                <div>
                                    <h4 className="flex items-center gap-2 text-[#ca8a04] font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                                        <Info size={14} /> TERMS & ELIGIBILITY
                                    </h4>
                                    <ul className="space-y-4">
                                        {offer.conditions?.map((condition, idx) => (
                                            <li key={idx} className="flex items-start gap-4 group">
                                                <div className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#ca8a04] group-hover:scale-150 transition-transform shadow-[0_0_8px_#ca8a04]" />
                                                <span className="text-gray-300 font-bold text-xs leading-relaxed lowercase first-letter:uppercase">
                                                    {condition}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Promo Code Box */}
                                {offer.promo_code && (
                                    <div className="bg-[#ca8a04]/5 border border-[#ca8a04]/20 rounded-3xl p-8 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                            <Lamp size={80} className="rotate-12" />
                                        </div>
                                        <h4 className="text-[#ca8a04] font-black uppercase tracking-[0.2em] text-[9px] mb-4 relative z-10 flex items-center gap-2">
                                            <Zap size={14} /> EXCLUSIVE PROMO CODE
                                        </h4>
                                        <div className="flex items-center justify-between gap-6 relative z-10">
                                            <code className="text-3xl font-black text-white tracking-widest">
                                                {offer.promo_code}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(offer.promo_code)}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] tracking-widest border transition-all ${copied ? 'bg-[#ca8a04] border-[#ca8a04] text-[#052e16] shadow-xl shadow-[#ca8a04]/20' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                                            >
                                                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                                                {copied ? 'COPIED' : 'COPY'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Info */}
                            <div className="md:col-span-5 space-y-8">
                                {/* Status Cards */}
                                <div className="space-y-4">
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-[#ca8a04]/30 transition-all group">
                                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2 group-hover:text-[#ca8a04]">
                                            <Wallet size={12} /> MINIMUM SPEND
                                        </p>
                                        <p className="text-2xl font-black text-white font-outfit">
                                            {offer.min_transaction > 0 ? `৳ ${offer.min_transaction.toLocaleString()}` : 'NO MINIMUM'}
                                        </p>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-[#ca8a04]/30 transition-all group">
                                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2 group-hover:text-[#ca8a04]">
                                            <Calendar size={12} /> VALID UNTIL
                                        </p>
                                        <p className="text-2xl font-black text-white font-outfit">
                                            {formatDate(offer.expiry_date)}
                                        </p>
                                    </div>
                                </div>

                                {/* Eligible Cards */}
                                <div className="pt-4">
                                    <h4 className="flex items-center gap-2 text-gray-500 font-black uppercase tracking-[0.2em] text-[9px] mb-5">
                                        <CreditCard size={14} /> ELIGIBLE INSTRUMENTS
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(offer.eligible_cards?.length > 0 ? offer.eligible_cards : offer.card_types)?.map(card => (
                                            <span key={card} className="text-[9px] font-black bg-white/5 text-[#ca8a04] px-3 py-1.5 rounded-lg border border-[#ca8a04]/20 uppercase">
                                                {card}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 md:p-10 border-t border-white/5 bg-[#064e3b]/20 flex flex-col md:flex-row gap-4">
                        {offer.url && (
                            <a
                                href={offer.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-[2] bg-[#ca8a04] hover:bg-[#b45309] text-[#052e16] py-5 px-10 rounded-2xl font-black text-[11px] tracking-[0.2em] text-center flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#ca8a04]/10 active:scale-95"
                            >
                                <ExternalLink size={18} />
                                REDEEM REWARD NOW
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="flex-1 bg-white/5 border border-white/10 text-white/50 py-5 px-8 rounded-2xl font-black text-[11px] tracking-[0.2em] hover:text-white hover:border-white/20 transition-all uppercase"
                        >
                            CLOSE
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
