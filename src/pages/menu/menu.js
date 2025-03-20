import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton } from "@mui/material";
import { ExpandMore, Logout } from "@mui/icons-material";
import "../../styles/menu.css";

const MenuComponent = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSistema, setAnchorElSistema] = useState(null);

  const handleSalir = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="static" className="menu">
      <Toolbar className="menu-container">
        {/* LOGO */}
        <img
          src={`${process.env.PUBLIC_URL}/logoMuni.png`}
          alt="Municipalidad de Chorrillos"
          className="logo-img"
        />

        {/* MUNICIPALIDAD - Menú desplegable */}
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
        <Button color="inherit" component={Link} to="/fiscalizacion">Fiscalización</Button>
        <Button color="inherit" component={Link} to="/cajas">Cajas</Button>

        {/* SISTEMA - Menú desplegable */}
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

        {/* BOTÓN DE SALIR */}
        <IconButton color="inherit" onClick={handleSalir}>
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuComponent;
