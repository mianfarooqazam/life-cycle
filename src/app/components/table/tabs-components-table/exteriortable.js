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

export default function ExteriorTable({ data, onEdit, onDelete, minWidth = 700 }) {
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

  // Calculate total area
  const totalArea = data.reduce((sum, row) => sum + (parseFloat(row.area) || 0), 0);

  return (
    <TableContainer>
      <Table sx={{ minWidth }} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 80 }}>Sr. No.</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Length (ft)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Width (ft)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Area (ft²)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Curtain Wall</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Glass Thickness</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Wall Thickness (in)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Wall Volume (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Tiles Used</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Tile Height (ft)</TableCell>
            <TableCell sx={{ backgroundColor: "#f7f6fb", fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 120 }}>Tile Area (ft²)</TableCell>
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
              <TableCell sx={cellStyle}>{row.length}</TableCell>
              <TableCell sx={cellStyle}>{row.width}</TableCell>
              <TableCell sx={cellStyle}>{row.area}</TableCell>
              <TableCell sx={cellStyle}>{row.isCurtainWall === 'yes' ? 'Yes' : 'No'}</TableCell>
              <TableCell sx={cellStyle}>{row.isCurtainWall === 'yes' ? row.glassThickness : '-'}</TableCell>
              <TableCell sx={cellStyle}>{row.isCurtainWall === 'no' ? row.wallThickness : '-'}</TableCell>
              <TableCell sx={cellStyle}>{row.isCurtainWall === 'no' ? row.wallVolume : '-'}</TableCell>
              <TableCell sx={cellStyle}>{row.areTilesUsed === 'yes' ? 'Yes' : 'No'}</TableCell>
              <TableCell sx={cellStyle}>{row.areTilesUsed === 'yes' ? row.tileHeight : '-'}</TableCell>
              <TableCell sx={cellStyle}>{row.areTilesUsed === 'yes' ? row.tileArea : '-'}</TableCell>
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
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}>{totalArea.toFixed(2)}</TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
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