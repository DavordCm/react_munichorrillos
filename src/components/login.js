import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, TextField, Box, Typography, Modal,
  InputAdornment, IconButton
} from "@mui/material";
import {
  AccountCircle, Lock, Visibility, VisibilityOff, Person
} from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import SHA256 from "crypto-js/sha256";
import "../components/login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      navigate("/menu");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:8080/api/personal");
      const data = response.data;

      const userFound = data.find((item) =>
        item.usuarioAcceso === user &&
        item.contraseña === SHA256(password).toString()
      );

      if (userFound) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("username", userFound.usuarioAcceso);
        setIsValid(true);
        setTimeout(() => navigate("/menu"), 1000);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.error("Error al hacer login:", error);
      setIsValid(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleUserLogin = () => {
    navigate("/login_user");
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  return (
    <Box className="login-container">
      <motion.img
        src="/MuniChorrillos.png"
        alt="MuniChorrillos Logo"
        className="logo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <Typography variant="h5" gutterBottom>Iniciar Sesión</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Usuario"
          variant="outlined"
          margin="normal"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Contraseña"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography className="link" onClick={() => openModal("Recuperación de contraseña")}>
          ¿Olvidaste tu contraseña?
        </Typography>
        <Typography className="link" onClick={handleRegister}>
          ¿No tienes una cuenta? Regístrate
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          className="login-button"
        >
          Ingresar
        </Button>

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleUserLogin}
          className="login-user-button"
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Person style={{ marginRight: 8 }} />
          Ingresar como Usuario
        </Button>
      </form>

      {isValid !== null && (
        <Typography className={isValid ? "success-message" : "error-message"}>
          {isValid ? "✅ Acceso Correcto. Redirigiendo..." : "❌ Usuario o Contraseña Incorrectos"}
        </Typography>
      )}

      <Box className="terms-box">
        <Typography variant="body2">
          Al iniciar sesión, aceptas nuestros{" "}
          <Typography component="span" className="link" onClick={() => openModal("Términos y Condiciones")}>
            Términos y Condiciones
          </Typography>{" "}
          y nuestra{" "}
          <Typography component="span" className="link" onClick={() => openModal("Política de Privacidad")}>
            Política de Privacidad
          </Typography>.
        </Typography>
      </Box>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className="modal-box">
          <Typography variant="h6">{modalContent}</Typography>
          <Button onClick={() => setModalOpen(false)} className="close-button">Cerrar</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Login;
