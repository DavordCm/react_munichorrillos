import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleRegister = () => {
    navigate("/register");
  };

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModalCorreo = () => {
    openModal(
      <div>
        <h3>Recuperación por Correo</h3>
        <input type="email" placeholder="Ingresa tu correo electrónico" className="email-input" />
        <button className="send-button">Enviar Código</button>
      </div>
    );
  };

  const openModalTelefono = () => {
    openModal(
      <div>
        <h3>Recuperación por Teléfono</h3>
        <input type="tel" placeholder="Ingresa tu número de teléfono" className="phone-input" />
        <button className="send-button">Enviar Código</button>
      </div>
    );
  };

  return (
    <div className="login-container">
      <img src="/MuniChorrillos.png" alt="MuniChorrillos Logo" className="logo" />
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />

        <p className="forgot-password" onClick={() => openModal(
          <div>
            <h3>Recuperar Contraseña</h3>
            <p>Elige un método para recuperar tu contraseña:</p>
            <button className="send-button" onClick={openModalCorreo}>Recuperar por Correo</button>
            <button className="send-button" onClick={openModalTelefono}>Recuperar por Teléfono</button>
          </div>
        )}>
          ¿Olvidaste tu contraseña?
        </p>

        <p className="register-link" onClick={handleRegister}>
          ¿No tienes una cuenta? <span>Regístrate</span>
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
          Al iniciar sesión, aceptas nuestros{" "}
          <span className="link" onClick={() => openModal(
            <div>
              <h3>Términos y Condiciones</h3>
              <p>
                Al utilizar esta plataforma, aceptas nuestras condiciones de uso y nuestra política de privacidad.
                Nos reservamos el derecho de actualizar estos términos en cualquier momento.
              </p>
            </div>
          )}>
            Términos y Condiciones
          </span>{" "}
          y nuestra{" "}
          <span className="link" onClick={() => openModal(
            <div>
              <h3>Política de Privacidad</h3>
              <p>
                Tus datos personales serán protegidos conforme a nuestras normas de seguridad.
                No compartiremos tu información sin tu consentimiento.
              </p>
            </div>
          )}>
            Política de Privacidad
          </span>.
        </p>
      </div>

      <Modal show={showModal} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Login;
