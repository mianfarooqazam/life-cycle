// BasementDetails.js
import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Package, Plus } from 'lucide-react';

import WallTable from '@/app/components/table/WallTable';
import MaterialsTable from '@/app/components/table/MaterialsTable';
import MaterialModal from '@/app/components/modal/MaterialModal';

export default function BasementDetails() {
  const [basementData, setBasementData] = useState([
    { id: 1, srNo: 1, wallLength: 12.5, wallHeight: 8.0, wallType: 'Regular', wallThickness: 6, wallArea: 100.0, wallVolume: 600.0, tilesArea: 95.5, wallInsulationThickness: 2, doors: 1, windows: 1 },
    { id: 2, srNo: 2, wallLength: 15.0, wallHeight: 8.5, wallType: 'Regular', wallThickness: 8, wallArea: 127.5, wallVolume: 1020.0, tilesArea: 120.0, wallInsulationThickness: 3, doors: 0, windows: 1 },
    { id: 3, srNo: 3, wallLength: 10.0, wallHeight: 7.5, wallType: 'Curtain', wallThickness: 12, wallArea: 75.0, wallVolume: 37.5, tilesArea: 70.0, wallInsulationThickness: 0, doors: 2, windows: 1 },
    { id: 4, srNo: 4, wallLength: 18.5, wallHeight: 9.0, wallType: 'Regular', wallThickness: 10, wallArea: 166.5, wallVolume: 1665.0, tilesArea: 155.0, wallInsulationThickness: 4, doors: 0, windows: 0 },
    { id: 5, srNo: 5, wallLength: 14.0, wallHeight: 8.0, wallType: 'Curtain', wallThickness: 8, wallArea: 112.0, wallVolume: 672.0, tilesArea: 108.5, wallInsulationThickness: 0, doors: 1, windows: 1 },
  ]);

  const [materialsData, setMaterialsData] = useState([
    { 
      id: 1, 
      srNo: 1, 
      wallBrickBlock: 'Clay Brick (Common Brick)', 
      wallBrickBlockCost: 16, 
      exteriorFinish: 'Enamel Paint', 
      exteriorFinishCost: 980, 
      interiorFinish: 'Emulsion Paint', 
      interiorFinishCost: 800, 
      insulation: 'EPS High Density', 
      insulationCost: 95, 
      insulationThickness: 2 
    },
    { 
      id: 2, 
      srNo: 2, 
      wallBrickBlock: 'Flyash Brick', 
      wallBrickBlockCost: 15, 
      exteriorFinish: 'PVC Wall Panel', 
      exteriorFinishCost: 300, 
      interiorFinish: 'Ceramic Tile', 
      interiorFinishCost: 150, 
      insulation: 'No Insulation Used', 
      insulationCost: 0, 
      insulationThickness: null 
    }
  ]);

  const [materialModalOpen, setMaterialModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const headers = [
    'Sr. No',
    'Wall Length (ft)',
    'Wall Height (ft)',
    'Wall Type',
    'Wall Thickness/Glass Thickness',
    'Wall Area (ft²)',
    'Wall Volume (ft³)',
    'Tiles Area (ft²)',
    'Wall Insulation Thickness (in)',
    'No. of Doors/Windows',
    'Action'
  ];

  const handleEdit = (id) => {
    console.log('Edit item with id:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete item with id:', id);
    setBasementData(basementData.filter(item => item.id !== id));
  };

  const handleMaterialEdit = (id) => {
    const material = materialsData.find(item => item.id === id);
    setEditingMaterial(material);
    setMaterialModalOpen(true);
  };

  const handleMaterialDelete = (id) => {
    setMaterialsData(materialsData.filter(item => item.id !== id));
  };

  const handleMaterialModalClose = () => {
    setMaterialModalOpen(false);
    setEditingMaterial(null);
  };

  const handleMaterialSave = (materialData) => {
    if (editingMaterial) {
      // Update existing material
      setMaterialsData(prev => prev.map(item => 
        item.id === editingMaterial.id 
          ? { ...materialData, id: editingMaterial.id, srNo: editingMaterial.srNo }
          : item
      ));
    } else {
      // Add new material
      const newMaterial = {
        ...materialData,
        id: Date.now(),
        srNo: materialsData.length + 1
      };
      setMaterialsData(prev => [...prev, newMaterial]);
    }
    handleMaterialModalClose();
  };

  // Calculate totals for walls
  const totalArea = basementData.reduce((sum, row) => sum + row.wallArea, 0);
  const totalWallVolumeNoCurtain = basementData
    .filter(row => row.wallType !== 'Curtain')
    .reduce((sum, row) => sum + row.wallVolume, 0);

  const wallTotalCalculations = {
    totalArea,
    totalWallVolumeNoCurtain
  };

  // Calculate totals for materials
  const materialTotalCalculations = {
    totalWallBrickBlockCost: materialsData.reduce((sum, row) => sum + (parseFloat(row.wallBrickBlockCost) || 0), 0),
    totalExteriorFinishCost: materialsData.reduce((sum, row) => sum + (parseFloat(row.exteriorFinishCost) || 0), 0),
    totalInteriorFinishCost: materialsData.reduce((sum, row) => sum + (parseFloat(row.interiorFinishCost) || 0), 0),
    totalInsulationCost: materialsData.reduce((sum, row) => sum + (parseFloat(row.insulationCost) || 0), 0),
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 text-center">Basement Details</h2>
      
      {/* Wall Details Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
          Wall Details
        </Typography>
        <WallTable
          data={basementData}
          headers={headers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showTotals={true}
          totalCalculations={wallTotalCalculations}
        />
      </Box>

      {/* Materials Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Package size={20} color="#5BB045" />
            Material Selections
          </Typography>
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={() => setMaterialModalOpen(true)}
            sx={{
              backgroundColor: '#5BB045',
              color: '#fff',
              fontWeight: 600,
              py: 1,
              px: 2,
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#4a9537',
                color: '#fff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
              },
              '&:active': {
                transform: 'translateY(0px)',
                boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
              }
            }}
          >
            Add Material
          </Button>
        </Box>
        <MaterialsTable
          data={materialsData}
          onEdit={handleMaterialEdit}
          onDelete={handleMaterialDelete}
          showTotals={true}
          totalCalculations={materialTotalCalculations}
        />
      </Box>

      {/* Material Modal */}
      <MaterialModal
        open={materialModalOpen}
        onClose={handleMaterialModalClose}
        onSave={handleMaterialSave}
        editingMaterial={editingMaterial}
      />
    </div>
  );
}