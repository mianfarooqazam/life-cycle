import React, { useState } from 'react';
import TitleHeader from '@/app/components/header/TitleHeader'; 
import { Toaster } from 'react-hot-toast';
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
  Box,
  Alert,
} from '@mui/material';

export default function LabourCost() {
  const [labourData, setLabourData] = useState([
    { item: "Excavation", labourRate: "PKR 4.2 per ft³", totalCost: "0" },
    { item: "Walls - Clay Brick (Common Brick)", labourRate: "PKR 9000 per 100 ft³", totalCost: "0" },
    { item: "RCC Slab/Columns/Beams/Raft", labourRate: "PKR 10831.5 per 100 ft³", totalCost: "0" },
    { item: "Doors/Windows/Exterior Finish", labourRate: "PKR 500 per item", totalCost: "0" },
    { item: "Interior Finish", labourRate: "PKR 0", totalCost: "0" },
    { item: "Tiles/Marble", labourRate: "PKR 0", totalCost: "0" },
    { item: "Insulation", labourRate: "PKR 0", totalCost: "0" }
  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [newRateValue, setNewRateValue] = useState("");

  const handleEditRate = (rowIndex) => {
    setEditRowIndex(rowIndex);
    const currentRate = labourData[rowIndex].labourRate;
    // Extract numeric value from rate string
    const numericValue = currentRate.match(/[\d.]+/)?.[0] || "0";
    setNewRateValue(numericValue);
    setEditModalOpen(true);
  };

  const handleSaveRate = () => {
    if (editRowIndex !== null) {
      const updatedData = [...labourData];
      let formattedRate = "";
      
      // Format rate based on item type
      if (editRowIndex === 0) { // Excavation
        formattedRate = `PKR ${newRateValue} per ft³`;
      } else if (editRowIndex === 1 || editRowIndex === 2) { // Walls or RCC
        formattedRate = `PKR ${newRateValue} per 100 ft³`;
      } else if (editRowIndex === 3) { // Doors/Windows
        formattedRate = `PKR ${newRateValue} per item`;
      } else { // Others
        formattedRate = `PKR ${newRateValue}`;
      }
      
      updatedData[editRowIndex] = {
        ...updatedData[editRowIndex],
        labourRate: formattedRate
      };
      
      setLabourData(updatedData);
      setEditModalOpen(false);
      setEditRowIndex(null);
      setNewRateValue("");
    }
  };

  // Calculate total cost (currently all are 0, but structure is ready for future calculations)
  const totalCost = labourData.reduce((sum, row) => {
    const cost = parseFloat(row.totalCost) || 0;
    return sum + cost;
  }, 0);

  return (
    <div className="grid grid-cols-1 p-2">
      <Toaster />
      <TitleHeader>Labour Cost</TitleHeader>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f7f6fb" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#000" }}>Items</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#000" }}>Labour Rate</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#000" }}>Total Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labourData.map((row, index) => (
              <TableRow 
                key={index}
                sx={{ 
                  backgroundColor: "#ffffff",
                  '&:hover': {
                    backgroundColor: "#f7f6fb"
                  }
                }}
              >
                <TableCell sx={{ fontWeight: "medium" }}>
                  {row.item}
                </TableCell>
                <TableCell>
                  <div>
                    <div>{row.labourRate}</div>
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
                      onClick={() => handleEditRate(index)}
                    >
                      Edit
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  {row.totalCost}
                </TableCell>
              </TableRow>
            ))}
            
            {/* Total Row */}
            <TableRow sx={{ backgroundColor: "#f7f6fb" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#000" }}>
                Total
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#000" }}>
                -
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#000" }}>
                PKR {totalCost.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Note */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <strong>Note:</strong> All the values of labour rate is taken from market rate system (MRS-2022) Pakistan.
      </Alert>

      {/* Edit Rate Modal */}
      <Dialog 
        open={editModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        fullWidth 
        maxWidth="xs"
      >
        <DialogTitle>Edit Labour Rate</DialogTitle>
        <DialogContent>
          <TextField
            label="Labour Rate"
            value={newRateValue}
            onChange={(e) => setNewRateValue(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: { step: "0.1", min: "0" }
            }}
          />
          <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
            <Button 
              onClick={() => setEditModalOpen(false)} 
              color="secondary"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveRate} 
              color="primary" 
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}