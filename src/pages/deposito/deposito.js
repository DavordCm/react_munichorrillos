import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import "../../styles/deposito.css";

const Deposito = () => {
  // Datos de ejemplo
  const rows = [
    { id: 1, nombre: "Vehículo ADM A", estado: "Disponible", fecha: "01/04/2025" },
    { id: 2, nombre: "Vehículo ADM B", estado: "En revisión", fecha: "02/04/2025" },
    { id: 3, nombre: "Vehículo ADM C", estado: "Liberado", fecha: "03/04/2025" },
  ];

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
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className="tabla-row">
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.estado}</TableCell>
                <TableCell>{row.fecha}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Deposito;
