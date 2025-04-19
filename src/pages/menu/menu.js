import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import { ExpandMore, Logout } from "@mui/icons-material";
import "../../styles/menu.css";

const MenuComponent = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSistema, setAnchorElSistema] = useState(null);
  const [anchorElFiscalizacion, setAnchorElFiscalizacion] = useState(null);

  const handleSalir = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  return (
    <div className="menu-background">
      {/* Menú */}
      <AppBar position="static" className="menu">
        <Toolbar className="menu-container">
          {/* LOGO */}
          <img
            src={`${process.env.PUBLIC_URL}/logoMuni.png`}
            alt="Municipalidad de Chorrillos"
            className="logo-img"
          />

          {/* MUNICIPALIDAD */}
          <Button
            color="inherit"
            endIcon={<ExpandMore />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Municipalidad
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem component={Link} to="/horarios">Horarios</MenuItem>
            <MenuItem component={Link} to="/gruas">Gruas</MenuItem>
            <MenuItem component={Link} to="/depositos">Depósitos</MenuItem>
            <MenuItem component={Link} to="/empleados">Empleados</MenuItem>
          </Menu>

          <Button color="inherit" component={Link} to="/deposito">Depósito ADM</Button>

          {/* FISCALIZACIÓN */}
          <Button
            color="inherit"
            endIcon={<ExpandMore />}
            onClick={(e) => setAnchorElFiscalizacion(e.currentTarget)}
          >
            Fiscalización
          </Button>
          <Menu
            anchorEl={anchorElFiscalizacion}
            open={Boolean(anchorElFiscalizacion)}
            onClose={() => setAnchorElFiscalizacion(null)}
          >
            <MenuItem component={Link} to="/generar">Generar Multa</MenuItem>
            <MenuItem component={Link} to="/multas">Multas</MenuItem>
            <MenuItem component={Link} to="/infractores">Infractores</MenuItem>
          </Menu>

          <Button color="inherit" component={Link} to="/cajas">Cajas</Button>

          {/* SISTEMA */}
          <Button
            color="inherit"
            endIcon={<ExpandMore />}
            onClick={(e) => setAnchorElSistema(e.currentTarget)}
          >
            Sistema
          </Button>
          <Menu
            anchorEl={anchorElSistema}
            open={Boolean(anchorElSistema)}
            onClose={() => setAnchorElSistema(null)}
          >
            <MenuItem component={Link} to="/infracciones">Infracciones</MenuItem>
            <MenuItem component={Link} to="/documentos">Documentos</MenuItem>
            <MenuItem component={Link} to="/PersonalAdm">Personal ADM</MenuItem>
            <MenuItem component={Link} to="/areas">Áreas</MenuItem>
          </Menu>

          {/* SALIR */}
          <IconButton color="inherit" onClick={handleSalir}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mapa */}
      <div className="map-container">
        <h2>Ubicación: La Curva de Villa, Chorrillos</h2>
        <iframe
          title="La Curva de Villa, Chorrillos"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.8771136977015!2d-77.004537!3d-12.187431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8e869b25f87%3A0x2f08f8859f3ac48e!2sLa%20Curva%20de%20Villa%2C%20Chorrillos!5e0!3m2!1ses-419!2spe!4v1680987077904!5m2!1ses-419!2spe"
          width="100%"
          height="450"
          style={{ border: "0", borderRadius: "8px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default MenuComponent;
