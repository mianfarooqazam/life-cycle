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

export default function SlabTable({ data, onEdit, onDelete, minWidth = 1000 }) {
  const cellStyle = {
    fontWeight: 'medium',
    textAlign: 'center',
    padding: '12px 8px',
    whiteSpace: 'nowrap',
  };
  const totalCellStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  };

  // Calculate totals
  const totalArea = data.reduce((sum, row) => sum + (parseFloat(row.slabArea) || 0), 0);
  const totalVolume = data.reduce((sum, row) => sum + (parseFloat(row.slabVolume) || 0), 0);

  return (
    <TableContainer>
      <Table sx={{ minWidth }} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 80 }}>Sr. No.</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Slab Area (ft²)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Slab Thickness (inch)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Slab Volume (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Ceiling Area (ft²)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Tiles Area (ft²)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={row.id}
              sx={{ backgroundColor: "#ffffff", '&:hover': { backgroundColor: "#f7f6fb" } }}
            >
              <TableCell sx={cellStyle}>{idx + 1}</TableCell>
              <TableCell sx={cellStyle}>{row.slabArea}</TableCell>
              <TableCell sx={cellStyle}>{row.slabThickness}</TableCell>
              <TableCell sx={cellStyle}>{row.slabVolume}</TableCell>
              <TableCell sx={cellStyle}>{row.ceilingArea}</TableCell>
              <TableCell sx={cellStyle}>{row.tilesArea}</TableCell>
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
          {/* Total Row */}
          {data.length > 0 && (
            <TableRow sx={{ backgroundColor: "#f7f6fb" }}>
              <TableCell sx={totalCellStyle}>TOTAL</TableCell>
              <TableCell sx={totalCellStyle}>{totalArea.toFixed(2)}</TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}>{totalVolume.toFixed(2)}</TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 