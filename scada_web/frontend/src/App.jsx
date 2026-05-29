import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import OverviewPage from './pages/OverviewPage';
import VisionPage from './pages/VisionPage';
import SettingsPage from './pages/SettingsPage';
import ReportPage from './pages/ReportPage';
import AlarmPage from './pages/AlarmPage';
import LoginPage from './pages/LoginPage';

import { ScadaProvider } from './context/ScadaContext';

const Layout = ({ children }) => {
  return (
    <ScadaProvider>
      <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-200">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-900/50">
            {children}
          </main>
        </div>
      </div>
    </ScadaProvider>
  );
};

function App() {
  // Simple auth check mock
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <Layout><OverviewPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/vision" element={isAuthenticated ? <Layout><VisionPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <Layout><SettingsPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/report" element={isAuthenticated ? <Layout><ReportPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/alarm" element={isAuthenticated ? <Layout><AlarmPage /></Layout> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
