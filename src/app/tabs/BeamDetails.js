"use client";
import { useState } from 'react';
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';

export default function BeamDetails() {
    // Form state
    const [formData, setFormData] = useState({
        numberOfBeams: '',
        beamLength: '',
        beamWidth: '',
        beamDepth: ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Calculate beam volume
    const calculateVolume = () => {
        const numberOfBeams = parseFloat(formData.numberOfBeams);
        const beamLength = parseFloat(formData.beamLength);
        const beamWidth = parseFloat(formData.beamWidth);
        const beamDepth = parseFloat(formData.beamDepth);
        
        if (numberOfBeams && beamLength && beamWidth && beamDepth) {
            // Convert width and depth from inches to feet (divide by 12)
            const widthInFeet = beamWidth / 12;
            const depthInFeet = beamDepth / 12;
            const volumePerBeam = beamLength * widthInFeet * depthInFeet;
            const totalVolume = volumePerBeam * numberOfBeams;
            return totalVolume.toFixed(2);
        }
        return '0.00';
    };

    // Validation function
    const validateForm = () => {
        if (!formData.numberOfBeams || !formData.beamLength || !formData.beamWidth || !formData.beamDepth) {
            return false;
        }
        return true;
    };

    // Get error message
    const getErrorMessage = () => {
        if (!formData.numberOfBeams || !formData.beamLength || !formData.beamWidth || !formData.beamDepth) {
            return 'Please fill in all required fields (number of beams, length, width, depth)';
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
                volume: calculateVolume(),
                timestamp: new Date().toISOString()
            };

            console.log('Saving beam data:', dataToSave);

            // Reset form after successful save
            setFormData({
                numberOfBeams: '',
                beamLength: '',
                beamWidth: '',
                beamDepth: ''
            });

            return true; // Return true for successful save
        } catch (error) {
            console.error('Error saving beam data:', error);
            return false; // Return false for failed save
        }
    };

    return (
        <div className="grid grid-cols-1 gap-6 p-2">
          
            {/* Beam Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                    label="No. of Beams"
                    name="numberOfBeams"
                    type="number"
                    value={formData.numberOfBeams}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "1", step: "1" }}
                />

                <TextInput
                    label="Beam Length (ft)"
                    name="beamLength"
                    type="number"
                    value={formData.beamLength}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />

                <TextInput
                    label="Beam Width (inch)"
                    name="beamWidth"
                    type="number"
                    value={formData.beamWidth}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />

                <TextInput
                    label="Beam Depth (inch)"
                    name="beamDepth"
                    type="number"
                    value={formData.beamDepth}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />
            </div>

            {/* Calculated Values */}
            {formData.numberOfBeams && formData.beamLength && formData.beamWidth && formData.beamDepth && (
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                        <p className="text-lg font-bold text-gray-800">
                            Beam Volume: <span className="text-[#5BB045]">{calculateVolume()} ft³</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Save Button */}
            <div className="grid grid-cols-1 justify-items-end">
                <SaveButton
                    onClick={handleSave}
                    successMessage="Beam Data Saved Successfully! 🎉"
                    errorMessage={getErrorMessage()}
                />
            </div>
        </div>
    );
}