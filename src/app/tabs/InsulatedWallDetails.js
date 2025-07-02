import React from 'react';
import InsWallTable from '@/app/components/table/InsWallTable';
import { useMumtyWallStore } from '@/app/store/mumtyWallStore';
import { useExteriorWallStore } from '@/app/store/exteriorWallStore';
import { useInteriorWallStore } from '@/app/store/interiorWallStore';
import { useBasementStore } from '@/app/store/basementStore';

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

  // Get wall data from stores
  const mumtyWallsData = useMumtyWallStore(state => state.mumtyWallsData);
  const exteriorWallsData = useExteriorWallStore(state => state.exteriorWallsData);
  const interiorWallsData = useInteriorWallStore(state => state.interiorWallsData);
  const basementWallsData = useBasementStore(state => state.basementWallsData);

  // Filter and map to insulated wall data for the table
  const mumtyInsulatedData = mumtyWallsData
    .filter(row => row.insulationUsed === 'yes')
    .map(row => ({
      id: row.id,
      wallOrigin: 'Mumty Wall',
      length: row.length,
      height: row.height,
      insulationThickness: row.insulationThickness,
      area: row.wallArea,
      volume: row.wallVolume
    }));

  const exteriorInsulatedData = exteriorWallsData
    .filter(row => row.insulationUsed === 'yes')
    .map(row => ({
      id: row.id,
      wallOrigin: 'Exterior Wall',
      length: row.length,
      height: row.height,
      insulationThickness: row.insulationThickness,
      area: row.wallArea,
      volume: row.wallVolume
    }));

  const interiorInsulatedData = interiorWallsData
    .filter(row => row.insulationUsed === 'yes')
    .map(row => ({
      id: row.id,
      wallOrigin: 'Interior Wall',
      length: row.length,
      height: row.height,
      insulationThickness: row.insulationThickness,
      area: row.wallArea,
      volume: row.wallVolume
    }));

  const basementInsulatedData = basementWallsData
    .filter(row => row.insulationUsed === 'yes')
    .map(row => ({
      id: row.id,
      wallOrigin: 'Basement Wall',
      length: row.length,
      height: row.height,
      insulationThickness: row.insulationThickness,
      area: row.wallArea,
      volume: row.wallVolume
    }));

  const insulatedWallData = [...mumtyInsulatedData, ...exteriorInsulatedData, ...interiorInsulatedData, ...basementInsulatedData]
    .map((row, idx) => ({
      ...row,
      srNo: idx + 1,
    }));

  return (
    <div className="p-2">
     
      <InsWallTable 
        data={insulatedWallData}
        headers={headers}
        minWidth={1400}
      />
    </div>
  );
}