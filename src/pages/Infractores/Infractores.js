import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/infractores.css';

const Infractores = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/usuarios/")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error al obtener usuarios:", error));
  }, []);

  const volverAMenu = () => {
    navigate("/menu");
  };

  return (
    <div className="contenedor">
      <h3>Mantenimiento de Usuarios</h3>

      <div className="botones-superiores">
        <button className="agregar">Agregar</button>
        <button className="volver" onClick={volverAMenu}>
          ←
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, i) => (
            <tr key={i}>
              <td>{usuario.nombreU}</td>
              <td>{usuario.apellidoU}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.email}</td>
              <td>{usuario.contraseña ? "******" : "Sin contraseña"}</td>
              <td>
                <button className="btn-actualizar">Actualizar</button>
                <button className="btn-eliminar">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Infractores;
