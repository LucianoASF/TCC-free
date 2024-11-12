import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import 'react-toastify/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import SeusPedidosSoftwares from './routes/SeusPedidosSoftwares';
import PedidosSoftware from './routes/PedidosSoftware';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/seus-pedidos-softwares"
            element={
              <PrivateRoute>
                <SeusPedidosSoftwares />
              </PrivateRoute>
            }
          />
          <Route
            path="pedidos-softwares"
            element={
              <PrivateRoute roles="desenvolvedor">
                <PedidosSoftware />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
