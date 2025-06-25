import React from 'react';
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

export default function MaterialsTable({ 
  data, 
  onEdit, 
  onDelete, 
  showTotals = false, 
  totalCalculations = null,
  minWidth = 1200 
}) {
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

  const handleAction = (action, id) => {
    if (action === 'Edit' && onEdit) {
      onEdit(id);
    } else if (action === 'Delete' && onDelete) {
      onDelete(id);
    }
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

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
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
                  minWidth: 100,
                  whiteSpace: 'nowrap',
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

            {/* Total Row */}
            {showTotals && totalCalculations && (
              <TableRow sx={{ backgroundColor: "#f7f6fb" }}>
                <TableCell sx={totalCellStyle}>TOTAL</TableCell>
                <TableCell sx={totalCellStyle}></TableCell>
                <TableCell sx={totalCellStyle}>
                  {totalCalculations.totalWallBrickBlockCost?.toLocaleString() || '-'}
                </TableCell>
                <TableCell sx={totalCellStyle}></TableCell>
                <TableCell sx={totalCellStyle}>
                  {totalCalculations.totalExteriorFinishCost?.toLocaleString() || '-'}
                </TableCell>
                <TableCell sx={totalCellStyle}></TableCell>
                <TableCell sx={totalCellStyle}>
                  {totalCalculations.totalInteriorFinishCost?.toLocaleString() || '-'}
                </TableCell>
                <TableCell sx={totalCellStyle}></TableCell>
                <TableCell sx={totalCellStyle}>
                  {totalCalculations.totalInsulationCost?.toLocaleString() || '-'}
                </TableCell>
                <TableCell sx={totalCellStyle}></TableCell>
                <TableCell sx={totalCellStyle}></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
} 