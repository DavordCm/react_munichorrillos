import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const API_URL = "http://localhost:8080/api/areas"; // URL de la API

const Area = () => {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Obtener áreas desde la API
  const fetchAreas = async () => {
    try {
      const response = await axios.get(API_URL);
      setAreas(response.data);
    } catch (error) {
      console.error("Error al obtener las áreas:", error);
    }
  };

  useEffect(() => {
    fetchAreas(); // Llamada a la API al cargar el componente
  }, []);

  // Manejo de la acción para agregar una nueva área
  const handleAdd = () => {
    setEditData({ id_Area: null, nom_Area: "" });
    setOpen(true);
    document.getElementById("root").setAttribute("inert", "true"); // Activar inert
  };

  // Manejo de la acción para editar una área existente
  const handleEdit = (area) => {
    setEditData({ ...area });
    setOpen(true);
    document.getElementById("root").setAttribute("inert", "true"); // Activar inert
  };

  // Manejo de la acción para eliminar un área
  const handleDelete = async (id_Area) => {
    if (!id_Area) {
      console.error("ID de área no válido");
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/${id_Area}`);
      setAreas(areas.filter((area) => area.id_Area !== id_Area)); // Actualiza la lista de áreas
    } catch (error) {
      console.error("Error al eliminar el área:", error);
    }
  };

  // Manejo de la acción para guardar el área (agregar o actualizar)
  const handleSave = async () => {
    if (!editData?.nom_Area.trim()) {
      alert("El nombre del área no puede estar vacío.");
      return;
    }

    try {
      if (editData.id_Area) {
        // Actualizar área existente
        const response = await axios.put(`${API_URL}/${editData.id_Area}`, editData);
        setAreas(areas.map((a) => (a.id_Area === editData.id_Area ? response.data : a)));
      } else {
        // Agregar nueva área
        const response = await axios.post(API_URL, editData);
        setAreas([...areas, response.data]);
      }
      setOpen(false); // Cerrar el modal después de guardar
      document.getElementById("root").removeAttribute("inert"); // Desactivar inert
    } catch (error) {
      console.error("Error al guardar el área:", error);
    }
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
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </Button>
      </div>

      {/* Tabla de áreas */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre del Área</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {areas.map((area) => (
              <TableRow key={area.id_Area}>
                <TableCell>{area.id_Area}</TableCell>
                <TableCell>{area.nom_Area}</TableCell>
                <TableCell>
                  <Button
                    color="info"
                    variant="contained"
                    onClick={() => handleEdit(area)}
                    style={{ marginRight: "5px" }}
                  >
                    Actualizar
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(area.id_Area)} // Usar id_Area
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
      <Dialog open={open} onClose={() => {setOpen(false); document.getElementById("root").removeAttribute("inert");}}>
        <DialogTitle>
          {editData?.id_Area ? "Actualizar Área" : "Agregar Área"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Área"
            fullWidth
            value={editData?.nom_Area || ""}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, nom_Area: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false); document.getElementById("root").removeAttribute("inert");}}>
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Area;
