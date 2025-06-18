import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from '@mui/material';

export default function InsWallTable({ 
  data, 
  headers, 
  minWidth = 1400 
}) {
  const cellStyle = {
    fontWeight: 'medium',
    textAlign: 'center',
    padding: '12px 8px',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth }} stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} sx={{
                  backgroundColor: "#f7f6fb", 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  padding: '16px 10px',
                  minWidth: 120,
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
                <TableCell sx={cellStyle}>{row.wallOrigin}</TableCell>
                <TableCell sx={cellStyle}>{row.length}</TableCell>
                <TableCell sx={cellStyle}>{row.height}</TableCell>
                <TableCell sx={cellStyle}>{row.insulationThickness}</TableCell>
                <TableCell sx={cellStyle}>{row.area}</TableCell>
                <TableCell sx={cellStyle}>{row.volume.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Note instead of total */}
      {data.length > 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          If you want to delete insulation wall, do it from respective tab.
        </Alert>
      )}
    </>
  );
}