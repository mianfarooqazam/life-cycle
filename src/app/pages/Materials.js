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
} from '@mui/material';

export default function Materials() {
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

  const materialsData = getMaterialsData(selectedView);

  return (
    <div className="grid grid-cols-1  p-2">
      <Toaster />
      <TitleHeader>Materials</TitleHeader>
      
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
                sx={{ 
                  fontWeight: option.value === 'total' ? 'bold' : 'normal' 
                }}
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
            {materialsData.map((row, index) => (
              <TableRow 
                key={index}
                sx={{ 
                  backgroundColor: "#ffffff",
                  '&:hover': {
                    backgroundColor: "#f7f6fb"
                  }
                }}
              >
                <TableCell sx={{ fontWeight: "medium" }}>
                  {row.material}
                </TableCell>
                <TableCell>
                  {row.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}