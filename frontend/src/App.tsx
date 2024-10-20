import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/ui/Menu';
import Home from './pages/Home';
import Nivel1 from './pages/Nivel1';
import Nivel2 from './pages/Nivel2';
import Nivel3 from './pages/Nivel3';

function App() {


  return (
    <Router>
      <Menu />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nivel1" element={<Nivel1 />} />
          <Route path="/nivel1/nivel2" element={<Nivel2 />} />
          <Route path="/nivel1/nivel2/nivel3" element={<Nivel3 />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
