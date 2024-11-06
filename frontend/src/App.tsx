import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
//import Home from './pages/Home';
import { ReactNode, useEffect } from "react";
import Navbar from "./components/ui/navbar";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Importe o contexto de autenticação
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Nivel1 from "./pages/Nivel1";
import Nivel2 from "./pages/Nivel2";
import Nivel3 from "./pages/Nivel3";
import Toxin from "./pages/Toxin";
import Swal from "sweetalert2";

interface PrivateRouteProps {
  element: ReactNode; // ou React.ReactElement se preferir
  requiredLevel: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, requiredLevel }) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && user.access_level < requiredLevel) {
      Swal.fire({
        icon: 'error',
        title: 'Acesso negado',
        text: 'Você não tem permissão para acessar esta página.',
      });
    }
  }, [user, requiredLevel]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || user.access_level < requiredLevel) {
    return <Navigate to="/auth" />;
  }

  return <>{element}</>;
};

const AuthRoute: React.FC<{ element: ReactNode }> = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return user ? <Navigate to="/" /> : <>{element}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/auth" element={<AuthRoute element={<Auth />} />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/nivel/1"
              element={<PrivateRoute element={<Nivel1 />} requiredLevel={1} />}
            />
            <Route
              path="/nivel/2"
              element={<PrivateRoute element={<Nivel2 />} requiredLevel={2} />}
            />
            <Route
              path="/nivel/3"
              element={<PrivateRoute element={<Nivel3 />} requiredLevel={3} />}
            />
            <Route
              path="/toxins/:id"
              element={<PrivateRoute element={<Toxin />} requiredLevel={1} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
