import { Link } from 'react-router-dom';
import { Landmark, Search, Filter, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white border-b border-gray-100 sticky top-0 z-50 py-4"
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-12">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-indigo-600 p-2 rounded-lg text-white font-bold text-xl h-10 w-10 flex items-center justify-center">
                            F
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">
                            Festive<span className="text-indigo-600">Edge</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-10">
                        <Link to="/" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors">Offers</Link>
                        <Link to="/banks" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors">Banks</Link>
                        <Link to="/festivals" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors">Festivals</Link>
                        <Link to="/categories" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors">Categories</Link>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="text-sm font-bold text-indigo-600 hover:bg-indigo-50 px-6 py-2.5 rounded-lg transition-all">
                        Login
                    </button>
                    <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                        Sign Up
                    </button>
                    <Menu className="lg:hidden text-gray-600" />
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
