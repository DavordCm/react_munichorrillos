import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, Box, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Checkbox, FormControlLabel, CircularProgress
} from "@mui/material";
import { ArrowBack, Add } from "@mui/icons-material";

const Empleados = () => {
  const API_URL = "http://localhost:8080/api/personal";

  const [empleados, setEmpleados] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [empleadoToDelete, setEmpleadoToDelete] = useState(null);
  const [editingEmpleado, setEditingEmpleado] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    telefono: "",
    direccion: "",
    fechaIngreso: "",
    activo: false,
    estadoCivil: "",
    nroIdentidad: "",
    tipoDocumento: ""
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEmpleados = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setEmpleados(response.data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Hubo un error al cargar los empleados.");
      console.error("Error al cargar empleados:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpen = (empleado = null) => {
    if (empleado) {
      setEditingEmpleado(empleado);
      setFormData(empleado);
    } else {
      setEditingEmpleado(null);
      setFormData({
        id: "",
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        email: "",
        telefono: "",
        direccion: "",
        fechaIngreso: "",
        activo: false,
        estadoCivil: "",
        nroIdentidad: "",
        tipoDocumento: ""
      });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      if (editingEmpleado) {
        await axios.put(`${API_URL}/${formData.id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setOpen(false);
      fetchEmpleados();
    } catch (error) {
      console.error("Error al guardar:", error);
      setErrorMessage("Hubo un error al guardar los datos.");
    }
  };

  const validateForm = () => {
    if (!formData.nombre || !formData.apellidoPaterno) {
      alert("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return false;
    }
    return true;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEmpleados();
    } catch (error) {
      console.error("Error al eliminar:", error);
      setErrorMessage("Hubo un error al eliminar el empleado.");
    }
  };

  const handleDeleteConfirm = (empleadoId) => {
    setEmpleadoToDelete(empleadoId);
    setOpenConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (empleadoToDelete) {
      await handleDelete(empleadoToDelete);
      setEmpleadoToDelete(null);
      setOpenConfirmDelete(false);
    }
  };

  return (
    <div className="empleados-container">
      <Typography variant="h4" gutterBottom>
        Gestión de Empleados
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
          Añadir Empleado
        </Button>
        <Button startIcon={<ArrowBack />} onClick={() => window.history.back()}>
          Regresar
        </Button>
      </Box>

      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido Paterno</TableCell>
                <TableCell>Apellido Materno</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Estado Civil</TableCell>
                <TableCell>Activo</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {empleados.map((empleado) => (
    <TableRow key={empleado.id_Empleado.id_Empleado}> {/* Asegúrate de usar el ID correcto */}
      <TableCell>{empleado.id_Empleado.id_Empleado}</TableCell> {/* Usando el ID correcto */}
      <TableCell>{empleado.id_Empleado.nom_Empleado}</TableCell>
      <TableCell>{empleado.id_Empleado.apellidoP}</TableCell>
      <TableCell>{empleado.id_Empleado.apellidoM}</TableCell>
      <TableCell>{empleado.id_Empleado.email}</TableCell>
      <TableCell>{empleado.id_Empleado.telefono}</TableCell>
      <TableCell>{empleado.id_Empleado.estadoCivil}</TableCell>
      <TableCell>{empleado.id_Empleado.activo ? "Sí" : "No"}</TableCell>
      <TableCell>
        <Button color="secondary" onClick={() => handleOpen(empleado)}>
          Editar
        </Button>
        <Button color="error" onClick={() => handleDeleteConfirm(empleado.id_Empleado.id_Empleado)}>
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingEmpleado ? "Editar Empleado" : "Añadir Empleado"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Apellido Paterno" name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Apellido Materno" name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Email" name="email" value={formData.email} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Fecha Ingreso" name="fechaIngreso" type="date" InputLabelProps={{ shrink: true }} value={formData.fechaIngreso} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Número de Identidad" name="nroIdentidad" value={formData.nroIdentidad} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Tipo de Documento" name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Estado Civil" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} />
          <FormControlLabel
            control={<Checkbox checked={formData.activo} onChange={(e) => setFormData({ ...formData, activo: e.target.checked })} name="activo" />}
            label="¿Activo?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} color="primary">
            {editingEmpleado ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que quieres eliminar este empleado?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Empleados;
