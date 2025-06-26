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
    Divider,
    MenuItem,
    Select,
    InputLabel
} from '@mui/material';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
import { useExteriorWallStore } from '@/app/store/exteriorWallStore';
import { WallBrickBlock, ExteriorFinish, InteriorFinish, Insulation } from '@/app/data/Materials';

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

export default function ExteriorWallModal({ open, onClose, selectedFloorName, floorNumber }) {
    // Zustand store hooks
    const {
        formData,
        doorForm,
        windowForm,
        exteriorWallsData,
        editingId,
        updateFormData,
        updateDoorForm,
        updateWindowForm,
        resetFormData,
        resetDoorForm,
        resetWindowForm,
        addExteriorWallData,
        updateExteriorWallData,
        deleteExteriorWallData,
        setEditingId,
        clearEditingId,
        getEditingRow,
        calculateWallArea,
        calculateWallVolume,
        calculateDoorArea,
        calculateWindowArea,
        calculateTilesArea,
    } = useExteriorWallStore();

    const [tileHeightError, setTileHeightError] = useState('');

    // Populate modal with previous data on edit
    const handleEdit = (id) => {
        setEditingId(id);
        const row = getEditingRow(id);
        if (row) {
            updateFormData({
                wallMaterial: row.wallMaterial || '',
                length: row.length || '',
                height: row.height || '',
                thickness: row.thickness || '',
                isInsulationUsed: row.insulationUsed || 'no',
                insulationType: row.insulationType || '',
                insulationThickness: row.insulationThickness || '',
                isCurtainWall: row.isCurtainWall || 'no',
                glassThickness: row.glassThickness || '',
                isTilesUsed: row.isTilesUsed || 'no',
                tileHeight: row.tileHeight || '',
                exteriorFinish: row.exteriorFinish || '',
                interiorFinish: row.interiorFinish || '',
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
        // Validation checks
        if (!formData.length || !formData.height || !formData.thickness) {
            toast.error('Please fill in all required fields (length, height, thickness)');
            return;
        }

        // Validate tile height if tiles are used
        if (formData.isTilesUsed === 'yes') {
            const tileHeight = parseFloat(formData.tileHeight);
            const wallHeight = parseFloat(formData.height);
            if (!tileHeight) {
                setTileHeightError('Please enter tile height');
                return;
            }
            if (tileHeight > wallHeight) {
                setTileHeightError('Tile height cannot be greater than wall height');
                return;
            }
            setTileHeightError('');
        }

        // Calculate total door and window area
        const doorArea = Number(calculateDoorArea());
        const windowArea = Number(calculateWindowArea());
        const wallArea = Number(calculateWallArea());

        // Validate areas
        if (formData.isCurtainWall === 'no') {
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
        }

        // Compose row data
        const newRow = {
            id: editingId || Date.now(),
            floorNumber,
            wallMaterial: formData.wallMaterial,
            wallArea: calculateWallArea(),
            wallVolume: calculateWallVolume(),
            isCurtainWall: formData.isCurtainWall,
            glassThickness: formData.glassThickness,
            insulationUsed: formData.isInsulationUsed,
            insulationType: formData.insulationType,
            insulationThickness: formData.insulationThickness,
            isTilesUsed: formData.isTilesUsed,
            tileHeight: formData.tileHeight,
            tilesArea: calculateTilesArea(),
            exteriorFinish: formData.exteriorFinish,
            interiorFinish: formData.interiorFinish,
            component:
                formData.isCurtainWall === 'no'
                    ? [
                        doorForm.doorType && doorForm.quantity ? `Door (${doorForm.quantity})` : null,
                        windowForm.windowType && windowForm.quantity ? `Window (${windowForm.quantity})` : null
                    ]
                        .filter(Boolean)
                        .join(' / ')
                    : '',
            doorType: doorForm.doorType,
            windowType: windowForm.windowType,
            doorArea: calculateDoorArea(),
            windowArea: calculateWindowArea(),
            cost:
                formData.isCurtainWall === 'no'
                    ? doorForm.doorType
                        ? doorForm.costPerDoor
                        : windowForm.windowType
                            ? windowForm.costPerWindow
                            : ''
                    : '',
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
            // Ensure select fields are always present
            wallMaterial: formData.wallMaterial,
            exteriorFinish: formData.exteriorFinish,
            interiorFinish: formData.interiorFinish,
            insulationType: formData.insulationType,
        };
        if (editingId) {
            updateExteriorWallData(editingId, newRow);
            clearEditingId();
        } else {
            addExteriorWallData(newRow);
        }
        resetFormData();
        resetDoorForm();
        resetWindowForm();
        onClose();
        return true;
    };

    // Delete handler
    const handleDelete = (id) => {
        deleteExteriorWallData(id);
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
            aria-labelledby="exterior-wall-modal-title"
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
                        id="exterior-wall-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600 }}
                    >
                        {selectedFloorName} Exterior Wall Details
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
                        {/* Exterior Wall Form */}
                        <div className="flex flex-col gap-4">
                            {/* Wall Material and Finish Selection in one line */}
                            <div className="flex flex-row gap-4">
                                <div className="flex-1">
                                    <FormControl fullWidth>
                                        <InputLabel id="wall-material-label">Wall Material</InputLabel>
                                        <Select
                                            labelId="wall-material-label"
                                            id="wall-material"
                                            value={formData.wallMaterial}
                                            label="Wall Material"
                                            onChange={(e) => updateFormData({ wallMaterial: e.target.value })}
                                        >
                                            {WallBrickBlock.map((item) => (
                                                <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="flex-1">
                                    <FormControl fullWidth>
                                        <InputLabel id="exterior-finish-label">Exterior Finish</InputLabel>
                                        <Select
                                            labelId="exterior-finish-label"
                                            id="exterior-finish"
                                            value={formData.exteriorFinish}
                                            label="Exterior Finish"
                                            onChange={(e) => updateFormData({ exteriorFinish: e.target.value })}
                                        >
                                            {ExteriorFinish.map((item) => (
                                                <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="flex-1">
                                    <FormControl fullWidth>
                                        <InputLabel id="interior-finish-label">Interior Finish</InputLabel>
                                        <Select
                                            labelId="interior-finish-label"
                                            id="interior-finish"
                                            value={formData.interiorFinish}
                                            label="Interior Finish"
                                            onChange={(e) => updateFormData({ interiorFinish: e.target.value })}
                                        >
                                            {InteriorFinish.map((item) => (
                                                <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            {/* First row: Length & Height */}
                            <div className="flex flex-row gap-4">
                                <div className="flex-1">
                                    <TextInput
                                        label="Exterior Wall Length (ft)"
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
                                        label="Exterior Wall Height (ft)"
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
                                        label="Exterior Wall Thickness (inch)"
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
                                        Exterior Wall Area: <span className="text-[#5BB045]">{calculateWallArea()} ft²</span>
                                    </p>
                                </div>
                                <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                                    <p className="text-lg font-bold text-gray-800">
                                        Exterior Wall Volume: <span className="text-[#5BB045]">{calculateWallVolume()} ft³</span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Curtain Wall Selection */}
                        <div className="grid grid-cols-1">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Is this a curtain wall?</FormLabel>
                                <RadioGroup
                                    row
                                    name="isCurtainWall"
                                    value={formData.isCurtainWall ?? 'no'}
                                    onChange={(e) => updateFormData({ isCurtainWall: e.target.value })}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        {/* If curtain wall is yes, show only glass thickness */}
                        {formData.isCurtainWall === 'yes' && (
                            <div className="flex flex-row gap-4">
                                <div className="flex-1">
                                    <FormControl fullWidth>
                                        <InputLabel id="glass-thickness-label">Glass Thickness (mm)</InputLabel>
                                        <Select
                                            labelId="glass-thickness-label"
                                            id="glass-thickness"
                                            value={formData.glassThickness}
                                            label="Glass Thickness (mm)"
                                            onChange={(e) => updateFormData({ glassThickness: e.target.value })}
                                        >
                                            {[3, 4, 5, 6, 8, 10, 12].map((mm) => (
                                                <MenuItem key={mm} value={mm}>{mm} mm</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        )}

                        {/* If not curtain wall, show insulation, tiles, and rest of form */}
                        {formData.isCurtainWall === 'no' && (
                            <>
                                {/* Insulation Radio Button */}
                                <div className="grid grid-cols-1">
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Is Insulation Used?</FormLabel>
                                        <RadioGroup
                                            row
                                            name="isInsulationUsed"
                                            value={formData.isInsulationUsed ?? 'no'}
                                            onChange={(e) => updateFormData({ isInsulationUsed: e.target.value })}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                {/* Insulation Type and Thickness Input */}
                                {formData.isInsulationUsed === 'yes' && (
                                    <div className="flex flex-row gap-4">
                                        <div className="flex-1">
                                            <FormControl fullWidth>
                                                <InputLabel id="insulation-type-label">Insulation Type</InputLabel>
                                                <Select
                                                    labelId="insulation-type-label"
                                                    id="insulation-type"
                                                    value={formData.insulationType}
                                                    label="Insulation Type"
                                                    onChange={(e) => updateFormData({ insulationType: e.target.value })}
                                                >
                                                    {Insulation.map((item) => (
                                                        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="flex-1">
                                            <TextInput
                                                name="insulationThickness"
                                                placeholder="Exterior Wall Insulation Thickness (inch)"
                                                type="number"
                                                value={formData.insulationThickness}
                                                onChange={(e) => updateFormData({ insulationThickness: e.target.value })}
                                                required
                                                inputProps={{ min: "0", step: "0.1" }}
                                            />
                                        </div>
                                    </div>
                                )}
                                {/* Tiles Used Radio Button */}
                                <div className="grid grid-cols-1">
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Are Tiles Used in Wall?</FormLabel>
                                        <RadioGroup
                                            row
                                            name="isTilesUsed"
                                            value={formData.isTilesUsed ?? 'no'}
                                            onChange={(e) => updateFormData({ isTilesUsed: e.target.value })}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                {/* Tile Height Input */}
                                {formData.isTilesUsed === 'yes' && (
                                    <div>
                                        <TextInput
                                            label="Tile Height (ft)"
                                            name="tileHeight"
                                            type="number"
                                            value={formData.tileHeight}
                                            onChange={(e) => updateFormData({ tileHeight: e.target.value })}
                                            required
                                            inputProps={{ min: '0', step: '0.1', max: formData.height || undefined }}
                                            sx={{ maxWidth: 250 }}
                                            error={!!tileHeightError}
                                            helperText={tileHeightError}
                                        />
                                    </div>
                                )}
                                {/* Tiles Area Display */}
                                {formData.isTilesUsed === 'yes' && formData.tileHeight && !tileHeightError && (
                                    <div className="p-4 rounded-md" style={{ backgroundColor: '#f7f6fb', maxWidth: 350 }}>
                                        <p className="text-lg font-bold text-gray-800">
                                            Exterior Wall Tiles Area: <span className="text-[#5BB045]">{calculateTilesArea()} ft²</span>
                                        </p>
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
                                {(doorForm.height && doorForm.width && doorForm.quantity) ||
                                    (windowForm.height && windowForm.width && windowForm.quantity) ? (
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
                            </>
                        )}

                        {/* Save Button */}
                        <div className="grid grid-cols-1 justify-items-end">
                            <SaveButton
                                onClick={handleSave}
                                successMessage="Exterior Wall Data Saved Successfully! 🎉"
                                errorMessage="Please fill all required fields!"
                            />
                        </div>
                    </div>
                </Box>
            </Paper>
        </Modal>
    );
} 