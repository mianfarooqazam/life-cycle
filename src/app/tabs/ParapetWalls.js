"use client";
import { useState } from 'react';
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';

export default function ParapetWalls() {
    // Form state
    const [formData, setFormData] = useState({
        length: '',
        height: '',
        thickness: ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        return true;
    };

    // Get error message
    const getErrorMessage = () => {
        if (!formData.length || !formData.height || !formData.thickness) {
            return 'Please fill in all required fields (length, height, thickness)';
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

            console.log('Saving parapet wall data:', dataToSave);

            // Reset form after successful save
            setFormData({
                length: '',
                height: '',
                thickness: ''
            });

            return true; // Return true for successful save
        } catch (error) {
            console.error('Error saving parapet wall data:', error);
            return false; // Return false for failed save
        }
    };

    return (
        <div className="grid grid-cols-1 gap-6 p-2">

            {/* Parapet Wall Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextInput
                    label="Parapet Wall Length (ft)"
                    name="length"
                    type="number"
                    value={formData.length}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />

                <TextInput
                    label="Parapet Wall Height (ft)"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />

                <TextInput
                    label="Parapet Wall Thickness (inch)"
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
                        Parapet Wall Area: <span className="text-[#5BB045]">{calculateArea()} ft²</span>
                    </p>
                </div>
            
                <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                    <p className="text-lg font-bold text-gray-800">
                        Parapet Wall Volume: <span className="text-[#5BB045]">{calculateVolume()} ft³</span>
                    </p>
                </div>
            </div>
            )}

            {/* Save Button */}
            <div className="grid grid-cols-1 justify-items-end">
                <SaveButton
                    onClick={handleSave}
                    successMessage="Parapet Wall Data Saved Successfully! 🎉"
                    errorMessage={getErrorMessage()}
                />
            </div>
        </div>
    );
}