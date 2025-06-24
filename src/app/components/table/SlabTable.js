"use client";
import React from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    IconButton, 
    Typography,
    Box
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';

export default function SlabTable({ data, onEdit, onDelete, minWidth = 800 }) {
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

    return (
        <div>
            <h2 className="text-lg font-bold mb-2 text-center">Slab Details</h2>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Table sx={{ minWidth }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={headerStyle}>Sr. No.</TableCell>
                            <TableCell sx={headerStyle}>Slab Area (ft²)</TableCell>
                            <TableCell sx={headerStyle}>Slab Thickness (in)</TableCell>
                            <TableCell sx={headerStyle}>Slab Volume (ft³)</TableCell>
                            <TableCell sx={headerStyle}>Ceiling Used?</TableCell>
                            <TableCell sx={headerStyle}>Ceiling Area (ft²)</TableCell>
                            <TableCell sx={headerStyle}>Tiles Used?</TableCell>
                            <TableCell sx={headerStyle}>Tiles Area (ft²)</TableCell>
                            <TableCell sx={headerStyle}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No slab data available. Add some data to get started.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, idx) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: '#f7f6fb' } }}
                                >
                                    <TableCell sx={cellStyle}>{idx + 1}</TableCell>
                                    <TableCell sx={cellStyle}>{row.slabArea || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.slabThickness || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.slabVolume || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.isCeilingUsed === 'yes' ? 'Yes' : 'No'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.isCeilingUsed === 'yes' ? row.ceilingArea : '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.areTilesUsed === 'yes' ? 'Yes' : 'No'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.areTilesUsed === 'yes' ? row.tilesArea : '-'}</TableCell>
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
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
} 