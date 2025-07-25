"use client";
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
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

            {/* Roof Data Display */}
            {roofData.length > 0 && (
                <div className="mt-8">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">Saved Roof Data</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr No.</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roof Area (ft²)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roof Thickness (inch)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insulation Used</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insulation Thickness (inch)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roof Volume (ft³)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {roofData.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.srNo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.roofArea}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.roofThickness}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.isInsulationUsed === 'yes' ? 'Yes' : 'No'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.insulationThickness || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.roofVolume}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(item.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900" colSpan="5">
                                            Total Roof Volume:
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-[#5BB045]">
                                            {calculateTotalVolume()} ft³
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}