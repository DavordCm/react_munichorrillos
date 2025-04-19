import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/horario.css";

// Lista de días con sus claves del backend
const dias = [
  { etiqueta: "Lunes", clave: "lunes" },
  { etiqueta: "Martes", clave: "martes" },
  { etiqueta: "Miércoles", clave: "miercoles" },
  { etiqueta: "Jueves", clave: "jueves" },
  { etiqueta: "Viernes", clave: "viernes" },
  { etiqueta: "Sábado", clave: "sabado" },
  { etiqueta: "Domingo", clave: "domingo" },
];

const Horario = () => {
  const [horarios, setHorarios] = useState([]);
  const [horarioEdicion, setHorarioEdicion] = useState(null); // Estado para almacenar el horario a editar
  const navigate = useNavigate();

  const transformarDatos = (data) => {
    return data.map(h => {
      const diasTrabajados = dias.filter(d => h[d.clave] === 1).map(d => d.etiqueta);

      return {
        id: h.id_Horario,
        diasTrabajados,
        entrada: h.hingreso,
        salida: h.hsalida,
        empleado: h.id_Empleado.nom_Empleado,
        area: h.id_Area.nom_Area
      };
    });
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/horarios")
      .then(response => {
        const datosTransformados = transformarDatos(response.data);
        setHorarios(datosTransformados);
      })
      .catch(error => {
        console.error("Error al obtener los horarios:", error);
      });
  }, []);

  const eliminar = (id) => {
    setHorarios(horarios.filter(h => h.id !== id));
  };

  const editar = (id) => {
    const horario = horarios.find(h => h.id === id);
    setHorarioEdicion(horario); // Establecemos los datos del horario a editar
  };

  const actualizarHorario = async () => {
    try {
      await axios.put(`http://localhost:8080/api/horarios/${horarioEdicion.id}`, horarioEdicion);
      alert('Horario actualizado exitosamente');
      setHorarioEdicion(null); // Limpiar el estado de edición
      navigate("/horarios"); // Redirigir a la lista de horarios o la ruta deseada
    } catch (error) {
      console.error("Error al actualizar el horario:", error);
      alert("Hubo un error al actualizar el horario. Intenta nuevamente.");
    }
  };

  const regresar = () => {
    navigate("/menu");
  };

  return (
    <div className="horario-container">
      <div className="header-horario">
        <button className="btn regresar" onClick={regresar}>⬅ Regresar</button>
      </div>

      {horarioEdicion ? (
        <div className="editar-horario">
          <h3>Editar Horario</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Entrada:</label>
              <input
                type="time"
                value={horarioEdicion.entrada}
                onChange={(e) => setHorarioEdicion({ ...horarioEdicion, entrada: e.target.value })}
              />
            </div>
            <div>
              <label>Salida:</label>
              <input
                type="time"
                value={horarioEdicion.salida}
                onChange={(e) => setHorarioEdicion({ ...horarioEdicion, salida: e.target.value })}
              />
            </div>
            <div>
              <label>Días Trabajados:</label>
              <select
                multiple
                value={horarioEdicion.diasTrabajados}
                onChange={(e) => {
                  const selectedDays = Array.from(e.target.selectedOptions, option => option.value);
                  setHorarioEdicion({ ...horarioEdicion, diasTrabajados: selectedDays });
                }}
              >
                {dias.map(dia => (
                  <option key={dia.clave} value={dia.etiqueta}>
                    {dia.etiqueta}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={actualizarHorario}>Actualizar</button>
            <button onClick={() => setHorarioEdicion(null)}>Cancelar</button>
          </form>
        </div>
      ) : (
        <table className="horario-tabla">
          <thead>
            <tr>
              {dias.map((dia) => (
                <th key={dia.etiqueta}>{dia.etiqueta.toUpperCase()}</th>
              ))}
              <th>ENTRADA</th>
              <th>SALIDA</th>
              <th>EMPLEADO</th>
              <th>ÁREA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((h) => (
              <tr key={h.id}>
                {dias.map((dia) => (
                  <td key={dia.etiqueta}>
                    <div className={`circulo ${h.diasTrabajados.includes(dia.etiqueta) ? "activo" : ""}`}>
                      {dia.etiqueta.charAt(0)}
                    </div>
                    <div className="nombre-dia">{dia.etiqueta}</div>
                  </td>
                ))}
                <td className="hora">{h.entrada}</td>
                <td className="hora">{h.salida}</td>
                <td>{h.empleado}</td>
                <td>{h.area}</td>
                <td>
                  <button className="btn editar" onClick={() => editar(h.id)}>✏ Editar</button>
                  <button className="btn eliminar" onClick={() => eliminar(h.id)}>🗑 Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Horario;
