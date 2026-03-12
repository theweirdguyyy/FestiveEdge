import { Link } from 'react-router-dom';
import { Landmark, Search, Filter, Menu, Lamp } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#052e16] border-b border-white/10 sticky top-0 z-50 py-4 text-white"
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-12">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-white/10 p-2 rounded-xl text-[#ca8a04] h-12 w-12 flex items-center justify-center border border-white/20 transition-all group-hover:bg-[#ca8a04] group-hover:text-white group-hover:scale-110">
                            <Lamp size={28} />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="font-black text-xl tracking-tighter leading-none flex items-center gap-1.5 uppercase font-outfit">
                                UTSOB <span className="text-[#ca8a04]">REWARDS</span>
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 -mt-0.5 tracking-[0.2em] uppercase">
                                উৎসব রিওয়ার্ডস
                            </span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-10">
                        <Link to="/" className="text-sm font-bold hover:text-[#ca8a04] transition-colors">HOME</Link>
                        <Link to="/offers" className="text-sm font-bold hover:text-[#ca8a04] transition-colors">OFFERS</Link>
                        <Link to="/partners" className="text-sm font-bold hover:text-[#ca8a04] transition-colors">PARTNERS</Link>
                        <Link to="/support" className="text-sm font-bold hover:text-[#ca8a04] transition-colors">SUPPORT</Link>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-sm font-bold hover:text-[#ca8a04] transition-colors px-6 py-2.5">
                        LOG IN
                    </Link>
                    <Link to="/signup" className="bg-[#065f46] hover:bg-[#059669] text-white px-8 py-3 rounded-xl text-sm font-black transition-all shadow-xl shadow-black/20 uppercase tracking-widest border border-white/10">
                        JOIN NOW
                    </Link>
                    <Menu className="lg:hidden text-white" />
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
