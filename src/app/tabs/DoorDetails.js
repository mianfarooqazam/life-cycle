import React from 'react';
import DoorWindowTable from '@/app/components/table/DoorWindowTable';
import { useMumtyWallStore } from '@/app/store/mumtyWallStore';
import { useExteriorWallStore } from '@/app/store/exteriorWallStore';
import { useInteriorWallStore } from '@/app/store/interiorWallStore';
import { useBasementStore } from '@/app/store/basementStore';

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
  const exteriorWallsData = useExteriorWallStore(state => state.exteriorWallsData);
  const interiorWallsData = useInteriorWallStore(state => state.interiorWallsData);
  const basementWallsData = useBasementStore(state => state.basementWallsData);

  // Filter and map to door data for the table
  const mumtyDoorData = mumtyWallsData
    .filter(row => row.doorType)
    .map((row, idx) => ({
      id: row.id,
      wallOrigin: 'Mumty Wall',
      component: 'Door',
      type: row.doorType,
      area: row.doorArea,
      costPerUnit: row.doorCost,
      totalCost: row.doorCost && row.doorQuantity ? (parseFloat(row.doorCost) * parseFloat(row.doorQuantity)) : ''
    }));

  const exteriorDoorData = exteriorWallsData
    .filter(row => row.doorType)
    .map((row, idx) => ({
      id: row.id,
      wallOrigin: 'Exterior Wall',
      component: 'Door',
      type: row.doorType,
      area: row.doorArea,
      costPerUnit: row.doorCost,
      totalCost: row.doorCost && row.doorQuantity ? (parseFloat(row.doorCost) * parseFloat(row.doorQuantity)) : ''
    }));

  const interiorDoorData = interiorWallsData
    .filter(row => row.doorType)
    .map((row, idx) => ({
      id: row.id,
      wallOrigin: 'Interior Wall',
      component: 'Door',
      type: row.doorType,
      area: row.doorArea,
      costPerUnit: row.doorCost,
      totalCost: row.doorCost && row.doorQuantity ? (parseFloat(row.doorCost) * parseFloat(row.doorQuantity)) : ''
    }));

  const basementDoorData = basementWallsData
    .filter(row => row.doorType)
    .map((row, idx) => ({
      id: row.id,
      wallOrigin: 'Basement Wall',
      component: 'Door',
      type: row.doorType,
      area: row.doorArea,
      costPerUnit: row.doorCost,
      totalCost: row.doorCost && row.doorQuantity ? (parseFloat(row.doorCost) * parseFloat(row.doorQuantity)) : ''
    }));

  const doorData = [...mumtyDoorData, ...exteriorDoorData, ...interiorDoorData, ...basementDoorData].map((item, idx) => ({ ...item, srNo: idx + 1 }));

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