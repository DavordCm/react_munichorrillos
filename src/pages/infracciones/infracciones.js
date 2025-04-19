import React, { useEffect, useState } from "react";
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
import axios from "axios";
import "../../styles/infracciones.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
  borderBottom: "2px solid #ddd",
}));

const Infracciones = () => {
  const navigate = useNavigate();
  const [infracciones, setInfracciones] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({ nom_Infraccion: "", descripcion: "", resolucion: "", rango: "", monto: "" });
  const [editData, setEditData] = useState(null);

  const API_URL = "http://localhost:8080/api/infracciones";

  // Cargar infracciones
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setInfracciones(res.data))
      .catch(err => console.error("Error al cargar las infracciones:", err));
  }, []);

  // Manejo de formularios
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Agregar infracción
  const handleAgregar = () => {
    axios.post(API_URL, formData)
      .then(res => {
        setInfracciones([...infracciones, res.data]);
        setOpen(false);
        setFormData({ nom_Infraccion: "", descripcion: "", resolucion: "", rango: "", monto: "" });
      })
      .catch(err => console.error("Error al agregar:", err));
  };

  // Abrir formulario de edición
  const handleEditar = (infraccion) => {
    setEditData({ ...infraccion }); // Clonamos para editar
    setEditOpen(true);
  };

  // Guardar edición
  const handleGuardarEdicion = () => {
    axios.put(`${API_URL}/${editData.id_Infraccion}`, editData)
      .then(() => {
        setInfracciones(infracciones.map(inf => inf.id_Infraccion === editData.id_Infraccion ? editData : inf));
        setEditOpen(false);
        setEditData(null);
      })
      .catch(err => console.error("Error al editar:", err));
  };

  // Eliminar infracción
  const handleEliminar = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setInfracciones(infracciones.filter(inf => inf.id_Infraccion !== id));
      })
      .catch(err => console.error("Error al eliminar:", err));
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
              <StyledTableCell>Descripción</StyledTableCell>
              <StyledTableCell>Resolución</StyledTableCell>
              <StyledTableCell>Rango</StyledTableCell>
              <StyledTableCell>Monto</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {infracciones.map((row) => (
              <TableRow key={row.id_Infraccion}>
                <TableCell>{row.id_Infraccion}</TableCell>
                <TableCell>{row.nom_Infraccion}</TableCell>
                <TableCell>{row.descripcion}</TableCell>
                <TableCell>{row.resolucion}</TableCell>
                <TableCell>{row.rango}</TableCell>
                <TableCell>S/ {row.monto}</TableCell>
                <TableCell>
                  <Button variant="contained" color="info" onClick={() => handleEditar(row)}>
                    Actualizar
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleEliminar(row.id_Infraccion)}>
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
          <TextField label="Ordenanza" name="nom_Infraccion" fullWidth margin="dense" onChange={handleChange} />
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
              <TextField label="Ordenanza" value={editData.nom_Infraccion} fullWidth margin="dense"
                onChange={(e) => setEditData({ ...editData, nom_Infraccion: e.target.value })} />
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
