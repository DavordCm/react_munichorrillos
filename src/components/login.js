import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
//CAMBIOS DE LOGIN
const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      navigate("/menu");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === "admin" && password === "1234") {
      localStorage.setItem("auth", "true");
      setIsValid(true);
      setTimeout(() => navigate("/menu"), 1000);
    } else {
      setIsValid(false);
    }
  };

  const openModal = (type) => {
    if (type === "recuperar") {
      setModalContent(
        <div>
          <h3>Recuperar Contraseña</h3>
          <input type="email" placeholder="Correo electrónico" className="email-input" />
          <button className="send-button">Enviar</button>
        </div>
      );
    } else if (type === "terminos") {
      setModalContent(
        <div>
          <h3>Términos y Condiciones</h3>
          <p>Aquí irían los términos y condiciones...</p>
        </div>
      );
    } else if (type === "politicas") {
      setModalContent(
        <div>
          <h3>Política de Privacidad</h3>
          <p>Aquí iría la política de privacidad...</p>
        </div>
      );
    }
  };

  return (
    <div className="login-container">
      <img src="/MuniChorrillos.png" alt="MuniChorrillos Logo" className="logo" />
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />

        <p className="forgot-password" onClick={() => openModal("recuperar")}>
          ¿Olvidaste tu contraseña?
        </p>

        <button type="submit">Ingresar</button>
      </form>

      {isValid !== null && (
        <div className={`validation-message ${isValid ? "success" : "error"}`}>
          {isValid ? "✅ Acceso Correcto. Redirigiendo..." : "❌ Usuario o Contraseña Incorrectos"}
        </div>
      )}

      <div className="policy-box">
        <p>
          Al iniciar sesión, aceptas nuestros <span className="link" onClick={() => openModal("terminos")}>Términos y Condiciones</span> y nuestra <span className="link" onClick={() => openModal("politicas")}>Política de Privacidad</span>.
        </p>
      </div>

      {modalContent && (
        <div className="modal-overlay" onClick={() => setModalContent(null)}>
          <div className="modal-content">
            {modalContent}
            <button className="close-button" onClick={() => setModalContent(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;