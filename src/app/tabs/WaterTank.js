"use client";
import TextInput from '@/app/components/input/TextInput';
import SaveButton from '@/app/components/button/SaveButton';
import { useWaterTankStore } from '@/app/store/waterTankStore';
import { useState } from 'react';
import WaterTankTable from '@/app/components/table/WaterTankTable';

export default function WaterTank() {
  const {
    formData,
    waterTankData,
    editingId,
    updateFormData,
    resetFormData,
    addWaterTankData,
    updateWaterTankData,
    deleteWaterTankData,
    setEditingId,
    clearEditingId,
    calculateWallVolume,
    calculateColumnVolume,
    calculateTopSlabVolume,
    calculateBottomSlabVolume,
    calculateUndergroundExcavationVolume,
    calculateUndergroundWallVolume,
    calculateUndergroundTopSlabVolume,
    calculateUndergroundBottomSlabVolume,
    validateForm,
    getErrorMessage
  } = useWaterTankStore();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // Handle radio change
  const handleRadioChange = (e) => {
    updateFormData({ isUnderground: e.target.value });
  };

  // Handle form submission
  const handleSave = () => {
    if (!validateForm()) {
      return false;
    }
    try {
      const newData = {
        id: editingId || Date.now(),
        srNo: editingId ? waterTankData.find(item => item.id === editingId)?.srNo : waterTankData.length + 1,
        ...formData,
        wallVolume: calculateWallVolume(),
        columnVolume: calculateColumnVolume(),
        topSlabVolume: calculateTopSlabVolume(),
        bottomSlabVolume: calculateBottomSlabVolume(),
        undergroundExcavationVolume: calculateUndergroundExcavationVolume(),
        undergroundWallVolume: calculateUndergroundWallVolume(),
        undergroundTopSlabVolume: calculateUndergroundTopSlabVolume(),
        undergroundBottomSlabVolume: calculateUndergroundBottomSlabVolume(),
        timestamp: new Date().toISOString()
      };
      if (editingId) {
        updateWaterTankData(editingId, newData);
        clearEditingId();
      } else {
        addWaterTankData(newData);
      }
      resetFormData();
      return true;
    } catch (error) {
      console.error('Error saving water tank data:', error);
      return false;
    }
  };

  // Handle edit
  const handleEdit = (id) => {
    const itemToEdit = waterTankData.find(item => item.id === id);
    if (itemToEdit) {
      updateFormData({ ...itemToEdit });
      setEditingId(id);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    deleteWaterTankData(id);
    if (editingId === id) {
      clearEditingId();
      resetFormData();
    }
  };

  // UI
  return (
    <div className="grid grid-cols-1 gap-6 p-2">
      {/* Water tank wall */}
      <h2 className="text-lg font-bold mb-2 text-center">Water tank wall</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="Water tank wall length (ft)" name="wallLength" type="number" value={formData.wallLength} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Water tank wall height (ft)" name="wallHeight" type="number" value={formData.wallHeight} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Water tank wall thickness (inch)" name="wallThickness" type="number" value={formData.wallThickness} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
      </div>
      {(formData.wallLength && formData.wallHeight && formData.wallThickness) && (
        <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
          <p className="text-lg font-bold text-gray-800">
            Water tank wall volume: <span className="text-[#5BB045]">{calculateWallVolume()} ft³</span>
          </p>
        </div>
      )}

      {/* Water tank column */}
      <h2 className="text-lg font-bold mb-2 text-center">Water tank column</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="No of columns" name="numberOfColumns" type="number" value={formData.numberOfColumns} onChange={handleInputChange} inputProps={{ min: "0", step: "1" }} />
        <TextInput label="Column height (ft)" name="columnHeight" type="number" value={formData.columnHeight} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Column length (inch)" name="columnLength" type="number" value={formData.columnLength} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Column width (inch)" name="columnWidth" type="number" value={formData.columnWidth} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
      </div>
      {(formData.numberOfColumns && formData.columnHeight && formData.columnLength && formData.columnWidth) && (
        <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
          <p className="text-lg font-bold text-gray-800">
            Water tank column volume: <span className="text-[#5BB045]">{calculateColumnVolume()} ft³</span>
          </p>
        </div>
      )}

      {/* Water tank Top slab */}
      <h2 className="text-lg font-bold mb-2 text-center">Water tank Top slab</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="Area (ft²)" name="topSlabArea" type="number" value={formData.topSlabArea} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Thickness (inch)" name="topSlabThickness" type="number" value={formData.topSlabThickness} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
      </div>
      {(formData.topSlabArea && formData.topSlabThickness) && (
        <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
          <p className="text-lg font-bold text-gray-800">
            Water tank top slab volume: <span className="text-[#5BB045]">{calculateTopSlabVolume()} ft³</span>
          </p>
        </div>
      )}

      {/* Water tank Bottom slab */}
      <h2 className="text-lg font-bold mb-2 text-center">Water tank bottom slab</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="Area (ft²)" name="bottomSlabArea" type="number" value={formData.bottomSlabArea} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Thickness (inch)" name="bottomSlabThickness" type="number" value={formData.bottomSlabThickness} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
      </div>
      {(formData.bottomSlabArea && formData.bottomSlabThickness) && (
        <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
          <p className="text-lg font-bold text-gray-800">
            Water tank bottom slab volume: <span className="text-[#5BB045]">{calculateBottomSlabVolume()} ft³</span>
          </p>
        </div>
      )}

      {/* Underground radio */}
      <div className="flex items-center gap-4 mt-4">
        <label className="font-semibold">Is underground water-tank used?</label>
        <label className="flex items-center gap-1">
          <input type="radio" name="isUnderground" value="yes" checked={formData.isUnderground === 'yes'} onChange={handleRadioChange} /> Yes
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="isUnderground" value="no" checked={formData.isUnderground === 'no'} onChange={handleRadioChange} /> No
        </label>
      </div>

      {/* Underground fields */}
      {formData.isUnderground === 'yes' && (
        <>
          {/* Underground Water tank excavation */}
          <h2 className="text-lg font-bold mb-2 text-center mt-6">Underground Water tank excavation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput label="Length (ft)" name="undergroundLength" type="number" value={formData.undergroundLength} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
            <TextInput label="Width (ft)" name="undergroundWidth" type="number" value={formData.undergroundWidth} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
            <TextInput label="Depth (ft)" name="undergroundDepth" type="number" value={formData.undergroundDepth} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
          </div>
          {(formData.undergroundLength && formData.undergroundWidth && formData.undergroundDepth) && (
            <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
              <p className="text-lg font-bold text-gray-800">
                Underground Water tank excavation volume: <span className="text-[#5BB045]">{calculateUndergroundExcavationVolume()} ft³</span>
              </p>
            </div>
          )}

          {/* Underground Water tank wall */}
          <h2 className="text-lg font-bold mb-2 text-center">Underground Water tank wall</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput label="Underground water tank wall length (ft)" name="undergroundWallLength" type="number" value={formData.undergroundWallLength} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
            <TextInput label="Underground water tank wall height (ft)" name="undergroundWallHeight" type="number" value={formData.undergroundWallHeight} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
            <TextInput label="Underground water tank wall thickness (inch)" name="undergroundWallThickness" type="number" value={formData.undergroundWallThickness} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
          </div>
          {(formData.undergroundWallLength && formData.undergroundWallHeight && formData.undergroundWallThickness) && (
            <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
              <p className="text-lg font-bold text-gray-800">
                Underground water tank wall volume: <span className="text-[#5BB045]">{calculateUndergroundWallVolume()} ft³</span>
              </p>
            </div>
          )}

          {/* Underground Water tank Top slab */}
          <h2 className="text-lg font-bold mb-2 text-center">Underground Water tank Top slab</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput label="Area (ft²)" name="undergroundTopSlabArea" type="number" value={formData.undergroundTopSlabArea} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
            <TextInput label="Thickness (inch)" name="undergroundTopSlabThickness" type="number" value={formData.undergroundTopSlabThickness} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
          </div>
          {(formData.undergroundTopSlabArea && formData.undergroundTopSlabThickness) && (
            <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
              <p className="text-lg font-bold text-gray-800">
                Underground water tank top slab volume: <span className="text-[#5BB045]">{calculateUndergroundTopSlabVolume()} ft³</span>
              </p>
            </div>
          )}

          {/* Underground Water tank bottom slab */}
          <h2 className="text-lg font-bold mb-2 text-center">Underground Water tank bottom slab</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput label="Area (ft²)" name="undergroundBottomSlabArea" type="number" value={formData.undergroundBottomSlabArea} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
            <TextInput label="Thickness (inch)" name="undergroundBottomSlabThickness" type="number" value={formData.undergroundBottomSlabThickness} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
          </div>
          {(formData.undergroundBottomSlabArea && formData.undergroundBottomSlabThickness) && (
            <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
              <p className="text-lg font-bold text-gray-800">
                Underground water tank bottom slab volume: <span className="text-[#5BB045]">{calculateUndergroundBottomSlabVolume()} ft³</span>
              </p>
            </div>
          )}
        </>
      )}

      {/* Save Button */}
      <div className="grid grid-cols-1 justify-items-end mt-4">
        <SaveButton
          onClick={handleSave}
          successMessage={editingId ? "Water Tank Data Updated Successfully! 🎉" : "Water Tank Data Saved Successfully! 🎉"}
          errorMessage={getErrorMessage()}
        />
      </div>

      {/* Water Tank Table */}
      {waterTankData.length > 0 && (
        <div className="mt-8">
          <WaterTankTable
            data={waterTankData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}