import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
    DialogActions,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteOneInfoad } from "../services/remote/delete/DeleteOneInfoad";

const DeleteInfoadModal = ({ showDeleteModal, setShowDeleteModal, fetchData, selectInfo  }) => { 
    const [loading, setLoading] = useState(false);
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");

    useEffect(() => {
        console.log("Info seleccionadas:", selectInfo);

        // Aquí no se realiza ógica adicional porque los almacenes ya se reciben como prop
    }, [selectInfo]);

    const handleDeleteSeries = async () => {
        setMensajeErrorAlert(null);
        setMensajeExitoAlert(null);
        setLoading(true); 

        try {
            if (Array.isArray(selectInfo) && selectInfo.length > 0) {
                for (const info of selectInfo) {
                    await DeleteOneInfoad(info.negocioId, info.id_almacen, info._id);
                }
                setMensajeExitoAlert("Info eliminados correctamente.");
                fetchData();
                
            } else {
                setMensajeErrorAlert("No se seleccionaron Info para eliminar.");
            }
        } catch (error) {
            setMensajeErrorAlert("Error al eliminar Info.");
        } finally {
            setLoading(false);  
        }
};
const handleClose = () => {
    setShowDeleteModal(false);
    setMensajeErrorAlert(null);
    setMensajeExitoAlert(null);
};

return (
    <Dialog open={showDeleteModal} onClose={handleClose} fullWidth>
        {/* Título del modal */}
        <DialogTitle>
            <Typography variant="h6" component="div">
                <strong>Eliminar Info Adicional</strong>
            </Typography>
        </DialogTitle>

        <DialogContent>
            {mensajeErrorAlert && (
                <Typography color="error" sx={{ marginBottom: 2 }}>
                    {mensajeErrorAlert}
                </Typography>
            )}
            {mensajeExitoAlert && (
                <Typography color="success" sx={{ marginBottom: 2 }}>
                    {mensajeExitoAlert}
                </Typography>
            )}
            {Array.isArray(selectInfo) && selectInfo.length > 0 ? (
                <>
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        <strong>Los siguientes Infoad serán eliminados:</strong>
                    </Typography>
                    <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
                        {selectInfo.map((series, index) => (
                            <Box
                                key={series._id || index}
                                sx={{
                                    marginBottom: 1,
                                    padding: 1,
                                    border: "1px solid #ccc",
                                    borderRadius: 4,
                                }}
                            >
                                <Typography variant="body2">
                                    <strong>ID:</strong> {series.id_serie}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Nombre:</strong> {series.nombre_serie}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>numero de placa:</strong> {series.numero_placa}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>observacion:</strong> {series.observacion}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>almacen:</strong> {series.almacen}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>negocio del Nombre:</strong> {series.negocioNombre}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </>
            ) : (
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    <strong>No hay series seleccionados.</strong>
                </Typography>
            )}
        </DialogContent>

        {/* Acciones del modal */}
        <DialogActions>
            <LoadingButton
                onClick={handleDeleteSeries}
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                loading={loading}
            >
                Eliminar
            </LoadingButton>
            <LoadingButton
                onClick={handleClose}
                variant="outlined"
                color="secondary"
                startIcon={<CloseIcon />}
            >
                Cerrar
            </LoadingButton>
        </DialogActions>
    </Dialog>
);
};

export default DeleteInfoadModal;