"use client";
import { 
    Box, 
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    Paper,
    Modal,
    Typography,
    IconButton,
    Divider
} from '@mui/material';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
import { useSlabStore } from '@/app/store/slabStore';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 0,
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto'
};

export default function SlabModal({ open, onClose, selectedFloorName, floorNumber }) {
    // Zustand store hooks
    const {
        formData,
        editingId,
        updateFormData,
        resetFormData,
        addSlabData,
        updateSlabData,
        clearEditingId,
        calculateSlabVolume,
    } = useSlabStore();

    // Save handler
    const handleSave = () => {
        // Validation checks
        if (!formData.slabArea || !formData.slabThickness) {
            toast.error('Please fill in all required fields (Slab Area, Slab Thickness)');
            return;
        }

        if(formData.isCeilingUsed === 'yes' && !formData.ceilingArea) {
            toast.error('Please fill in ceiling area');
            return;
        }

        if(formData.areTilesUsed === 'yes') {
            if (!formData.tilesArea) {
                toast.error('Please fill in tiles area');
                return;
            }
            if (parseFloat(formData.tilesArea) > parseFloat(formData.slabArea)) {
                toast.error('Tiles area cannot be greater than slab area!');
                return;
            }
        }

        // Compose row data
        const newRow = {
            id: editingId || Date.now(),
            floorNumber,
            slabArea: formData.slabArea,
            slabThickness: formData.slabThickness,
            slabVolume: calculateSlabVolume(),
            isCeilingUsed: formData.isCeilingUsed,
            ceilingArea: formData.isCeilingUsed === 'yes' ? formData.ceilingArea : '',
            areTilesUsed: formData.areTilesUsed,
            tilesArea: formData.areTilesUsed === 'yes' ? formData.tilesArea : '',
        };
        
        if (editingId) {
            updateSlabData(editingId, newRow);
            clearEditingId();
        } else {
            addSlabData(newRow);
        }
        resetFormData();
        onClose();
        return true;
    };

    // Handle modal close
    const handleClose = () => {
        resetFormData();
        clearEditingId();
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="slab-modal-title"
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
                        id="slab-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600 }}
                    >
                        {selectedFloorName} Slab Details
                    </Typography>
                    <IconButton onClick={handleClose} size="small" sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}>
                        <X size={20} />
                    </IconButton>
                </Box>
                {/* Content */}
                <Box sx={{ p: 3 }}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Slab Form */}
                        <div className="flex flex-col gap-4">
                            {/* First row: Area & Thickness */}
                            <div className="flex flex-row gap-4">
                                <div className="flex-1">
                                    <TextInput
                                        label="Slab Area (ft²)"
                                        name="slabArea"
                                        type="number"
                                        value={formData.slabArea}
                                        onChange={(e) => updateFormData({ slabArea: e.target.value })}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <TextInput
                                        label="Slab Thickness (inch)"
                                        name="slabThickness"
                                        type="number"
                                        value={formData.slabThickness}
                                        onChange={(e) => updateFormData({ slabThickness: e.target.value })}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Calculated Values */}
                        {formData.slabArea && formData.slabThickness && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                                    <p className="text-lg font-bold text-gray-800">
                                        Slab Volume: <span className="text-[#5BB045]">{calculateSlabVolume()} ft³</span>
                                    </p>
                                </div>
                            </div>
                        )}
                        {/* Ceiling Used Radio */}
                        <div className="grid grid-cols-1">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Is Ceiling Used?</FormLabel>
                                <RadioGroup
                                    row
                                    name="isCeilingUsed"
                                    value={formData.isCeilingUsed ?? 'no'}
                                    onChange={(e) => updateFormData({ isCeilingUsed: e.target.value })}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {/* Ceiling Area Input */}
                        {formData.isCeilingUsed === 'yes' && (
                            <div>
                                <TextInput
                                    label="Ceiling Area (ft²)"
                                    name="ceilingArea"
                                    type="number"
                                    value={formData.ceilingArea}
                                    onChange={(e) => updateFormData({ ceilingArea: e.target.value })}
                                    required
                                    inputProps={{ min: '0', step: '0.1' }}
                                    sx={{ maxWidth: 250 }}
                                />
                            </div>
                        )}
                        {/* Tiles Used Radio */}
                        <div className="grid grid-cols-1">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Are Tiles Used?</FormLabel>
                                <RadioGroup
                                    row
                                    name="areTilesUsed"
                                    value={formData.areTilesUsed ?? 'no'}
                                    onChange={(e) => updateFormData({ areTilesUsed: e.target.value })}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {/* Tiles Area Input */}
                        {formData.areTilesUsed === 'yes' && (
                            <div>
                                <TextInput
                                    label="Tiles Area (ft²)"
                                    name="tilesArea"
                                    type="number"
                                    value={formData.tilesArea}
                                    onChange={(e) => updateFormData({ tilesArea: e.target.value })}
                                    required
                                    inputProps={{ min: '0', step: '0.1' }}
                                    sx={{ maxWidth: 250 }}
                                />
                            </div>
                        )}
                        {/* Save Button */}
                        <div className="grid grid-cols-1 justify-items-end">
                            <SaveButton
                                onClick={handleSave}
                                successMessage="Slab Data Saved Successfully! 🎉"
                                errorMessage="Please fill all required fields!"
                            />
                        </div>
                    </div>
                </Box>
            </Paper>
        </Modal>
    );
} 