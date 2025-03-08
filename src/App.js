import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//importacion de pages a rutas
import Login from "./components/login.js";
import Menu from "./pages/menu/menu.js";
import Municipalidad from "./pages/municipalidad/municipalidad.js";
import Deposito from "./pages/deposito/deposito.js";
import Fiscalizacion from "./pages/fiscalizacion/fiscalizacion.js";
import Cajas from "./pages/cajas/cajas.js";
import Sistema from "./pages/sistema/sistema.js";
import Horario from "./pages/horarios/horario.js";
import Gruas from "./pages/gruas/gruas.js";
import Empleados from "./pages/empleados/empleados.js"; 

const PrivateRoute = ({ element }) => { // Esta función asegura que el usuario esté autenticado antes de acceder a las rutas privadas.

  return localStorage.getItem("auth") === "true" ? element : <Navigate to="/login" />;
    // Si el valor en localStorage es "true", se permite el acceso a la ruta, si no, redirige al login.

};

function App() {
  return (
    <Router>
      <Routes>
       {/* Ruta inicial: redirige automáticamente a /login si el usuario no está autenticado */}  
        <Route path="/" element={<Navigate to="/login" />} />
      {/* Ruta de login: disponible para todos los usuarios */}  
        <Route path="/login" element={<Login />} />
      {/* Rutas privadas: cada una de estas rutas solo será accesible si el usuario está autenticado */}
        <Route path="/menu" element={<PrivateRoute element={<Menu />} />} />
        <Route path="/municipalidad" element={<PrivateRoute element={<Municipalidad />} />} />
        <Route path="/horarios" element={<PrivateRoute element={<Horario />} />} />
        <Route path="/deposito" element={<PrivateRoute element={<Deposito />} />} />
        <Route path="/gruas" element={<PrivateRoute element={<Gruas />} />} /> 
        <Route path="/empleados" element={<PrivateRoute element={<Empleados />} />} /> 
        <Route path="/fiscalizacion" element={<PrivateRoute element={<Fiscalizacion />} />} />
        <Route path="/cajas" element={<PrivateRoute element={<Cajas />} />} />
        <Route path="/sistema" element={<PrivateRoute element={<Sistema />} />} />
      </Routes>
    </Router>
  );
}

export default App;