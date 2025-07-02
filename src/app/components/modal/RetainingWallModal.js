import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Typography,
  IconButton,
  Paper
} from '@mui/material';
import { X } from 'lucide-react';
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 0,
  outline: 'none',
  maxHeight: '90vh',
  overflowY: 'auto'
};

export default function RetainingWallModal({
  open,
  onClose,
  onSave,
  editingRow,
  formData,
  updateFormData,
  resetFormData,
  calculateVolume
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="retaining-wall-modal-title">
      <Paper sx={modalStyle}>
        {/* Header */}
        <Box sx={{
          p: 3,
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography id="retaining-wall-modal-title" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Retaining Wall Details
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}>
            <X size={20} />
          </IconButton>
        </Box>
        {/* Content */}
        <Box sx={{ p: 3 }}>
          <div className="grid grid-cols-1 gap-6">
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="retaining-wall-type-label">Retaining Wall Type</InputLabel>
              <Select
                labelId="retaining-wall-type-label"
                id="retaining-wall-type"
                value={formData.wallType}
                label="Retaining Wall Type"
                name="wallType"
                onChange={handleInputChange}
              >
                <MenuItem value="brick">Brick</MenuItem>
                <MenuItem value="concrete">Concrete</MenuItem>
              </Select>
            </FormControl>
            <TextInput
              label="Retaining Wall Length (ft)"
              name="length"
              type="number"
              value={formData.length}
              onChange={handleInputChange}
              required
              inputProps={{ min: '0', step: '0.1' }}
            />
            <TextInput
              label="Retaining Wall Height (ft)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleInputChange}
              required
              inputProps={{ min: '0', step: '0.1' }}
            />
            <TextInput
              label="Retaining Wall Thickness (inch)"
              name="thickness"
              type="number"
              value={formData.thickness}
              onChange={handleInputChange}
              required
              inputProps={{ min: '0', step: '0.1' }}
            />
            {formData.length && formData.height && formData.thickness && (
              <div className="p-4 rounded-md" style={{ backgroundColor: '#f7f6fb' }}>
                <p className="text-lg font-bold text-gray-800">
                  Retaining Wall Volume: <span className="text-[#5BB045]">{calculateVolume()} ft³</span>
                </p>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <SaveButton onClick={onSave} successMessage="Retaining Wall Saved!" errorMessage="Please fill all required fields!" />
            </div>
          </div>
        </Box>
      </Paper>
    </Modal>
  );
} 