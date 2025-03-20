import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../../styles/infracciones.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
  borderBottom: "2px solid #ddd",
}));

const Infracciones = () => {
  const navigate = useNavigate();

  const [infracciones, setInfracciones] = useState([
    { id: 1, ordenanza: "mul033", descripcion: "ad", resolucion: "sad", rango: "d", monto: "1" },
  ]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({ ordenanza: "", descripcion: "", resolucion: "", rango: "", monto: "" });
  const [editData, setEditData] = useState(null);

  // Manejo de formularios
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Agregar infracción
  const handleAgregar = () => {
    const nuevaId = infracciones.length + 1;
    const nuevaInfraccion = { id: nuevaId, ...formData };
    setInfracciones([...infracciones, nuevaInfraccion]);
    setOpen(false);
    setFormData({ ordenanza: "", descripcion: "", resolucion: "", rango: "", monto: "" });
  };

  // Abrir formulario de edición
  const handleEditar = (infraccion) => {
    setEditData(infraccion);
    setEditOpen(true);
  };

  // Guardar cambios de edición
  const handleGuardarEdicion = () => {
    setInfracciones(
      infracciones.map((inf) => (inf.id === editData.id ? editData : inf))
    );
    setEditOpen(false);
    setEditData(null);
  };

  // Eliminar infracción
  const handleEliminar = (id) => {
    setInfracciones(infracciones.filter((inf) => inf.id !== id));
  };

  return (
    <div className="infracciones-container">
      <div className="header">
        <h2>Mantenimiento de Ordenanzas Municipales</h2>
        <IconButton className="back-button" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      </div>

      <div className="button-group">
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Agregar
        </Button>
      </div>

      <TableContainer component={Paper} className="tabla-container">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Ordenanza</StyledTableCell>
              <StyledTableCell>Descripcion</StyledTableCell>
              <StyledTableCell>Resolucion</StyledTableCell>
              <StyledTableCell>Rango</StyledTableCell>
              <StyledTableCell>Monto</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {infracciones.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.ordenanza}</TableCell>
                <TableCell>{row.descripcion}</TableCell>
                <TableCell>{row.resolucion}</TableCell>
                <TableCell>{row.rango}</TableCell>
                <TableCell>{row.monto}</TableCell>
                <TableCell>
                  <Button variant="contained" color="info" onClick={() => handleEditar(row)}>
                    Actualizar
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleEliminar(row.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para agregar infracción */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Infracción</DialogTitle>
        <DialogContent>
          <TextField label="Ordenanza" name="ordenanza" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Descripción" name="descripcion" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Resolución" name="resolucion" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Rango" name="rango" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Monto" name="monto" fullWidth margin="dense" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleAgregar} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para editar infracción */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Infracción</DialogTitle>
        <DialogContent>
          {editData && (
            <>
              <TextField label="Ordenanza" value={editData.ordenanza} fullWidth margin="dense"
                onChange={(e) => setEditData({ ...editData, ordenanza: e.target.value })} />
              <TextField label="Descripción" value={editData.descripcion} fullWidth margin="dense"
                onChange={(e) => setEditData({ ...editData, descripcion: e.target.value })} />
              <TextField label="Resolución" value={editData.resolucion} fullWidth margin="dense"
                onChange={(e) => setEditData({ ...editData, resolucion: e.target.value })} />
              <TextField label="Rango" value={editData.rango} fullWidth margin="dense"
                onChange={(e) => setEditData({ ...editData, rango: e.target.value })} />
              <TextField label="Monto" value={editData.monto} fullWidth margin="dense"
                onChange={(e) => setEditData({ ...editData, monto: e.target.value })} />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button onClick={handleGuardarEdicion} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Infracciones;
