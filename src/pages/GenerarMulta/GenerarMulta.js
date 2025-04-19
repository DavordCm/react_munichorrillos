import React, { useState } from 'react';

const GenerarMulta = () => {
  const [form, setForm] = useState({
    placa: '',
    anio: '',
    motor: '',
    marca: '',
    color: '',
    estado: '',
    modelo: '',
    propietario: '',
    telefono: '',
    direccion: '',
    email: '',
    fiscalizador: '',
    deposito: '',
    grua: '',
    lugar: '',
    distrito: '',
    ordenanza: '',
    descripcion: '',
    observaciones: '',
    monto: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cuerpo = `
Municipalidad de Chorrillos
Nro de Serie: MUL6388066536
Fecha de Infracción: 2025-04-19
Hora: 13:16

--- Información Vehicular ---
Placa: ${form.placa}
Año: ${form.anio}
Motor: ${form.motor}
Marca: ${form.marca}
Color: ${form.color}
Estado: ${form.estado}
Modelo: ${form.modelo}

--- Información del Infractor ---
Propietario: ${form.propietario}
Teléfono: ${form.telefono}
Dirección: ${form.direccion}
Email: ${form.email}

--- Información Municipal ---
Fiscalizador: ${form.fiscalizador}
Depósito: ${form.deposito}
Grúa: ${form.grua}
Lugar: ${form.lugar}
Distrito: ${form.distrito}
Ordenanza: ${form.ordenanza}
Descripción: ${form.descripcion}
Observaciones: ${form.observaciones}

Código de Pago: CP6388066536
Monto a Pagar: S/ ${form.monto}
    `;

    const payload = {
      to: form.email,
      subject: 'Multa Generada - Municipalidad de Chorrillos',
      body: cuerpo
    };

    try {
      const response = await fetch('http://localhost:8080/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error('Error al enviar correo:', error);
      alert('Hubo un error al enviar el correo.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Municipalidad de Chorrillos</h2>
      <p><strong>Nro de Serie:</strong> MUL6388066536</p>
      <p><strong>Fecha de Infracción:</strong> 2025-04-19</p>
      <p><strong>Hora:</strong> 13:16</p>
      
      <form onSubmit={handleSubmit}>
        <h3>Información Vehicular</h3>
        <input name="placa" placeholder="Placa de Rodaje" onChange={handleChange} />
        <input name="anio" placeholder="Año" onChange={handleChange} />
        <input name="motor" placeholder="Número Motor" onChange={handleChange} />
        <input name="marca" placeholder="Marca" onChange={handleChange} />
        <input name="color" placeholder="Color" onChange={handleChange} />
        <input name="estado" placeholder="Estado" onChange={handleChange} />
        <input name="modelo" placeholder="Modelo" onChange={handleChange} />

        <h3>Información del Infractor</h3>
        <input name="propietario" placeholder="Propietario" onChange={handleChange} />
        <input name="telefono" placeholder="Número de Teléfono" onChange={handleChange} />
        <input name="direccion" placeholder="Dirección" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />

        <h3>Información Municipal</h3>
        <select name="fiscalizador" onChange={handleChange}>
          <option value="">Selecciona un Fiscalizador</option>
          <option value="Fiscalizador 1">Fiscalizador 1</option>
          <option value="Fiscalizador 2">Fiscalizador 2</option>
        </select>
        <select name="deposito" onChange={handleChange}>
          <option value="">Selecciona un Depósito</option>
          <option value="Depósito A">Depósito A</option>
          <option value="Depósito B">Depósito B</option>
        </select>
        <select name="grua" onChange={handleChange}>
          <option value="">Selecciona una Grúa</option>
          <option value="Grúa 1">Grúa 1</option>
          <option value="Grúa 2">Grúa 2</option>
        </select>
        <input name="lugar" placeholder="Lugar" onChange={handleChange} />
        <input name="distrito" placeholder="Distrito" onChange={handleChange} />
        <select name="ordenanza" onChange={handleChange}>
          <option value="">Selecciona la Ordenanza</option>
          <option value="Ordenanza 101">Ordenanza 101</option>
          <option value="Ordenanza 202">Ordenanza 202</option>
        </select>
        <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} />
        <textarea name="observaciones" placeholder="Observaciones" onChange={handleChange} />

        <p><strong>Código de Pago:</strong> CP6388066536</p>
        <input name="monto" type="number" placeholder="Monto a Pagar (S/.)" onChange={handleChange} />

        <button type="submit">Generar Multa</button>
      </form>
    </div>
  );
};

export default GenerarMulta;
