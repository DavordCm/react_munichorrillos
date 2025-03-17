import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "../../styles/personalAdm.css";

const PersonalAdm = () => {
  const [personal, setPersonal] = useState([
    { id: 1, empleado: "Juan Pérez", area: "Sistemas", usuario: "jperez", contraseña: "1234" },
    { id: 2, empleado: "Ana Gómez", area: "Recursos Humanos", usuario: "agomez", contraseña: "5678" },
    { id: 3, empleado: "Carlos Ruiz", area: "Ventas", usuario: "cruiz", contraseña: "abcd" }
  ]);

  const [empleadoActual, setEmpleadoActual] = useState(null);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ empleado: "", area: "", usuario: "", contraseña: "" });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const abrirModalAgregar = () => {
    setEmpleadoActual(null);
    setNuevoEmpleado({ empleado: "", area: "", usuario: "", contraseña: "" });
    setMostrarModal(true);
  };

  const abrirModalEditar = (persona) => {
    setEmpleadoActual(persona);
    setNuevoEmpleado(persona);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setNuevoEmpleado({ empleado: "", area: "", usuario: "", contraseña: "" });
  };

  const manejarCambio = (e) => {
    setNuevoEmpleado({ ...nuevoEmpleado, [e.target.name]: e.target.value });
  };

  const manejarGuardado = () => {
    if (!nuevoEmpleado.empleado || !nuevoEmpleado.area || !nuevoEmpleado.usuario || !nuevoEmpleado.contraseña) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (empleadoActual) {
      setPersonal(personal.map((p) => (p.id === empleadoActual.id ? nuevoEmpleado : p)));
      setSnackbar({ open: true, message: "Empleado actualizado con éxito", severity: "info" });
    } else {
      setPersonal([...personal, { id: personal.length + 1, ...nuevoEmpleado }]);
      setSnackbar({ open: true, message: "Empleado agregado con éxito", severity: "success" });
    }
    cerrarModal();
  };

  const manejarEliminar = (id) => {
    setPersonal(personal.filter((p) => p.id !== id));
    setSnackbar({ open: true, message: "Empleado eliminado con éxito", severity: "error" });
  };

  return (
    <div className="personal-container">
      <h2 className="text-center">Mantenimiento de Personal Administrativo</h2>

      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={abrirModalAgregar}
        className="btn-agregar"
      >
        Agregar Personal
      </Button>

      <TableContainer component={Paper} className="table-container">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Empleado</TableCell>
              <TableCell>Área</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Contraseña</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personal.map((persona) => (
              <TableRow key={persona.id}>
                <TableCell>{persona.empleado}</TableCell>
                <TableCell>{persona.area}</TableCell>
                <TableCell>{persona.usuario}</TableCell>
                <TableCell>{persona.contraseña}</TableCell>
                <TableCell>
                  <IconButton color="info" onClick={() => abrirModalEditar(persona)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => manejarEliminar(persona.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para agregar/editar personal */}
      <Dialog open={mostrarModal} onClose={cerrarModal}>
        <DialogTitle>{empleadoActual ? "Editar Personal" : "Agregar Nuevo Personal"}</DialogTitle>
        <DialogContent>
          <TextField label="Empleado" fullWidth margin="dense" name="empleado" value={nuevoEmpleado.empleado} onChange={manejarCambio} />
          <TextField label="Área" fullWidth margin="dense" name="area" value={nuevoEmpleado.area} onChange={manejarCambio} />
          <TextField label="Usuario" fullWidth margin="dense" name="usuario" value={nuevoEmpleado.usuario} onChange={manejarCambio} />
          <TextField label="Contraseña" fullWidth margin="dense" type="password" name="contraseña" value={nuevoEmpleado.contraseña} onChange={manejarCambio} />
        </DialogContent>
        <DialogActions>
          <Button onClick={manejarGuardado} color="success">{empleadoActual ? "Actualizar" : "Agregar"}</Button>
          <Button onClick={cerrarModal} color="error">Cancelar</Button>
        </DialogActions>
      </Dialog>

      {/* Notificación */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <MuiAlert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default PersonalAdm;