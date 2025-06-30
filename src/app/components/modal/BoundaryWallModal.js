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

export default function BoundaryWallModal({ open, onClose, onSave }) {
    const [totalArea, setTotalArea] = useState("");
    const [wallHeight, setWallHeight] = useState("");

    // Reset form when modal opens
    useEffect(() => {
        if (open) {
            setTotalArea("");
            setWallHeight("");
        }
    }, [open]);

    const handleSave = () => {
        if (!totalArea || !wallHeight) {
            toast.error("Please fill in all required fields.");
            return 'validation-error';
        }

        const area = parseFloat(totalArea);
        const height = parseFloat(wallHeight);

        if (area <= 0 || height <= 0) {
            toast.error("Area and height must be greater than 0.");
            return 'validation-error';
        }

        // Calculate wall length: square root of area (since area = length × width)
        // If area is 2720 ft², each side = √2720 = 52.2 ft
        const wallLength = Math.sqrt(area);

        onSave({
            totalArea: area,
            wallHeight: height,
            wallLength: wallLength,
            wallType: 'boundary'
        });

        toast.success("Boundary wall details saved successfully!");
        onClose();
        return true;
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="boundary-wall-modal-title"
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
                        id="boundary-wall-modal-title"
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
                            <TextInput
                                label="Plot Area (ft²)"
                                name="totalArea"
                                type="number"
                                value={totalArea}
                                onChange={e => setTotalArea(e.target.value)}
                                required
                                inputProps={{ min: "0", step: "0.1" }}
                                placeholder="e.g., 2720 ft²"
                            />
                            <TextInput
                                label="Wall Height (ft)"
                                name="wallHeight"
                                type="number"
                                value={wallHeight}
                                onChange={e => setWallHeight(e.target.value)}
                                required
                                inputProps={{ min: "0", step: "0.1" }}
                                placeholder="e.g., 10 ft"
                            />
                            {totalArea && (
                                <TextInput
                                    label="Length (ft)"
                                    name="wallLength"
                                    type="number"
                                    value={Math.sqrt(parseFloat(totalArea) || 0).toFixed(1)}
                                    InputProps={{ readOnly: true }}
                                />
                            )}
                        </div>
                    </div>
                </Box>
                {/* Footer */}
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <SaveButton onClick={handleSave} />
                </Box>
            </Paper>
        </Modal>
    );
} 