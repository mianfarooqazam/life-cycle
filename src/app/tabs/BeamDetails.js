"use client";
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
import BeamTable from '@/app/components/table/BeamTable';
import { useBeamDetailsStore } from '@/app/store/beamDetailsStore';

export default function BeamDetails() {
    const {
        formData,
        beamData,
        editingId,
        updateFormData,
        resetFormData,
        addBeamData,
        updateBeamData,
        deleteBeamData,
        setEditingId,
        clearEditingId,
        calculateVolume,
        calculateTotalVolume,
        validateForm,
        getErrorMessage
    } = useBeamDetailsStore();

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
            const newBeamData = {
                id: editingId || Date.now(),
                srNo: editingId ? beamData.find(item => item.id === editingId)?.srNo : beamData.length + 1,
                numberOfBeams: formData.numberOfBeams,
                beamLength: formData.beamLength,
                beamWidth: formData.beamWidth,
                beamDepth: formData.beamDepth,
                beamVolume: calculateVolume(),
                timestamp: new Date().toISOString()
            };

            if (editingId) {
                // Update existing entry
                updateBeamData(editingId, newBeamData);
                clearEditingId();
            } else {
                // Add new entry
                addBeamData(newBeamData);
            }

            // Reset form after successful save
            resetFormData();

            return true; // Return true for successful save
        } catch (error) {
            console.error('Error saving beam data:', error);
            return false; // Return false for failed save
        }
    };

    // Handle edit
    const handleEdit = (id) => {
        const beamToEdit = beamData.find(item => item.id === id);
        if (beamToEdit) {
            updateFormData({
                numberOfBeams: beamToEdit.numberOfBeams,
                beamLength: beamToEdit.beamLength,
                beamWidth: beamToEdit.beamWidth,
                beamDepth: beamToEdit.beamDepth
            });
            setEditingId(id);
        }
    };

    // Handle delete
    const handleDelete = (id) => {
        deleteBeamData(id);
        
        // If we were editing the deleted item, reset the form
        if (editingId === id) {
            clearEditingId();
            resetFormData();
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
                    successMessage={editingId ? "Beam Data Updated Successfully! 🎉" : "Beam Data Saved Successfully! 🎉"}
                    errorMessage={getErrorMessage()}
                />
            </div>

            {/* Beam Table */}
            {beamData.length > 0 && (
                <div className="mt-8">
                    <BeamTable
                        data={beamData}
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