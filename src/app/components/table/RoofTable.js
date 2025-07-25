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

export default function RoofTable({ 
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

  return (
    <TableContainer>
      <Table sx={{ minWidth }} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{
              backgroundColor: "#f7f6fb", 
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '16px 8px',
              minWidth: 80,
              whiteSpace: 'nowrap',
            }}>
              Sr. No.
            </TableCell>
            <TableCell sx={{
              backgroundColor: "#f7f6fb", 
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '16px 8px',
              minWidth: 140,
              whiteSpace: 'nowrap',
            }}>
              Roof Area (ft²)
            </TableCell>
            <TableCell sx={{
              backgroundColor: "#f7f6fb", 
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '16px 8px',
              minWidth: 140,
              whiteSpace: 'nowrap',
            }}>
              Roof Thickness (inch)
            </TableCell>
            <TableCell sx={{
              backgroundColor: "#f7f6fb", 
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '16px 8px',
              minWidth: 140,
              whiteSpace: 'nowrap',
            }}>
              Insulation Used
            </TableCell>
            <TableCell sx={{
              backgroundColor: "#f7f6fb", 
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '16px 8px',
              minWidth: 160,
              whiteSpace: 'nowrap',
            }}>
              Insulation Thickness (inch)
            </TableCell>
            <TableCell sx={{
              backgroundColor: "#f7f6fb", 
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '16px 8px',
              minWidth: 140,
              whiteSpace: 'nowrap',
            }}>
              Roof Volume (ft³)
            </TableCell>
            <TableCell sx={{
              backgroundColor: "#f7f6fb", 
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '16px 8px',
              minWidth: 120,
              whiteSpace: 'nowrap',
            }}>
              Action
            </TableCell>
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
              <TableCell sx={cellStyle}>{row.roofArea}</TableCell>
              <TableCell sx={cellStyle}>{row.roofThickness}</TableCell>
              <TableCell sx={cellStyle}>{row.isInsulationUsed === 'yes' ? 'Yes' : 'No'}</TableCell>
              <TableCell sx={cellStyle}>{row.insulationThickness || '-'}</TableCell>
              <TableCell sx={cellStyle}>{row.roofVolume}</TableCell>
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
                {totalCalculations.totalVolume.toLocaleString()}
              </TableCell>
              <TableCell sx={totalCellStyle}></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 