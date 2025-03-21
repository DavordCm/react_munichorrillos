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

const LoginUser = () => {
  const navigate = useNavigate();

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
            <TextField fullWidth margin="normal" label="Email" variant="outlined" />
            <TextField fullWidth margin="normal" label="Contraseña" variant="outlined" type="password" />
            
            <FormControlLabel control={<Checkbox />} label="Recordar Usuario" />
            
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              Ingresar
            </Button>
            
            <Button 
              fullWidth 
              variant="outlined" 
              color="secondary" 
              sx={{ mt: 2 }}
              startIcon={<Work />}
              onClick={handleEmployeeLogin}
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
              <Link href="#" color="error">
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
