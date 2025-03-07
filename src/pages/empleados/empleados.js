import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/empleado.css';

const Empleados = () => {
  const navigate = useNavigate();
  const [empleados, setEmpleados] = useState([
    {
      nombre: 'Adrian',
      apellidoPaterno: 'Rojas',
      apellidoMaterno: 'Zevallos',
      email: 'adrianrojas100@gmail.com',
      telefono: '982234770',
      direccion: 'Villa El salvador',
      fechaIngreso: '20/07/2024 00:00:00',
      estadoCivil: 'Soltero',
      nroIdentidad: '70311575',
      tipoDocumento: 'DN',
      isEditing: false,
    },
    {
      nombre: 'Joaquin',
      apellidoPaterno: 'Rojas',
      apellidoMaterno: 'Zevallos',
      email: 'Joaquim@hotmail.com',
      telefono: '924279112',
      direccion: 'Villa El salvador',
      fechaIngreso: '21/07/2024 00:00:00',
      estadoCivil: 'Casado',
      nroIdentidad: '1586138',
      tipoDocumento: 'DN',
      isEditing: false,
    },
  ]);

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    direccion: '',
    fechaIngreso: '',
    estadoCivil: 'Soltero',
    nroIdentidad: '',
    tipoDocumento: 'DN',
  });

  const [showForm, setShowForm] = useState(false);

  const handleAgregarEmpleado = () => { // Agregar nuevo empleado al estado
    setEmpleados([...empleados, { ...nuevoEmpleado, isEditing: false }]);
    setNuevoEmpleado({
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      email: '',
      telefono: '',
      direccion: '',
      fechaIngreso: '',
      estadoCivil: 'Soltero',
      nroIdentidad: '',
      tipoDocumento: 'DN',
    });
    setShowForm(false);
  };

  const handleActualizarEmpleado = (index, campo, valor) => {
    const empleadosActualizados = empleados.map((empleado, i) => {
      if (i === index) {
        return { ...empleado, [campo]: valor };
      }
      return empleado;
    });
    setEmpleados(empleadosActualizados);
  };

  const handleEditarEmpleado = (index) => {
    const empleadosActualizados = empleados.map((empleado, i) => {
      if (i === index) {
        return { ...empleado, isEditing: !empleado.isEditing };
      }
      return empleado;
    });
    setEmpleados(empleadosActualizados);
  };

  const handleEliminarEmpleado = (index) => {
    const empleadosActualizados = empleados.filter((_, i) => i !== index);
    setEmpleados(empleadosActualizados);
  };

  const handleVolver = () => {
    navigate('/menu');

  };
  return (
    <div className="empleados-container">
      <div className="empleados-header">
        <h1>Gestión de Empleados</h1>
        <div className="empleados-buttons">
          <button className="back-button" onClick={handleVolver}>
            &#8592;
          </button>
          <button className="add-empleado-button" onClick={() => setShowForm(true)}>
            Agregar Empleado
          </button>
        </div>
      </div>
      {showForm && (
        <div className="nuevo-empleado-form">
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoEmpleado.nombre}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Apellido Paterno"
            value={nuevoEmpleado.apellidoPaterno}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, apellidoPaterno: e.target.value })}
          />
          <input
            type="text"
            placeholder="Apellido Materno"
            value={nuevoEmpleado.apellidoMaterno}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, apellidoMaterno: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={nuevoEmpleado.email}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={nuevoEmpleado.telefono}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, telefono: e.target.value })}
          />
          <input
            type="text"
            placeholder="Dirección"
            value={nuevoEmpleado.direccion}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, direccion: e.target.value })}
          />
          <input
            type="datetime-local"
            value={nuevoEmpleado.fechaIngreso}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, fechaIngreso: e.target.value })}
          />
          <select
            value={nuevoEmpleado.estadoCivil}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, estadoCivil: e.target.value })}
          >
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
          </select>
          <input
            type="text"
            placeholder="Nro de Identidad"
            value={nuevoEmpleado.nroIdentidad}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nroIdentidad: e.target.value })}
          />
          <select
            value={nuevoEmpleado.tipoDocumento}
            onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, tipoDocumento: e.target.value })}
          >
            <option value="DN">DN</option>
            <option value="CE">CE</option>
          </select>
          <button onClick={handleAgregarEmpleado}>Agregar</button>
          <button onClick={() => setShowForm(false)}>Cancelar</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Fecha de Ingreso</th>
            <th>Estado Civil</th>
            <th>Nro de Identidad</th>
            <th>Tipo de Documento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado, index) => (
            <tr key={index}>
              <td>
                {empleado.isEditing ? (
                  <input
                    type="text"
                    value={empleado.nombre}
                    onChange={(e) => handleActualizarEmpleado(index, 'nombre', e.target.value)}
                  />
                ) : (
                  empleado.nombre
                )}
              </td>
              <td>
                {empleado.isEditing ? (
                  <input
                    type="text"
                    value={empleado.apellidoPaterno}
                    onChange={(e) => handleActualizarEmpleado(index, 'apellidoPaterno', e.target.value)}
                  />
                ) : (
                  empleado.apellidoPaterno
                )}
              </td>
              <td>
                {empleado.isEditing ? (
                  <input
                    type="text"
                    value={empleado.apellidoMaterno}
                    onChange={(e) => handleActualizarEmpleado(index, 'apellidoMaterno', e.target.value)}
                  />
                ) : (
                  empleado.apellidoMaterno
                )}
              </td>
              <td>
                {empleado.isEditing ? (
                  <input
                    type="email"
                    value={empleado.email}
                    onChange={(e) => handleActualizarEmpleado(index, 'email', e.target.value)}
                  />
                ) : (
                  empleado.email
                )}
              </td>
              <td>
                {empleado.isEditing ? (
                  <input
                    type="tel"
                    value={empleado.telefono}
                    onChange={(e) => handleActualizarEmpleado(index, 'telefono', e.target.value)}
                  />
                ) : (
                  empleado.telefono
                )}
              </td>
              <td>
                {empleado.isEditing ? (
                  <input
                    type="text"
                    value={empleado.direccion}
                    onChange={(e) => handleActualizarEmpleado(index, 'direccion', e.target.value)}
                  />
                ) : (
                  empleado.direccion
                )}
              </td>
              <td>
                {empleado.isEditing ? (
                  <input
                    type="datetime-local"
                    value={empleado.fechaIngreso}
                    onChange={(e) => handleActualizarEmpleado(index, 'fechaIngreso', e.target.value)}
                  />
                ) : (
                  empleado.fechaIngreso
                )}
              </td>
              <td>
                {empleado.isEditing ? (
                  <select
                    value={empleado.estadoCivil}
                    onChange={(e) => handleActualizarEmpleado(index, 'estadoCivil', e.target.value)}
                  >
                    <option value="Soltero">Soltero</option>
                    <option value="Casado">Casado</option>
                  </select>
                ) : (
                  empleado.estadoCivil
                )}
              </td>
              <td>
                {empleado.isEditing ? (
                  <input
                    type="text"
                    value={empleado.nroIdentidad}
                    onChange={(e) => handleActualizarEmpleado(index, 'nroIdentidad', e.target.value)}
                  />
                ) : (
                  empleado.nroIdentidad
                )}
              </td>
              <td>
                {empleado.isEditing ? (
                  <select
                    value={empleado.tipoDocumento}
                    onChange={(e) => handleActualizarEmpleado(index, 'tipoDocumento', e.target.value)}
                  >
                    <option value="DN">DN</option>
                    <option value="CE">CE</option>
                  </select>
                ) : (
                  empleado.tipoDocumento
                )}
              </td>
              <td>
                <button onClick={() => handleEditarEmpleado(index)}>
                  {empleado.isEditing ? 'Guardar' : 'Editar'}
                </button>
                <button onClick={() => handleEliminarEmpleado(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empleados;
