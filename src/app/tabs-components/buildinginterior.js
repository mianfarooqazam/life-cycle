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
  FormLabel,
  Select,
  MenuItem
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
    isCurtainWall: 'no',
    glassThickness: '',
    wallThickness: '',
    areTilesUsed: 'no',
    tileHeight: '',
  });
  const [showError, setShowError] = useState(false);

  const { addInterior, updateInterior, editingInterior, clearEditingInterior } = useInteriorStore();

  useEffect(() => {
    if (open && editingInterior) {
      setForm({
        length: editingInterior.length || '',
        width: editingInterior.width || '',
        isCurtainWall: editingInterior.isCurtainWall || 'no',
        glassThickness: editingInterior.glassThickness || '',
        wallThickness: editingInterior.wallThickness || '',
        areTilesUsed: editingInterior.areTilesUsed || 'no',
        tileHeight: editingInterior.tileHeight || '',
      });
    } else if (open) {
      setForm({
        length: '',
        width: '',
        isCurtainWall: 'no',
        glassThickness: '',
        wallThickness: '',
        areTilesUsed: 'no',
        tileHeight: '',
      });
    }
    setShowError(false);
  }, [open, editingInterior]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'isCurtainWall' && value === 'yes' ? { wallThickness: '' } : {}),
      ...(name === 'isCurtainWall' && value === 'no' ? { glassThickness: '' } : {}),
      ...(name === 'areTilesUsed' && value === 'no' ? { tileHeight: '' } : {}),
    }));
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

  // Calculate wall volume (ft³): area * thickness (in) / 12
  const wallVolume = (() => {
    if (form.isCurtainWall === 'no') {
      const a = parseFloat(area);
      const t = parseFloat(form.wallThickness);
      if (!isNaN(a) && !isNaN(t)) {
        return (a * t / 12).toFixed(2);
      }
    }
    return '';
  })();

  // Calculate tile area (ft²): tileHeight * length
  const tileArea = (() => {
    if (form.areTilesUsed === 'yes') {
      const h = parseFloat(form.tileHeight);
      const l = parseFloat(form.length);
      if (!isNaN(h) && !isNaN(l)) {
        return (h * l).toFixed(2);
      }
    }
    return '';
  })();

  // Validation
  const validateForm = () => {
    if (!form.length || !form.width) return false;
    if (form.isCurtainWall === 'yes' && !form.glassThickness) return false;
    if (form.isCurtainWall === 'no' && !form.wallThickness) return false;
    if (form.areTilesUsed === 'yes' && !form.tileHeight) return false;
    return true;
  };

  const getErrorMessage = () => {
    if (!form.length || !form.width) return 'Please fill in both length and width.';
    if (form.isCurtainWall === 'yes' && !form.glassThickness) return 'Please select glass thickness.';
    if (form.isCurtainWall === 'no' && !form.wallThickness) return 'Please enter wall thickness.';
    if (form.areTilesUsed === 'yes' && !form.tileHeight) return 'Please enter tile height.';
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
        wallVolume: form.isCurtainWall === 'no' ? wallVolume : '',
        tileArea: form.areTilesUsed === 'yes' ? tileArea : '',
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
        isCurtainWall: 'no',
        glassThickness: '',
        wallThickness: '',
        areTilesUsed: 'no',
        tileHeight: '',
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
            {/* Curtain Wall Radio */}
            {form.length && form.width && (
              <div>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Is this curtain wall?</FormLabel>
                  <RadioGroup
                    row
                    name="isCurtainWall"
                    value={form.isCurtainWall}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </div>
            )}
            {/* Glass Thickness Select */}
            {form.isCurtainWall === 'yes' && (
              <div>
                <FormControl fullWidth>
                  <FormLabel>Glass Thickness</FormLabel>
                  <Select
                    name="glassThickness"
                    value={form.glassThickness}
                    onChange={handleChange}
                  >
                    <MenuItem value="3mm">3mm</MenuItem>
                    <MenuItem value="6mm">6mm</MenuItem>
                    <MenuItem value="10mm">10mm</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
            {/* Wall Thickness Input */}
            {form.isCurtainWall === 'no' && (
              <div>
                <TextInput
                  label="Interior Wall Thickness (inch)"
                  name="wallThickness"
                  type="number"
                  value={form.wallThickness}
                  onChange={handleChange}
                  required
                  inputProps={{ min: "0", step: "0.1" }}
                />
              </div>
            )}
            {/* Wall Volume Display */}
            {form.isCurtainWall === 'no' && form.wallThickness && area && (
              <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                <p className="text-lg font-bold text-gray-800">
                  Wall Volume: <span className="text-[#5BB045]">{wallVolume} ft³</span>
                </p>
              </div>
            )}
            {/* Tiles Used Radio */}
            {form.length && form.width && form.isCurtainWall === 'no' && (
              <div>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Are tiles used in this wall?</FormLabel>
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
            )}
            {/* Tile Height Input */}
            {form.isCurtainWall === 'no' && form.areTilesUsed === 'yes' && (
              <div>
                <TextInput
                  label="Tile Height (ft)"
                  name="tileHeight"
                  type="number"
                  value={form.tileHeight}
                  onChange={handleChange}
                  required
                  inputProps={{ min: "0", step: "0.1" }}
                />
              </div>
            )}
            {/* Tile Area Display */}
            {form.isCurtainWall === 'no' && form.areTilesUsed === 'yes' && form.tileHeight && form.length && (
              <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                <p className="text-lg font-bold text-gray-800">
                  Tile Area: <span className="text-[#5BB045]">{tileArea} ft²</span>
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