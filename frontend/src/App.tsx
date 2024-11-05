import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
//import Home from './pages/Home';
import { ReactNode } from "react";
import Navbar from "./components/ui/navbar";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Importe o contexto de autenticação
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Nivel1 from "./pages/Nivel1";
import Nivel2 from "./pages/Nivel2";
import Nivel3 from "./pages/Nivel3";
import Toxin from "./pages/Toxin";

interface PrivateRouteProps {
  element: ReactNode; // ou React.ReactElement se preferir
  requiredLevel: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  requiredLevel,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return user && user.access_level >= requiredLevel ? (
    <>{element}</>
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route
              path="/home"
              element={<PrivateRoute element={<Home />} requiredLevel={1} />}
            />
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
