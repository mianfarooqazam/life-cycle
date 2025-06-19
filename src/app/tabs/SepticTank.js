import TextInput from '@/app/components/input/TextInput';
import SaveButton from '@/app/components/button/SaveButton';
import SepticTankTable from '@/app/components/table/SepticTankTable';
import { useSepticTankStore } from '@/app/store/septicTankStore';
import { useState } from 'react';

export default function SepticTank() {
  const {
    formData,
    septicTankData,
    editingId,
    updateFormData,
    resetFormData,
    addSepticTankData,
    updateSepticTankData,
    deleteSepticTankData,
    setEditingId,
    clearEditingId,
    calculateExcavationVolume,
    calculateWallVolume,
    calculateTopSlabVolume,
    calculateBottomSlabVolume,
    validateForm,
    getErrorMessage
  } = useSepticTankStore();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // Handle form submission
  const handleSave = () => {
    if (!validateForm()) {
      return false;
    }
    try {
      const newData = {
        id: editingId || Date.now(),
        srNo: editingId ? septicTankData.find(item => item.id === editingId)?.srNo : septicTankData.length + 1,
        ...formData,
        excavationVolume: calculateExcavationVolume(),
        wallVolume: calculateWallVolume(),
        topSlabVolume: calculateTopSlabVolume(),
        bottomSlabVolume: calculateBottomSlabVolume(),
        timestamp: new Date().toISOString()
      };
      if (editingId) {
        updateSepticTankData(editingId, newData);
        clearEditingId();
      } else {
        addSepticTankData(newData);
      }
      resetFormData();
      return true;
    } catch (error) {
      console.error('Error saving septic tank data:', error);
      return false;
    }
  };

  // Handle edit
  const handleEdit = (id) => {
    const itemToEdit = septicTankData.find(item => item.id === id);
    if (itemToEdit) {
      updateFormData({ ...itemToEdit });
      setEditingId(id);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    deleteSepticTankData(id);
    if (editingId === id) {
      clearEditingId();
      resetFormData();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-2">
      {/* Septic Tank Excavation */}
      <h2 className="text-lg font-bold mb-2 text-center">Septic Tank Excavation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="Excavation Length (ft)" name="excavationLength" type="number" value={formData.excavationLength} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Excavation Width (ft)" name="excavationWidth" type="number" value={formData.excavationWidth} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Excavation Depth (ft)" name="excavationDepth" type="number" value={formData.excavationDepth} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
      </div>
      {(formData.excavationLength && formData.excavationWidth && formData.excavationDepth) && (
        <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
          <p className="text-lg font-bold text-gray-800">
            Septic tank excavation volume: <span className="text-[#5BB045]">{calculateExcavationVolume()} ft³</span>
          </p>
        </div>
      )}

      {/* Septic Tank Wall */}
      <h2 className="text-lg font-bold mb-2 text-center">Septic Tank Wall</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="Wall Length (ft)" name="wallLength" type="number" value={formData.wallLength} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Wall Height (ft)" name="wallHeight" type="number" value={formData.wallHeight} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Wall Thickness (inch)" name="wallThickness" type="number" value={formData.wallThickness} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
      </div>
      {(formData.wallLength && formData.wallHeight && formData.wallThickness) && (
        <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
          <p className="text-lg font-bold text-gray-800">
            Septic tank wall volume: <span className="text-[#5BB045]">{calculateWallVolume()} ft³</span>
          </p>
        </div>
      )}

      {/* Septic Tank Top Slab */}
      <h2 className="text-lg font-bold mb-2 text-center">Septic Tank Top Slab</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="Area (ft²)" name="topSlabArea" type="number" value={formData.topSlabArea} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Thickness (inch)" name="topSlabThickness" type="number" value={formData.topSlabThickness} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
      </div>
      {(formData.topSlabArea && formData.topSlabThickness) && (
        <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
          <p className="text-lg font-bold text-gray-800">
            Septic tank top slab volume: <span className="text-[#5BB045]">{calculateTopSlabVolume()} ft³</span>
          </p>
        </div>
      )}

      {/* Septic Tank Bottom Slab */}
      <h2 className="text-lg font-bold mb-2 text-center">Septic Tank Bottom Slab</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="Area (ft²)" name="bottomSlabArea" type="number" value={formData.bottomSlabArea} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
        <TextInput label="Thickness (inch)" name="bottomSlabThickness" type="number" value={formData.bottomSlabThickness} onChange={handleInputChange} inputProps={{ min: "0", step: "0.1" }} />
      </div>
      {(formData.bottomSlabArea && formData.bottomSlabThickness) && (
        <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
          <p className="text-lg font-bold text-gray-800">
            Septic tank bottom slab volume: <span className="text-[#5BB045]">{calculateBottomSlabVolume()} ft³</span>
          </p>
        </div>
      )}

      {/* Save Button */}
      <div className="grid grid-cols-1 justify-items-end mt-4">
        <SaveButton
          onClick={handleSave}
          successMessage={editingId ? "Septic Tank Data Updated Successfully! 🎉" : "Septic Tank Data Saved Successfully! 🎉"}
          errorMessage={getErrorMessage()}
        />
      </div>

      {/* Septic Tank Table */}
      {septicTankData.length > 0 && (
        <div className="mt-8">
          <SepticTankTable
            data={septicTankData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}