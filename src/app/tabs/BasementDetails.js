"use client";
import React from 'react';
import TextInput from '@/app/components/input/TextInput';
import SaveButton from '@/app/components/button/SaveButton';
import { useBasementStore } from '@/app/store/basementStore';

export default function BasementDetails() {
  const {
    excavationData,
    finishingData,
    basementData,
    editingId,
    updateExcavationData,
    updateFinishingData,
    resetFormData,
    addBasementData,
    updateBasementData,
    setEditingId,
    clearEditingId,
    calculateExcavationVolume,
    calculateTotalExcavationVolume,
    calculateTotalCeilingArea,
    calculateTotalTilesArea,
    validateForm,
    getErrorMessage
  } = useBasementStore();

  const handleExcavationChange = (e) => {
    const { name, value } = e.target;
    updateExcavationData({ [name]: value });
  };

  const handleFinishingChange = (e) => {
    const { name, value } = e.target;
    updateFinishingData({ [name]: value });
  };

  // Handle form submission
  const handleSave = () => {
    // Validation
    if (!validateForm()) {
      return false;
    }

    try {
      const excavationVolume = calculateExcavationVolume();
      
      const dataToSave = {
        id: editingId || Date.now().toString(),
        srNo: editingId ? basementData.find(item => item.id === editingId)?.srNo : basementData.length + 1,
        // Excavation data
        length: excavationData.length,
        width: excavationData.width,
        depth: excavationData.depth,
        excavationVolume: excavationVolume,
        // Finishing data
        ceilingArea: finishingData.ceilingArea,
        tilesArea: finishingData.tilesArea,
        timestamp: new Date().toISOString()
      };

      if (editingId) {
        // Update existing data
        updateBasementData(editingId, dataToSave);
        clearEditingId();
      } else {
        // Add new data
        addBasementData(dataToSave);
      }

      // Reset form after successful save
      resetFormData();

      return true; // Return true for successful save
    } catch (error) {
      console.error('Error saving basement data:', error);
      return false; // Return false for failed save
    }
  };

  return (
    <div className="p-2">
      {/* Basement Excavation Section */}
      <h2 className="text-lg font-bold mb-2 text-center">Basement Excavation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <TextInput label="Excavation Length (ft)" name="length" type="number" value={excavationData.length} onChange={handleExcavationChange} inputProps={{ min: '0', step: '0.1' }} />
        <TextInput label="Excavation Width (ft)" name="width" type="number" value={excavationData.width} onChange={handleExcavationChange} inputProps={{ min: '0', step: '0.1' }} />
        <TextInput label="Excavation Depth (ft)" name="depth" type="number" value={excavationData.depth} onChange={handleExcavationChange} inputProps={{ min: '0', step: '0.1' }} />
      </div>
      {(excavationData.length && excavationData.width && excavationData.depth) && (
        <div className="p-4 rounded-md mb-6" style={{ backgroundColor: '#f7f6fb' }}>
          <p className="text-lg font-bold text-gray-800">
            Basement excavation volume: <span className="text-[#5BB045]">{calculateExcavationVolume()} ft³</span>
          </p>
        </div>
      )}

      {/* Basement Finishing Section */}
      <h2 className="text-lg font-bold mb-2 text-center mt-8">Basement Finishing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <TextInput label="Basement Ceiling Area (ft²)" name="ceilingArea" type="number" value={finishingData.ceilingArea} onChange={handleFinishingChange} inputProps={{ min: '0', step: '0.1' }} />
        <TextInput label="Basement Tiles Area (ft²)" name="tilesArea" type="number" value={finishingData.tilesArea} onChange={handleFinishingChange} inputProps={{ min: '0', step: '0.1' }} />
      </div>

      {/* Save Button */}
      <div className="grid grid-cols-1 justify-items-end mt-6">
        <SaveButton
          onClick={handleSave}
          successMessage={editingId ? "Basement Data Updated Successfully! 🎉" : "Basement Data Saved Successfully! 🎉"}
          errorMessage={getErrorMessage()}
        />
      </div>

      {/* Display saved data summary */}
      {basementData.length > 0 && (
        <div className="mt-8 p-4 rounded-md" style={{ backgroundColor: '#f7f6fb' }}>
          <h3 className="text-lg font-bold mb-4 text-center">Saved Basement Data Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Excavation Volume</p>
              <p className="text-lg font-bold text-[#5BB045]">{calculateTotalExcavationVolume()} ft³</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Ceiling Area</p>
              <p className="text-lg font-bold text-[#5BB045]">{calculateTotalCeilingArea()} ft²</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Tiles Area</p>
              <p className="text-lg font-bold text-[#5BB045]">{calculateTotalTilesArea()} ft²</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}