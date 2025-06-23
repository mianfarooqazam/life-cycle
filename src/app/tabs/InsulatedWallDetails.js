import React from 'react';
import InsWallTable from '@/app/components/table/InsWallTable';
import { useMumtyWallStore } from '@/app/store/mumtyWallStore';

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

  // Get mumty wall data from store
  const mumtyWallsData = useMumtyWallStore(state => state.mumtyWallsData);

  // Filter and map to insulated wall data for the table
  const insulatedWallData = mumtyWallsData
    .filter(row => row.insulationUsed === 'yes')
    .map((row, idx) => ({
      id: row.id,
      srNo: idx + 1,
      wallOrigin: 'Mumty Wall',
      length: row.length,
      height: row.height,
      insulationThickness: row.insulationThickness,
      area: row.wallArea,
      volume: row.wallVolume
    }));

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 text-center">Insulated Wall</h2>
      <InsWallTable 
        data={insulatedWallData}
        headers={headers}
        minWidth={1400}
      />
    </div>
  );
}