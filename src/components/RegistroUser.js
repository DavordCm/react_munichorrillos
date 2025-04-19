import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistroUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreU: '',
    apellidoU: '',
    direccion: '',
    telefono: '',
    email: '',
    contraseña: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistro = async () => {
    try {
      // Realiza el POST a la URL de registro
      await axios.post('http://localhost:8080/api/usuarios/registrar', formData);
      alert('Usuario registrado exitosamente. Se ha enviado un correo de confirmación.');
      navigate('/login-user'); // Redirige al login tras registro exitoso
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un error al registrar. Intenta nuevamente.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Registro de Usuario
        </Typography>

        <TextField
          fullWidth
          label="Nombres"
          name="nombreU"
          margin="normal"
          value={formData.nombreU}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Apellidos"
          name="apellidoU"
          margin="normal"
          value={formData.apellidoU}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Dirección"
          name="direccion"
          margin="normal"
          value={formData.direccion}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Teléfono"
          name="telefono"
          margin="normal"
          value={formData.telefono}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Contraseña"
          name="contraseña"
          margin="normal"
          type="password"
          value={formData.contraseña}
          onChange={handleChange}
        />

        {/* Botones de Registrar y Cancelar */}
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegistro}
            >
              Registrar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => navigate("/")} // Redirige a la página principal
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default RegistroUser;
