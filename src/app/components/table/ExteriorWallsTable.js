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
    Tooltip,
    Typography,
    Box
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';

export default function ExteriorWallsTable({ data, onEdit, onDelete, minWidth = 1400 }) {
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
                  <h2 className="text-lg font-bold mb-2 text-center">                Exterior Wall
                  </h2>

           
            <TableContainer>
                <Table sx={{ minWidth }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={headerStyle}>Sr. No.</TableCell>
                            <TableCell sx={headerStyle}>Wall Material</TableCell>
                            <TableCell sx={headerStyle}>Exterior Finish</TableCell>
                            <TableCell sx={headerStyle}>Interior Finish</TableCell>
                            <TableCell sx={headerStyle}>Wall Area (ft²)</TableCell>
                            <TableCell sx={headerStyle}>Plaster Area (ft²)</TableCell>
                            <TableCell sx={headerStyle}>Wall Volume (ft³)</TableCell>
                            <TableCell sx={headerStyle}>Curtain Wall</TableCell>
                            <TableCell sx={headerStyle}>Glass Thickness (mm)</TableCell>
                            <TableCell sx={headerStyle}>Insulation Used?</TableCell>
                            <TableCell sx={headerStyle}>Insulation Type</TableCell>
                            <TableCell sx={headerStyle}>Insulation Thickness (in)</TableCell>
                            <TableCell sx={headerStyle}>Tiles Used?</TableCell>
                            <TableCell sx={headerStyle}>Tile Height (ft)</TableCell>
                            <TableCell sx={headerStyle}>Tiles Area (ft²)</TableCell>
                            <TableCell sx={headerStyle}>Component</TableCell>
                            <TableCell sx={headerStyle}>Door Type</TableCell>
                            <TableCell sx={headerStyle}>Window Type</TableCell>
                            <TableCell sx={headerStyle}>Door/Window Area (ft²)</TableCell>
                            <TableCell sx={headerStyle}>Cost</TableCell>
                            <TableCell sx={headerStyle}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={19} align="center" sx={{ py: 4 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No exterior wall data available. Add some data to get started.
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
                                    <TableCell sx={cellStyle}>{row.wallMaterial || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.exteriorFinish || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.interiorFinish || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.wallArea || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.plasterArea !== undefined ? row.plasterArea : (row.wallVolume ? Math.round((Number(row.wallVolume) / 0.75) * 2) : '-')}</TableCell>
                                    <TableCell sx={cellStyle}>{row.wallVolume || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.isCurtainWall === 'yes' ? 'Yes' : 'No'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.isCurtainWall === 'yes' ? (row.glassThickness ? `${row.glassThickness} mm` : '-') : '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.insulationUsed === 'yes' ? 'Yes' : 'No'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.insulationType || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.insulationThickness || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.isTilesUsed === 'yes' ? 'Yes' : 'No'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.isTilesUsed === 'yes' ? row.tileHeight : '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.isTilesUsed === 'yes' ? row.tilesArea : '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.component || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.doorType || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{row.windowType || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>
                                        {(row.doorArea || row.windowArea) ? (
                                            <>
                                                {row.doorArea ? (
                                                    <div>Door: {row.doorArea} ft²</div>
                                                ) : null}
                                                {row.windowArea ? (
                                                    <div>Window: {row.windowArea} ft²</div>
                                                ) : null}
                                            </>
                                        ) : '-'}
                                    </TableCell>
                                    <TableCell sx={cellStyle}>
                                        {(row.doorType && row.doorCost) || (row.windowType && row.windowCost) ? (
                                            <>
                                                {row.doorType && row.doorCost && (
                                                    <div>Door: Rs. {row.doorCost}</div>
                                                )}
                                                {row.windowType && row.windowCost && (
                                                    <div>Window: Rs. {row.windowCost}</div>
                                                )}
                                            </>
                                        ) : '-'}
                                    </TableCell>
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