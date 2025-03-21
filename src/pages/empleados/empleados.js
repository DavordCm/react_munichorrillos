import React, { useState } from "react";
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, Box, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField
} from "@mui/material";
import { ArrowBack, Add } from "@mui/icons-material";
import "../../styles/empleado.css";


const Empleados = () => {
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: "Juan", apellidoPaterno: "Pérez", apellidoMaterno: "Gómez", email: "juan@example.com", telefono: "123456789", direccion: "Calle 123", fechaIngreso: "2024-01-10", activo: true, estadoCivil: "Soltero", nroIdentidad: "12345678", tipoDocumento: "DNI" },
    { id: 2, nombre: "María", apellidoPaterno: "Rodríguez", apellidoMaterno: "Fernández", email: "maria@example.com", telefono: "987654321", direccion: "Avenida 456", fechaIngreso: "2023-07-20", activo: false, estadoCivil: "Casada", nroIdentidad: "87654321", tipoDocumento: "DNI" },
  ]);

  const [open, setOpen] = useState(false);
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

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Abrir modal para agregar o editar
  const handleOpen = (empleado = null) => {
    if (empleado) {
      setEditingEmpleado(empleado);
      setFormData(empleado);
    } else {
      setEditingEmpleado(null);
      setFormData({
        id: empleados.length + 1,
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

  // Guardar nuevo empleado o editar existente
  const handleSave = () => {
    if (editingEmpleado) {
      setEmpleados(
        empleados.map((emp) => (emp.id === editingEmpleado.id ? formData : emp))
      );
    } else {
      setEmpleados([...empleados, formData]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setEmpleados(empleados.filter((empleado) => empleado.id !== id));
  };

  return (
    <div className="empleados-container">
      <Typography variant="h4" gutterBottom className="empleados-header">
        Gestión de Empleados
      </Typography>

      {/* Botones de Añadir y Regresar */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />}
          onClick={() => handleOpen()} // Abre el modal para añadir empleado
        >
          Añadir Empleado
        </Button>

        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => window.history.back()}
        >
          Regresar
        </Button>
      </Box>

      {/* Tabla de empleados */}
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
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell>{empleado.id}</TableCell>
                <TableCell>{empleado.nombre}</TableCell>
                <TableCell>{empleado.apellidoPaterno}</TableCell>
                <TableCell>{empleado.apellidoMaterno}</TableCell>
                <TableCell>{empleado.email}</TableCell>
                <TableCell>{empleado.telefono}</TableCell>
                <TableCell>
                  <Button 
                    color="secondary" 
                    onClick={() => handleOpen(empleado)} // Abre modal para editar
                  >
                    Editar
                  </Button>
                  <Button 
                    color="error" 
                    onClick={() => handleDelete(empleado.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para añadir/editar empleado */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingEmpleado ? "Editar Empleado" : "Añadir Empleado"}</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth margin="dense" label="Nombre" name="nombre" 
            value={formData.nombre} onChange={handleChange} 
          />
          <TextField 
            fullWidth margin="dense" label="Apellido Paterno" name="apellidoPaterno" 
            value={formData.apellidoPaterno} onChange={handleChange} 
          />
          <TextField 
            fullWidth margin="dense" label="Apellido Materno" name="apellidoMaterno" 
            value={formData.apellidoMaterno} onChange={handleChange} 
          />
          <TextField 
            fullWidth margin="dense" label="Email" name="email" 
            value={formData.email} onChange={handleChange} 
          />
          <TextField 
            fullWidth margin="dense" label="Teléfono" name="telefono" 
            value={formData.telefono} onChange={handleChange} 
          />
          <TextField 
            fullWidth margin="dense" label="Dirección" name="direccion" 
            value={formData.direccion} onChange={handleChange} 
          />
          <TextField 
            fullWidth margin="dense" label="Fecha Ingreso" name="fechaIngreso" 
            value={formData.fechaIngreso} onChange={handleChange} type="date"
          />
          <TextField 
            fullWidth margin="dense" label="Número de Identidad" name="nroIdentidad" 
            value={formData.nroIdentidad} onChange={handleChange} 
          />
          <TextField 
            fullWidth margin="dense" label="Tipo de Documento" name="tipoDocumento" 
            value={formData.tipoDocumento} onChange={handleChange} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} color="primary">
            {editingEmpleado ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Empleados;
