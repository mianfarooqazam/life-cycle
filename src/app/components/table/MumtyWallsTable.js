import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';
import TextInput from '@/app/components/input/TextInput';

export default function MumtyWallsTable({
  data,
  onEdit,
  onDelete,
  onFieldChange,
  editingId,
  minWidth = 1400
}) {
  const cellStyle = {
    fontWeight: 'medium',
    textAlign: 'center',
    padding: '12px 8px',
    whiteSpace: 'nowrap',
  };

  const headerStyle = {
    backgroundColor: '#f7f6fb',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '16px 8px',
    minWidth: 120,
    whiteSpace: 'nowrap',
  };

  const handleFieldChange = (id, field, value) => {
    if (onFieldChange) {
      onFieldChange(id, field, value);
    }
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth }} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={headerStyle}>Sr. No.</TableCell>
            <TableCell sx={headerStyle}>Wall Area (ft²)</TableCell>
            <TableCell sx={headerStyle}>Wall Volume (ft³)</TableCell>
            <TableCell sx={headerStyle}>Insulation Used?</TableCell>
            <TableCell sx={headerStyle}>Insulation Thickness (in)</TableCell>
            <TableCell sx={headerStyle}>Component</TableCell>
            <TableCell sx={headerStyle}>Door Type</TableCell>
            <TableCell sx={headerStyle}>Window Type</TableCell>
            <TableCell sx={headerStyle}>Door/Window Area (ft²)</TableCell>
            <TableCell sx={headerStyle}>Cost</TableCell>
            <TableCell sx={headerStyle}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={row.id}
              sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: '#f7f6fb' } }}
            >
              <TableCell sx={cellStyle}>{idx + 1}</TableCell>
              <TableCell sx={cellStyle}>{row.wallArea}</TableCell>
              <TableCell sx={cellStyle}>{row.wallVolume}</TableCell>
              <TableCell sx={cellStyle}>{row.insulationUsed === 'yes' ? 'Yes' : 'No'}</TableCell>
              <TableCell sx={cellStyle}>{row.insulationThickness}</TableCell>
              <TableCell sx={cellStyle}>{row.component}</TableCell>
              <TableCell sx={cellStyle}>{row.doorType}</TableCell>
              <TableCell sx={cellStyle}>{row.windowType}</TableCell>
              <TableCell sx={cellStyle}>
                {row.doorArea && (
                  <div>Door: {row.doorArea} ft²</div>
                )}
                {row.windowArea && (
                  <div>Window: {row.windowArea} ft²</div>
                )}
              </TableCell>
              <TableCell sx={cellStyle}>{row.cost}</TableCell>
              <TableCell sx={cellStyle}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <IconButton color="primary" onClick={() => onEdit(row.id)} size="small" sx={{ mr: 1 }}>
                    <Edit size={18} />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(row.id)} size="small">
                    <Trash2 size={18} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 