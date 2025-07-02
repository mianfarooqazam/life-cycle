import React, { useState } from 'react';
import TitleHeader from '@/app/components/header/TitleHeader';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box
} from '@mui/material';

export default function OtherCost() {
  const [otherCosts, setOtherCosts] = useState([
    { component: 'Electrical', cost: 0 },
    { component: 'Plumbing', cost: 0 }, 
    { component: 'Other', cost: 0 }

  ]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [newCostValue, setNewCostValue] = useState('');

  const handleEditCost = (rowIndex) => {
    setEditRowIndex(rowIndex);
    setNewCostValue(otherCosts[rowIndex].cost.toString());
    setEditModalOpen(true);
  };

  const handleSaveCost = () => {
    if (editRowIndex !== null) {
      const updatedCosts = [...otherCosts];
      updatedCosts[editRowIndex].cost = parseFloat(newCostValue) || 0;
      setOtherCosts(updatedCosts);
      setEditModalOpen(false);
      setEditRowIndex(null);
      setNewCostValue('');
    }
  };

  const totalCost = otherCosts.reduce((sum, row) => sum + (parseFloat(row.cost) || 0), 0);

  return (
    <div className="grid grid-cols-1 p-2">
      <TitleHeader>Other Cost</TitleHeader>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f7f6fb' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Component</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Cost (PKR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otherCosts.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#f7f6fb'
                  }
                }}
              >
                <TableCell sx={{ fontWeight: 'medium' }}>{row.component}</TableCell>
                <TableCell>
                  <div>
                    <div>PKR {row.cost}</div>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#2663eb',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        '&:hover': {
                          color: '#1557b0'
                        }
                      }}
                      onClick={() => handleEditCost(index)}
                    >
                      Edit
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {/* Total Row */}
            <TableRow sx={{ backgroundColor: '#f7f6fb' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>PKR {totalCost.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* Edit Cost Modal */}
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Edit Cost</DialogTitle>
        <DialogContent>
          <TextField
            label="Cost (PKR)"
            value={newCostValue}
            onChange={(e) => setNewCostValue(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: { step: '0.1', min: '0' }
            }}
          />
          <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
            <Button onClick={() => setEditModalOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveCost} color="primary" variant="contained">
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}