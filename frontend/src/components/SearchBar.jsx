import { useState } from 'react';
import { Search, Landmark } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [store, setStore] = useState('');
    const [bank, setBank] = useState('');

    const handleSearch = () => {
        onSearch({ store, bank });
    };

    return (
        <div className="relative max-w-5xl mx-auto mb-10">
            <div className="bg-white p-2 rounded-2xl job-search-shadow flex flex-col md:flex-row items-center gap-2 border border-gray-100">
                <div className="flex-1 flex items-center px-4 w-full">
                    <Search className="h-5 w-5 text-indigo-500 mr-3" />
                    <input
                        type="text"
                        className="w-full py-4 bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 font-medium"
                        placeholder="Search Store (e.g. Aarong, Daraz)"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                    />
                </div>

                <div className="hidden md:block w-px h-10 bg-gray-100 mx-2" />

                <div className="flex-1 flex items-center px-4 w-full">
                    <Landmark className="h-5 w-5 text-indigo-500 mr-3" />
                    <input
                        type="text"
                        className="w-full py-4 bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 font-medium"
                        placeholder="Select Bank (e.g. City Bank)"
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleSearch}
                    className="w-full md:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                    Search offers
                </button>
            </div>

            <div className="mt-4 flex items-center space-x-2 text-sm">
                <span className="text-gray-400 font-medium">Popular :</span>
                <span className="text-gray-600 font-bold hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => { setStore('Aarong'); onSearch({ store: 'Aarong', bank }); }}>Aarong</span>
                <span className="text-gray-400">,</span>
                <span className="text-gray-600 font-bold hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => { setStore('Daraz'); onSearch({ store: 'Daraz', bank }); }}>Daraz</span>
                <span className="text-gray-400">,</span>
                <span className="text-gray-600 font-bold hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => { setStore('Dining'); onSearch({ store: 'Dining', bank }); }}>Dining</span>
            </div>
        </div>
    );
};

export default SearchBar;
