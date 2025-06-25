import React, { useState, useMemo } from 'react';
import { WallBrickBlock, ExteriorFinish, InteriorFinish, Insulation } from '@/app/data/Materials';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    IconButton,
    Alert
} from '@mui/material';
import { Edit } from 'lucide-react';
import MaterialModal from '@/app/components/modal/MaterialModal';
import { useBuildingPlanStore } from '@/app/store/buildingPlanStore';
import { useExteriorWallStore } from '@/app/store/exteriorWallStore';
import { useInteriorWallStore } from '@/app/store/interiorWallStore';

export default function MaterialsCostTab() {
    // Get selected floor
    const selectedFloor = useBuildingPlanStore((state) => state.selectedFloor);
    // Get wall data for selected floor
    const getExteriorWallsByFloor = useExteriorWallStore((state) => state.getWallsByFloor);
    const getInteriorWallsByFloor = useInteriorWallStore((state) => state.getWallsByFloor);
    const exteriorWalls = getExteriorWallsByFloor(selectedFloor);
    const interiorWalls = getInteriorWallsByFloor(selectedFloor);

    // Build materials data based on what is present for the selected floor
    const materialsData = useMemo(() => {
        const data = [];
        // Exterior Wall Material
        const exteriorWall = exteriorWalls.find(w => w.wallMaterial);
        if (exteriorWall && exteriorWall.wallMaterial) {
            data.push({
                id: 'exterior-wall',
                component: 'Exterior',
                materialName: exteriorWall.wallMaterial,
                cost: WallBrickBlock.find(m => m.name === exteriorWall.wallMaterial)?.costperitem || '',
            });
        }
        // Interior Wall Material
        const interiorWall = interiorWalls.find(w => w.wallMaterial);
        if (interiorWall && interiorWall.wallMaterial) {
            data.push({
                id: 'interior-wall',
                component: 'Interior',
                materialName: interiorWall.wallMaterial,
                cost: WallBrickBlock.find(m => m.name === interiorWall.wallMaterial)?.costperitem || '',
            });
        }
        // Exterior Finish
        if (exteriorWall && exteriorWall.exteriorFinish) {
            data.push({
                id: 'exterior-finish',
                component: 'Exterior Finish',
                materialName: exteriorWall.exteriorFinish,
                cost: ExteriorFinish.find(m => m.name === exteriorWall.exteriorFinish)?.costperitem || '',
            });
        }
        // Interior Finish
        if (interiorWall && interiorWall.interiorFinish) {
            data.push({
                id: 'interior-finish',
                component: 'Interior Finish',
                materialName: interiorWall.interiorFinish,
                cost: InteriorFinish.find(m => m.name === interiorWall.interiorFinish)?.costperitem || '',
            });
        }
        // Insulation (Exterior)
        if (exteriorWall && exteriorWall.insulationUsed === 'yes' && exteriorWall.insulation) {
            data.push({
                id: 'exterior-insulation',
                component: 'Insulation (Exterior)',
                materialName: exteriorWall.insulation,
                cost: Insulation.find(m => m.name === exteriorWall.insulation)?.costperitem || '',
            });
        }
        // Insulation (Interior)
        if (interiorWall && interiorWall.insulationUsed === 'yes' && interiorWall.insulation) {
            data.push({
                id: 'interior-insulation',
                component: 'Insulation (Interior)',
                materialName: interiorWall.insulation,
                cost: Insulation.find(m => m.name === interiorWall.insulation)?.costperitem || '',
            });
        }
        return data;
    }, [exteriorWalls, interiorWalls]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingRowIndex, setEditingRowIndex] = useState(null);

    // Prepare data for modal
    const getEditingMaterial = () => {
        if (editingRowIndex === null) return null;
        const row = materialsData[editingRowIndex];
        if (!row) return null;
        // Map row to modal fields
        return {
            wallBrickBlock: row.component.includes('Wall Brick/Block') ? row.materialName : '',
            wallBrickBlockCost: row.component.includes('Wall Brick/Block') ? row.cost : '',
            exteriorFinish: row.component === 'Exterior Finish' ? row.materialName : '',
            exteriorFinishCost: row.component === 'Exterior Finish' ? row.cost : '',
            interiorFinish: row.component === 'Interior Finish' ? row.materialName : '',
            interiorFinishCost: row.component === 'Interior Finish' ? row.cost : '',
            insulation: row.component.includes('Insulation') ? row.materialName : '',
            insulationCost: row.component.includes('Insulation') ? row.cost : '',
            insulationThickness: '',
        };
    };

    const handleEdit = (rowIndex) => {
        setEditingRowIndex(rowIndex);
        setEditModalOpen(true);
    };

    const handleSave = (formData) => {
        // This can be implemented to update the zustand store if you want to allow editing
        setEditModalOpen(false);
        setEditingRowIndex(null);
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
        setEditingRowIndex(null);
    };

    return (
        <div className="grid grid-cols-1 p-2">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f7f6fb' }}>
                            <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Component</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Material Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Cost (Rs.)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materialsData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No materials added for this floor.</TableCell>
                            </TableRow>
                        ) : (
                            materialsData.map((row, idx) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        '&:hover': {
                                            backgroundColor: '#f7f6fb',
                                        },
                                    }}
                                >
                                    <TableCell>{row.component}</TableCell>
                                    <TableCell>{row.materialName}</TableCell>
                                    <TableCell>
                                        <div>
                                            <div>{row.cost}</div>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: '#2663eb',
                                                    cursor: 'pointer',
                                                    textDecoration: 'underline',
                                                    '&:hover': {
                                                        color: '#1557b0',
                                                    },
                                                }}
                                                onClick={() => handleEdit(idx)}
                                            >
                                                Edit
                                            </Typography>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Edit Modal */}
            <MaterialModal
                open={editModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                editingMaterial={getEditingMaterial()}
            />
            <Alert severity="info" sx={{ mt: 3 }}>
                <strong>Note:</strong> All the values of labour rate is taken from market rate system (MRS-2022) Pakistan.
            </Alert>
        </div>
    );
}