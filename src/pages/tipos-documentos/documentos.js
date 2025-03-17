import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Snackbar
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "../../styles/documentos.css";

const Documentos = () => {
  const [documentos, setDocumentos] = useState([
    { id: 1, nombre: "Cajas", numero: 8, animacion: "" },
    { id: 2, nombre: "Ventas", numero: 10, animacion: "" },
    { id: 3, nombre: "Depósito", numero: 10, animacion: "" },
    { id: 4, nombre: "Sistemas", numero: 12, animacion: "" },
    { id: 5, nombre: "Recursos Humanos", numero: 9, animacion: "" }
  ]);

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [eliminado, setEliminado] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate = useNavigate();
  const volverAlMenu = () => navigate("/menu");

  const abrirModalAgregar = () => setMostrarModal(true);
  const cerrarModal = () => {
    setMostrarModal(false);
    setNuevoNombre("");
  };

  const agregarDocumento = () => {
    if (!nuevoNombre.trim()) {
      alert("Por favor, ingresa un nombre válido.");
      return;
    }
    const nuevoDocumento = {
      id: Math.max(...documentos.map((d) => d.id), 0) + 1,
      nombre: nuevoNombre,
      numero: 10,
      animacion: "fila-agregada",
    };
    setDocumentos([...documentos, nuevoDocumento]);
    cerrarModal();
    setTimeout(() => {
      setDocumentos((docs) => docs.map((doc) => ({ ...doc, animacion: "" })));
    }, 1000);
  };

  const habilitarEdicion = (id, nombre) => {
    setEditandoId(id);
    setNombreEditado(nombre);
  };

  const actualizarDocumento = (id) => {
    setDocumentos(documentos.map((doc) =>
      doc.id === id ? { ...doc, nombre: nombreEditado, animacion: "fila-actualizada" } : doc
    ));
    setEditandoId(null);
    setTimeout(() => {
      setDocumentos((docs) => docs.map((doc) => ({ ...doc, animacion: "" })));
    }, 1000);
  };

  const eliminarDocumento = (id) => {
    const docEliminado = documentos.find((doc) => doc.id === id);
    setEliminado(docEliminado);
    setDocumentos(documentos.filter((doc) => doc.id !== id));
    setSnackbarOpen(true);
  };

  const deshacerEliminacion = () => {
    if (eliminado) {
      setDocumentos([...documentos, eliminado].sort((a, b) => a.id - b.id));
      setEliminado(null);
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="documentos-container">
      <div className="btn-retroceso-container">
        <IconButton onClick={volverAlMenu} color="primary">
          <ArrowBackIcon />
        </IconButton>
      </div>

      <h2 className="text-center">Mantenimiento de Áreas</h2>

      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={abrirModalAgregar}
        className="btn-agregar"
      >
        Agregar Área
      </Button>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre del Área</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos.map((doc, index) => (
              <TableRow key={doc.id} className={doc.animacion}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {editandoId === doc.id ? (
                    <TextField
                      value={nombreEditado}
                      onChange={(e) => setNombreEditado(e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  ) : (
                    doc.nombre
                  )}
                </TableCell>
                <TableCell>
                  {editandoId === doc.id ? (
                    <Button variant="contained" color="success" size="small" onClick={() => actualizarDocumento(doc.id)}>
                      Guardar
                    </Button>
                  ) : (
                    <IconButton color="info" onClick={() => habilitarEdicion(doc.id, doc.nombre)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton color="error" onClick={() => eliminarDocumento(doc.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para agregar nueva área */}
      <Dialog open={mostrarModal} onClose={cerrarModal}>
        <DialogTitle>Agregar Nueva Área</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del área"
            type="text"
            fullWidth
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={agregarDocumento} color="success">Agregar</Button>
          <Button onClick={cerrarModal} color="error">Cancelar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert severity="info" action={
          <Button color="inherit" size="small" onClick={deshacerEliminacion}>
            DESHACER
          </Button>
        }>
          Área eliminada
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Documentos;
