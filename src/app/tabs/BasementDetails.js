// BasementDetails.js
import React, { useState } from 'react';

import WallTable from '@/app/components/table/WallTable';

export default function BasementDetails() {
  const [basementData, setBasementData] = useState([
    { id: 1, srNo: 1, wallLength: 12.5, wallHeight: 8.0, wallType: 'Regular', wallThickness: 6, wallArea: 100.0, wallVolume: 600.0, tilesArea: 95.5, wallInsulationThickness: 2, doors: 1, windows: 1 },
    { id: 2, srNo: 2, wallLength: 15.0, wallHeight: 8.5, wallType: 'Regular', wallThickness: 8, wallArea: 127.5, wallVolume: 1020.0, tilesArea: 120.0, wallInsulationThickness: 3, doors: 0, windows: 1 },
    { id: 3, srNo: 3, wallLength: 10.0, wallHeight: 7.5, wallType: 'Curtain', wallThickness: 12, wallArea: 75.0, wallVolume: 37.5, tilesArea: 70.0, wallInsulationThickness: 0, doors: 2, windows: 1 },
    { id: 4, srNo: 4, wallLength: 18.5, wallHeight: 9.0, wallType: 'Regular', wallThickness: 10, wallArea: 166.5, wallVolume: 1665.0, tilesArea: 155.0, wallInsulationThickness: 4, doors: 0, windows: 0 },
    { id: 5, srNo: 5, wallLength: 14.0, wallHeight: 8.0, wallType: 'Curtain', wallThickness: 8, wallArea: 112.0, wallVolume: 672.0, tilesArea: 108.5, wallInsulationThickness: 0, doors: 1, windows: 1 },
  ]);

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

  // Calculate totals
  const totalArea = basementData.reduce((sum, row) => sum + row.wallArea, 0);
  const totalWallVolumeNoCurtain = basementData
    .filter(row => row.wallType !== 'Curtain')
    .reduce((sum, row) => sum + row.wallVolume, 0);

  const totalCalculations = {
    totalArea,
    totalWallVolumeNoCurtain
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 text-center ">Basement Details</h2>
      <WallTable
        data={basementData}
        headers={headers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showTotals={true}
        totalCalculations={totalCalculations}
      />
    </div>
  );
}