import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './components/ui/Menu';
//import Home from './pages/Home';
import Nivel1 from './pages/Nivel1';
import Nivel2 from './pages/Nivel2';
import Nivel3 from './pages/Nivel3';
import { AuthProvider, useAuth } from './components/ui/Login/AuthContext'; // Importe o contexto de autenticação
import { ReactNode } from 'react';
import Auth from './components/ui/Login/Auth';
import Home from './pages/Home';



interface PrivateRouteProps {
  element: ReactNode; // ou React.ReactElement se preferir
  requiredLevel: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, requiredLevel }) => {
  const { user } = useAuth();
  return user && user.accessLevel >= requiredLevel ? (
    <>{element}</>
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu />
        <div className="content">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} requiredLevel={1} />} />
            <Route path="/nivel1" element={<PrivateRoute element={<Nivel1 />} requiredLevel={1} />} />
            <Route path="/nivel1/nivel2" element={<PrivateRoute element={<Nivel2 />} requiredLevel={2} />} />
            <Route path="/nivel1/nivel2/nivel3" element={<PrivateRoute element={<Nivel3 />} requiredLevel={3} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
