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

export default function WallTable({ 
  data, 
  headers, 
  onEdit, 
  onDelete, 
  showTotals = false, 
  totalCalculations = null,
  minWidth = 1400 
}) {
  const cellStyle = {
    fontWeight: 'medium',
    textAlign: 'center',
    padding: '12px 8px',
  };

  const totalCellStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const handleAction = (action, id) => {
    if (action === 'Edit' && onEdit) {
      onEdit(id);
    } else if (action === 'Delete' && onDelete) {
      onDelete(id);
    }
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth }} stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} sx={{
                backgroundColor: "#f7f6fb", 
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '16px 8px',
                minWidth: 120,
              }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
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
              <TableCell sx={cellStyle}>{row.wallLength}</TableCell>
              <TableCell sx={cellStyle}>{row.wallHeight}</TableCell>
              <TableCell sx={cellStyle}>{row.wallType}</TableCell>
              <TableCell sx={cellStyle}>
                {row.wallThickness} {row.wallType === 'Curtain' ? 'mm' : 'in'}
              </TableCell>
              <TableCell sx={cellStyle}>{row.wallArea}</TableCell>
              <TableCell sx={cellStyle}>{row.wallVolume.toLocaleString()}</TableCell>
              <TableCell sx={cellStyle}>{row.tilesArea}</TableCell>
              <TableCell sx={cellStyle}>{row.doors} / {row.windows}</TableCell>
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

          {/* Total Row */}
          {showTotals && totalCalculations && (
            <TableRow sx={{ backgroundColor: "#f7f6fb" }}>
              <TableCell sx={totalCellStyle}>TOTAL</TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
              <TableCell sx={totalCellStyle}>
                {totalCalculations.totalArea.toLocaleString()}
              </TableCell>
              <TableCell sx={totalCellStyle}>
                {totalCalculations.totalWallVolumeNoCurtain.toLocaleString()} (no curtain)
              </TableCell>
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