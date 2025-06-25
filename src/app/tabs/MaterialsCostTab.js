import React, { useState } from 'react';
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
  IconButton
} from '@mui/material';
import { Edit } from 'lucide-react';
import MaterialModal from '@/app/components/modal/MaterialModal';

export default function MaterialsCostTab() {
  // Initial data for demonstration
  const initialData = [
    {
      id: 1,
      component: 'Wall Brick/Block',
      materialName: WallBrickBlock[0]?.name,
      cost: WallBrickBlock[0]?.costperitem,
    },
    {
      id: 2,
      component: 'Exterior Finish',
      materialName: ExteriorFinish[0]?.name,
      cost: ExteriorFinish[0]?.costperitem,
    },
    {
      id: 3,
      component: 'Interior Finish',
      materialName: InteriorFinish[0]?.name,
      cost: InteriorFinish[0]?.costperitem,
    },
    {
      id: 4,
      component: 'Insulation',
      materialName: Insulation[0]?.name,
      cost: Insulation[0]?.costperitem,
    },
  ];

  const [materialsData, setMaterialsData] = useState(initialData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);

  // Prepare data for modal
  const getEditingMaterial = () => {
    if (editingRowIndex === null) return null;
    const row = materialsData[editingRowIndex];
    if (!row) return null;
    // Map row to modal fields
    return {
      wallBrickBlock: row.component === 'Wall Brick/Block' ? row.materialName : '',
      wallBrickBlockCost: row.component === 'Wall Brick/Block' ? row.cost : '',
      exteriorFinish: row.component === 'Exterior Finish' ? row.materialName : '',
      exteriorFinishCost: row.component === 'Exterior Finish' ? row.cost : '',
      interiorFinish: row.component === 'Interior Finish' ? row.materialName : '',
      interiorFinishCost: row.component === 'Interior Finish' ? row.cost : '',
      insulation: row.component === 'Insulation' ? row.materialName : '',
      insulationCost: row.component === 'Insulation' ? row.cost : '',
      insulationThickness: '',
    };
  };

  const handleEdit = (rowIndex) => {
    setEditingRowIndex(rowIndex);
    setEditModalOpen(true);
  };

  const handleSave = (formData) => {
    setMaterialsData((prev) => {
      const updated = [...prev];
      if (editingRowIndex === null) return prev;
      let updatedRow = { ...updated[editingRowIndex] };
      if (updatedRow.component === 'Wall Brick/Block') {
        updatedRow.materialName = formData.wallBrickBlock;
        updatedRow.cost = formData.wallBrickBlockCost;
      } else if (updatedRow.component === 'Exterior Finish') {
        updatedRow.materialName = formData.exteriorFinish;
        updatedRow.cost = formData.exteriorFinishCost;
      } else if (updatedRow.component === 'Interior Finish') {
        updatedRow.materialName = formData.interiorFinish;
        updatedRow.cost = formData.interiorFinishCost;
      } else if (updatedRow.component === 'Insulation') {
        updatedRow.materialName = formData.insulation;
        updatedRow.cost = formData.insulationCost;
      }
      updated[editingRowIndex] = updatedRow;
      return updated;
    });
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
            {materialsData.map((row, idx) => (
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
            ))}
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
      <Box sx={{ mt: 3, p: 2, backgroundColor: '#f7f6fb', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#000' }}>
          <strong>Note:</strong> All the values of material cost are taken from market rates and can be edited as per your project.
        </Typography>
      </Box>
    </div>
  );
}