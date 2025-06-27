"use client";
import {
    Box,
    Paper,
    Modal,
    Typography,
    IconButton,
    Divider
} from '@mui/material';
import { X } from 'lucide-react';
import SaveButton from '@/app/components/button/SaveButton';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 0,
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto'
};

export default function CadCanvasModal({ open, onClose }) {
    const handleSave = () => {
        // Placeholder for save logic
        onClose();
        return true;
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="cad-canvas-modal-title"
        >
            <Paper sx={modalStyle}>
                {/* Header */}
                <Box sx={{
                    p: 3,
                    pb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                }}>
                    <Typography
                        id="cad-canvas-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600 }}
                    >
                        Add details
                    </Typography>
                    <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}>
                        <X size={20} />
                    </IconButton>
                </Box>
                {/* Content */}
                <Box sx={{ p: 3 }}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Placeholder for form fields */}
                        <div className="flex flex-col gap-4">
                            <p className="text-gray-700">Add details for this line here.</p>
                        </div>
                    </div>
                </Box>
                <Divider />
                {/* Footer */}
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <SaveButton onClick={handleSave} />
                </Box>
            </Paper>
        </Modal>
    );
} 