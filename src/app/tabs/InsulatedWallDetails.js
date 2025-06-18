import React from 'react';
import InsWallTable from '@/app/components/table/InsWallTable';

export default function InsulatedWallDetails() {
  
  const headers = [
    'Sr No.',
    'Wall Origin',
    'Length (ft)',
    'Height (ft)',
    'Insulation Thickness (inch)',
    'Area (ft²)',
    'Volume (ft³)'
  ];

  const sampleData = [
    {
      id: 1,
      srNo: 1,
      wallOrigin: 'Basement Wall',
      length: 12,
      height: 10,
      insulationThickness: 2,
      area: 120,
      volume: 20
    },
    {
      id: 2,
      srNo: 2,
      wallOrigin: 'Mumty Wall',
      length: 15,
      height: 10,
      insulationThickness: 3,
      area: 150,
      volume: 37.5
    }
  ];

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 text-center">Insulated Wall</h2>
      
      <InsWallTable 
        data={sampleData}
        headers={headers}
        minWidth={1400}
      />
    </div>
  );
}