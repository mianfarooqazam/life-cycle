"use client";
import { useState } from 'react';
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
import ColumnTable from '@/app/components/table/ColumnTable';

export default function ColumnDetails() {
    // Form state
    const [formData, setFormData] = useState({
        numberOfColumns: '',
        columnHeight: '',
        columnLength: '',
        columnWidth: ''
    });

    // Table data state
    const [columnData, setColumnData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Calculate column volume
    const calculateVolume = () => {
        const numberOfColumns = parseFloat(formData.numberOfColumns);
        const columnHeight = parseFloat(formData.columnHeight);
        const columnLength = parseFloat(formData.columnLength);
        const columnWidth = parseFloat(formData.columnWidth);
        
        if (numberOfColumns && columnHeight && columnLength && columnWidth) {
            // Convert length and width from inches to feet (divide by 12)
            const lengthInFeet = columnLength / 12;
            const widthInFeet = columnWidth / 12;
            const volumePerColumn = columnHeight * lengthInFeet * widthInFeet;
            const totalVolume = volumePerColumn * numberOfColumns;
            return totalVolume.toFixed(2);
        }
        return '0.00';
    };

    // Validation function
    const validateForm = () => {
        if (!formData.numberOfColumns || !formData.columnHeight || !formData.columnLength || !formData.columnWidth) {
            return false;
        }
        return true;
    };

    // Get error message
    const getErrorMessage = () => {
        if (!formData.numberOfColumns || !formData.columnHeight || !formData.columnLength || !formData.columnWidth) {
            return 'Please fill in all required fields (number of columns, height, length, width)';
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
                setColumnData(prev => prev.map(item => 
                    item.id === editingId ? newColumnData : item
                ));
                setEditingId(null);
            } else {
                // Add new entry
                setColumnData(prev => [...prev, newColumnData]);
            }

            // Reset form after successful save
            setFormData({
                numberOfColumns: '',
                columnHeight: '',
                columnLength: '',
                columnWidth: ''
            });

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
            setFormData({
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
        setColumnData(prev => {
            const filteredData = prev.filter(item => item.id !== id);
            // Update serial numbers
            return filteredData.map((item, index) => ({
                ...item,
                srNo: index + 1
            }));
        });
        
        // If we were editing the deleted item, reset the form
        if (editingId === id) {
            setEditingId(null);
            setFormData({
                numberOfColumns: '',
                columnHeight: '',
                columnLength: '',
                columnWidth: ''
            });
        }
    };

    // Calculate total volume
    const calculateTotalVolume = () => {
        return columnData.reduce((total, item) => total + parseFloat(item.columnVolume), 0).toFixed(2);
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