import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  IconButton
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';

export default function DoorWindowTable({ 
  data, 
  headers,
  onEdit,
  onDelete,
  showActions = true
}) {
  const cellStyle = {
    fontWeight: 'medium',
    textAlign: 'center',
    padding: '12px 8px',
    whiteSpace: 'nowrap',
  };

  const headerStyle = {
    backgroundColor: "#f7f6fb", 
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '16px 10px',
    minWidth: 120,
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
    <>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell 
                  key={index} 
                  sx={headerStyle}
                >
                  {header}
                </TableCell>
              ))}
              {showActions && (
                <TableCell sx={headerStyle}>
                  Action
                </TableCell>
              )}
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
                <TableCell sx={cellStyle}>{row.wallOrigin}</TableCell>
                <TableCell sx={cellStyle}>{row.component}</TableCell>
                <TableCell sx={cellStyle}>{row.type}</TableCell>
                <TableCell sx={cellStyle}>{row.area}</TableCell>
                <TableCell sx={cellStyle}>Rs. {row.costPerUnit.toLocaleString()}</TableCell>
                <TableCell sx={cellStyle}>Rs. {row.totalCost.toLocaleString()}</TableCell>
                {showActions && (
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
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Note instead of total */}
      {data.length > 0 && !showActions && (
        <Alert severity="info" sx={{ mt: 2 }}>
          If you want to delete door/window, do it from respective tab.
        </Alert>
      )}
    </>
  );
}