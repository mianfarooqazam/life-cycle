"use client";
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
import ParapetWallsTable from '@/app/components/table/ParapetWallsTable';
import { useParapetWallsStore } from '@/app/store/parapetWallsStore';

export default function ParapetWalls() {
    const {
        formData,
        parapetWallsData,
        editingId,
        updateFormData,
        resetFormData,
        addParapetWallData,
        updateParapetWallData,
        deleteParapetWallData,
        setEditingId,
        clearEditingId,
        calculateArea,
        calculateVolume,
        calculateTotalArea,
        calculateTotalVolume,
        validateForm,
        getErrorMessage
    } = useParapetWallsStore();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    // Handle edit
    const handleEdit = (id) => {
        const itemToEdit = parapetWallsData.find(item => item.id === id);
        if (itemToEdit) {
            updateFormData({
                length: itemToEdit.length,
                height: itemToEdit.height,
                thickness: itemToEdit.thickness
            });
            setEditingId(id);
        }
    };

    // Handle delete
    const handleDelete = (id) => {
        deleteParapetWallData(id);
    };

    // Handle form submission
    const handleSave = () => {
        // Validation
        if (!validateForm()) {
            return false;
        }

        try {
            const area = calculateArea();
            const volume = calculateVolume();
            const plasterArea = useParapetWallsStore.getState().calculatePlasterArea();
            
            const dataToSave = {
                id: editingId || Date.now().toString(),
                srNo: editingId ? parapetWallsData.find(item => item.id === editingId)?.srNo : parapetWallsData.length + 1,
                length: formData.length,
                height: formData.height,
                thickness: formData.thickness,
                area: area,
                volume: volume,
                plasterArea: plasterArea,
                timestamp: new Date().toISOString()
            };

            if (editingId) {
                // Update existing data
                updateParapetWallData(editingId, dataToSave);
                clearEditingId();
            } else {
                // Add new data
                addParapetWallData(dataToSave);
            }

            // Reset form after successful save
            resetFormData();

            return true; // Return true for successful save
        } catch (error) {
            console.error('Error saving parapet wall data:', error);
            return false; // Return false for failed save
        }
    };

    // Calculate totals for display
    const totalCalculations = {
        totalArea: calculateTotalArea(),
        totalVolume: calculateTotalVolume(),
        totalPlasterArea: Math.round(parapetWallsData.reduce((total, item) => total + parseFloat(item.plasterArea || 0), 0)).toString()
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                    <p className="text-lg font-bold text-gray-800">
                        Parapet Plaster Area: <span className="text-[#5BB045]">{useParapetWallsStore.getState().calculatePlasterArea()} ft²</span>
                    </p>
                </div>
            </div>
            )}

            {/* Save Button */}
            <div className="grid grid-cols-1 justify-items-end">
                <SaveButton
                    onClick={handleSave}
                    successMessage={editingId ? "Parapet Wall Data Updated Successfully! 🎉" : "Parapet Wall Data Saved Successfully! 🎉"}
                    errorMessage={getErrorMessage()}
                />
            </div>

            {/* Parapet Walls Table */}
            {parapetWallsData.length > 0 && (
                <div className="mt-8">
                    <ParapetWallsTable
                        data={parapetWallsData}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        showTotals={true}
                        totalCalculations={totalCalculations}
                    />
                </div>
            )}
        </div>
    );
}