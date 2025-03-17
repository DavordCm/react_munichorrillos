import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/menu.css";

const Menu = () => {
  const [showMunicipalidad, setShowMunicipalidad] = useState(false);
  const [showSistema, setShowSistema] = useState(false);
  const navigate = useNavigate();

  const handleSalir = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true }); // Evita que el usuario regrese con "Atrás"
  };
  
  


  return (
    <nav className="menu">
      <div className="menu-container">
        {/* LOGO */}
        <div className="logo">
          <img
            src={`${process.env.PUBLIC_URL}/logoMuni.png`}
            alt="Municipalidad de Chorrillos"
            className="logo-img"
          />
        </div>

        {/* MENÚ PRINCIPAL */}
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>

          {/* MUNICIPALIDAD */}
          <li
            className="dropdown"
            onMouseEnter={() => setShowMunicipalidad(true)}
            onMouseLeave={() => setShowMunicipalidad(false)}
          >
            <span>Municipalidad</span>
            {showMunicipalidad && (
              <div className="submenu-container">
                <ul className="submenu">
                  <li><Link to="/horarios">Horarios</Link></li>
                  <li><Link to="/gruas">Gruas</Link></li>
                  <li><Link to="/depositos">Depósitos</Link></li>
                  <li><Link to="/empleados">Empleados</Link></li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link to="/deposito">Depósito ADM</Link>
          </li>
          <li>
            <Link to="/fiscalizacion">Fiscalización</Link>
          </li>
          <li>
            <Link to="/cajas">Cajas</Link>
          </li>


          {/* SISTEMA */}
          <li
            className="dropdown"
            onMouseEnter={() => setShowSistema(true)}
            onMouseLeave={() => setShowSistema(false)}
          >
            <span>Sistema</span>
            {showSistema && (
              <div className="submenu-container">
                <ul className="submenu">
                  <li><Link to="/infracciones">Infracciones</Link></li>
                  <li><Link to="/documentos">Documentos</Link></li>
                  <li><Link to="/PersonalAdm">Personal ADM</Link></li>
                  <li><Link to="/areas">Áreas</Link></li>
                </ul>
              </div>
            )}
          </li>
        </ul>

        {/* BOTÓN DE SALIR */}
        <div className="login">
          <button onClick={handleSalir}>Salir</button>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
