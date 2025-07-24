import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';

export default function RainWaterHarvestingTab() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
          Rain Water Harvesting System
        </Typography>
        <Typography variant="body1" color="text.secondary">
         Will be available in upcoming update
        </Typography>
      </Box>

    </div>
  );
} 