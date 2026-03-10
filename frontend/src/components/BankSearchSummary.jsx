import { motion } from 'framer-motion';
import { Landmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BankSearchSummary = ({ bankName, offerCount, bankId }) => {
    if (!bankName || offerCount === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between"
        >
            <div className="flex items-center mb-6 md:mb-0">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mr-6 shadow-lg shadow-indigo-200">
                    <Landmark size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1">{bankName}</h3>
                    <p className="text-indigo-600 font-bold">
                        {offerCount} Active {offerCount === 1 ? 'Offer' : 'Offers'} Found
                    </p>
                </div>
            </div>

            <Link
                to={`/bank/${bankId || bankName.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 group"
            >
                Show All Offers <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    );
};

export default BankSearchSummary;
