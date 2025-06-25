"use client";
import React, { useState } from 'react';
import TitleHeader from '@/app/components/header/TitleHeader';
import { Toaster } from 'react-hot-toast';
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
  Box,
  Tabs,
  Tab,
  Typography
} from '@mui/material';
import MaterialsTable from '@/app/components/table/MaterialsTable';
import { WallBrickBlock, ExteriorFinish, InteriorFinish, Insulation } from '@/app/data/Materials';
import { Package, DollarSign } from 'lucide-react';

export default function Materials() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedView, setSelectedView] = useState('total');

  const viewOptions = [
    { value: 'basement-raft', label: 'Basement Raft' },
    { value: 'basement-strip', label: 'Basement Strip' },
    { value: 'retaining-wall-brick', label: 'Retaining Wall (Brick)' },
    { value: 'retaining-wall-concrete', label: 'Retaining Wall (Concrete)' },
    { value: 'building-floor', label: 'Building Floor' },
    { value: 'ground-slab', label: 'Ground Slab' },
    { value: 'mumty-wall', label: 'Mumty Wall' },
    { value: 'parapet-walls', label: 'Parapet Walls' },
    { value: 'water-tank', label: 'Water Tank' },
    { value: 'septic-tank', label: 'Septic Tank' },
    { value: 'column', label: 'Column' },
    { value: 'beam', label: 'Beam' },
    { value: 'total', label: 'Total' }
  ];

  const getMaterialsData = (view) => {
    const allMaterials = {
      bricks: { material: "No. of Bricks", quantity: "5,000" },
      bricksRetaining: { material: "No. of Bricks (Retaining Wall)", quantity: "2,000" },
      cement: { material: "Cement (bags)", quantity: "50" },
      sand: { material: "Sand (ft³)", quantity: "100" },
      crush: { material: "Crush (ft³)", quantity: "75" },
      steel: { material: "Steel (ton)", quantity: "2.5" }
    };

    switch (view) {
      case 'basement-raft':
        return [
          allMaterials.bricks,
          allMaterials.cement,
          allMaterials.sand,
          allMaterials.steel,
          allMaterials.crush
        ];
      case 'basement-strip':
        return [
          allMaterials.bricks,
          allMaterials.cement,
          allMaterials.sand,
          allMaterials.crush
        ];
      case 'retaining-wall-brick':
        return [
          allMaterials.bricksRetaining,
          allMaterials.cement,
          allMaterials.sand
        ];
      case 'retaining-wall-concrete':
        return [
          allMaterials.cement,
          allMaterials.sand,
          allMaterials.steel,
          allMaterials.crush
        ];
      case 'building-floor':
        return [
          allMaterials.bricks,
          allMaterials.cement,
          allMaterials.sand
        ];
      case 'ground-slab':
        return [
          allMaterials.cement,
          allMaterials.sand,
          allMaterials.steel,
          allMaterials.crush
        ];
      case 'mumty-wall':
        return [
          allMaterials.bricks,
          allMaterials.cement,
          allMaterials.sand
        ];
      case 'parapet-walls':
        return [
          allMaterials.bricks,
          allMaterials.cement,
          allMaterials.sand
        ];
      case 'water-tank':
        return [
          allMaterials.bricks,
          allMaterials.cement,
          allMaterials.sand,
          allMaterials.steel,
          allMaterials.crush
        ];
      case 'septic-tank':
        return [
          allMaterials.bricks,
          allMaterials.cement,
          allMaterials.sand,
          allMaterials.steel,
          allMaterials.crush
        ];
      case 'column':
        return [
          allMaterials.cement,
          allMaterials.sand,
          allMaterials.steel,
          allMaterials.crush
        ];
      case 'beam':
        return [
          allMaterials.cement,
          allMaterials.sand,
          allMaterials.steel,
          allMaterials.crush
        ];
      case 'total':
      default:
        return [
          allMaterials.bricks,
          allMaterials.bricksRetaining,
          allMaterials.cement,
          allMaterials.sand,
          allMaterials.crush,
          allMaterials.steel
        ];
    }
  };

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };

  // Prepare dummy data for Materials Cost tab (for demonstration)
  const materialsCostData = [
    {
      id: 1,
      srNo: 1,
      wallBrickBlock: WallBrickBlock[0]?.name,
      wallBrickBlockCost: WallBrickBlock[0]?.costperitem,
      exteriorFinish: ExteriorFinish[0]?.name,
      exteriorFinishCost: ExteriorFinish[0]?.costperitem,
      interiorFinish: InteriorFinish[0]?.name,
      interiorFinishCost: InteriorFinish[0]?.costperitem,
      insulation: Insulation[0]?.name,
      insulationCost: Insulation[0]?.costperitem,
      insulationThickness: 2
    },
    {
      id: 2,
      srNo: 2,
      wallBrickBlock: WallBrickBlock[1]?.name,
      wallBrickBlockCost: WallBrickBlock[1]?.costperitem,
      exteriorFinish: ExteriorFinish[1]?.name,
      exteriorFinishCost: ExteriorFinish[1]?.costperitem,
      interiorFinish: InteriorFinish[1]?.name,
      interiorFinishCost: InteriorFinish[1]?.costperitem,
      insulation: Insulation[1]?.name,
      insulationCost: Insulation[1]?.costperitem,
      insulationThickness: 2
    },
    // Add more rows as needed
  ];

  return (
    <div className="grid grid-cols-1 p-2">
      <Toaster />
      <TitleHeader>Materials</TitleHeader>
      <Box sx={{ backgroundColor: '#f7f6fb', mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ '& .MuiTabs-indicator': { backgroundColor: '#1976d2' } }}
        >
          <Tab
            label={
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                <Package size={20} />
                <Typography
                  variant="caption"
                  sx={{ color: activeTab === 0 ? '#1976d2' : 'black' }}
                >
                  Materials Quantity
                </Typography>
              </Box>
            }
            sx={{
              textTransform: 'none',
              minHeight: 'auto',
              py: 1.5,
              px: 2,
              color: 'black',
              '&.Mui-selected': {
                color: '#1976d2',
              },
              '&:hover': {
                color: '#1565c0',
              },
            }}
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                <DollarSign size={20} />
                <Typography
                  variant="caption"
                  sx={{ color: activeTab === 1 ? '#1976d2' : 'black' }}
                >
                  Materials Cost
                </Typography>
              </Box>
            }
            sx={{
              textTransform: 'none',
              minHeight: 'auto',
              py: 1.5,
              px: 2,
              color: 'black',
              '&.Mui-selected': {
                color: '#1976d2',
              },
              '&:hover': {
                color: '#1565c0',
              },
            }}
          />
        </Tabs>
      </Box>
      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && (
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
                  {viewOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{ fontWeight: option.value === 'total' ? 'bold' : 'normal' }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
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
        )}
        {activeTab === 1 && (
          <MaterialsTable data={materialsCostData} minWidth={1200} />
        )}
      </Box>
    </div>
  );
}