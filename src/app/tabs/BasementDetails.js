"use client";
import React, { useState } from 'react';
import TextInput from '@/app/components/input/TextInput';
import SaveButton from '@/app/components/button/SaveButton';
import { useBasementStore } from '@/app/store/basementStore';
import {
  Button,

} from '@mui/material';

import BasementWallModal from '@/app/components/modal/BasementWallModal';
import BasementWallTable from '@/app/components/table/BasementWallTable';

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

  const [mainModalOpen, setMainModalOpen] = useState(false);

  // Wall store logic
  const {
    formData,
    doorForm,
    windowForm,
    basementWallsData,
    updateFormData,
    updateDoorForm,
    updateWindowForm,
    resetDoorForm,
    resetWindowForm,
    addBasementWallData,
    updateBasementWallData,
    deleteBasementWallData,
    getEditingRow,
    calculateWallArea,
    calculateWallVolume,
    calculateDoorArea,
    calculateWindowArea,
  } = useBasementStore();

  const handleExcavationChange = (e) => {
    const { name, value } = e.target;
    updateExcavationData({ [name]: value });
  };

  const handleFinishingChange = (e) => {
    const { name, value } = e.target;
    updateFinishingData({ [name]: value });
  };

  // Modal edit logic
  const handleEdit = (id) => {
    setEditingId(id);
    const row = getEditingRow(id);
    if (row) {
      updateFormData({
        wallMaterial: row.wallMaterial || '',
        length: row.length || '',
        height: row.height || '',
        thickness: row.thickness || '',
        isInsulationUsed: row.insulationUsed || 'no',
        insulationType: row.insulationType || '',
        insulationThickness: row.insulationThickness || '',
        exteriorFinish: row.exteriorFinish || '',
        interiorFinish: row.interiorFinish || ''
      });
      updateDoorForm({
        doorType: row.doorType || '',
        height: row.doorHeight || '',
        width: row.doorWidth || '',
        thickness: row.doorThickness || '',
        quantity: row.doorQuantity || '',
        costPerDoor: row.doorCost || ''
      });
      updateWindowForm({
        windowType: row.windowType || '',
        height: row.windowHeight || '',
        width: row.windowWidth || '',
        thickness: row.windowThickness || '',
        quantity: row.windowQuantity || '',
        costPerWindow: row.windowCost || ''
      });
    }
    setMainModalOpen(true);
  };

  // Save handler for Basement Wall Modal
  const handleSave = () => {
    // Calculate total door and window area
    const doorArea = Number(calculateDoorArea());
    const windowArea = Number(calculateWindowArea());
    const wallArea = Number(calculateWallArea());
    // Validate areas
    if (doorArea && doorArea >= wallArea) {
      return false;
    }
    if (windowArea && windowArea >= wallArea) {
      return false;
    }
    if (doorArea && windowArea && (doorArea + windowArea) >= wallArea) {
      return false;
    }
    if (!formData.length || !formData.height || !formData.thickness) {
      return false;
    }
    const newRow = {
      id: editingId || Date.now(),
      wallMaterial: formData.wallMaterial,
      wallArea: calculateWallArea(),
      wallVolume: calculateWallVolume(),
      insulationUsed: formData.isInsulationUsed,
      insulationType: formData.insulationType,
      insulationThickness: formData.insulationThickness,
      exteriorFinish: formData.exteriorFinish,
      interiorFinish: formData.interiorFinish,
      component: [
        doorForm.doorType && doorForm.quantity ? `Door (${doorForm.quantity})` : null,
        windowForm.windowType && windowForm.quantity ? `Window (${windowForm.quantity})` : null
      ].filter(Boolean).join(' / '),
      doorType: doorForm.doorType,
      windowType: doorForm.windowType,
      doorArea: calculateDoorArea(),
      windowArea: calculateWindowArea(),
      cost: doorForm.doorType ? doorForm.costPerDoor : windowForm.windowType ? windowForm.costPerWindow : '',
      length: formData.length,
      height: formData.height,
      thickness: formData.thickness,
      doorHeight: doorForm.height,
      doorWidth: doorForm.width,
      doorThickness: doorForm.thickness,
      doorQuantity: doorForm.quantity,
      doorCost: doorForm.costPerDoor,
      windowHeight: windowForm.height,
      windowWidth: windowForm.width,
      windowThickness: windowForm.thickness,
      windowQuantity: windowForm.quantity,
      windowCost: windowForm.costPerWindow,
    };
    if (editingId) {
      updateBasementWallData(editingId, newRow);
      clearEditingId();
    } else {
      addBasementWallData(newRow);
    }
    resetFormData();
    resetDoorForm();
    resetWindowForm();
    setMainModalOpen(false);
    return true;
  };

  // Delete handler
  const handleDelete = (id) => {
    deleteBasementWallData(id);
  };

  return (
    <div className="p-2">
      {/* Basement Wall Section */}
      <Button
        variant="contained"
        onClick={() => { resetFormData(); resetDoorForm(); resetWindowForm(); clearEditingId(); setMainModalOpen(true); }}
        sx={{
          backgroundColor: '#5BB045',
          color: '#fff',
          fontWeight: 600,
          py: 1.5,
          px: 3,
          borderRadius: 2,
          textTransform: 'none',
          boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#4a9537',
            color: '#fff',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
          }
        }}
      >
        Open Basement Wall Form
      </Button>
      <BasementWallModal
        open={mainModalOpen}
        onClose={() => setMainModalOpen(false)}
        onSave={handleSave}
        editingRow={editingId ? getEditingRow(editingId) : null}
        formData={formData}
        doorForm={doorForm}
        windowForm={windowForm}
        updateFormData={updateFormData}
        updateDoorForm={updateDoorForm}
        updateWindowForm={updateWindowForm}
        resetFormData={resetFormData}
        resetDoorForm={resetDoorForm}
        resetWindowForm={resetWindowForm}
        calculateWallArea={calculateWallArea}
        calculateWallVolume={calculateWallVolume}
        calculateDoorArea={calculateDoorArea}
        calculateWindowArea={calculateWindowArea}
      />
      <BasementWallTable
        data={basementWallsData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {/* Basement Excavation Section */}
      <h2 className="text-lg font-bold mb-2 text-center mt-8">Basement Excavation</h2>
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