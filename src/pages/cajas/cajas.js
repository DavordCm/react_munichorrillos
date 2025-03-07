import React, { useState, useEffect } from 'react';
import '../../styles/cajas.css'; // Asegúrate de crear este archivo CSS

const Cajas = () => {
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    const datosDeEjemplo = [
      { id: 1, fecha: '2024-07-20', monto: 100.00, tipo: 'Pago' },
      { id: 2, fecha: '2024-07-21', monto: 50.00, tipo: 'Reembolso' },
    ];
    setTransacciones(datosDeEjemplo);
  }, []);

  return (
    <div className="cajas-container">
      <h1>Gestión de Cajas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map((transaccion) => (
            <tr key={transaccion.id}>
              <td>{transaccion.id}</td>
              <td>{transaccion.fecha}</td>
              <td>{transaccion.monto}</td>
              <td>{transaccion.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Aquí puedes agregar formularios, botones u otros elementos */}
    </div>
  );
};

export default Cajas;