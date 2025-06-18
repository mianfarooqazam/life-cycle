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
    Grid
} from '@mui/material';
import { DoorOpen, RectangleHorizontal, Package } from 'lucide-react';
import DoorModal from '@/app/components/modal/DoorModal';
import WindowModal from '@/app/components/modal/WindowModal';
import MaterialModal from '@/app/components/modal/MaterialModal';
import SaveButton from '@/app/components/button/SaveButton';
import TitleHeader from '@/app/components/header/TitleHeader';
import TextInput from '@/app/components/input/TextInput';

export default function MumtyWalls() {
    const [doorModalOpen, setDoorModalOpen] = useState(false);
    const [windowModalOpen, setWindowModalOpen] = useState(false);
    const [materialModalOpen, setMaterialModalOpen] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        length: '',
        height: '',
        thickness: '',
        isInsulationUsed: 'no',
        insulationThickness: ''
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

    // Calculate area and volume
    const calculateArea = () => {
        const length = parseFloat(formData.length);
        const height = parseFloat(formData.height);
        if (length && height) {
            return (length * height).toFixed(2);
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
            return (length * height * thicknessInFeet).toFixed(2);
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
        <div className="grid grid-cols-1 gap-6 p-2">

            {/* Mumty Wall Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextInput
                    label="Mumty Wall Length (ft)"
                    name="length"
                    type="number"
                    value={formData.length}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />

                <TextInput
                    label="Mumty Wall Height (ft)"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />

                <TextInput
                    label="Mumty Wall Thickness (inch)"
                    name="thickness"
                    type="number"
                    value={formData.thickness}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />
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

            {/* Insulation Thickness Input - Conditional */}
            {formData.isInsulationUsed === 'yes' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TextInput
                        label="Mumty Wall Insulation Thickness (inch)"
                        name="insulationThickness"
                        type="number"
                        value={formData.insulationThickness}
                        onChange={handleInputChange}
                        required
                        inputProps={{ min: "0", step: "0.1" }}
                    />
                </div>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                <Button
                    variant="contained"
                    startIcon={<DoorOpen size={20} />}
                    onClick={() => setDoorModalOpen(true)}
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
                    Add Door
                </Button>

                <Button
                    variant="contained"
                    startIcon={<RectangleHorizontal size={20} />}
                    onClick={() => setWindowModalOpen(true)}
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
                    Add Window
                </Button>

                <Button
                    variant="contained"
                    startIcon={<Package size={20} />}
                    onClick={() => setMaterialModalOpen(true)}
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
                    Select Materials
                </Button>
            </Box>

            {/* Save Button */}
            <div className="grid grid-cols-1 justify-items-end">
                <SaveButton
                    onClick={handleSave}
                    successMessage="Mumty Wall Data Saved Successfully! 🎉"
                    errorMessage={getErrorMessage()}
                />
            </div>

            {/* Modals */}
            <DoorModal 
                open={doorModalOpen} 
                onClose={() => setDoorModalOpen(false)} 
            />
            
            <WindowModal 
                open={windowModalOpen} 
                onClose={() => setWindowModalOpen(false)} 
            />

            <MaterialModal 
                open={materialModalOpen} 
                onClose={() => setMaterialModalOpen(false)} 
            />
        </div>
    );
}