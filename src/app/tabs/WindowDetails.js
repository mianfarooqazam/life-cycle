import React from 'react';
import DoorWindowTable from '@/app/components/table/DoorWindowTable';

export default function WindowDetails() {
  
  const headers = [
    'Sr No.',
    'Wall Origin',
    'Window Type',
    'Area (ft²)',
    'Cost per Unit',
    'Total Cost'
  ];

  const sampleData = [
    {
      id: 1,
      srNo: 1,
      wallOrigin: 'Basement Wall',
      type: 'Upvc Window',
      area: 12,
      costPerUnit: 5000,
      totalCost: 5000
    },
    {
      id: 2,
      srNo: 2,
      wallOrigin: 'Ground Florr Wall',
      type: 'Wooden Window',
      area: 9,
      costPerUnit: 3500,
      totalCost: 3500
    }
  ];

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 text-center">Window</h2>
      
      <DoorWindowTable 
        data={sampleData}
        headers={headers}
        minWidth={1400}
      />
    </div>
  );
}