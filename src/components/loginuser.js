import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Box,
  Paper,
} from "@mui/material";
import { Work } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    try {
      // Realizando la solicitud a la API para la autenticación
      const response = await axios.post('http://localhost:8080/api/usuarios/login/authenticate', {
        email,
        contraseña: password,
      });

      if (response.status === 200) {
        // Manejar la respuesta si el login es exitoso
        // Puedes guardar un token o algún dato en el localStorage o state global si es necesario
        console.log('Inicio de sesión exitoso:', response.data);
        navigate('/dashboard');  // Redirige a una página después de login
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales incorrectas');  // Puedes mejorar la alerta con un mensaje de error más detallado
    }
  };

  // Función para manejar el login de empleado (redirigir a la página de login de empleado)
  const handleEmployeeLogin = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ minHeight: "100vh", alignItems: "center" }}>
        
        {/* Sección de información */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold">
            Bienvenido
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            ¿Tienes una multa?
          </Typography>
          <Typography variant="h6">
            Ahora puedes pagarla por nuestra página web oficial
          </Typography>
        </Grid>

        {/* Formulario de inicio de sesión */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom>
              Inicia Sesión
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Vincula el estado del email
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Vincula el estado de la contraseña
            />
            
            <FormControlLabel control={<Checkbox />} label="Recordar Usuario" />
            
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleLogin}  // Llama a la función de login al hacer clic
            >
              Ingresar
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ mt: 2 }}
              startIcon={<Work />}
              onClick={handleEmployeeLogin}  // Redirige al login de empleado
            >
              Ingresar como Empleado
            </Button>

            <Box mt={2}>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>

            <Typography variant="body2" mt={2}>
  No tienes cuenta?{" "}
  <Link component="button" color="error" onClick={() => navigate("/registro")}>
    Regístrate
  </Link>
</Typography>

          </Paper>
        </Grid>
      </Grid>

      {/* Pie de página */}
      <Box mt={5} textAlign="center" bgcolor="primary.main" color="white" p={2}>
        Copyright © 2024. InkaCode Perú. Todos los derechos reservados.
      </Box>
    </Container>
  );
};

export default LoginUser;
