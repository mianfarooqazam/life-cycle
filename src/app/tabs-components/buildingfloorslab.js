import { useState, useEffect } from 'react';
import {
  Modal,
  Paper,
  Box,
  Typography,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel
} from '@mui/material';
import { X } from 'lucide-react';
import SaveButton from '../components/button/SaveButton';
import TextInput from '../components/input/TextInput';
import { useSlabStore } from '../store/tabs-components-store/slabstore';

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

export default function BuildingFloorSlabModal({ open, onClose }) {
  const [form, setForm] = useState({
    slabArea: '',
    slabThickness: '',
    isCeilingUsed: 'no',
    ceilingArea: '',
    areTilesUsed: 'no',
    tilesArea: '',
  });

  const { addSlab, updateSlab, editingSlab, clearEditingSlab } = useSlabStore();

  useEffect(() => {
    if (open && editingSlab) {
      setForm({
        slabArea: editingSlab.slabArea || '',
        slabThickness: editingSlab.slabThickness || '',
        isCeilingUsed: editingSlab.isCeilingUsed || 'no',
        ceilingArea: editingSlab.ceilingArea || '',
        areTilesUsed: editingSlab.areTilesUsed || 'no',
        tilesArea: editingSlab.tilesArea || '',
      });
    } else if (open) {
      setForm({
        slabArea: '',
        slabThickness: '',
        isCeilingUsed: 'no',
        ceilingArea: '',
        areTilesUsed: 'no',
        tilesArea: '',
      });
    }
  }, [open, editingSlab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'isCeilingUsed' && value === 'no' ? { ceilingArea: '' } : {}),
      ...(name === 'areTilesUsed' && value === 'no' ? { tilesArea: '' } : {}),
    }));
  };

  // Calculate slab volume (ft3): area (ft2) * thickness (in) / 12
  const slabVolume = (() => {
    const area = parseFloat(form.slabArea);
    const thickness = parseFloat(form.slabThickness);
    if (!isNaN(area) && !isNaN(thickness)) {
      return (area * thickness / 12).toFixed(2);
    }
    return '';
  })();

  // Validation
  const validateForm = () => {
    if (!form.slabArea || !form.slabThickness) return false;
    if (form.isCeilingUsed === 'yes' && !form.ceilingArea) return false;
    if (form.areTilesUsed === 'yes' && !form.tilesArea) return false;
    return true;
  };

  const getErrorMessage = () => {
    if (!form.slabArea || !form.slabThickness) return 'Please fill in slab area and thickness.';
    if (form.isCeilingUsed === 'yes' && !form.ceilingArea) return 'Please enter ceiling area.';
    if (form.areTilesUsed === 'yes' && !form.tilesArea) return 'Please enter tiles area.';
    return 'Please fill all required fields!';
  };

  // Save handler
  const handleSave = () => {
    if (!validateForm()) return false;
    try {
      const dataToSave = {
        ...form,
        slabVolume,
        timestamp: new Date().toISOString(),
      };
      if (editingSlab) {
        updateSlab(editingSlab.id, dataToSave);
        clearEditingSlab();
      } else {
        addSlab(dataToSave);
      }
      setForm({
        slabArea: '',
        slabThickness: '',
        isCeilingUsed: 'no',
        ceilingArea: '',
        areTilesUsed: 'no',
        tilesArea: '',
      });
      onClose && onClose();
      return true;
    } catch (error) {
      console.error('Error saving floor slab data:', error);
      return false;
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="floor-slab-modal-title">
      <Paper sx={modalStyle}>
        {/* Header */}
        <Box sx={{ p: 3, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography id="floor-slab-modal-title" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Floor Slab Details
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}>
            <X size={20} />
          </IconButton>
        </Box>
        {/* Content */}
        <Box sx={{ p: 3 }}>
          <div className="grid grid-cols-1 gap-6">
            {/* Slab Area & Thickness */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <TextInput
                    label="Slab Area (ft²)"
                    name="slabArea"
                    type="number"
                    value={form.slabArea}
                    onChange={handleChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                </div>
                <div className="flex-1">
                  <TextInput
                    label="Slab Thickness (inch)"
                    name="slabThickness"
                    type="number"
                    value={form.slabThickness}
                    onChange={handleChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                </div>
              </div>
            </div>
            {/* Slab Volume Display */}
            {form.slabArea && form.slabThickness && (
              <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                <p className="text-lg font-bold text-gray-800">
                  Slab Volume: <span className="text-[#5BB045]">{slabVolume} ft³</span>
                </p>
              </div>
            )}
            {/* Ceiling Radio Button */}
            <div className="grid grid-cols-1">
              <FormControl component="fieldset">
                <FormLabel component="legend">Is Ceiling Used?</FormLabel>
                <RadioGroup
                  row
                  name="isCeilingUsed"
                  value={form.isCeilingUsed}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            {/* Ceiling Area Input */}
            {form.isCeilingUsed === 'yes' && (
              <div className="mt-2">
                <TextInput
                  label="Ceiling Area (ft²)"
                  name="ceilingArea"
                  type="number"
                  value={form.ceilingArea}
                  onChange={handleChange}
                  required
                  inputProps={{ min: "0", step: "0.1" }}
                />
              </div>
            )}
            {/* Tiles Radio Button */}
            <div className="grid grid-cols-1">
              <FormControl component="fieldset">
                <FormLabel component="legend">Are Tiles Used?</FormLabel>
                <RadioGroup
                  row
                  name="areTilesUsed"
                  value={form.areTilesUsed}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            {/* Tiles Area Input */}
            {form.areTilesUsed === 'yes' && (
              <div className="mt-2">
                <TextInput
                  label="Tiles Area (ft²)"
                  name="tilesArea"
                  type="number"
                  value={form.tilesArea}
                  onChange={handleChange}
                  required
                  inputProps={{ min: "0", step: "0.1" }}
                />
              </div>
            )}
            {/* Save Button */}
            <div className="grid grid-cols-1 justify-items-end">
              <SaveButton
                onClick={handleSave}
                successMessage="Floor Slab Data Saved Successfully! 🎉"
                errorMessage={getErrorMessage()}
              />
            </div>
          </div>
        </Box>
      </Paper>
    </Modal>
  );
} 