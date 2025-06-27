"use client";
import {
    Box,
    Paper,
    Modal,
    Typography,
    IconButton,
    Divider,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import { X } from 'lucide-react';
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

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

export default function CadCanvasModal({ open, onClose, details = {}, setDetails }) {
    const [wallType, setWallType] = useState(details.wallType || "");
    const [length, setLength] = useState(details.length || "");
    const [height, setHeight] = useState(details.height || "");
    const [thickness, setThickness] = useState(details.thickness || "");

    // Sync local state with details prop when modal opens
    useEffect(() => {
        if (open) {
            setWallType(details.wallType || "");
            setLength(details.length || "");
            setHeight(details.height || "");
            setThickness(details.thickness || "");
        }
    }, [open, details]);

    const handleSave = () => {
        if (!wallType) {
            toast.error("Please select wall type.");
            return 'validation-error';
        }
        if (!length || !height || !thickness) {
            toast.error("Please fill in all required fields.");
            return 'validation-error';
        }
        setDetails({ wallType, length, height, thickness });
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
                        <div className="flex flex-col gap-4">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Wall Type</FormLabel>
                                <RadioGroup
                                    row
                                    name="wallType"
                                    value={wallType}
                                    onChange={e => setWallType(e.target.value)}
                                >
                                    <FormControlLabel value="external" control={<Radio />} label="External wall" />
                                    <FormControlLabel value="internal" control={<Radio />} label="Internal wall" />
                                </RadioGroup>
                            </FormControl>
                            {(wallType === "external" || wallType === "internal") && (
                                <div className="flex flex-col gap-4">
                                    <TextInput
                                        label={`${wallType === "external" ? "External" : "Internal"} wall length (ft)`}
                                        name="length"
                                        type="number"
                                        value={length}
                                        onChange={e => setLength(e.target.value)}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                    <TextInput
                                        label={`${wallType === "external" ? "External" : "Internal"} wall height (ft)`}
                                        name="height"
                                        type="number"
                                        value={height}
                                        onChange={e => setHeight(e.target.value)}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                    <TextInput
                                        label={`${wallType === "external" ? "External" : "Internal"} wall thickness (inch)`}
                                        name="thickness"
                                        type="number"
                                        value={thickness}
                                        onChange={e => setThickness(e.target.value)}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Box>
                <Divider />
                {/* Footer */}
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <SaveButton onClick={handleSave} successMessage="Wall details saved successfully!" />
                </Box>
            </Paper>
        </Modal>
    );
} 