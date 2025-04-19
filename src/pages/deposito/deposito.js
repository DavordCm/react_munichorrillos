import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import "../../styles/deposito.css";

function Deposito() {
  const [depositos, setDepositos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [depositoEdit, setDepositoEdit] = useState({
    id_Deposito: "",
    nomDeposito: "",
    direccion: ""
  });

  // Obtener depósitos
  useEffect(() => {
    fetchDepositos();
  }, []);

  const fetchDepositos = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/depositos")
      .then((response) => {
        setDepositos(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al obtener los depósitos");
        setLoading(false);
      });
  };

  // Eliminar
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este depósito?")) {
      axios
        .delete(`http://localhost:8080/api/depositos/${id}`)
        .then(() => {
          fetchDepositos(); // recargar lista
        })
        .catch(() => alert("Error al eliminar el depósito"));
    }
  };

  // Abrir diálogo de edición
  const handleEditOpen = (deposito) => {
    setDepositoEdit({
      id_Deposito: deposito.id_Deposito,
      nomDeposito: deposito.nomDeposito,
      direccion: deposito.direccion,
    });
    setOpenEdit(true);
  };

  // Guardar cambios
  const handleEditSave = () => {
    axios
      .put(`http://localhost:8080/api/depositos/${depositoEdit.id_Deposito}`, depositoEdit)
      .then(() => {
        setOpenEdit(false);
        fetchDepositos(); // recargar lista
      })
      .catch(() => alert("Error al actualizar el depósito"));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <Typography variant="body1">Cargando depósitos...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="contenedor-deposito">
      <Typography variant="h4" className="titulo">
        Depósito <span className="adm">ADM</span>
      </Typography>
      <Typography variant="body1" className="descripcion">
        Sección dedicada al depósito administrativo.
      </Typography>
      <TableContainer component={Paper} className="tabla-container">
        <Table>
          <TableHead>
            <TableRow className="tabla-header">
              <TableCell>ID Empleado</TableCell>
              <TableCell>Nombre del Empleado</TableCell>
              <TableCell>Dirección del Empleado</TableCell>
              <TableCell>Fecha de Ingreso</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Nombre del Depósito</TableCell>
              <TableCell>Dirección del Depósito</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {depositos.map((deposito) => {
              const empleado = deposito?.id_Personal?.id_Empleado;
              const tipoDoc = empleado?.idTipoDoc;

              return (
                <TableRow key={deposito.id_Deposito} className="tabla-row">
                  <TableCell>{empleado?.id_Empleado || "N/A"}</TableCell>
                  <TableCell>{empleado?.nom_Empleado || "No asignado"}</TableCell>
                  <TableCell>{empleado?.direccion || "N/A"}</TableCell>
                  <TableCell>{empleado?.fechaIngreso || "N/A"}</TableCell>
                  <TableCell>
                    {tipoDoc?.descripcion || "N/A"} - {empleado?.nroIdentidad || "N/A"}
                  </TableCell>
                  <TableCell>{deposito.nomDeposito || "N/A"}</TableCell>
                  <TableCell>{deposito.direccion || "N/A"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginRight: 8 }}
                      onClick={() => handleEditOpen(deposito)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(deposito.id_Deposito)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de edición */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Editar Depósito</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Nombre del Depósito"
            value={depositoEdit.nomDeposito}
            onChange={(e) => setDepositoEdit({ ...depositoEdit, nomDeposito: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Dirección"
            value={depositoEdit.direccion}
            onChange={(e) => setDepositoEdit({ ...depositoEdit, direccion: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Deposito;
