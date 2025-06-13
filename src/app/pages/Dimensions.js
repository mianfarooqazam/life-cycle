'use client';

import { useState } from 'react';
import { 
  Droplets, 
  Layers, 
  Layers2, 
  BoxIcon, 
  Waves, 
  FoldVertical, 
  FoldHorizontal, 
  BrickWall, 
  DoorClosed, 
  Grid2X2, 
  Cuboid 
} from 'lucide-react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Paper,
  Typography 
} from '@mui/material';
import BuildingFloor from '@/app/tabs/BuildingFloor';
import MumtyWalls from '@/app/tabs/MumtyWalls';
import ParapetWalls from '@/app/tabs/ParapetWalls';
import SepticTank from '@/app/tabs/SepticTank';
import TitleHeader from '@/app/components/header/TitleHeader';
import BasementDetails from '../tabs/BasementDetails';
import WaterTank from '../tabs/WaterTank';
import ColumnDetails from '../tabs/ColumnDetails';
import BeamDetails from '../tabs/BeamDetails';
import InsulatedWallDetails from '../tabs/InsulatedWallDetails';
import DoorDetails from '../tabs/DoorDetails';
import WindowDetails from '../tabs/WindowDetails';

export default function Dimensions() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'basement', name: 'Basement', component: BasementDetails, icon: Layers2 },
    { id: 'buildingFloor', name: 'Building Floor', component: BuildingFloor, icon: Layers },
    { id: 'mumtyWalls', name: 'Mumty Walls', component: MumtyWalls, icon: BoxIcon },
    { id: 'parapetWalls', name: 'Parapet Walls', component: ParapetWalls, icon: Cuboid },
    { id: 'septicTank', name: 'Septic Tank', component: SepticTank, icon: Droplets },
    { id: 'waterTank', name: 'Water Tank', component: WaterTank, icon: Waves },
    { id: 'columnDetails', name: 'Column', component: ColumnDetails, icon: FoldHorizontal },
    { id: 'beamDetails', name: 'Beam', component: BeamDetails, icon: FoldVertical },
    { id: 'insulatedWallDetails', name: 'Insulated Wall', component: InsulatedWallDetails, icon: BrickWall },
    { id: 'door', name: 'Door', component: DoorDetails, icon: DoorClosed },
    { id: 'window', name: 'Window', component: WindowDetails, icon: Grid2X2 },
  ];

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const ActiveComponent = tabs[activeTab]?.component || BuildingFloor;

  return (
    <Box sx={{ p: 2 }}>
      <TitleHeader>Building Dimensions</TitleHeader>

      {/* Tabs Navigation */}
      <Paper 
        elevation={0} 
        sx={{ 
          backgroundColor: '#f7f6fb',
          borderBottom: 1,
          borderColor: 'divider',
          mb: 3
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <Tab
                key={tab.id}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Icon size={20} />
                    <Typography variant="caption">{tab.name}</Typography>
                  </Box>
                }
                sx={{
                  textTransform: 'none',
                  minHeight: 'auto',
                  py: 1.5,
                  px: 2,
                  '&.Mui-selected': {
                    color: '#1976d2',
                  },
                  '&:hover': {
                    color: '#1565c0',
                  },
                }}
              />
            );
          })}
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        <ActiveComponent />
      </Box>
    </Box>
  );
}