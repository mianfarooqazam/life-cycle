import React from 'react';
import DoorWindowTable from '@/app/components/table/DoorWindowTable';
import { useMumtyWallStore } from '@/app/store/mumtyWallStore';

export default function WindowDetails() {
  const headers = [
    'Sr No.',
    'Wall Origin',
    'Component',
    'Type',
    'Area (ft²)',
    'Cost per Unit',
    'Total Cost'
  ];

  // Get mumty wall data from store
  const mumtyWallsData = useMumtyWallStore(state => state.mumtyWallsData);

  // Filter and map to window data for the table
  const windowData = mumtyWallsData
    .filter(row => row.windowType)
    .map((row, idx) => ({
      id: row.id,
      srNo: idx + 1,
      wallOrigin: 'Mumty Wall',
      component: 'Window',
      type: row.windowType,
      area: row.windowArea,
      costPerUnit: row.windowCost,
      totalCost: row.windowCost && row.windowQuantity ? (parseFloat(row.windowCost) * parseFloat(row.windowQuantity)) : ''
    }));

  return (
    <div className="p-2">
      <DoorWindowTable 
        data={windowData}
        headers={headers}
        showActions={false}
        minWidth={1400}
      />
    </div>
  );
}