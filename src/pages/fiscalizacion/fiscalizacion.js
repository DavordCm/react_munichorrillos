import React from 'react';
import '../../styles/formularioFiscalizacion.css';

const FormularioFiscalizacion = () => {
  return (
    <div className="formulario-fiscalizacion">
      <h2>Información Vehicular</h2>
      <div className="form-group">
        <label htmlFor="nroRodaje">Nro. de Rodaje:</label>
        <input type="text" id="nroRodaje" />
      </div>
      <div className="form-group">
        <label htmlFor="nroMotor">Nro. de Motor:</label>
        <input type="text" id="nroMotor" />
      </div>
      <div className="form-group">
        <label htmlFor="marca">Marca:</label>
        <input type="text" id="marca" />
      </div>
      <div className="form-group">
        <label htmlFor="color">Color:</label>
        <input type="text" id="color" />
      </div>
      <div className="form-group">
        <label htmlFor="placa">Placa:</label>
        <input type="text" id="placa" />
      </div>
      <div className="form-group">
        <label htmlFor="modelo">Modelo:</label>
        <input type="text" id="modelo" />
      </div>

      <h2>Información del Infractor</h2>
      <div className="form-group">
        <label htmlFor="dni">DNI:</label>
        <input type="text" id="dni" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" />
      </div>
      <div className="form-group">
        <label htmlFor="direccion">Dirección:</label>
        <input type="text" id="direccion" />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <input type="tel" id="telefono" />
      </div>

      <h2>Información Municipal</h2>
      <div className="form-group">
        <label htmlFor="lugar">Lugar:</label>
        <input type="text" id="lugar" />
      </div>
      <div className="form-group">
        <label htmlFor="fecha">Fecha:</label>
        <input type="date" id="fecha" />
      </div>
      <div className="form-group">
        <label htmlFor="hora">Hora:</label>
        <input type="time" id="hora" />
      </div>
      <div className="form-group">
        <label htmlFor="tipoOrdenanza">Tipo de Ordenanza:</label>
        <select id="tipoOrdenanza">
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          {/* Agrega más opciones */}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea id="descripcion" rows="4"></textarea>
      </div>

      <h2>Observaciones</h2>
      <div className="form-group">
        <textarea id="observaciones" rows="4"></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="codigoPago">Código de Pago:</label>
        <input type="text" id="codigoPago" />
      </div>
      <div className="form-group">
        <label htmlFor="montoPago">Monto a Pagar (S/):</label>
        <input type="number" id="montoPago" />
      </div>

      <button type="submit">Generar Multa</button>
    </div>
  );
};

export default FormularioFiscalizacion;