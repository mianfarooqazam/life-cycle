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

export default function RetainingWallTable({ data, onEdit, onDelete, minWidth = 900 }) {
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
            <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', padding: '16px 8px', minWidth: 80, whiteSpace: 'nowrap' }}>Sr. No.</TableCell>
            <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', minWidth: 120, whiteSpace: 'nowrap' }}>Type</TableCell>
            <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', minWidth: 120, whiteSpace: 'nowrap' }}>Length (ft)</TableCell>
            <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', minWidth: 120, whiteSpace: 'nowrap' }}>Height (ft)</TableCell>
            <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', minWidth: 120, whiteSpace: 'nowrap' }}>Thickness (in)</TableCell>
            <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', minWidth: 120, whiteSpace: 'nowrap' }}>Volume (ft³)</TableCell>
            <TableCell sx={{ backgroundColor: '#f7f6fb', fontWeight: 'bold', textAlign: 'center', minWidth: 80, whiteSpace: 'nowrap' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={row.id}
              sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: '#f7f6fb' } }}
            >
              <TableCell sx={cellStyle}>{idx + 1}</TableCell>
              <TableCell sx={cellStyle}>{row.wallType === 'brick' ? 'Brick' : 'Concrete'}</TableCell>
              <TableCell sx={cellStyle}>{row.length}</TableCell>
              <TableCell sx={cellStyle}>{row.height}</TableCell>
              <TableCell sx={cellStyle}>{row.thickness}</TableCell>
              <TableCell sx={cellStyle}>{row.volume}</TableCell>
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