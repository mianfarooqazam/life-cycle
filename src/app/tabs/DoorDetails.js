import React from 'react';
import DoorWindowTable from '@/app/components/table/DoorWindowTable';

export default function DoorDetails() {
  
  const headers = [
    'Sr No.',
    'Wall Origin',
    'Door Type',
    'Area (ft²)',
    'Cost per Unit',
    'Total Cost'
  ];

  const sampleData = [
    {
      id: 1,
      srNo: 1,
      wallOrigin: 'Mumty Wall',
      type: 'UPvc Door',
      area: 21,
      costPerUnit: 15000,
      totalCost: 15000
    },
    {
      id: 2,
      srNo: 2,
      wallOrigin: 'Basement Wall',
      type: 'Wooden Door',
      area: 18,
      costPerUnit: 8000,
      totalCost: 8000
    }
  ];

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 text-center">Door</h2>
      
      <DoorWindowTable 
        data={sampleData}
        headers={headers}
        minWidth={1400}
      />
    </div>
  );
}