import { motion } from 'framer-motion';
import { Landmark, ArrowRight, Lamp } from 'lucide-react';
import { Link } from 'react-router-dom';

const BankSearchSummary = ({ bankName, offerCount, bankId }) => {
    if (!bankName || offerCount === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="flex items-center mb-6 md:mb-0 relative z-10">
                <div className="w-20 h-20 bg-[#ca8a04]/10 rounded-2xl flex items-center justify-center text-[#ca8a04] mr-8 shadow-inner border border-[#ca8a04]/20">
                    <Lamp size={36} />
                </div>
                <div>
                    <h3 className="text-3xl font-black text-white mb-2 font-outfit uppercase tracking-tighter">{bankName}</h3>
                    <p className="text-[#ca8a04] font-black text-[10px] tracking-widest uppercase">
                        {offerCount} EXCLUSIVE {offerCount === 1 ? 'REWARD' : 'REWARDS'} UNLOCKED
                    </p>
                </div>
            </div>

            <Link
                to={`/bank/${bankId || bankName.toLowerCase().replace(/\s+/g, '-')}`}
                className="relative z-10 flex items-center bg-[#ca8a04] hover:bg-[#b45309] text-[#052e16] px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all shadow-xl shadow-[#ca8a04]/10 group"
            >
                REDEEM ALL OFFERS <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    );
};

export default BankSearchSummary;
