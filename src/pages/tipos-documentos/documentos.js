import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/TiposDocumentos.css";

const TiposDocumentos = () => {
  const [tipos, setTipos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/api/tipodoc")
      .then((res) => res.json())
      .then((data) => setTipos(data))
      .catch((error) => console.error("Error cargando tipos de documento:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Tipos de Documentos</h1>

      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Número Identificación</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((doc) => (
            <tr key={doc.idTipoDoc}>
              <td>{doc.idTipoDoc}</td>
              <td>{doc.descripcion}</td>
              <td>{doc.num_Identifica}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Retroceder
      </button>
    </div>
  );
};

export default TiposDocumentos;
