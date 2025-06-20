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
import { useExteriorStore } from '../store/tabs-components-store/exteriorstore';

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

export default function BuildingExteriorModal({ open, onClose, floor }) {
  const [form, setForm] = useState({
    length: '',
    width: '',
  });

  const { addExterior, updateExterior, editingExterior, clearEditingExterior } = useExteriorStore();

  useEffect(() => {
    if (open && editingExterior) {
      setForm({
        length: editingExterior.length || '',
        width: editingExterior.width || '',
      });
    } else if (open) {
      setForm({
        length: '',
        width: '',
      });
    }
  }, [open, editingExterior]);

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

  const validateForm = () => {
    if (!form.length || !form.width) return false;
    return true;
  };

  const getErrorMessage = () => {
    if (!form.length || !form.width) return 'Please fill in both length and width.';
    return 'Please fill all required fields!';
  };

  const handleSave = () => {
    if (!validateForm()) return false;
    try {
      const dataToSave = {
        ...form,
        area,
        timestamp: new Date().toISOString(),
        floor,
      };
      if (editingExterior) {
        updateExterior(editingExterior.id, dataToSave);
        clearEditingExterior();
      } else {
        addExterior(dataToSave);
      }
      setForm({
        length: '',
        width: '',
      });
      onClose && onClose();
      return true;
    } catch (error) {
      console.error('Error saving exterior wall data:', error);
      return false;
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="exterior-wall-modal-title">
      <Paper sx={modalStyle}>
        <Box sx={{ p: 3, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography id="exterior-wall-modal-title" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Exterior Wall Details
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}>
            <X size={20} />
          </IconButton>
        </Box>
        <Box sx={{ p: 3 }}>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <TextInput
                    label="Exterior Wall Length (ft)"
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
                    label="Exterior Wall Width (ft)"
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
            {form.length && form.width && (
              <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                <p className="text-lg font-bold text-gray-800">
                  Area: <span className="text-[#5BB045]">{area} ft²</span>
                </p>
              </div>
            )}
            <div className="flex justify-end">
              <SaveButton
                onClick={handleSave}
                successMessage={editingExterior ? 'Exterior Wall Updated Successfully' : 'Exterior Wall Saved Successfully'}
                errorMessage={getErrorMessage()}
              >
                {editingExterior ? 'Update' : 'Save'}
              </SaveButton>
            </div>
          </div>
        </Box>
      </Paper>
    </Modal>
  );
} 