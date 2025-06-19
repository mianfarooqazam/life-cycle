// BasementDetails.js
import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Package, Plus } from 'lucide-react';

import WallTable from '@/app/components/table/WallTable';
import MaterialsTable from '@/app/components/table/MaterialsTable';
import MaterialModal from '@/app/components/modal/MaterialModal';
import TextInput from '@/app/components/input/TextInput';

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

  // Add local state for basement excavation
  const [excavation, setExcavation] = useState({
    length: '',
    width: '',
    depth: ''
  });

  const handleExcavationChange = (e) => {
    const { name, value } = e.target;
    setExcavation((prev) => ({ ...prev, [name]: value }));
  };

  const calculateExcavationVolume = () => {
    const { length, width, depth } = excavation;
    if (length && width && depth) {
      const volume = parseFloat(length) * parseFloat(width) * parseFloat(depth);
      return volume ? volume.toFixed(2) : '0.00';
    }
    return '0.00';
  };

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
      {/* Basement Excavation Section */}
      <h2 className="text-lg font-bold mb-2 text-center">Basement Excavation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <TextInput label="Excavation Length (ft)" name="length" type="number" value={excavation.length} onChange={handleExcavationChange} inputProps={{ min: '0', step: '0.1' }} />
        <TextInput label="Excavation Width (ft)" name="width" type="number" value={excavation.width} onChange={handleExcavationChange} inputProps={{ min: '0', step: '0.1' }} />
        <TextInput label="Excavation Depth (ft)" name="depth" type="number" value={excavation.depth} onChange={handleExcavationChange} inputProps={{ min: '0', step: '0.1' }} />
      </div>
      {(excavation.length && excavation.width && excavation.depth) && (
        <div className="p-4 rounded-md mb-6" style={{ backgroundColor: '#f7f6fb' }}>
          <p className="text-lg font-bold text-gray-800">
            Basement excavation volume: <span className="text-[#5BB045]">{calculateExcavationVolume()} ft³</span>
          </p>
        </div>
      )}
    </div>
  );
}