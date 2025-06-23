import React from 'react';
import DoorWindowTable from '@/app/components/table/DoorWindowTable';
import { useMumtyWallStore } from '@/app/store/mumtyWallStore';

export default function DoorDetails() {
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

  // Filter and map to door data for the table
  const doorData = mumtyWallsData
    .filter(row => row.doorType)
    .map((row, idx) => ({
      id: row.id,
      srNo: idx + 1,
      wallOrigin: 'Mumty Wall',
      component: 'Door',
      type: row.doorType,
      area: row.doorArea,
      costPerUnit: row.doorCost,
      totalCost: row.doorCost && row.doorQuantity ? (parseFloat(row.doorCost) * parseFloat(row.doorQuantity)) : ''
    }));

  return (
    <div className="p-2">
      <DoorWindowTable 
        data={doorData}
        headers={headers}
        showActions={false}
        minWidth={1400}
      />
    </div>
  );
}