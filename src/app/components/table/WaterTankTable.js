import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';

export default function WaterTankTable({ 
  data, 
  onEdit, 
  onDelete, 
  minWidth = 1200 
}) {
  const cellStyle = {
    fontWeight: 'medium',
    textAlign: 'center',
    padding: '12px 8px',
    whiteSpace: 'nowrap',
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth }} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 90, whiteSpace: 'nowrap' }}>Sr. No.</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 120, whiteSpace: 'nowrap' }}>Wall Vol (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 120, whiteSpace: 'nowrap' }}>Plaster Area (ft²)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 120, whiteSpace: 'nowrap' }}>Col Vol (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 140, whiteSpace: 'nowrap' }}>Top Slab Vol (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 140, whiteSpace: 'nowrap' }}>Bot Slab Vol (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 60, whiteSpace: 'nowrap' }}>UG?</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 140, whiteSpace: 'nowrap' }}>UG Exc Vol (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 140, whiteSpace: 'nowrap' }}>UG Wall Vol (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 120, whiteSpace: 'nowrap' }}>UG Plaster Area (ft²)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 140, whiteSpace: 'nowrap' }}>UG Top Vol (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 140, whiteSpace: 'nowrap' }}>UG Bot Vol (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 80, whiteSpace: 'nowrap' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ backgroundColor: "#ffffff", '&:hover': { backgroundColor: "#f7f6fb" } }}
            >
              <TableCell sx={cellStyle}>{row.srNo}</TableCell>
              <TableCell sx={cellStyle}>{row.wallVolume}</TableCell>
              <TableCell sx={cellStyle}>{row.plasterArea}</TableCell>
              <TableCell sx={cellStyle}>{row.columnVolume}</TableCell>
              <TableCell sx={cellStyle}>{row.topSlabVolume}</TableCell>
              <TableCell sx={cellStyle}>{row.bottomSlabVolume}</TableCell>
              <TableCell sx={cellStyle}>{row.isUnderground === 'yes' ? 'Yes' : 'No'}</TableCell>
              <TableCell sx={cellStyle}>{row.isUnderground === 'yes' ? row.undergroundExcavationVolume : '-'}</TableCell>
              <TableCell sx={cellStyle}>{row.isUnderground === 'yes' ? row.undergroundWallVolume : '-'}</TableCell>
              <TableCell sx={cellStyle}>{row.isUnderground === 'yes' ? row.undergroundPlasterArea : '-'}</TableCell>
              <TableCell sx={cellStyle}>{row.isUnderground === 'yes' ? row.undergroundTopSlabVolume : '-'}</TableCell>
              <TableCell sx={cellStyle}>{row.isUnderground === 'yes' ? row.undergroundBottomSlabVolume : '-'}</TableCell>
              <TableCell sx={cellStyle}>
                <IconButton color="primary" onClick={() => onEdit(row.id)} size="small" sx={{ mr: 1 }}>
                  <Edit size={18} />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(row.id)} size="small">
                  <Trash2 size={18} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 