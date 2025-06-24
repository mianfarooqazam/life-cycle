"use client";
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
    Typography
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';

export default function ExteriorWallsTable({ data, onEdit, onDelete }) {
    return (
        <div>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Exterior Walls Data
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="exterior walls table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600 }}>Exterior Wall Area (ft²)</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Exterior Wall Volume (ft³)</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Curtain Wall</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Glass Thickness (mm)</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Insulation Used</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Insulation Thickness (inch)</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Tiles Used</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Tile Height (ft)</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Tiles Area (ft²)</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Components</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Door Area (ft²)</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Window Area (ft²)</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Cost</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={14} align="center" sx={{ py: 4 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No exterior wall data available. Add some data to get started.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => (
                                <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                                    <TableCell>{row.wallArea || '-'}</TableCell>
                                    <TableCell>{row.wallVolume || '-'}</TableCell>
                                    <TableCell>{row.isCurtainWall === 'yes' ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{row.isCurtainWall === 'yes' ? (row.glassThickness ? `${row.glassThickness} mm` : '-') : '-'}</TableCell>
                                    <TableCell>{row.insulationUsed === 'yes' ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{row.insulationThickness || '-'}</TableCell>
                                    <TableCell>{row.isTilesUsed === 'yes' ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{row.isTilesUsed === 'yes' ? row.tileHeight : '-'}</TableCell>
                                    <TableCell>{row.isTilesUsed === 'yes' ? row.tilesArea : '-'}</TableCell>
                                    <TableCell>{row.component || '-'}</TableCell>
                                    <TableCell>{row.doorArea || '-'}</TableCell>
                                    <TableCell>{row.windowArea || '-'}</TableCell>
                                    <TableCell>{row.cost || '-'}</TableCell>
                                    <TableCell>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onEdit(row.id)}
                                                    sx={{
                                                        color: '#5BB045',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(91, 176, 69, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <Edit size={16} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onDelete(row.id)}
                                                    sx={{
                                                        color: '#f44336',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(244, 67, 54, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
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