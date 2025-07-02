"use client";
import React, { useState } from 'react';
import TitleHeader from '@/app/components/header/TitleHeader';
import {
  Box,
  Tabs,
  Tab,
  Typography
} from '@mui/material';

import { Package, DollarSign } from 'lucide-react';
import MaterialsQuantityTab from '@/app/tabs/MaterialsQuantityTab';
import MaterialsCostTab from '@/app/tabs/MaterialsCostTab';

export default function Materials() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="grid grid-cols-1 p-2">
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
          <MaterialsQuantityTab />
        )}
        {activeTab === 1 && (
          <MaterialsCostTab />
        )}
      </Box>
    </div>
  );
}