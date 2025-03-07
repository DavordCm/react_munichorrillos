import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/menu.css";

const Menu = () => {
  const [showMunicipalidad, setShowMunicipalidad] = useState(false);
  const navigate = useNavigate();

  // Función para manejar el evento del botón "Salir"
  const handleSalir = () => {
    // Limpiar el almacenamiento (si usas almacenamiento local, por ejemplo)
    localStorage.removeItem("authToken");  // Si usas un token de autenticación

    // Redirigir a la página de login
    navigate("/login");
  };

  return (
    <nav className="menu">
      <div className="menu-container">
        <div className="logo">
          <img
            src={`${process.env.PUBLIC_URL}/logoMuni.png`}
            alt="Municipalidad de Chorrillos"
            className="logo-img"
          />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li
            className="dropdown"
            onMouseEnter={() => setShowMunicipalidad(true)}
            onMouseLeave={() => setShowMunicipalidad(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <span>Municipalidad</span>
            {showMunicipalidad && (
              <div
                className="submenu-container"
                onClick={(e) => e.stopPropagation()}
              >
                <ul className="submenu">
                  <li>
                    <Link to="/horarios">Horarios</Link>
                  </li>
                  <li>
                    <Link to="/gruas">Gruas</Link>
                  </li>
                  <li>
                    <Link to="/depositos">Depositos</Link>
                  </li>
                  <li>
                    <Link to="/empleados">Empleados</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link to="/deposito">Deposito ADM</Link>
          </li>
          <li>
            <Link to="/fiscalizacion">Fiscalización</Link>
          </li>
          <li>
            <Link to="/cajas">Cajas</Link>
          </li>
          <li>
            <Link to="/sistema">Sistema</Link>
          </li>
        </ul>

        <div className="login">
          <button onClick={handleSalir}>Salir</button>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
