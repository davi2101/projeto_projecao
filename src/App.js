import './App.css';
import Menu from "./components/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import Financeiro from './pages/financeiro/Financeiro';
import FinanceiroLista from './pages/financeiro/FinanceiroLista';
import Paciente from './pages/paciente/Paciente';
import PacienteLista from './pages/paciente/PacienteLista';
import Insumo from './pages/insumo/Insumo';
import InsumoLista from './pages/insumo/InsumoLista';
import Hospital from './pages/hospital/Hospital';
import HospitalLista from './pages/hospital/HospitalLista';
import Servico from './pages/servico/Servico';
import ServicoLista from './pages/servico/ServicoLista';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className='background-image'>

      <BrowserRouter>

        <Menu />

        <Container >
        <Routes>
          <Route path="/paciente" element={<Paciente />} />
          <Route path="/paciente/lista" element={<PacienteLista />} />
          <Route path="/paciente/:id" element={<Paciente />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/hospital/lista" element={<HospitalLista />} />
          <Route path="/hospital/:id" element={<Hospital />} />
          <Route path="/insumo" element={<Insumo />} />
          <Route path="/insumo/lista" element={<InsumoLista />} />
          <Route path="/insumo/:id" element={<Insumo />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/financeiro/lista" element={<FinanceiroLista />} />
          <Route path="/financeiro/:id" element={<Financeiro />} />
          <Route path="/servico" element={<Servico />} />
          <Route path="/servico/lista" element={<ServicoLista />} />
          <Route path="/servico/:id" element={<Servico />} />
        </Routes>
        </Container>

      </BrowserRouter>
    </div>
  );
}

export default App;