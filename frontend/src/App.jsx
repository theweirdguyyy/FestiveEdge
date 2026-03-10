import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import BankDetails from './pages/BankDetails';
import FestivalCollections from './pages/FestivalCollections';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/bank/:id" element={<BankDetails />} />
                        <Route path="/festivals" element={<FestivalCollections />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
