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
    Divider
} from '@mui/material';
import { X } from 'lucide-react';

import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';

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
  
    const [mainModalOpen, setMainModalOpen] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        length: '',
        height: '',
        thickness: '',
        isInsulationUsed: 'no',
        insulationThickness: ''
    });

    // Add state for door and window form data
    const [doorForm, setDoorForm] = useState({
        doorType: '',
        height: '',
        width: '',
        thickness: '',
        quantity: '',
        costPerDoor: ''
    });
    const [windowForm, setWindowForm] = useState({
        windowType: '',
        height: '',
        width: '',
        thickness: '',
        quantity: '',
        costPerWindow: ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (e) => {
        setFormData(prev => ({ 
            ...prev, 
            isInsulationUsed: e.target.value,
            insulationThickness: e.target.value === 'no' ? '' : prev.insulationThickness
        }));
    };

    // Handlers for door and window input changes
    const handleDoorInputChange = (e) => {
        const { name, value } = e.target;
        setDoorForm(prev => ({ ...prev, [name]: value }));
    };
    const handleWindowInputChange = (e) => {
        const { name, value } = e.target;
        setWindowForm(prev => ({ ...prev, [name]: value }));
    };

    // Calculate area and volume
    const calculateArea = () => {
        const length = parseFloat(formData.length);
        const height = parseFloat(formData.height);
        if (length && height) {
            return (length * height).toFixed(1);
        }
        return '0.00';
    };

    const calculateVolume = () => {
        const length = parseFloat(formData.length);
        const height = parseFloat(formData.height);
        const thickness = parseFloat(formData.thickness);
        if (length && height && thickness) {
            // Convert thickness from inches to feet (divide by 12)
            const thicknessInFeet = thickness / 12;
            return (length * height * thicknessInFeet).toFixed(1);
        }
        return '0.00';
    };

    // Validation function
    const validateForm = () => {
        if (!formData.length || !formData.height || !formData.thickness) {
            return false;
        }

        if (formData.isInsulationUsed === 'yes' && !formData.insulationThickness) {
            return false;
        }

        return true;
    };

    // Get error message
    const getErrorMessage = () => {
        if (!formData.length || !formData.height || !formData.thickness) {
            return 'Please fill in all required fields (length, height, thickness)';
        }

        if (formData.isInsulationUsed === 'yes' && !formData.insulationThickness) {
            return 'Please enter insulation thickness';
        }

        return 'Please fill all required fields!';
    };

    // Handle form submission
    const handleSave = () => {
        // Validation
        if (!validateForm()) {
            return false;
        }

        try {
            // Here you would typically save the data to your backend
            const dataToSave = {
                ...formData,
                area: calculateArea(),
                volume: calculateVolume(),
                timestamp: new Date().toISOString()
            };

            console.log('Saving mumty wall data:', dataToSave);

            // Reset form after successful save
            setFormData({
                length: '',
                height: '',
                thickness: '',
                isInsulationUsed: 'no',
                insulationThickness: ''
            });

            return true; // Return true for successful save
        } catch (error) {
            console.error('Error saving mumty wall data:', error);
            return false; // Return false for failed save
        }
    };

    return (
        <div className="p-2">
            {/* Button to open the modal */}
            <Button
                variant="contained"
                onClick={() => setMainModalOpen(true)}
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
                                {/* First row: Length & Height */}
                                <div className="flex flex-row gap-4">
                                    <div className="flex-1">
                                        <TextInput
                                            label="Mumty Wall Length (ft)"
                                            name="length"
                                            type="number"
                                            value={formData.length}
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
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
                                            Mumty Wall Area: <span className="text-[#5BB045]">{calculateArea()} ft²</span>
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                                        <p className="text-lg font-bold text-gray-800">
                                            Mumty Wall Volume: <span className="text-[#5BB045]">{calculateVolume()} ft³</span>
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
                                        onChange={handleRadioChange}
                                    >
                                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            {/* Insulation Thickness Input - now below radio button */}
                            {formData.isInsulationUsed === 'yes' && (
                                <div>
                                    <TextInput
                                        label="Mumty Wall Insulation Thickness (inch)"
                                        name="insulationThickness"
                                        type="number"
                                        value={formData.insulationThickness}
                                        onChange={handleInputChange}
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
                                        onChange={handleDoorInputChange}
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
                                            onChange={handleDoorInputChange}
                                            required
                                            inputProps={{ min: "0", step: "0.1" }}
                                        />
                                        <TextInput
                                            label="Width (ft)"
                                            name="width"
                                            type="number"
                                            value={doorForm.width}
                                            onChange={handleDoorInputChange}
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
                                            onChange={handleDoorInputChange}
                                            required
                                            inputProps={{ min: "0", step: "0.1" }}
                                        />
                                        <TextInput
                                            label="Quantity"
                                            name="quantity"
                                            type="number"
                                            value={doorForm.quantity}
                                            onChange={handleDoorInputChange}
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
                                        onChange={handleDoorInputChange}
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
                                        onChange={handleWindowInputChange}
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
                                            onChange={handleWindowInputChange}
                                            required
                                            inputProps={{ min: "0", step: "0.1" }}
                                        />
                                        <TextInput
                                            label="Width (ft)"
                                            name="width"
                                            type="number"
                                            value={windowForm.width}
                                            onChange={handleWindowInputChange}
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
                                            onChange={handleWindowInputChange}
                                            required
                                            inputProps={{ min: "0", step: "0.1" }}
                                        />
                                        <TextInput
                                            label="Quantity"
                                            name="quantity"
                                            type="number"
                                            value={windowForm.quantity}
                                            onChange={handleWindowInputChange}
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
                                        onChange={handleWindowInputChange}
                                        required
                                        inputProps={{ min: "0" }}
                                    />
                                    </Box>
                                </Box>
                            </Box>

                         

                            {/* Save Button */}
                            <div className="grid grid-cols-1 justify-items-end">
                                <SaveButton
                                    onClick={handleSave}
                                    successMessage="Mumty Wall Data Saved Successfully! 🎉"
                                    errorMessage={getErrorMessage()}
                                />
                            </div>
                        </div>
                    </Box>
                </Paper>
            </Modal>

          
        </div>
    );
}