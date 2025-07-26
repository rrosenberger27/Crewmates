import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import CreateCrewmate from './pages/CreateCrewmate';
import Gallery from './pages/Gallery';
import ViewCrewmate from './pages/ViewCrewmate';
import EditCrewmate from './pages/EditCrewmate';

function App() {
    const [crewmates, setCrewmates] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateCrewmate />} />
                <Route path="/gallery" element={<Gallery 
                    crewmates={crewmates}
                    setCrewmates={setCrewmates}
                    loading={loading}
                    setLoading={setLoading}
                />} />
                <Route path="/view/:id" element={<ViewCrewmate />} />
                <Route path="/edit/:id" element={<EditCrewmate />} />
            </Routes>
        </div>
    )
}

export default App
