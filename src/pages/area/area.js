import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../styles/area.css";

const Area = () => {
  const navigate = useNavigate(); // Hook para la navegación

  const [areas, setAreas] = useState([
    { id: 1, nombre: "Cajas" },
    { id: 2, nombre: "Ventas" },
    { id: 3, nombre: "Deposito" },
    { id: 4, nombre: "Deposito" },
    { id: 5, nombre: "Papa" },
  ]);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData({ id: areas.length + 1, nombre: "" });
    setOpen(true);
  };

  const handleEdit = (area) => {
    setEditData(area);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setAreas(areas.filter((area) => area.id !== id));
  };

  const handleSave = () => {
    if (editData.id <= areas.length) {
      setAreas(areas.map((a) => (a.id === editData.id ? editData : a)));
    } else {
      setAreas([...areas, editData]);
    }
    setOpen(false);
  };

  return (
    <div className="container">
      <h2>Mantenimiento de Áreas</h2>
      <div className="header-buttons">
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Agregar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="back-button"
          onClick={() => navigate(-1)} // Regresa a la página anterior
        >
          <ArrowBackIcon />
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>NomArea</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {areas.map((area) => (
              <TableRow key={area.id}>
                <TableCell>{area.id}</TableCell>
                <TableCell>{area.nombre}</TableCell>
                <TableCell>
                  <Button
                    color="info"
                    variant="contained"
                    onClick={() => handleEdit(area)}
                  >
                    Actualizar
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(area.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para agregar/editar área */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editData?.id <= areas.length ? "Actualizar Área" : "Agregar Área"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            value={editData?.nombre || ""}
            onChange={(e) =>
              setEditData({ ...editData, nombre: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Area;
