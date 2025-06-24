"use client";
import { useState } from 'react';
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
import InteriorWallsTable from '@/app/components/table/InteriorWallsTable';
import { useInteriorWallStore } from '@/app/store/interiorWallStore';

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

export default function InteriorWallModal({ open, onClose, selectedFloorName }) {
    // Zustand store hooks
    const {
        formData,
        doorForm,
        windowForm,
        interiorWallsData,
        editingId,
        updateFormData,
        updateDoorForm,
        updateWindowForm,
        resetFormData,
        resetDoorForm,
        resetWindowForm,
        addInteriorWallData,
        updateInteriorWallData,
        deleteInteriorWallData,
        setEditingId,
        clearEditingId,
        getEditingRow,
        calculateWallArea,
        calculateWallVolume,
        calculateDoorArea,
        calculateWindowArea,
    } = useInteriorWallStore();

    // Populate modal with previous data on edit
    const handleEdit = (id) => {
        setEditingId(id);
        const row = getEditingRow(id);
        if (row) {
            updateFormData({
                length: row.length || '',
                height: row.height || '',
                thickness: row.thickness || '',
                isInsulationUsed: row.insulationUsed || 'no',
                insulationThickness: row.insulationThickness || ''
            });
            updateDoorForm({
                doorType: row.doorType || '',
                height: row.doorHeight || '',
                width: row.doorWidth || '',
                thickness: row.doorThickness || '',
                quantity: row.doorQuantity || '',
                costPerDoor: row.doorCost || ''
            });
            updateWindowForm({
                windowType: row.windowType || '',
                height: row.windowHeight || '',
                width: row.windowWidth || '',
                thickness: row.windowThickness || '',
                quantity: row.windowQuantity || '',
                costPerWindow: row.windowCost || ''
            });
        }
    };

    // Save handler
    const handleSave = () => {
        // Calculate total door and window area
        const doorArea = Number(calculateDoorArea());
        const windowArea = Number(calculateWindowArea());
        const wallArea = Number(calculateWallArea());
        
        // Validate areas
        if (doorArea && doorArea >= wallArea) {
            toast.error('Door area cannot be equal to or greater than wall area!');
            return 'validation-error';
        }
        
        if (windowArea && windowArea >= wallArea) {
            toast.error('Window area cannot be equal to or greater than wall area!');
            return 'validation-error';
        }
        
        if (doorArea && windowArea && (doorArea + windowArea) >= wallArea) {
            toast.error('Combined door and window area cannot be equal to or greater than wall area!');
            return 'validation-error';
        }

        // Validation for required fields
        if (!formData.length || !formData.height || !formData.thickness) {
            return false;
        }

        // Compose row data
        const newRow = {
            id: editingId || Date.now(),
            wallArea: calculateWallArea(),
            wallVolume: calculateWallVolume(),
            insulationUsed: formData.isInsulationUsed,
            insulationThickness: formData.insulationThickness,
            component: [
                doorForm.doorType && doorForm.quantity ? `Door (${doorForm.quantity})` : null,
                windowForm.windowType && windowForm.quantity ? `Window (${windowForm.quantity})` : null
            ].filter(Boolean).join(' / '),
            doorType: doorForm.doorType,
            windowType: windowForm.windowType,
            doorArea: calculateDoorArea(),
            windowArea: calculateWindowArea(),
            cost: doorForm.doorType ? doorForm.costPerDoor : windowForm.windowType ? windowForm.costPerWindow : '',
            // Store all form values for editing
            length: formData.length,
            height: formData.height,
            thickness: formData.thickness,
            doorHeight: doorForm.height,
            doorWidth: doorForm.width,
            doorThickness: doorForm.thickness,
            doorQuantity: doorForm.quantity,
            doorCost: doorForm.costPerDoor,
            windowHeight: windowForm.height,
            windowWidth: windowForm.width,
            windowThickness: windowForm.thickness,
            windowQuantity: windowForm.quantity,
            windowCost: windowForm.costPerWindow,
        };
        if (editingId) {
            updateInteriorWallData(editingId, newRow);
            clearEditingId();
        } else {
            addInteriorWallData(newRow);
        }
        resetFormData();
        resetDoorForm();
        resetWindowForm();
        onClose();
        return true;
    };

    // Delete handler
    const handleDelete = (id) => {
        deleteInteriorWallData(id);
    };

    // Handle modal close
    const handleClose = () => {
        resetFormData();
        resetDoorForm();
        resetWindowForm();
        clearEditingId();
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="interior-wall-modal-title"
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
                        id="interior-wall-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600 }}
                    >
                        {selectedFloorName} Interior Wall Details
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'action.hover'
                            }
                        }}
                    >
                        <X size={20} />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ p: 3 }}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Interior Wall Form */}
                        <div className="flex flex-col gap-4">
                            {/* First row: Length & Height */}
                            <div className="flex flex-row gap-4">
                                <div className="flex-1">
                                    <TextInput
                                        label="Interior Wall Length (ft)"
                                        name="length"
                                        type="number"
                                        value={formData.length}
                                        onChange={(e) => updateFormData({ length: e.target.value })}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <TextInput
                                        label="Interior Wall Height (ft)"
                                        name="height"
                                        type="number"
                                        value={formData.height}
                                        onChange={(e) => updateFormData({ height: e.target.value })}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                </div>
                            </div>
                            {/* Second row: Thickness only */}
                            <div className="flex flex-row gap-4">
                                <div className="flex-1">
                                    <TextInput
                                        label="Interior Wall Thickness (inch)"
                                        name="thickness"
                                        type="number"
                                        value={formData.thickness}
                                        onChange={(e) => updateFormData({ thickness: e.target.value })}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                        sx={{ maxWidth: 250 }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Calculated Values */}
                        {formData.length && formData.height && formData.thickness && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                                    <p className="text-lg font-bold text-gray-800">
                                        Interior Wall Area: <span className="text-[#5BB045]">{calculateWallArea() } ft²</span>
                                    </p>
                                </div>
                                <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                                    <p className="text-lg font-bold text-gray-800">
                                        Interior Wall Volume: <span className="text-[#5BB045]">{calculateWallVolume()} ft³</span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Insulation Radio Button */}
                        <div className="grid grid-cols-1">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Is Insulation Used?</FormLabel>
                                <RadioGroup
                                    row
                                    name="isInsulationUsed"
                                    value={formData.isInsulationUsed}
                                    onChange={(e) => updateFormData({ isInsulationUsed: e.target.value })}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {/* Insulation Thickness Input */}
                        {formData.isInsulationUsed === 'yes' && (
                            <div>
                                <TextInput
                                    label="Interior Wall Insulation Thickness (inch)"
                                    name="insulationThickness"
                                    type="number"
                                    value={formData.insulationThickness}
                                    onChange={(e) => updateFormData({ insulationThickness: e.target.value })}
                                    required
                                    inputProps={{ min: "0", step: "0.1" }}
                                    sx={{ maxWidth: 250 }}
                                />
                            </div>
                        )}

                        {/* Door and Window Inputs Side by Side */}
                        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', mt: 2 }}>
                            {/* Door Inputs (Left) */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Door Details</Typography>
                                <TextInput
                                    label="Door Type"
                                    name="doorType"
                                    value={doorForm.doorType}
                                    onChange={(e) => updateDoorForm({ doorType: e.target.value })}
                                    select
                                    options={[
                                        { value: 'wooden', label: 'Wooden' },
                                        { value: 'upvc', label: 'UPVC' },
                                        { value: 'aluminium', label: 'Aluminium' }
                                    ]}
                                    required
                                />
                                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                    <TextInput
                                        label="Height (ft)"
                                        name="height"
                                        type="number"
                                        value={doorForm.height}
                                        onChange={(e) => updateDoorForm({ height: e.target.value })}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                    <TextInput
                                        label="Width (ft)"
                                        name="width"
                                        type="number"
                                        value={doorForm.width}
                                        onChange={(e) => updateDoorForm({ width: e.target.value })}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                    <TextInput
                                        label="Thickness (inch)"
                                        name="thickness"
                                        type="number"
                                        value={doorForm.thickness}
                                        onChange={(e) => updateDoorForm({ thickness: e.target.value })}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                    <TextInput
                                        label="Quantity"
                                        name="quantity"
                                        type="number"
                                        value={doorForm.quantity}
                                        onChange={(e) => updateDoorForm({ quantity: e.target.value })}
                                        required
                                        inputProps={{ min: "1" }}
                                    />
                                </Box>
                                 <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <TextInput
                                    label="Cost per Door"
                                    name="costPerDoor"
                                    type="number"
                                    value={doorForm.costPerDoor}
                                    onChange={(e) => updateDoorForm({ costPerDoor: e.target.value })}
                                    required
                                    inputProps={{ min: "0" }}
                                />
                                </Box>
                            </Box>
                            {/* Divider */}
                            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                            {/* Window Inputs (Right) */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Window Details</Typography>
                                <TextInput
                                    label="Window Type"
                                    name="windowType"
                                    value={windowForm.windowType}
                                    onChange={(e) => updateWindowForm({ windowType: e.target.value })}
                                    select
                                    options={[
                                        { value: 'wooden', label: 'Wooden' },
                                        { value: 'upvc', label: 'UPVC' },
                                        { value: 'aluminium', label: 'Aluminium' }
                                    ]}
                                    required
                                />
                                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                    <TextInput
                                        label="Height (ft)"
                                        name="height"
                                        type="number"
                                        value={windowForm.height}
                                        onChange={(e) => updateWindowForm({ height: e.target.value })}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                    <TextInput
                                        label="Width (ft)"
                                        name="width"
                                        type="number"
                                        value={windowForm.width}
                                        onChange={(e) => updateWindowForm({ width: e.target.value })}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                    <TextInput
                                        label="Thickness (inch)"
                                        name="thickness"
                                        type="number"
                                        value={windowForm.thickness}
                                        onChange={(e) => updateWindowForm({ thickness: e.target.value })}
                                        required
                                        inputProps={{ min: "0", step: "0.1" }}
                                    />
                                    <TextInput
                                        label="Quantity"
                                        name="quantity"
                                        type="number"
                                        value={windowForm.quantity}
                                        onChange={(e) => updateWindowForm({ quantity: e.target.value })}
                                        required
                                        inputProps={{ min: "1" }}
                                    />
                                </Box>
                                 <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <TextInput
                                    label="Cost per Window"
                                    name="costPerWindow"
                                    type="number"
                                    value={windowForm.costPerWindow}
                                    onChange={(e) => updateWindowForm({ costPerWindow: e.target.value })}
                                    required
                                    inputProps={{ min: "0" }}
                                />
                                </Box>
                            </Box>
                        </Box>

                        {/* Display Door and Window Area */}
                        {(doorForm.height && doorForm.width && doorForm.quantity) || (windowForm.height && windowForm.width && windowForm.quantity) ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {doorForm.height && doorForm.width && doorForm.quantity && (
                                    <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                                        <p className="text-lg font-bold text-gray-800">
                                            Door Area: <span className="text-[#5BB045]">{calculateDoorArea()} ft²</span>
                                        </p>
                                    </div>
                                )}
                                {windowForm.height && windowForm.width && windowForm.quantity && (
                                    <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                                        <p className="text-lg font-bold text-gray-800">
                                            Window Area: <span className="text-[#5BB045]">{calculateWindowArea()} ft²</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : null}

                        {/* Save Button */}
                        <div className="grid grid-cols-1 justify-items-end">
                            <SaveButton
                                onClick={handleSave}
                                successMessage="Interior Wall Data Saved Successfully! 🎉"
                                errorMessage="Please fill all required fields!"
                            />
                        </div>
                    </div>
                </Box>
            </Paper>
        </Modal>
    );
} 