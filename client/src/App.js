
import './App.scss';

//react DOM

//integração React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './Contexts/Auth/AuthContext';
// import { useContext } from 'react';
// importação das rotas  
import Home from './Routes/Home'
import Register from './Routes/Register'
import Private from './Routes/Private'
import DashboardPerfil from './Routes/DashboardPerfil';
import { RequireAuth } from './Contexts/Auth/RequireAuth';
//Toasts
import { ToastContainer } from "react-toastify"; // Importamos o Toastify
import "react-toastify/dist/ReactToastify.css"; // O estilo do Toastify

// const { user, login, logout } = useContext(UserContext);

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Private" element={<RequireAuth> <Private /> </RequireAuth>} />
          <Route path="/DashboardPerfil" element={<RequireAuth> <DashboardPerfil /> </RequireAuth>} />
          {/* <Route path="/UploadImage" element={<UploadImage />} /> */}
          {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
        </Routes>

        <ToastContainer
          autoClose={1000}
          position="top-center"
          hideProgressBar={1}
          newestOnTop={false}
          limit={3}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
