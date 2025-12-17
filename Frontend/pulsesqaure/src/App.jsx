import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BusinessList from './pages/BusinessList';
import BusinessDetail from './pages/BusinessDetails';
import AddBusiness from './pages/AddBusiness';
import Login from './pages/Login';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<BusinessList />} />
                <Route path="/business/:id" element={<BusinessDetail />} />
                <Route path="/add" element={<AddBusiness />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;