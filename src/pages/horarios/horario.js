import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/horario.css";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const horas = [
  "12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM",
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
];

const Horario = () => {
  const navigate = useNavigate();
  const [horarios, setHorarios] = useState([
    { id: 1, dia: "Lunes", entrada: "08:00 AM", salida: "05:00 PM", editando: false },
    { id: 2, dia: "Martes", entrada: "08:00 AM", salida: "05:00 PM", editando: false },
    { id: 3, dia: "Miércoles", entrada: "08:00 AM", salida: "05:00 PM", editando: false },
    { id: 4, dia: "Jueves", entrada: "08:00 AM", salida: "05:00 PM", editando: false },
    { id: 5, dia: "Viernes", entrada: "08:00 AM", salida: "05:00 PM", editando: false },
    { id: 6, dia: "Sábado", entrada: "08:00 AM", salida: "05:00 PM", editando: false },
    { id: 7, dia: "Domingo", entrada: "08:00 AM", salida: "05:00 PM", editando: false }
  ]);

  const eliminarHorario = (id) => {
    setHorarios(horarios.filter(h => h.id !== id));
  };

  const editarHorario = (id) => {
    setHorarios(horarios.map(h => h.id === id ? { ...h, editando: !h.editando } : h));
  };

  const actualizarHorario = (id, campo, valor) => {
    setHorarios(horarios.map(h => h.id === id ? { ...h, [campo]: valor } : h));
  };

  const agregarHorario = () => {
    const nuevoId = horarios.length + 1;
    const nuevoDia = diasSemana[nuevoId - 1]; // Asumiendo que el día es consecutivo
    const nuevoHorario = {
      id: nuevoId,
      dia: nuevoDia,
      entrada: "08:00 AM",
      salida: "05:00 PM",
      editando: false
    };
    setHorarios([...horarios, nuevoHorario]);
  };

  return (
    <div className="container">
      <div className="header">
        <button className="btn-flecha" onClick={() => navigate(-1)}>⬅</button>
        <h2>Horario Semanal</h2>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora de Entrada</th>
            <th>Hora de Salida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((h) => (
            <tr key={h.id}>
              <td>{h.dia}</td>
              <td>
                {h.editando ? (
                  <select value={h.entrada} onChange={(e) => actualizarHorario(h.id, "entrada", e.target.value)}>
                    {horas.map((hora) => (
                      <option key={hora} value={hora}>{hora}</option>
                    ))}
                  </select>
                ) : h.entrada}
              </td>
              <td>
                {h.editando ? (
                  <select value={h.salida} onChange={(e) => actualizarHorario(h.id, "salida", e.target.value)}>
                    {horas.map((hora) => (
                      <option key={hora} value={hora}>{hora}</option>
                    ))}
                  </select>
                ) : h.salida}
              </td>
              <td>
                <button className="btn editar" onClick={() => editarHorario(h.id)}>
                  {h.editando ? "Guardar" : "Editar"}
                </button>
                <button className="btn eliminar" onClick={() => eliminarHorario(h.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {horarios.length < 7 && (
        <button className="btn agregar" onClick={agregarHorario}>
          Crear Horario
        </button>
      )}
    </div>
  );
};

export default Horario;
