"use client";
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
import ColumnTable from '@/app/components/table/ColumnTable';
import { useColumnDetailsStore } from '@/app/store/columnDetailsStore';

export default function ColumnDetails() {
    const {
        formData,
        columnData,
        editingId,
        updateFormData,
        resetFormData,
        addColumnData,
        updateColumnData,
        deleteColumnData,
        setEditingId,
        clearEditingId,
        calculateVolume,
        calculateTotalVolume,
        validateForm,
        getErrorMessage
    } = useColumnDetailsStore();

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
            const newColumnData = {
                id: editingId || Date.now(),
                srNo: editingId ? columnData.find(item => item.id === editingId)?.srNo : columnData.length + 1,
                numberOfColumns: formData.numberOfColumns,
                columnHeight: formData.columnHeight,
                columnLength: formData.columnLength,
                columnWidth: formData.columnWidth,
                columnVolume: calculateVolume(),
                timestamp: new Date().toISOString()
            };

            if (editingId) {
                // Update existing entry
                updateColumnData(editingId, newColumnData);
                clearEditingId();
            } else {
                // Add new entry
                addColumnData(newColumnData);
            }

            // Reset form after successful save
            resetFormData();

            return true; // Return true for successful save
        } catch (error) {
            console.error('Error saving column data:', error);
            return false; // Return false for failed save
        }
    };

    // Handle edit
    const handleEdit = (id) => {
        const columnToEdit = columnData.find(item => item.id === id);
        if (columnToEdit) {
            updateFormData({
                numberOfColumns: columnToEdit.numberOfColumns,
                columnHeight: columnToEdit.columnHeight,
                columnLength: columnToEdit.columnLength,
                columnWidth: columnToEdit.columnWidth
            });
            setEditingId(id);
        }
    };

    // Handle delete
    const handleDelete = (id) => {
        deleteColumnData(id);
        
        // If we were editing the deleted item, reset the form
        if (editingId === id) {
            clearEditingId();
            resetFormData();
        }
    };

    return (
        <div className="grid grid-cols-1 gap-6 p-2">
          
            {/* Column Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                    label="No. of Columns"
                    name="numberOfColumns"
                    type="number"
                    value={formData.numberOfColumns}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "1", step: "1" }}
                />

                <TextInput
                    label="Column Height (ft)"
                    name="columnHeight"
                    type="number"
                    value={formData.columnHeight}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />

                <TextInput
                    label="Column Length (inch)"
                    name="columnLength"
                    type="number"
                    value={formData.columnLength}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />

                <TextInput
                    label="Column Width (inch)"
                    name="columnWidth"
                    type="number"
                    value={formData.columnWidth}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                />
            </div>

            {/* Calculated Values */}
            {formData.numberOfColumns && formData.columnHeight && formData.columnLength && formData.columnWidth && (
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                        <p className="text-lg font-bold text-gray-800">
                            Column Volume: <span className="text-[#5BB045]">{calculateVolume()} ft³</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Save Button */}
            <div className="grid grid-cols-1 justify-items-end">
                <SaveButton
                    onClick={handleSave}
                    successMessage={editingId ? "Column Data Updated Successfully! 🎉" : "Column Data Saved Successfully! 🎉"}
                    errorMessage={getErrorMessage()}
                />
            </div>

            {/* Column Table */}
            {columnData.length > 0 && (
                <div className="mt-8">
                    <ColumnTable
                        data={columnData}
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