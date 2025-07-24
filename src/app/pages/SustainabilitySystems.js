"use client";
import React, { useState } from 'react';
import TitleHeader from '@/app/components/header/TitleHeader';
import {
  Box,
  Tabs,
  Tab,
  Typography
} from '@mui/material';

import { Sun, Droplets } from 'lucide-react';
import SolarPanelTab from '@/app/tabs/SolarPanelTab';
import RainWaterHarvestingTab from '@/app/tabs/RainWaterHarvestingTab';

export default function SustainabilitySystems() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="grid grid-cols-1 p-2">
      <TitleHeader>Sustainability & Systems</TitleHeader>
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
                <Sun size={20} />
                <Typography
                  variant="caption"
                  sx={{ color: activeTab === 0 ? '#1976d2' : 'black' }}
                >
                  Solar Panel Calculation
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
                <Droplets size={20} />
                <Typography
                  variant="caption"
                  sx={{ color: activeTab === 1 ? '#1976d2' : 'black' }}
                >
                  Rain Water Harvesting
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
          <SolarPanelTab />
        )}
        {activeTab === 1 && (
          <RainWaterHarvestingTab />
        )}
      </Box>
    </div>
  );
} 