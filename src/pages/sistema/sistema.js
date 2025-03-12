import React, { useState } from 'react';
import '../../styles/sistema.css';

const Sistema = () => {
  const [tiposDocumento, setTiposDocumento] = useState([
    { descripcion: 'DNI', numeroIdentificacion: '8' },
    { descripcion: 'RUC', numeroIdentificacion: '10' },
    { descripcion: 'Pasaporte', numeroIdentificacion: '10' },
    { descripcion: 'CE', numeroIdentificacion: '12' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEdicion, setIndiceEdicion] = useState(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    if (modalVisible) {
      setDescripcion('');
      setNumeroIdentificacion('');
      setModoEdicion(false);
      setIndiceEdicion(null);
    }
  };

  const agregarDocumento = () => {
    if (!descripcion || !numeroIdentificacion) return;
    setTiposDocumento([...tiposDocumento, { descripcion, numeroIdentificacion }]);
    toggleModal();
  };

  const eliminarDocumento = (index) => {
    setTiposDocumento(tiposDocumento.filter((_, i) => i !== index));
  };

  const editarDocumento = (index) => {
    const documento = tiposDocumento[index];
    setDescripcion(documento.descripcion);
    setNumeroIdentificacion(documento.numeroIdentificacion);
    setModoEdicion(true);
    setIndiceEdicion(index);
    setModalVisible(true);
  };

  const actualizarDocumento = () => {
    if (!descripcion || !numeroIdentificacion) return;
    const nuevosDocumentos = [...tiposDocumento];
    nuevosDocumentos[indiceEdicion] = { descripcion, numeroIdentificacion };
    setTiposDocumento(nuevosDocumentos);
    toggleModal();
  };

  return (
    <div className="sistema-container">
      <h1>Sistema</h1>
      <div className="tipos-documento-container">
        <h1>Mantenimiento de Tipos de Documento</h1>
        <div className="boton-container">
          <button className="agregar-button" onClick={toggleModal}>
            {modalVisible ? 'Cancelar' : 'Agregar'}
          </button>
          {modalVisible && (
            <div className="modal-lateral">
              <h2>{modoEdicion ? 'Actualizar Documento' : 'Agregar Tipo de Documento'}</h2>
              <label>Descripción:</label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ingrese la descripción"
              />
              <label>Número de Identificación:</label>
              <input
                type="text"
                value={numeroIdentificacion}
                onChange={(e) => setNumeroIdentificacion(e.target.value)}
                placeholder="Ingrese el número"
              />
              <div className="modal-buttons">
                <button onClick={modoEdicion ? actualizarDocumento : agregarDocumento}>
                  {modoEdicion ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </div>
          )}
        </div>
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
                  <button className="actualizar-button" onClick={() => editarDocumento(index)}>Actualizar</button>
                  <button className="eliminar-button" onClick={() => eliminarDocumento(index)}>Eliminar</button>
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
