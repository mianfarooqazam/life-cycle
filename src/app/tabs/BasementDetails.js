"use client";
import React, { useState } from 'react';
import TextInput from '@/app/components/input/TextInput';
import SaveButton from '@/app/components/button/SaveButton';
import { useBasementStore } from '@/app/store/basementStore';
import { useBuildingPlanStore } from '@/app/store/buildingPlanStore';
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
} from '@mui/material';

import BasementWallModal from '@/app/components/modal/BasementWallModal';
import BasementWallTable from '@/app/components/table/BasementWallTable';
import RetainingWallModal from '@/app/components/modal/RetainingWallModal';
import RetainingWallTable from '@/app/components/table/RetainingWallTable';
import toast from 'react-hot-toast';

export default function BasementDetails() {
  const foundationType = useBuildingPlanStore((state) => state.foundationType);
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
    getErrorMessage,
    raftFoundationData,
    updateRaftFoundationData,
    calculateRaftVolume,
    retainingFormData,
    retainingWallsData,
    retainingEditingId,
    updateRetainingFormData,
    resetRetainingFormData,
    addRetainingWallData,
    updateRetainingWallData,
    deleteRetainingWallData,
    setRetainingEditingId,
    clearRetainingEditingId,
    getRetainingEditingRow,
    calculateRetainingVolume,
    validateRetainingForm,
    getRetainingErrorMessage,
    stripFormData,
    updateStripFormData,
    resetStripFormData,
    calculateStripVolume
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

  const [retainingModalOpen, setRetainingModalOpen] = useState(false);

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
        interiorFinish: row.interiorFinish || '',
        isTilesUsed: row.isTilesUsed || 'no',
        tileHeight: row.tileHeight || '',
        customWallMaterialCost: row.customWallMaterialCost || '',
        customExteriorFinishCost: row.customExteriorFinishCost || '',
        customInteriorFinishCost: row.customInteriorFinishCost || '',
        customInsulationCost: row.customInsulationCost || '',
        customTilesCost: row.customTilesCost || ''
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

  // Save handler for Basement Details main page
  const handleSave = () => {
    const missingFields = [];
    if (!excavationData.length) missingFields.push('excavation length');
    if (!excavationData.width) missingFields.push('excavation width');
    if (!excavationData.depth) missingFields.push('excavation depth');
    if (missingFields.length > 0) {
      toast.error('Please enter: ' + missingFields.join(', '));
      return false;
    }
    // No further validation for wall fields here
    return true;
  };

  // Save handler for Basement Wall Modal (modal-only validation)
  const handleWallModalSave = () => {
    const missingFields = [];
    if (!formData.wallMaterial) missingFields.push('wall material');
    if (!formData.length) missingFields.push('basement wall length');
    if (!formData.height) missingFields.push('basement wall height');
    if (!formData.thickness) missingFields.push('basement wall thickness');
    if (foundationType === 'strip') {
      if (!formData.stripWidth) missingFields.push('strip width');
      if (!formData.stripDepth) missingFields.push('strip depth');
    }
    if (missingFields.length > 0) {
      toast.error('Please enter: ' + missingFields.join(', '));
      return false;
    }
    // Calculate total door and window area
    const doorArea = Number(calculateDoorArea());
    const windowArea = Number(calculateWindowArea());
    const wallArea = Number(calculateWallArea());
    if (doorArea && doorArea >= wallArea) {
      toast.error('Door area cannot be equal to or greater than wall area!');
      return false;
    }
    if (windowArea && windowArea >= wallArea) {
      toast.error('Window area cannot be equal to or greater than wall area!');
      return false;
    }
    if (doorArea && windowArea && (doorArea + windowArea) >= wallArea) {
      toast.error('Combined door and window area cannot be equal to or greater than wall area!');
      return false;
    }
    // Save wall data as before
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
      isTilesUsed: formData.isTilesUsed,
      tileHeight: formData.tileHeight,
      tilesArea: useBasementStore.getState().calculateTilesArea(),
      component: [
        doorForm.doorType && doorForm.quantity ? `Door (${doorForm.quantity})` : null,
        windowForm.windowType && windowForm.quantity ? `Window (${windowForm.quantity})` : null
      ].filter(Boolean).join(' / '),
      doorType: doorForm.doorType,
      windowType: windowForm.windowType || '',
      windowQuantity: windowForm.quantity !== undefined ? windowForm.quantity : '',
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
      windowCost: windowForm.costPerWindow,
      stripDepth: formData.stripDepth,
      stripWidth: formData.stripWidth,
      stripVolume: useBasementStore.getState().calculateStripVolumeForWall(),
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

  const handleRetainingEdit = (id) => {
    setRetainingEditingId(id);
    const row = getRetainingEditingRow(id);
    if (row) {
      updateRetainingFormData({
        wallType: row.wallType || '',
        length: row.length || '',
        height: row.height || '',
        thickness: row.thickness || ''
      });
      // Populate strip form data if foundationType is 'strip'
      if (foundationType === 'strip') {
        updateStripFormData({
          depth: row.stripDepth || '',
          width: row.stripWidth || ''
        });
      }
    }
    setRetainingModalOpen(true);
  };

  const handleRetainingSave = () => {
    if (!validateRetainingForm()) return false;
    let newRow = {
      id: retainingEditingId || Date.now(),
      wallType: retainingFormData.wallType,
      length: retainingFormData.length,
      height: retainingFormData.height,
      thickness: retainingFormData.thickness,
      volume: calculateRetainingVolume()
    };
    // Add strip data if foundationType is 'strip'
    if (foundationType === 'strip') {
      newRow = {
        ...newRow,
        stripDepth: stripFormData.depth,
        stripWidth: stripFormData.width,
        stripVolume: calculateStripVolume()
      };
    }
    if (retainingEditingId) {
      updateRetainingWallData(retainingEditingId, newRow);
      clearRetainingEditingId();
    } else {
      addRetainingWallData(newRow);
    }
    resetRetainingFormData();
    resetStripFormData();
    setRetainingModalOpen(false);
    return true;
  };

  const handleRetainingDelete = (id) => {
    deleteRetainingWallData(id);
  };

  // Handler for raft foundation input changes
  const handleRaftFoundationChange = (e) => {
    const { name, value } = e.target;
    updateRaftFoundationData({ [name]: value });
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
        onSave={handleWallModalSave}
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
        calculateTilesArea={useBasementStore.getState().calculateTilesArea}
        foundationType={foundationType}
        calculateStripVolumeForWall={useBasementStore.getState().calculateStripVolumeForWall}
      />
      <BasementWallTable
        data={basementWallsData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Basement Details (Raft/Strip Foundation) Section */}
      {(foundationType === 'raft' || foundationType === 'strip') && (
        <>
          <h2 className="text-lg font-bold mb-2 text-center mt-8">Basement Details ({foundationType === 'raft' ? ' Raft Foundation ' : ' Strip Foundation '})</h2>
          {foundationType === 'raft' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <TextInput
                  label="Raft Area (ft²)"
                  name="area"
                  type="number"
                  value={raftFoundationData.area}
                  onChange={handleRaftFoundationChange}
                  inputProps={{ min: '0', step: '0.1' }}
                />
                <TextInput
                  label="Raft Thickness (inches)"
                  name="thickness"
                  type="number"
                  value={raftFoundationData.thickness}
                  onChange={handleRaftFoundationChange}
                  inputProps={{ min: '0', step: '0.1' }}
                />
              </div>
              {(raftFoundationData.area && raftFoundationData.thickness) && (
                <div className="p-4 rounded-md mb-6" style={{ backgroundColor: '#f7f6fb' }}>
                  <p className="text-lg font-bold text-gray-800">
                    Raft volume: <span className="text-[#5BB045]">{calculateRaftVolume()} ft³</span>
                  </p>
                </div>
              )}
            </>
          )}
          {foundationType === 'strip' && (
            <>
             
              <TableContainer sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 700 }} stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', color: '#000', padding: '16px 8px', minWidth: 80, whiteSpace: 'nowrap' }}>Sr. No.</TableCell>
                      <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', color: '#000', padding: '16px 8px', minWidth: 120, whiteSpace: 'nowrap' }}>Source</TableCell>
                      <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', color: '#000', padding: '16px 8px', minWidth: 120, whiteSpace: 'nowrap' }}>Wall Ref</TableCell>
                      <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', color: '#000', padding: '16px 8px', minWidth: 120, whiteSpace: 'nowrap' }}>Strip Depth (ft)</TableCell>
                      <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', color: '#000', padding: '16px 8px', minWidth: 120, whiteSpace: 'nowrap' }}>Strip Width (ft)</TableCell>
                      <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', color: '#000', padding: '16px 8px', minWidth: 120, whiteSpace: 'nowrap' }}>Strip Volume (ft³)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(() => {
                      const stripRows = [
                        ...basementWallsData.filter(row => row.stripDepth && row.stripWidth && row.stripVolume).map(row => ({
                          ...row,
                          _source: 'Basement Wall',
                          _ref: row.wallMaterial || '-'
                        })),
                        ...retainingWallsData.filter(row => row.stripDepth && row.stripWidth && row.stripVolume).map(row => ({
                          ...row,
                          _source: 'Retaining Wall',
                          _ref: row.wallType ? `Retaining ${row.wallType === 'brick' ? 'Brick' : 'Concrete'}` : '-'
                        }))
                      ];
                      if (stripRows.length === 0) {
                        return (
                          <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 4, textAlign: 'center' }}>
                              No strip foundation data available.
                            </TableCell>
                          </TableRow>
                        );
                      }
                      return stripRows.map((row, idx) => (
                        <TableRow key={row.id + row._source} sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: '#f7f6fb' } }}>
                          <TableCell sx={{ textAlign: 'center', fontWeight: 'medium', padding: '12px 8px', whiteSpace: 'nowrap' }}>{idx + 1}</TableCell>
                          <TableCell sx={{ textAlign: 'center', fontWeight: 'medium', padding: '12px 8px', whiteSpace: 'nowrap' }}>{row._source}</TableCell>
                          <TableCell sx={{ textAlign: 'center', fontWeight: 'medium', padding: '12px 8px', whiteSpace: 'nowrap' }}>{row._ref}</TableCell>
                          <TableCell sx={{ textAlign: 'center', fontWeight: 'medium', padding: '12px 8px', whiteSpace: 'nowrap' }}>{row.stripDepth}</TableCell>
                          <TableCell sx={{ textAlign: 'center', fontWeight: 'medium', padding: '12px 8px', whiteSpace: 'nowrap' }}>{row.stripWidth}</TableCell>
                          <TableCell sx={{ textAlign: 'center', fontWeight: 'medium', padding: '12px 8px', whiteSpace: 'nowrap' }}>{row.stripVolume}</TableCell>
                        </TableRow>
                      ));
                    })()}
                  </TableBody>
                </Table>
              </TableContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                Strip details can be edited / deleted from Retaining Wall table.
              </Alert>
            </>
          )}
        </>
      )}

      {/* Basement Finishing Section */}
      <h2 className="text-lg font-bold mb-2 text-center mt-8">Basement Finishing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <TextInput label="Basement Ceiling Area (ft²)" name="ceilingArea" type="number" value={finishingData.ceilingArea} onChange={handleFinishingChange} inputProps={{ min: '0', step: '0.1' }} />
        <TextInput label="Basement Tiles Area (ft²)" name="tilesArea" type="number" value={finishingData.tilesArea} onChange={handleFinishingChange} inputProps={{ min: '0', step: '0.1' }} />
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

      {/* Retaining Wall Section (moved after finishing) */}
      <Button
        variant="contained"
        onClick={() => { resetRetainingFormData(); clearRetainingEditingId(); setRetainingModalOpen(true); }}
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
          mt: 2,
          mb: 4,
          '&:hover': {
            backgroundColor: '#4a9537',
            color: '#fff',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
          }
        }}
      >
        Open Retaining Wall Form
      </Button>
      <RetainingWallModal
        open={retainingModalOpen}
        onClose={() => setRetainingModalOpen(false)}
        onSave={handleRetainingSave}
        editingRow={retainingEditingId ? getRetainingEditingRow(retainingEditingId) : null}
        formData={retainingFormData}
        updateFormData={updateRetainingFormData}
        resetFormData={resetRetainingFormData}
        calculateVolume={calculateRetainingVolume}
        stripFormData={stripFormData}
        updateStripFormData={updateStripFormData}
        calculateStripVolume={calculateStripVolume}
      />
      {retainingWallsData.length > 0 && (
        <>
          <h2 className="text-lg font-bold mb-2 text-center ">Retaining Wall</h2>
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <RetainingWallTable
              data={retainingWallsData}
              onEdit={handleRetainingEdit}
              onDelete={handleRetainingDelete}
            />
          </div>
        </>
      )}
      {/* Save Button (moved to end) */}
      <div className="grid grid-cols-1 justify-items-end mt-6">
        <SaveButton
          onClick={handleSave}
          successMessage={editingId ? "Basement Data Updated Successfully! 🎉" : "Basement Data Saved Successfully! 🎉"}
        />
      </div>
    </div>
  );
}