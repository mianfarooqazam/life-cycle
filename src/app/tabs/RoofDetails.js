"use client";
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
import RoofTable from '@/app/components/table/RoofTable';
import { useRoofDetailsStore } from '@/app/store/roofDetailsStore';
import {
   FormControl,
   RadioGroup,
   FormControlLabel,
   Radio,
   FormLabel
} from '@mui/material';

export default function RoofDetails() {
    const {
        formData,
        roofData,
        editingId,
        updateFormData,
        resetFormData,
        addRoofData,
        updateRoofData,
        deleteRoofData,
        setEditingId,
        clearEditingId,
        calculateVolume,
        calculateTotalVolume,
        validateForm,
        getErrorMessage
    } = useRoofDetailsStore();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    // Handle form submission
    const handleSave = () => {
        // Validation
        if (!validateForm()) {
            return false;
        }

        try {
            const newRoofData = {
                id: editingId || Date.now(),
                srNo: editingId ? roofData.find(item => item.id === editingId)?.srNo : roofData.length + 1,
                roofArea: formData.roofArea,
                roofThickness: formData.roofThickness,
                isInsulationUsed: formData.isInsulationUsed,
                insulationThickness: formData.isInsulationUsed === 'yes' ? formData.insulationThickness : '',
                roofVolume: calculateVolume(),
                timestamp: new Date().toISOString()
            };

            if (editingId) {
                // Update existing entry
                updateRoofData(editingId, newRoofData);
                clearEditingId();
            } else {
                // Add new entry
                addRoofData(newRoofData);
            }

            // Reset form after successful save
            resetFormData();

            return true; // Return true for successful save
        } catch (error) {
            console.error('Error saving roof data:', error);
            return false; // Return false for failed save
        }
    };

    // Handle edit
    const handleEdit = (id) => {
        const roofToEdit = roofData.find(item => item.id === id);
        if (roofToEdit) {
            updateFormData({
                roofArea: roofToEdit.roofArea,
                roofThickness: roofToEdit.roofThickness,
                isInsulationUsed: roofToEdit.isInsulationUsed,
                insulationThickness: roofToEdit.insulationThickness || ''
            });
            setEditingId(id);
        }
    };

    // Handle delete
    const handleDelete = (id) => {
        deleteRoofData(id);
        
        // If we were editing the deleted item, reset the form
        if (editingId === id) {
            clearEditingId();
            resetFormData();
        }
    };

    return (
        <div className="grid grid-cols-1 gap-6 p-2">
          
            {/* Roof Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                    label="Roof Area (ft²)"
                    name="roofArea"
                    type="number"
                    value={formData.roofArea}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />

                <TextInput
                    label="Roof Thickness (inch)"
                    name="roofThickness"
                    type="number"
                    value={formData.roofThickness}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />
            </div>

            {/* Insulation Radio Button */}
            <div className="grid grid-cols-1">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Is Insulation Used in Roof?</FormLabel>
                    <RadioGroup
                        row
                        name="isInsulationUsed"
                        value={formData.isInsulationUsed}
                        onChange={handleInputChange}
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>

            {/* Insulation Thickness Input */}
            {formData.isInsulationUsed === 'yes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInput
                        label="Insulation Thickness (inch)"
                        name="insulationThickness"
                        type="number"
                        value={formData.insulationThickness}
                        onChange={handleInputChange}
                        required
                        inputProps={{ min: "0", step: "0.1" }}
                    />
                </div>
            )}

            {/* Calculated Values */}
            {formData.roofArea && formData.roofThickness && (
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                        <p className="text-lg font-bold text-gray-800">
                            Roof Volume: <span className="text-[#5BB045]">{calculateVolume()} ft³</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Save Button */}
            <div className="grid grid-cols-1 justify-items-end">
                <SaveButton
                    onClick={handleSave}
                    successMessage={editingId ? "Roof Data Updated Successfully! 🎉" : "Roof Data Saved Successfully! 🎉"}
                    errorMessage={getErrorMessage()}
                />
            </div>

            {/* Roof Table */}
            {roofData.length > 0 && (
                <div className="mt-8">
                    <RoofTable
                        data={roofData}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        showTotals={true}
                        totalCalculations={{
                            totalVolume: calculateTotalVolume()
                        }}
                    />
                </div>
            )}
        </div>
    );
}