"use client";
import { useState } from 'react';
import { 
    Button, 
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
import MumtyWallsTable from '@/app/components/table/MumtyWallsTable';
import { useMumtyWallStore } from '@/app/store/mumtyWallStore';
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

export default function MumtyWalls() {
    // Modal open state only
    const [mainModalOpen, setMainModalOpen] = useState(false);

    // Zustand store hooks
    const {
        formData,
        doorForm,
        windowForm,
        mumtyWallsData,
        editingId,
        updateFormData,
        updateDoorForm,
        updateWindowForm,
        resetFormData,
        resetDoorForm,
        resetWindowForm,
        addMumtyWallData,
        updateMumtyWallData,
        deleteMumtyWallData,
        setEditingId,
        clearEditingId,
        getEditingRow,
        calculateWallArea,
        calculateWallVolume,
        calculateDoorArea,
        calculateWindowArea,
    } = useMumtyWallStore();

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
                exteriorFinish: row.exteriorFinish || '',
                interiorFinish: row.interiorFinish || ''
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
        setMainModalOpen(true);
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

        // Validation for required fields (example: length, height, thickness)
        if (!formData.length || !formData.height || !formData.thickness) {
            return false;
        }
        // ... you can add more required field checks as needed ...

        // Compose row data
        const newRow = {
            id: editingId || Date.now(),
            wallMaterial: formData.wallMaterial,
            wallArea: calculateWallArea(),
            wallVolume: calculateWallVolume(),
            insulationUsed: formData.isInsulationUsed,
            insulationType: formData.insulationType,
            insulationThickness: formData.insulationThickness,
            exteriorFinish: formData.exteriorFinish,
            interiorFinish: formData.interiorFinish,
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
            updateMumtyWallData(editingId, newRow);
            clearEditingId();
        } else {
            addMumtyWallData(newRow);
        }
        resetFormData();
        resetDoorForm();
        resetWindowForm();
        setMainModalOpen(false);
        return true;
    };

    // Delete handler
    const handleDelete = (id) => {
        deleteMumtyWallData(id);
    };

    return (
        <div className="p-2">
            <Button
                variant="contained"
                onClick={() => { resetFormData(); resetDoorForm(); resetWindowForm(); clearEditingId(); setMainModalOpen(true); }}
                sx={{
                    backgroundColor: '#5BB045',
                    color: '#fff',
                    fontWeight: 600,
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#4a9537',
                        color: '#fff',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
                    }
                }}
            >
                Open Mumty Wall Form
            </Button>

            {/* Main Modal for Mumty Wall Form */}
            <Modal
                open={mainModalOpen}
                onClose={() => setMainModalOpen(false)}
                aria-labelledby="mumty-wall-modal-title"
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
                            id="mumty-wall-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ fontWeight: 600 }}
                        >
                            Mumty Wall Details
                        </Typography>
                        <IconButton
                            onClick={() => setMainModalOpen(false)}
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
                            {/* Mumty Wall Form */}
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
                                            label="Mumty Wall Length (ft)"
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
                                            label="Mumty Wall Height (ft)"
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
                                            label="Mumty Wall Thickness (inch)"
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
                                            Mumty Wall Area: <span className="text-[#5BB045]">{calculateWallArea() } ft²</span>
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                                        <p className="text-lg font-bold text-gray-800">
                                            Mumty Wall Volume: <span className="text-[#5BB045]">{calculateWallVolume()} ft²</span>
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
                                                placeholder="Exterior Wall Insulation Thickness (inch)"
                                                name="insulationThickness"
                                            type="number"
                                            value={formData.insulationThickness}
                                            onChange={(e) => updateFormData({ insulationThickness: e.target.value })}
                                            required
                                            inputProps={{ min: "0", step: "0.1" }}
                                        />
                                    </div>
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
                                    successMessage="Mumty Wall Data Saved Successfully! 🎉"
                                    errorMessage="Please fill all required fields!"
                                />
                            </div>
                        </div>
                    </Box>
                </Paper>
            </Modal>

            {/* Mumty Walls Table Section */}
            <div className="mt-8">
                <MumtyWallsTable
                    data={mumtyWallsData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}