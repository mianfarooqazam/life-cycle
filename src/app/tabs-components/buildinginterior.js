import { useState, useEffect } from 'react';
import {
  Modal,
  Paper,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { X } from 'lucide-react';
import SaveButton from '../components/button/SaveButton';
import TextInput from '../components/input/TextInput';
import { useInteriorStore } from '../store/tabs-components-store/interiorstore';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 0,
  outline: 'none',
  maxHeight: '90vh',
  overflowY: 'auto',
};

export default function BuildingInteriorModal({ open, onClose, floor }) {
  const [form, setForm] = useState({
    length: '',
    width: '',
  });
  const [showError, setShowError] = useState(false);

  const { addInterior, updateInterior, editingInterior, clearEditingInterior } = useInteriorStore();

  useEffect(() => {
    if (open && editingInterior) {
      setForm({
        length: editingInterior.length || '',
        width: editingInterior.width || '',
      });
    } else if (open) {
      setForm({
        length: '',
        width: '',
      });
    }
    setShowError(false);
  }, [open, editingInterior]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate area (ft²): length * width
  const area = (() => {
    const l = parseFloat(form.length);
    const w = parseFloat(form.width);
    if (!isNaN(l) && !isNaN(w)) {
      return (l * w).toFixed(2);
    }
    return '';
  })();

  // Validation
  const validateForm = () => {
    if (!form.length || !form.width) return false;
    return true;
  };

  const getErrorMessage = () => {
    if (!form.length || !form.width) return 'Please fill in both length and width.';
    return 'Please fill all required fields!';
  };

  // Save handler
  const handleSave = () => {
    if (!validateForm()) {
      setShowError(true);
      return false;
    }
    try {
      const dataToSave = {
        ...form,
        area,
        timestamp: new Date().toISOString(),
        floor,
      };
      if (editingInterior) {
        updateInterior(editingInterior.id, dataToSave);
        clearEditingInterior();
      } else {
        addInterior(dataToSave);
      }
      setForm({
        length: '',
        width: '',
      });
      setShowError(false);
      onClose && onClose();
      return true;
    } catch (error) {
      console.error('Error saving interior wall data:', error);
      return false;
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="interior-wall-modal-title">
      <Paper sx={modalStyle}>
        {/* Header */}
        <Box sx={{ p: 3, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography id="interior-wall-modal-title" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Interior Wall Details
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}>
            <X size={20} />
          </IconButton>
        </Box>
        {/* Content */}
        <Box sx={{ p: 3 }}>
          <div className="grid grid-cols-1 gap-6">
            {/* Length & Width Inputs */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <TextInput
                    label="Interior Wall Length (ft)"
                    name="length"
                    type="number"
                    value={form.length}
                    onChange={handleChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                </div>
                <div className="flex-1">
                  <TextInput
                    label="Interior Wall Width (ft)"
                    name="width"
                    type="number"
                    value={form.width}
                    onChange={handleChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                </div>
              </div>
            </div>
            {/* Area Display */}
            {form.length && form.width && (
              <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                <p className="text-lg font-bold text-gray-800">
                  Area: <span className="text-[#5BB045]">{area} ft²</span>
                </p>
              </div>
            )}
            {/* Save Button */}
            <div className="flex justify-end">
              <SaveButton
                onClick={handleSave}
                successMessage={editingInterior ? 'Interior Wall Updated Successfully' : 'Interior Wall Saved Successfully'}
                errorMessage={getErrorMessage()}
              >
                {editingInterior ? 'Update' : 'Save'}
              </SaveButton>
            </div>
          </div>
        </Box>
      </Paper>
    </Modal>
  );
} 