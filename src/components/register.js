import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({   // Estado para almacenar los datos del formulario

    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);   // Estado para manejar errores y mensajes de éxito

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {   // Maneja el envío del formulario con validaciones

    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) { //Verifica que todos los campos estén completos
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (formData.password !== formData.confirmPassword) { //Verifica que las contraseñas coincidan
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Simulación de guardado en localStorage (puede cambiarse por una API real)
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    
    setSuccess(true);
    setError(null);

    // Redirigir al login después de 2 segundos
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Registro exitoso. Redirigiendo...</p>}
        
        <button type="submit">Registrarse</button>
      </form>

      <p className="login-link" onClick={() => navigate("/login")}>
        ¿Ya tienes cuenta? <span>Inicia sesión aquí</span>
      </p>
    </div>
  );
};

export default Register;
