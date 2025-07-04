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
import { useSepticTankStore } from '../store/septicTankStore';
import { useWaterTankStore } from '../store/waterTankStore';
import { WallBrickBlock, ExteriorFinish, InteriorFinish, Insulation } from '../data/Materials';
import { calculateWallMaterials, calculatePlasterCementBags, calculatePlasterSandVolume } from '../utils/buildingPlanCalc';

export default function MaterialsQuantityTab() {
  const [selectedView, setSelectedView] = useState('total');

  // Get wall data from store
  const exteriorWallsData = useExteriorWallStore((state) => state.exteriorWallsData);
  const interiorWallsData = useInteriorWallStore((state) => state.interiorWallsData);
  const basementWallsData = useBasementStore((state) => state.basementWallsData);
  const mumtyWallsData = useMumtyWallStore((state) => state.mumtyWallsData);
  const parapetWallsData = useParapetWallsStore((state) => state.parapetWallsData);
  const septicTankData = useSepticTankStore((state) => state.septicTankData);
  const waterTankData = useWaterTankStore((state) => state.waterTankData);

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
    {
      label: 'Septic Tank',
      options: [
        { value: 'septic-tank-wall', label: 'Septic Tank Wall' }
      ]
    },
    {
      label: 'Water Tank',
      options: [
        { value: 'water-tank-wall', label: 'Water Tank Wall' },
        { value: 'underground-water-tank-wall', label: 'Underground Water Tank Wall' }
      ]
    },
    { value: 'total', label: 'Total' }
  ];

  // Helper to get brick/block type object by name
  const getBrickBlockType = (name) => WallBrickBlock.find(b => b.name === name);

  // Helper to sum cement and sand for bricks and plaster for a wall array
  const sumCementSandWithPlaster = (walls, getVolume, getMaterial, getPlasterArea) => {
    let totalBricks = 0;
    let totalCementBags = 0;
    let totalSand = 0;
    walls.forEach(wall => {
      let brickType = WallBrickBlock.find(b => b.name === getMaterial(wall)) || WallBrickBlock[0];
      const wallVolume = getVolume(wall);
      const plasterArea = getPlasterArea(wall);
      if (brickType && wallVolume > 0) {
        const result = calculateWallMaterials(wallVolume, brickType);
        totalBricks += result.numBricks;
        totalCementBags += result.cementBags;
        totalSand += result.sandVolume;
      }
      if (plasterArea && plasterArea > 0) {
        totalCementBags += calculatePlasterCementBags(plasterArea);
        totalSand += calculatePlasterSandVolume(plasterArea);
      }
    });
    return {
      totalBricks,
      totalCementBags,
      totalSand
    };
  };

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
    const sum = sumCementSandWithPlaster(
      allWalls,
      wall => wall.wallVolume,
      wall => wall.wallMaterial,
      wall => wall.plasterArea
    );
    return [
      { material: 'No. of Bricks/blocks', quantity: sum.totalBricks > 0 ? sum.totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: sum.totalCementBags > 0 ? sum.totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: sum.totalSand > 0 ? sum.totalSand.toFixed(2) : '-' }
    ];
  };

  // Calculate actual material quantities for all wall types (for total view)
  const getTotalMaterials = () => {
    // Gather all wall-like data arrays
    const allExteriorWalls = exteriorWallsData || [];
    const allInteriorWalls = interiorWallsData || [];
    const allBasementWalls = basementWallsData || [];
    const allMumtyWalls = mumtyWallsData || [];
    const allParapetWalls = parapetWallsData || [];
    const allSepticTanks = septicTankData || [];
    const allWaterTanks = waterTankData || [];

    let totalBricks = 0;
    let totalCementBags = 0;
    let totalSand = 0;

    // Helper for wall arrays with wallMaterial and wallVolume
    const sumWallArray = (walls, getVolume, getMaterial, getPlasterArea) => {
      const sum = sumCementSandWithPlaster(walls, getVolume, getMaterial, getPlasterArea);
      totalBricks += sum.totalBricks;
      totalCementBags += sum.totalCementBags;
      totalSand += sum.totalSand;
    };

    // Exterior Walls
    sumWallArray(
      allExteriorWalls,
      wall => wall.wallVolume,
      wall => wall.wallMaterial,
      wall => wall.plasterArea
    );
    // Interior Walls
    sumWallArray(
      allInteriorWalls,
      wall => wall.wallVolume,
      wall => wall.wallMaterial,
      wall => wall => wall.plasterArea
    );
    // Basement Walls
    sumWallArray(
      allBasementWalls,
      wall => wall.wallVolume,
      wall => wall.wallMaterial,
      wall => wall.plasterArea
    );
    // Mumty Walls
    sumWallArray(
      allMumtyWalls,
      wall => wall.wallVolume,
      wall => wall.wallMaterial,
      wall => wall.plasterArea
    );
    // Parapet Walls (calculate volume from dimensions)
    sumWallArray(
      allParapetWalls,
      wall => {
        const length = parseFloat(wall.length);
        const height = parseFloat(wall.height);
        const thickness = parseFloat(wall.thickness);
        return length && height && thickness ? length * height * (thickness / 12) : 0;
      },
      wall => wall.wallMaterial,
      wall => wall.plasterArea
    );
    // Septic Tank Walls (calculate volume from dimensions)
    sumWallArray(
      allSepticTanks,
      wall => {
        const length = parseFloat(wall.wallLength);
        const height = parseFloat(wall.wallHeight);
        const thickness = parseFloat(wall.wallThickness);
        return length && height && thickness ? length * height * (thickness / 12) : 0;
      },
      wall => wall.wallMaterial,
      wall => wall.plasterArea
    );
    // Water Tank Walls (above ground)
    sumWallArray(
      allWaterTanks,
      tank => {
        const length = parseFloat(tank.wallLength);
        const height = parseFloat(tank.wallHeight);
        const thickness = parseFloat(tank.wallThickness);
        return length && height && thickness ? length * height * (thickness / 12) : 0;
      },
      tank => tank.wallMaterial,
      tank => tank.plasterArea
    );
    // Underground Water Tank Walls
    sumWallArray(
      allWaterTanks,
      tank => {
        const length = parseFloat(tank.undergroundWallLength);
        const height = parseFloat(tank.undergroundWallHeight);
        const thickness = parseFloat(tank.undergroundWallThickness);
        return length && height && thickness ? length * height * (thickness / 12) : 0;
      },
      tank => tank.undergroundWallMaterial,
      tank => tank.plasterArea
    );

    if (
      totalBricks === 0 &&
      totalCementBags === 0 &&
      totalSand === 0
    ) {
      return [
        { material: 'No. of Bricks/blocks', quantity: '-' },
        { material: 'Cement (bags)', quantity: '-' },
        { material: 'Sand (ft³)', quantity: '-' }
      ];
    }
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
    const sum = sumCementSandWithPlaster(
      allWalls,
      wall => wall.wallVolume,
      wall => wall.wallMaterial,
      wall => wall.plasterArea
    );
    return [
      { material: 'No. of Bricks/blocks', quantity: sum.totalBricks > 0 ? sum.totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: sum.totalCementBags > 0 ? sum.totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: sum.totalSand > 0 ? sum.totalSand.toFixed(2) : '-' }
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
    const sum = sumCementSandWithPlaster(
      allWalls,
      wall => wall.wallVolume,
      wall => wall.wallMaterial,
      wall => wall.plasterArea
    );
    return [
      { material: 'No. of Bricks/blocks', quantity: sum.totalBricks > 0 ? sum.totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: sum.totalCementBags > 0 ? sum.totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: sum.totalSand > 0 ? sum.totalSand.toFixed(2) : '-' }
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
    const sum = sumCementSandWithPlaster(
      allWalls,
      wall => {
        const length = parseFloat(wall.length);
        const height = parseFloat(wall.height);
        const thickness = parseFloat(wall.thickness);
        return length && height && thickness ? length * height * (thickness / 12) : 0;
      },
      wall => wall.wallMaterial,
      wall => wall.plasterArea
    );
    return [
      { material: 'No. of Bricks/blocks', quantity: sum.totalBricks > 0 ? sum.totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: sum.totalCementBags > 0 ? sum.totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: sum.totalSand > 0 ? sum.totalSand.toFixed(2) : '-' }
    ];
  };

  // Calculate actual material quantities for septic tank wall view
  const getSepticTankWallMaterials = () => {
    const allWalls = [...(septicTankData || [])];
    if (allWalls.length === 0) {
      return [
        { material: 'No. of Bricks/blocks', quantity: '-' },
        { material: 'Cement (bags)', quantity: '-' },
        { material: 'Sand (ft³)', quantity: '-' }
      ];
    }
    const sum = sumCementSandWithPlaster(
      allWalls,
      wall => {
        const length = parseFloat(wall.wallLength);
        const height = parseFloat(wall.wallHeight);
        const thickness = parseFloat(wall.wallThickness);
        return length && height && thickness ? length * height * (thickness / 12) : 0;
      },
      wall => wall.wallMaterial,
      wall => wall.plasterArea
    );
    return [
      { material: 'No. of Bricks/blocks', quantity: sum.totalBricks > 0 ? sum.totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: sum.totalCementBags > 0 ? sum.totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: sum.totalSand > 0 ? sum.totalSand.toFixed(2) : '-' }
    ];
  };

  // Calculate actual material quantities for water tank wall view
  const getWaterTankWallMaterials = () => {
    const allTanks = [...(waterTankData || [])];
    if (allTanks.length === 0) {
      return [
        { material: 'No. of Bricks/blocks', quantity: '-' },
        { material: 'Cement (bags)', quantity: '-' },
        { material: 'Sand (ft³)', quantity: '-' }
      ];
    }
    const sum = sumCementSandWithPlaster(
      allTanks,
      tank => {
        const length = parseFloat(tank.wallLength);
        const height = parseFloat(tank.wallHeight);
        const thickness = parseFloat(tank.wallThickness);
        return length && height && thickness ? length * height * (thickness / 12) : 0;
      },
      tank => tank.wallMaterial,
      tank => tank.plasterArea
    );
    return [
      { material: 'No. of Bricks/blocks', quantity: sum.totalBricks > 0 ? sum.totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: sum.totalCementBags > 0 ? sum.totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: sum.totalSand > 0 ? sum.totalSand.toFixed(2) : '-' }
    ];
  };

  // Calculate actual material quantities for underground water tank wall view
  const getUndergroundWaterTankWallMaterials = () => {
    const allTanks = [...(waterTankData || [])];
    if (allTanks.length === 0) {
      return [
        { material: 'No. of Bricks/blocks', quantity: '-' },
        { material: 'Cement (bags)', quantity: '-' },
        { material: 'Sand (ft³)', quantity: '-' }
      ];
    }
    const sum = sumCementSandWithPlaster(
      allTanks,
      tank => {
        const length = parseFloat(tank.undergroundWallLength);
        const height = parseFloat(tank.undergroundWallHeight);
        const thickness = parseFloat(tank.undergroundWallThickness);
        return length && height && thickness ? length * height * (thickness / 12) : 0;
      },
      tank => tank.undergroundWallMaterial,
      tank => tank.plasterArea
    );
    return [
      { material: 'No. of Bricks/blocks', quantity: sum.totalBricks > 0 ? sum.totalBricks.toLocaleString() : '-' },
      { material: 'Cement (bags)', quantity: sum.totalCementBags > 0 ? sum.totalCementBags.toFixed(2) : '-' },
      { material: 'Sand (ft³)', quantity: sum.totalSand > 0 ? sum.totalSand.toFixed(2) : '-' }
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
      case 'septic-tank-wall':
        return getSepticTankWallMaterials();
      case 'water-tank-wall':
        return getWaterTankWallMaterials();
      case 'underground-water-tank-wall':
        return getUndergroundWaterTankWallMaterials();
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