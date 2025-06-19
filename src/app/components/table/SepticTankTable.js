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

export default function SepticTankTable({ 
  data, 
  onEdit, 
  onDelete, 
  minWidth = 900 
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
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 140, whiteSpace: 'nowrap' }}>Excavation Vol (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 120, whiteSpace: 'nowrap' }}>Wall Vol (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 140, whiteSpace: 'nowrap' }}>Top Slab Vol (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', minWidth: 140, whiteSpace: 'nowrap' }}>Bottom Slab Vol (ft³)</TableCell>
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
              <TableCell sx={cellStyle}>{row.excavationVolume}</TableCell>
              <TableCell sx={cellStyle}>{row.wallVolume}</TableCell>
              <TableCell sx={cellStyle}>{row.topSlabVolume}</TableCell>
              <TableCell sx={cellStyle}>{row.bottomSlabVolume}</TableCell>
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