import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/gruas.css';

const Gruas = () => {
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([
    {
      placa: 'gr1234',
      marca: 'Ford',
      modelo: 'Ranger',
      numeroMotor: 'default',
      anio: 2023,
      color: 'Blanco',
      estado: 'Activo',
      personalAsignado: 'EdRojas',
      isEditing: false,
    },
    {
      placa: 'gr2345',
      marca: 'dongfeng',
      modelo: 'power',
      numeroMotor: 'default',
      anio: 2024,
      color: 'Blanco',
      estado: 'Activo',
      personalAsignado: 'ElVenao',
      isEditing: false,
    },
  ]);

  const handleAgregar = () => {
    const nuevaPlaca = prompt('Ingrese la placa:');
    if (!nuevaPlaca) return;

    const nuevaMarca = prompt('Ingrese la marca:');
    const nuevoModelo = prompt('Ingrese el modelo:');
    const nuevoNumeroMotor = prompt('Ingrese el número de motor:');
    const nuevoAnio = parseInt(prompt('Ingrese el año:'));
    const nuevoColor = prompt('Ingrese el color:');
    const nuevoEstado = prompt('Ingrese el estado:');
    const nuevoPersonalAsignado = prompt('Ingrese el personal asignado:');

    if (
      !nuevaMarca || !nuevoModelo || !nuevoNumeroMotor || isNaN(nuevoAnio) ||
      !nuevoColor || !nuevoEstado || !nuevoPersonalAsignado
    ) {
      alert("Por favor, ingrese todos los campos correctamente.");
      return;
    }

    const nuevoVehiculo = {
      placa: nuevaPlaca,
      marca: nuevaMarca,
      modelo: nuevoModelo,
      numeroMotor: nuevoNumeroMotor,
      anio: nuevoAnio,
      color: nuevoColor,
      estado: nuevoEstado,
      personalAsignado: nuevoPersonalAsignado,
    };

    setVehiculos([...vehiculos, nuevoVehiculo]);
  };

  const handleActualizar = (placa, campo, valor) => {
    const vehiculoActualizado = vehiculos.map((vehiculo) => {
      if (vehiculo.placa === placa) {
        return {
          ...vehiculo,
          [campo]: valor,
        };
      }
      return vehiculo;
    });
    setVehiculos(vehiculoActualizado);
  };

  const handleEditar = (placa) => {
    const vehiculoActualizado = vehiculos.map((vehiculo) => {
      if (vehiculo.placa === placa) {
        return {
          ...vehiculo,
          isEditing: !vehiculo.isEditing,
        };
      }
      return vehiculo;
    });
    setVehiculos(vehiculoActualizado);
  };

  const handleEliminar = (placa) => {
    const confirmacion = window.confirm(`¿Seguro que desea eliminar el vehículo con placa ${placa}?`);
    if (confirmacion) {
      const vehiculosFiltrados = vehiculos.filter((vehiculo) => vehiculo.placa !== placa);
      setVehiculos(vehiculosFiltrados);
    }
  };

  const handleVolver = () => {
    navigate('/menu');
  };

  return (
    <div className="gruas-container">
      <div className="gruas-header">
        <h1>Mantenimiento de Vehículos Municipales</h1>
        <div className="gruas-buttons">
          <button onClick={handleAgregar} className="add-button">Agregar</button>
          <button onClick={handleVolver} className="back-button">⬅</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Número de Motor</th>
            <th>Año</th>
            <th>Color</th>
            <th>Estado</th>
            <th>Personal Asignado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.placa}>
              <td>
                {vehiculo.isEditing ? (
                  <input type="text" value={vehiculo.placa} onChange={(e) => handleActualizar(vehiculo.placa, 'placa', e.target.value)} />
                ) : (
                  <span>{vehiculo.placa}</span>
                )}
              </td>
              <td>
                {vehiculo.isEditing ? (
                  <input type="text" value={vehiculo.marca} onChange={(e) => handleActualizar(vehiculo.placa, 'marca', e.target.value)} />
                ) : (
                  <span>{vehiculo.marca}</span>
                )}
              </td>
              <td>
                {vehiculo.isEditing ? (
                  <input type="text" value={vehiculo.modelo} onChange={(e) => handleActualizar(vehiculo.placa, 'modelo', e.target.value)} />
                ) : (
                  <span>{vehiculo.modelo}</span>
                )}
              </td>
              <td>
                {vehiculo.isEditing ? (
                  <input type="text" value={vehiculo.numeroMotor} onChange={(e) => handleActualizar(vehiculo.placa, 'numeroMotor', e.target.value)} />
                ) : (
                  <span>{vehiculo.numeroMotor}</span>
                )}
              </td>
              <td>
                {vehiculo.isEditing ? (
                  <select value={vehiculo.anio} onChange={(e) => handleActualizar(vehiculo.placa, 'anio', parseInt(e.target.value))}>
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                  </select>
                ) : (
                  <span>{vehiculo.anio}</span>
                )}
              </td>
              <td>
                {vehiculo.isEditing ? (
                  <select value={vehiculo.color} onChange={(e) => handleActualizar(vehiculo.placa, 'color', e.target.value)}>
                    <option value="Blanco">Blanco</option>
                    <option value="Negro">Negro</option>
                    <option value="Rojo">Rojo</option>
                    <option value="Azul">Azul</option>
                  </select>
                ) : (
                  <span>{vehiculo.color}</span>
                )}
              </td>
              <td>
                {vehiculo.isEditing ? (
                  <select value={vehiculo.estado} onChange={(e) => handleActualizar(vehiculo.placa, 'estado', e.target.value)}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                ) : (
                  <span>{vehiculo.estado}</span>
                )}
              </td>
              <td>
                {vehiculo.isEditing ? (
                  <select value={vehiculo.personalAsignado} onChange={(e) => handleActualizar(vehiculo.placa, 'personalAsignado', e.target.value)}>
                    <option value="EdRojas">EdRojas</option>
                    <option value="ElVenao">ElVenao</option>
                    <option value="Otro">Otro</option>
                  </select>
                ) : (
                  <span>{vehiculo.personalAsignado}</span>
                )}
              </td>
              <td>
                <button onClick={() => handleEditar(vehiculo.placa)}>
                  {vehiculo.isEditing ? 'Guardar' : 'Actualizar'}
                </button>
                <button onClick={() => handleEliminar(vehiculo.placa)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Gruas;