import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
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
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<BusinessList />} />
              <Route path="/business/:id" element={<BusinessDetail />} />
              <Route path="/add" element={<AddBusiness />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;