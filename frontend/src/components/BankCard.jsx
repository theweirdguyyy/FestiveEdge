import { useNavigate } from 'react-router-dom';
import { ChevronRight, Landmark, Zap, Sparkles, Lamp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BankCard = ({ bank, isBestOffer, onClick }) => {
    const navigate = useNavigate();
    const bankDetails = bank.bank_id || bank;
    const isOffer = !!bank.bank_id;

    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick(bank);
        } else if (!isOffer) {
            navigate(`/bank/${bankDetails._id}`);
        }
    };

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group cursor-pointer w-full max-w-sm md:max-w-md"
            onClick={handleClick}
        >
            <div className="bg-[#064e3b] rounded-[2rem] p-6 border border-white/10 shadow-2xl relative overflow-hidden h-full flex flex-col group-hover:border-[#ca8a04]/50 transition-all islamic-pattern">
                {/* Bank Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 shrink-0 shadow-lg">
                        {/* Placeholder for real logo, using Bank icon for now */}
                        <Landmark size={24} className="text-[#064e3b]" />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider line-clamp-1">
                            {bankDetails.title}
                        </h4>
                        <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">
                            {bankDetails.company || 'Premier Partner'}
                        </span>
                    </div>
                    {/* Corner Motif */}
                    <div className="absolute top-4 right-4 text-[#ca8a04]/30">
                        <Lamp size={20} />
                    </div>
                </div>

                {/* Offer Body */}
                <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-[#ca8a04] text-xl font-black mb-1 font-outfit leading-tight group-hover:text-white transition-colors">
                        {isOffer ? bank.name : "Exclusive Cashback"}
                    </h3>
                    <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest mb-4">
                        {isOffer ? bank.conditions?.[0] : bankDetails.category}
                    </p>
                </div>

                {/* Card Footer / Action */}
                <div className="mt-4 flex items-center justify-between">
                    <button className="bg-white/10 hover:bg-[#ca8a04] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 flex items-center gap-2 group/btn">
                        VIEW OFFER
                        <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    {/* Small Icon / Illustration Placeholder */}
                    <div className="opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                            <Zap size={20} className="text-[#ca8a04]" />
                        </div>
                    </div>
                </div>

                {/* Status Badge */}
                {isBestOffer && (
                    <div className="absolute top-0 right-0 py-1 px-4 bg-[#ca8a04] text-[#064e3b] text-[8px] font-black uppercase tracking-tighter rounded-bl-xl shadow-lg">
                        Featured
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default BankCard;

const LandmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);
