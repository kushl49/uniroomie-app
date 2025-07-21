import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {Navigation} from './components/Navigation';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Listings from './pages/Listings';
import Seekers from './pages/Seekers';
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
import { UserProvider } from './context/UserContext';
import './index.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/seekers" element={<Seekers />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
