import React from 'react';
import DoorWindowTable from '@/app/components/table/DoorWindowTable';
import { useMumtyWallStore } from '@/app/store/mumtyWallStore';
import { useExteriorWallStore } from '@/app/store/exteriorWallStore';
import { useInteriorWallStore } from '@/app/store/interiorWallStore';

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
  const exteriorWallsData = useExteriorWallStore(state => state.exteriorWallsData);
  const interiorWallsData = useInteriorWallStore(state => state.interiorWallsData);

  // Filter and map to window data for the table
  const mumtyWindowData = mumtyWallsData
    .filter(row => row.windowType)
    .map((row, idx) => ({
      id: row.id,
      wallOrigin: 'Mumty Wall',
      component: 'Window',
      type: row.windowType,
      area: row.windowArea,
      costPerUnit: row.windowCost,
      totalCost: row.windowCost && row.windowQuantity ? (parseFloat(row.windowCost) * parseFloat(row.windowQuantity)) : ''
    }));
  
  const exteriorWindowData = exteriorWallsData
    .filter(row => row.windowType)
    .map((row, idx) => ({
      id: row.id,
      wallOrigin: 'Exterior Wall',
      component: 'Window',
      type: row.windowType,
      area: row.windowArea,
      costPerUnit: row.windowCost,
      totalCost: row.windowCost && row.windowQuantity ? (parseFloat(row.windowCost) * parseFloat(row.windowQuantity)) : ''
    }));

  const interiorWindowData = interiorWallsData
    .filter(row => row.windowType)
    .map((row, idx) => ({
      id: row.id,
      wallOrigin: 'Interior Wall',
      component: 'Window',
      type: row.windowType,
      area: row.windowArea,
      costPerUnit: row.windowCost,
      totalCost: row.windowCost && row.windowQuantity ? (parseFloat(row.windowCost) * parseFloat(row.windowQuantity)) : ''
    }));

  const windowData = [...mumtyWindowData, ...exteriorWindowData, ...interiorWindowData].map((item, idx) => ({ ...item, srNo: idx + 1 }));

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