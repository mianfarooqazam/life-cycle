import React from 'react';
import { WallBrickBlock, ExteriorFinish, InteriorFinish, Insulation } from '@/app/data/Materials';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';

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

  const cellStyle = {
    fontWeight: 'medium',
    textAlign: 'center',
    padding: '12px 8px',
    whiteSpace: 'nowrap',
  };

  const headers = [
    'Sr. No',
    'Wall Brick Block',
    'Cost (Rs.)',
    'Exterior Finish',
    'Cost (Rs.)',
    'Interior Finish',
    'Cost (Rs.)',
    'Insulation',
    'Cost (Rs.)',
    'Insulation Thickness (in)',
    'Action'
  ];

  const handleAction = (action, id) => {
    // Placeholder for edit/delete actions
    if (action === 'Edit') {
      // Implement edit logic
    } else if (action === 'Delete') {
      // Implement delete logic
    }
  };

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table sx={{ minWidth: 1200 }} stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} sx={{
                  backgroundColor: "#f7f6fb",
                  fontWeight: 'bold',
                  textAlign: 'center',
                  padding: '16px 8px',
                  minWidth: 100,
                  whiteSpace: 'nowrap',
                }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {materialsCostData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: "#ffffff",
                  '&:hover': {
                    backgroundColor: "#f7f6fb"
                  }
                }}
              >
                <TableCell sx={cellStyle}>{row.srNo}</TableCell>
                <TableCell sx={cellStyle}>{row.wallBrickBlock}</TableCell>
                <TableCell sx={cellStyle}>{row.wallBrickBlockCost}</TableCell>
                <TableCell sx={cellStyle}>{row.exteriorFinish}</TableCell>
                <TableCell sx={cellStyle}>{row.exteriorFinishCost}</TableCell>
                <TableCell sx={cellStyle}>{row.interiorFinish}</TableCell>
                <TableCell sx={cellStyle}>{row.interiorFinishCost}</TableCell>
                <TableCell sx={cellStyle}>{row.insulation}</TableCell>
                <TableCell sx={cellStyle}>{row.insulationCost}</TableCell>
                <TableCell sx={cellStyle}>
                  {row.insulationThickness || (row.insulation === 'No Insulation Used' ? '-' : 'N/A')}
                </TableCell>
                <TableCell sx={cellStyle}>
                  <IconButton
                    color="primary"
                    onClick={() => handleAction('Edit', row.id)}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    <Edit size={18} />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleAction('Delete', row.id)}
                    size="small"
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
} 