import React from 'react';
import MaterialsTable from '@/app/components/table/MaterialsTable';
import { WallBrickBlock, ExteriorFinish, InteriorFinish, Insulation } from '@/app/data/Materials';

export default function MaterialsCostTab() {
  // Prepare dummy data for Materials Cost tab (for demonstration)
  const materialsCostData = [
    {
      id: 1,
      srNo: 1,
      wallBrickBlock: WallBrickBlock[0]?.name,
      wallBrickBlockCost: WallBrickBlock[0]?.costperitem,
      exteriorFinish: ExteriorFinish[0]?.name,
      exteriorFinishCost: ExteriorFinish[0]?.costperitem,
      interiorFinish: InteriorFinish[0]?.name,
      interiorFinishCost: InteriorFinish[0]?.costperitem,
      insulation: Insulation[0]?.name,
      insulationCost: Insulation[0]?.costperitem,
      insulationThickness: 2
    },
    {
      id: 2,
      srNo: 2,
      wallBrickBlock: WallBrickBlock[1]?.name,
      wallBrickBlockCost: WallBrickBlock[1]?.costperitem,
      exteriorFinish: ExteriorFinish[1]?.name,
      exteriorFinishCost: ExteriorFinish[1]?.costperitem,
      interiorFinish: InteriorFinish[1]?.name,
      interiorFinishCost: InteriorFinish[1]?.costperitem,
      insulation: Insulation[1]?.name,
      insulationCost: Insulation[1]?.costperitem,
      insulationThickness: 2
    },
    // Add more rows as needed
  ];

  return <MaterialsTable data={materialsCostData} minWidth={1200} />;
} 