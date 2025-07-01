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
import { useMumtyWallStore } from '@/app/store/mumtyWallStore';

export default function MaterialsCostTab() {
    // Get selected floor
    const selectedFloor = useBuildingPlanStore((state) => state.selectedFloor);
    // Get wall data for selected floor
    const getExteriorWallsByFloor = useExteriorWallStore((state) => state.getWallsByFloor);
    const getInteriorWallsByFloor = useInteriorWallStore((state) => state.getWallsByFloor);
    const updateExteriorWallData = useExteriorWallStore((state) => state.updateExteriorWallData);
    const updateInteriorWallData = useInteriorWallStore((state) => state.updateInteriorWallData);
    const exteriorWalls = getExteriorWallsByFloor(selectedFloor);
    const interiorWalls = getInteriorWallsByFloor(selectedFloor);
    // Get mumty wall data (no floor filter)
    const mumtyWallsData = useMumtyWallStore((state) => state.mumtyWallsData);
    const updateMumtyWallData = useMumtyWallStore((state) => state.updateMumtyWallData);

    // Build materials data based on what is present for the selected floor
    const materialsData = useMemo(() => {
        const data = [];
        let interiorWallCounter = 1;
        let exteriorWallCounter = 1;
        let mumtyWallCounter = 1;

        // Process Interior Walls FIRST
        interiorWalls.forEach((wall, index) => {
            const wallPrefix = `Interior Wall ${interiorWallCounter}`;
            const wallMaterials = [];

            // Wall Material
            if (wall.wallMaterial) {
                wallMaterials.push({
                    type: 'Wall Material',
                    name: wall.wallMaterial,
                    cost: wall.customWallMaterialCost || WallBrickBlock.find(m => m.name === wall.wallMaterial)?.costperitem || ''
                });
            }

            // Exterior Finish
            if (wall.exteriorFinish) {
                wallMaterials.push({
                    type: 'Exterior Finish',
                    name: wall.exteriorFinish,
                    cost: wall.customExteriorFinishCost || ExteriorFinish.find(m => m.name === wall.exteriorFinish)?.costperitem || ''
                });
            }

            // Interior Finish
            if (wall.interiorFinish) {
                wallMaterials.push({
                    type: 'Interior Finish',
                    name: wall.interiorFinish,
                    cost: wall.customInteriorFinishCost || InteriorFinish.find(m => m.name === wall.interiorFinish)?.costperitem || ''
                });
            }

            // Insulation
            if (((wall.isInsulationUsed === 'yes' || wall.insulationUsed === 'yes') && wall.insulationType)) {
                wallMaterials.push({
                    type: 'Insulation',
                    name: wall.insulationType, // Ensure name is set
                    cost: wall.customInsulationCost || Insulation.find(m => m.name === wall.insulationType)?.costperitem || ''
                });
            }

            if (wallMaterials.length > 0) {
                data.push({
                    id: `interior-wall-${index}`,
                    component: wallPrefix,
                    materials: wallMaterials,
                    wallId: wall.id,
                    wallType: 'interior'
                });
            }

            interiorWallCounter++;
        });

        // Process Exterior Walls SECOND
        exteriorWalls.forEach((wall, index) => {
            const wallPrefix = `Exterior Wall ${exteriorWallCounter}`;
            const wallMaterials = [];

            // Wall Material
            if (wall.wallMaterial) {
                wallMaterials.push({
                    type: 'Wall Material',
                    name: wall.wallMaterial,
                    cost: wall.customWallMaterialCost || WallBrickBlock.find(m => m.name === wall.wallMaterial)?.costperitem || ''
                });
            }

            // Exterior Finish
            if (wall.exteriorFinish) {
                wallMaterials.push({
                    type: 'Exterior Finish',
                    name: wall.exteriorFinish,
                    cost: wall.customExteriorFinishCost || ExteriorFinish.find(m => m.name === wall.exteriorFinish)?.costperitem || ''
                });
            }

            // Interior Finish
            if (wall.interiorFinish) {
                wallMaterials.push({
                    type: 'Interior Finish',
                    name: wall.interiorFinish,
                    cost: wall.customInteriorFinishCost || InteriorFinish.find(m => m.name === wall.interiorFinish)?.costperitem || ''
                });
            }

            // Insulation
            if (((wall.isInsulationUsed === 'yes' || wall.insulationUsed === 'yes') && wall.insulationType)) {
                wallMaterials.push({
                    type: 'Insulation',
                    name: wall.insulationType, // Ensure name is set
                    cost: wall.customInsulationCost || Insulation.find(m => m.name === wall.insulationType)?.costperitem || ''
                });
            }

            if (wallMaterials.length > 0) {
                data.push({
                    id: `exterior-wall-${index}`,
                    component: wallPrefix,
                    materials: wallMaterials,
                    wallId: wall.id,
                    wallType: 'exterior'
                });
            }

            exteriorWallCounter++;
        });

        // Process Mumty Walls THIRD (no floor filter)
        mumtyWallsData.forEach((wall, index) => {
            const wallPrefix = `Mumty Wall ${mumtyWallCounter}`;
            const wallMaterials = [];

            // Wall Material
            if (wall.wallMaterial) {
                wallMaterials.push({
                    type: 'Wall Material',
                    name: wall.wallMaterial,
                    cost: wall.customWallMaterialCost || WallBrickBlock.find(m => m.name === wall.wallMaterial)?.costperitem || ''
                });
            }

            // Exterior Finish
            if (wall.exteriorFinish) {
                wallMaterials.push({
                    type: 'Exterior Finish',
                    name: wall.exteriorFinish,
                    cost: wall.customExteriorFinishCost || ExteriorFinish.find(m => m.name === wall.exteriorFinish)?.costperitem || ''
                });
            }

            // Interior Finish
            if (wall.interiorFinish) {
                wallMaterials.push({
                    type: 'Interior Finish',
                    name: wall.interiorFinish,
                    cost: wall.customInteriorFinishCost || InteriorFinish.find(m => m.name === wall.interiorFinish)?.costperitem || ''
                });
            }

            // Insulation
            if (((wall.isInsulationUsed === 'yes' || wall.insulationUsed === 'yes') && wall.insulationType)) {
                wallMaterials.push({
                    type: 'Insulation',
                    name: wall.insulationType, // Ensure name is set
                    cost: wall.customInsulationCost || Insulation.find(m => m.name === wall.insulationType)?.costperitem || ''
                });
            }

            if (wallMaterials.length > 0) {
                data.push({
                    id: `mumty-wall-${index}`,
                    component: wallPrefix,
                    materials: wallMaterials,
                    wallId: wall.id,
                    wallType: 'mumty'
                });
            }

            mumtyWallCounter++;
        });

        return data;
    }, [exteriorWalls, interiorWalls, mumtyWallsData]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingRowIndex, setEditingRowIndex] = useState(null);

    // Prepare data for modal
    const getEditingMaterial = () => {
        if (editingRowIndex === null) return null;
        const row = materialsData[editingRowIndex];
        if (!row) return null;
        
        let originalWall;
        if (row.wallType === 'exterior') {
            originalWall = exteriorWalls.find(wall => wall.id === row.wallId);
        } else if (row.wallType === 'interior') {
            originalWall = interiorWalls.find(wall => wall.id === row.wallId);
        } else if (row.wallType === 'mumty') {
            originalWall = mumtyWallsData.find(wall => wall.id === row.wallId);
        }
        
        // Initialize modal data
        const modalData = {
            wallBrickBlock: '',
            wallBrickBlockCost: '',
            exteriorFinish: '',
            exteriorFinishCost: '',
            interiorFinish: '',
            interiorFinishCost: '',
            insulation: '',
            insulationCost: '',
            insulationThickness: originalWall?.insulationThickness || '',
            // Add flags to indicate which materials are present
            hasWallMaterial: false,
            hasExteriorFinish: false,
            hasInteriorFinish: false,
            hasInsulation: false
        };

        // Map materials to modal fields and set flags
        row.materials.forEach(material => {
            switch (material.type) {
                case 'Wall Material':
                    modalData.wallBrickBlock = material.name;
                    modalData.wallBrickBlockCost = material.cost;
                    modalData.hasWallMaterial = true;
                    break;
                case 'Exterior Finish':
                    modalData.exteriorFinish = material.name;
                    modalData.exteriorFinishCost = material.cost;
                    modalData.hasExteriorFinish = true;
                    break;
                case 'Interior Finish':
                    modalData.interiorFinish = material.name;
                    modalData.interiorFinishCost = material.cost;
                    modalData.hasInteriorFinish = true;
                    break;
                case 'Insulation':
                    modalData.insulation = material.name;
                    modalData.insulationCost = material.cost;
                    modalData.hasInsulation = true;
                    break;
            }
        });

        return modalData;
    };

    const handleEdit = (rowIndex) => {
        setEditingRowIndex(rowIndex);
        setEditModalOpen(true);
    };

    const handleSave = (formData) => {
        if (editingRowIndex === null) return;
        
        const row = materialsData[editingRowIndex];
        if (!row) return;

        // Find the original wall data
        let originalWall;
        if (row.wallType === 'exterior') {
            originalWall = exteriorWalls.find(wall => wall.id === row.wallId);
        } else if (row.wallType === 'interior') {
            originalWall = interiorWalls.find(wall => wall.id === row.wallId);
        } else if (row.wallType === 'mumty') {
            originalWall = mumtyWallsData.find(wall => wall.id === row.wallId);
        }

        if (!originalWall) return;

        // Create updated wall data with custom costs
        const updatedWall = { ...originalWall };
        
        // Update custom costs based on what was changed
        if (row.materials.some(m => m.type === 'Wall Material')) {
            updatedWall.customWallMaterialCost = formData.wallBrickBlockCost;
        }
        
        if (row.materials.some(m => m.type === 'Exterior Finish')) {
            updatedWall.customExteriorFinishCost = formData.exteriorFinishCost;
        }
        
        if (row.materials.some(m => m.type === 'Interior Finish')) {
            updatedWall.customInteriorFinishCost = formData.interiorFinishCost;
        }
        
        if (row.materials.some(m => m.type === 'Insulation')) {
            updatedWall.customInsulationCost = formData.insulationCost;
        }

        // Update the wall data in the store
        if (row.wallType === 'exterior') {
            updateExteriorWallData(row.wallId, updatedWall);
        } else if (row.wallType === 'interior') {
            updateInteriorWallData(row.wallId, updatedWall);
        } else if (row.wallType === 'mumty') {
            updateMumtyWallData(row.wallId, updatedWall);
        }

        setEditModalOpen(false);
        setEditingRowIndex(null);
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
        setEditingRowIndex(null);
    };

    return (
        <div className="grid grid-cols-1 p-2">
            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f7f6fb' }}>
                            <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Component</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Materials</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Cost (Rs.)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materialsData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">No materials added</TableCell>
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
                                    <TableCell>
                                        <div>
                                            {row.materials.map((material, materialIdx) => (
                                                <div key={materialIdx} style={{ marginBottom: materialIdx < row.materials.length - 1 ? '8px' : '0' }}>
                                                    <strong>{material.type}:</strong> {material.name}
                                                </div>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            {row.materials.map((material, materialIdx) => (
                                                <div key={materialIdx} style={{ marginBottom: materialIdx < row.materials.length - 1 ? '8px' : '0' }}>
                                                    {material.cost}
                                                </div>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleEdit(idx)}
                                            sx={{
                                                color: '#2663eb',
                                                '&:hover': {
                                                    backgroundColor: '#f0f4ff',
                                                    color: '#1557b0',
                                                },
                                            }}
                                            size="small"
                                        >
                                            <Edit size={16} />
                                        </IconButton>
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
            <Alert severity="info" sx={{ mt: 3 }}>
                 If you want to edit or delete materials, do it from respective tab. This tab just updates materials cost.
            </Alert>
         

        </div>
    );
}

