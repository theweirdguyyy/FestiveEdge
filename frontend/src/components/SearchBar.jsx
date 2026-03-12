import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Landmark, Lamp } from 'lucide-react';

const SearchBar = ({ dark = false }) => {
    const navigate = useNavigate();
    const [store, setStore] = useState('');
    const [bank, setBank] = useState('');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (store) params.append('store', store);
        if (bank) params.append('bank', bank);
        navigate(`/search?${params.toString()}`);
    };

    return (
        <div className={`relative max-w-5xl mx-auto mb-10 ${dark ? 'text-white' : ''}`}>
            <div className={`p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 border shadow-2xl transition-all ${dark
                    ? 'bg-[#064e3b] border-white/10 shadow-black/40'
                    : 'bg-white border-emerald-100 shadow-emerald-900/10'
                }`}>
                <div className="flex-1 flex items-center px-4 w-full">
                    <Search className={`h-5 w-5 mr-3 ${dark ? 'text-[#ca8a04]' : 'text-[#064e3b]'}`} />
                    <input
                        type="text"
                        className={`w-full py-4 bg-transparent border-none focus:ring-0 placeholder:text-gray-400 font-bold text-sm tracking-wide ${dark ? 'text-white' : 'text-[#052e16]' }`}
                        placeholder="SEARCH MERCHANTS"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                    />
                </div>

                <div className={`hidden md:block w-px h-10 mx-2 ${dark ? 'bg-white/10' : 'bg-emerald-50'}`} />

                <div className="flex-1 flex items-center px-4 w-full">
                    <Lamp className={`h-5 w-5 mr-3 ${dark ? 'text-[#ca8a04]' : 'text-[#064e3b]'}`} />
                    <input
                        type="text"
                        className={`w-full py-4 bg-transparent border-none focus:ring-0 placeholder:text-gray-400 font-bold text-sm tracking-wide ${dark ? 'text-white' : 'text-[#052e16]'
                            }`}
                        placeholder="SEARCH BANK"
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleSearch}
                    className="w-full md:w-auto bg-[#ca8a04] hover:bg-[#b45309] text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-[#ca8a04]/20 active:scale-95"
                >
                    SEARCH OFFERS
                </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 px-4 text-[10px] font-black uppercase tracking-widest">
                <span className="opacity-40">POPULAR :</span>
                {['AARONG', 'DARAZ', 'DINING', 'GROCERY'].map(tag => (
                    <span
                        key={tag}
                        className={`cursor-pointer transition-colors ${dark ? 'text-[#ca8a04] hover:text-white' : 'text-[#064e3b] hover:text-[#ca8a04]'}`}
                        onClick={() => navigate(`/search?${tag === 'DINING' || tag === 'GROCERY' ? `category=${tag}` : `store=${tag}`}`)}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
