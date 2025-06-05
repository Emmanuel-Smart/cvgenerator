import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CVPage } from './pages/CVPage';  // Named import
import AuthPage from './pages/AuthPage';  // Default import
import './App.css';
import { CVDetailPage } from './pages/CVDetailPage';
import { CVListPage } from './pages/CVListPage';

function App() {
  return (
    <AuthProvider>

      <Routes>
        <Route path="/cv-list" element={<CVListPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cv" element={<CVPage />} />
        <Route path="*" element={<Navigate to="/auth" />} />
        <Route path="/cv/:id" element={<CVDetailPage />} />
      </Routes>

    </AuthProvider>
  );
}

export default App;