import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { useExteriorWallStore } from '../store/exteriorWallStore';
import { useInteriorWallStore } from '../store/interiorWallStore';
import { useBasementStore } from '../store/basementStore';
import { useMumtyWallStore } from '../store/mumtyWallStore';
import { useParapetWallsStore } from '../store/parapetWallsStore';
import { WallBrickBlock, ExteriorFinish, InteriorFinish, Insulation } from '../data/Materials';
import { calculateWallMaterials } from '../utils/buildingPlanCalc';

export default function MaterialsQuantityTab() {
  const [selectedView, setSelectedView] = useState('total');

  // Get wall data from store
  const exteriorWallsData = useExteriorWallStore((state) => state.exteriorWallsData);
  const interiorWallsData = useInteriorWallStore((state) => state.interiorWallsData);
  const basementWallsData = useBasementStore((state) => state.basementWallsData);
  const mumtyWallsData = useMumtyWallStore((state) => state.mumtyWallsData);
  const parapetWallsData = useParapetWallsStore((state) => state.parapetWallsData);

  // Grouped view options for dropdown
  const viewOptions = [
    {
      label: 'Building Floor',
      options: [
        { value: 'building-floor', label: 'Floor Walls' }
      ]
    },
    {
      label: 'Basement',
      options: [
        { value: 'basement-wall', label: 'Basement Walls' },
        { value: 'basement-detail', label: 'Basement Detail' }
      ]
    },
    {
      label: 'Mumty',
      options: [
        { value: 'mumty-wall', label: 'Mumty Wall' }
      ]
    },
    {
      label: 'Parapet',
      options: [
        { value: 'parapet-wall', label: 'Parapet Wall' }
      ]
    },
    { value: 'total', label: 'Total' }
  ];

  // Helper to get brick/block type object by name
  const getBrickBlockType = (name) => WallBrickBlock.find(b => b.name === name);

  // Calculate actual material quantities for building floor (all floors, both wall types)
  const getBuildingFloorMaterials = () => {
    const allWalls = [
      ...(exteriorWallsData || []),
      ...(interiorWallsData || [])
    ];
    if (allWalls.length === 0) {
      return [
        { material: 'No. of Bricks/blocks', quantity: '-' },
        { material: 'Cement (bags)', quantity: '-' },
        { material: 'Sand (ft³)', quantity: '-' }
      ];
    }
    let totalBricks = 0;
    let totalCementBags = 0;
    let totalSand = 0;
    allWalls.forEach(wall => {
      const brickType = getBrickBlockType(wall.wallMaterial);
      if (brickType && wall.wallVolume) {
        const result = calculateWallMaterials(wall.wallVolume, brickType);
        totalBricks += result.numBricks;
        totalCementBags += result.cementBags;
        totalSand += result.sandVolume;
      }
    });
    return [
      { material: 'No. of Bricks/blocks', quantity: totalBricks > 0 ? totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: totalCementBags > 0 ? totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: totalSand > 0 ? totalSand.toFixed(2) : '-' }
    ];
  };

  // Calculate actual material quantities for all wall types (for total view)
  const getTotalMaterials = () => {
    const allWalls = [
      ...(exteriorWallsData || []),
      ...(interiorWallsData || [])
      // Add other wall types here if needed (e.g., mumtyWallsData, basementWallsData, etc.)
    ];
    if (allWalls.length === 0) {
      return [
        { material: 'No. of Bricks/blocks', quantity: '-' },
        { material: 'Cement (bags)', quantity: '-' },
        { material: 'Sand (ft³)', quantity: '-' }
      ];
    }
    let totalBricks = 0;
    let totalCementBags = 0;
    let totalSand = 0;
    allWalls.forEach(wall => {
      const brickType = getBrickBlockType(wall.wallMaterial);
      if (brickType && wall.wallVolume) {
        const result = calculateWallMaterials(wall.wallVolume, brickType);
        totalBricks += result.numBricks;
        totalCementBags += result.cementBags;
        totalSand += result.sandVolume;
      }
    });
    return [
      { material: 'No. of Bricks/blocks', quantity: totalBricks > 0 ? totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: totalCementBags > 0 ? totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: totalSand > 0 ? totalSand.toFixed(2) : '-' }
    ];
  };

  // Calculate actual material quantities for basement wall view
  const getBasementWallMaterials = () => {
    const allWalls = [...(basementWallsData || [])];
    if (allWalls.length === 0) {
      return [
        { material: 'No. of Bricks/blocks', quantity: '-' },
        { material: 'Cement (bags)', quantity: '-' },
        { material: 'Sand (ft³)', quantity: '-' }
      ];
    }
    let totalBricks = 0;
    let totalCementBags = 0;
    let totalSand = 0;
    allWalls.forEach(wall => {
      let brickType = WallBrickBlock.find(b => b.name === wall.wallMaterial);
      if (wall.brickvolumewithoutmortar && wall.brickvolumewithmortar) {
        brickType = {
          ...brickType,
          brickvolumewithoutmortar: wall.brickvolumewithoutmortar,
          brickvolumewithmortar: wall.brickvolumewithmortar
        };
      }
      if (brickType && wall.wallVolume) {
        const result = calculateWallMaterials(wall.wallVolume, brickType);
        totalBricks += result.numBricks;
        totalCementBags += result.cementBags;
        totalSand += result.sandVolume;
      }
    });
    return [
      { material: 'No. of Bricks/blocks', quantity: totalBricks > 0 ? totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: totalCementBags > 0 ? totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: totalSand > 0 ? totalSand.toFixed(2) : '-' }
    ];
  };

  // Calculate actual material quantities for mumty wall view
  const getMumtyWallMaterials = () => {
    const allWalls = [...(mumtyWallsData || [])];
    if (allWalls.length === 0) {
      return [
        { material: 'No. of Bricks/blocks', quantity: '-' },
        { material: 'Cement (bags)', quantity: '-' },
        { material: 'Sand (ft³)', quantity: '-' }
      ];
    }
    let totalBricks = 0;
    let totalCementBags = 0;
    let totalSand = 0;
    allWalls.forEach(wall => {
      let brickType = WallBrickBlock.find(b => b.name === wall.wallMaterial);
      if (wall.brickvolumewithoutmortar && wall.brickvolumewithmortar) {
        brickType = {
          ...brickType,
          brickvolumewithoutmortar: wall.brickvolumewithoutmortar,
          brickvolumewithmortar: wall.brickvolumewithmortar
        };
      }
      if (brickType && wall.wallVolume) {
        const result = calculateWallMaterials(wall.wallVolume, brickType);
        totalBricks += result.numBricks;
        totalCementBags += result.cementBags;
        totalSand += result.sandVolume;
      }
    });
    return [
      { material: 'No. of Bricks/blocks', quantity: totalBricks > 0 ? totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: totalCementBags > 0 ? totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: totalSand > 0 ? totalSand.toFixed(2) : '-' }
    ];
  };

  // Calculate actual material quantities for parapet wall view
  const getParapetWallMaterials = () => {
    const allWalls = [...(parapetWallsData || [])];
    if (allWalls.length === 0) {
      return [
        { material: 'No. of Bricks/blocks', quantity: '-' },
        { material: 'Cement (bags)', quantity: '-' },
        { material: 'Sand (ft³)', quantity: '-' }
      ];
    }
    let totalBricks = 0;
    let totalCementBags = 0;
    let totalSand = 0;
    allWalls.forEach(wall => {
      // Use wallMaterial if present, else default to Clay Brick
      let brickType = WallBrickBlock.find(b => b.name === wall.wallMaterial) || WallBrickBlock[0];
      // Calculate wall volume from length, height, thickness (in ft³)
      const length = parseFloat(wall.length);
      const height = parseFloat(wall.height);
      const thickness = parseFloat(wall.thickness);
      let wallVolume = 0;
      if (length && height && thickness) {
        wallVolume = length * height * (thickness / 12); // thickness in feet
      }
      if (brickType && wallVolume > 0) {
        const result = calculateWallMaterials(wallVolume, brickType);
        totalBricks += result.numBricks;
        totalCementBags += result.cementBags;
        totalSand += result.sandVolume;
      }
    });
    return [
      { material: 'No. of Bricks/blocks', quantity: totalBricks > 0 ? totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: totalCementBags > 0 ? totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: totalSand > 0 ? totalSand.toFixed(2) : '-' }
    ];
  };

  const getMaterialsData = (view) => {
    switch (view) {
      case 'building-floor':
        return getBuildingFloorMaterials();
      case 'basement-wall':
        return getBasementWallMaterials();
      case 'basement-detail':
        return [
          { material: 'No. of Bricks/blocks', quantity: '-' },
          { material: 'Cement (bags)', quantity: '-' },
          { material: 'Sand (ft³)', quantity: '-' }
        ];
      case 'mumty-wall':
        return getMumtyWallMaterials();
      case 'parapet-wall':
        return getParapetWallMaterials();
      case 'total':
        return getTotalMaterials();
      default:
        return [
          { material: 'No. of Bricks/blocks', quantity: '-' },
          { material: 'Cement (bags)', quantity: '-' },
          { material: 'Sand (ft³)', quantity: '-' }
        ];
    }
  };

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };

  return (
    <>
      {/* Selection Input */}
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select View</InputLabel>
          <Select
            value={selectedView}
            label="Select View"
            onChange={handleViewChange}
          >
            {viewOptions.map((option) => {
              if (option.options) {
                // Render group heading and its options
                return [
                  <MenuItem key={option.label} disabled sx={{ fontWeight: 'bold', opacity: 1 }}>
                    {option.label}
                  </MenuItem>,
                  option.options.map((subOption) => (
                    <MenuItem
                      key={subOption.value}
                      value={subOption.value}
                      sx={{ pl: 3, fontWeight: subOption.value === 'total' ? 'bold' : 'normal' }}
                    >
                      {subOption.label}
                    </MenuItem>
                  ))
                ];
              }
              return (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ fontWeight: option.value === 'total' ? 'bold' : 'normal' }}
                >
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f7f6fb" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#000" }}>Materials</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#000" }}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getMaterialsData(selectedView).map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: "#ffffff",
                  '&:hover': {
                    backgroundColor: "#f7f6fb"
                  }
                }}
              >
                <TableCell sx={{ fontWeight: "medium" }}>{row.material}</TableCell>
                <TableCell>{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
} 