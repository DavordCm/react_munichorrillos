import React, { useState } from 'react';
import '../../styles/sistema.css';

const Sistema = () => {
  const [tiposDocumento, setTiposDocumento] = useState([
    { descripcion: 'DNI', numeroIdentificacion: '8' },
    { descripcion: 'RUC', numeroIdentificacion: '10' },
    { descripcion: 'Pasaporte', numeroIdentificacion: '10' },
    { descripcion: 'CE', numeroIdentificacion: '12' },
  ]);

  const agregarTipoDocumento = () => {
    const nuevoTipo = { descripcion: 'Carnet de Extranjería', numeroIdentificacion: '12' };
    setTiposDocumento([...tiposDocumento, nuevoTipo]); 
  };

  return (
    <div className="sistema-container">
      <h1>Sistema</h1>
      <div className="tipos-documento-container">
        <h1>Mantenimiento de Tipos de Documento</h1>
        <button className="agregar-button" onClick={agregarTipoDocumento}>
          Agregar
        </button>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Número de Identificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tiposDocumento.map((tipo, index) => (
              <tr key={index}>
                <td>{tipo.descripcion}</td>
                <td>{tipo.numeroIdentificacion}</td>
                <td>
                  <button className="actualizar-button">Actualizar</button>
                  <button className="eliminar-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sistema;
