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
  MenuItem,
  Button
} from '@mui/material';
import { X, DoorOpen, RectangleHorizontal, Package } from 'lucide-react';
import SaveButton from '../components/button/SaveButton';
import TextInput from '../components/input/TextInput';
import { useExteriorStore } from '../store/tabs-components-store/exteriorstore';
import DoorModal from '../components/modal/DoorModal';
import WindowModal from '../components/modal/WindowModal';
import MaterialModal from '../components/modal/MaterialModal';

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
    height: '',
    isCurtainWall: 'no',
    glassThickness: '',
    wallThickness: '',
    areTilesUsed: 'no',
    tileHeight: '',
  });

  const { addExterior, updateExterior, editingExterior, clearEditingExterior } = useExteriorStore();

  const [doorModalOpen, setDoorModalOpen] = useState(false);
  const [windowModalOpen, setWindowModalOpen] = useState(false);
  const [materialModalOpen, setMaterialModalOpen] = useState(false);

  useEffect(() => {
    if (open && editingExterior) {
      setForm({
        length: editingExterior.length || '',
        height: editingExterior.height || '',
        isCurtainWall: editingExterior.isCurtainWall || 'no',
        glassThickness: editingExterior.glassThickness || '',
        wallThickness: editingExterior.wallThickness || '',
        areTilesUsed: editingExterior.areTilesUsed || 'no',
        tileHeight: editingExterior.tileHeight || '',
      });
    } else if (open) {
      setForm({
        length: '',
        height: '',
        isCurtainWall: 'no',
        glassThickness: '',
        wallThickness: '',
        areTilesUsed: 'no',
        tileHeight: '',
      });
    }
  }, [open, editingExterior]);

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

  // Calculate area (ft²): length * height
  const area = (() => {
    const l = parseFloat(form.length);
    const h = parseFloat(form.height);
    if (!isNaN(l) && !isNaN(h)) {
      return (l * h).toFixed(2);
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
      const th = parseFloat(form.tileHeight);
      const l = parseFloat(form.length);
      if (!isNaN(th) && !isNaN(l)) {
        return (th * l).toFixed(2);
      }
    }
    return '';
  })();

  const validateForm = () => {
    if (!form.length || !form.height) return false;
    if (form.isCurtainWall === 'yes' && !form.glassThickness) return false;
    if (form.isCurtainWall === 'no' && !form.wallThickness) return false;
    if (form.areTilesUsed === 'yes') {
      if (!form.tileHeight) return false;
      if (parseFloat(form.tileHeight) > parseFloat(form.height)) return false;
    }
    return true;
  };

  const getErrorMessage = () => {
    if (!form.length || !form.height) return 'Please fill in both length and height.';
    if (form.isCurtainWall === 'yes' && !form.glassThickness) return 'Please select glass thickness.';
    if (form.isCurtainWall === 'no' && !form.wallThickness) return 'Please enter wall thickness.';
    if (form.areTilesUsed === 'yes' && !form.tileHeight) return 'Please enter tile height.';
    if (form.areTilesUsed === 'yes' && parseFloat(form.tileHeight) > parseFloat(form.height)) return 'Tile height cannot exceed wall height.';
    return 'Please fill all required fields!';
  };

  const handleSave = () => {
    if (!validateForm()) return false;
    try {
      const dataToSave = {
        ...form,
        area,
        wallVolume: form.isCurtainWall === 'no' ? wallVolume : '',
        tileArea: form.areTilesUsed === 'yes' ? tileArea : '',
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
        height: '',
        isCurtainWall: 'no',
        glassThickness: '',
        wallThickness: '',
        areTilesUsed: 'no',
        tileHeight: '',
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
                    label="Exterior Wall Height (ft)"
                    name="height"
                    type="number"
                    value={form.height}
                    onChange={handleChange}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                </div>
              </div>
            </div>
            {form.length && form.height && (
              <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                <p className="text-lg font-bold text-gray-800">
                  Area: <span className="text-[#5BB045]">{area} ft²</span>
                </p>
              </div>
            )}
            {/* Curtain Wall Radio */}
            {form.length && form.height && (
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
                  label="Exterior Wall Thickness (inch)"
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
            {form.length && form.height && form.isCurtainWall === 'no' && (
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
            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', flexWrap: 'nowrap', mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<DoorOpen size={20} />}
                onClick={() => setDoorModalOpen(true)}
                sx={{
                  backgroundColor: '#5BB045',
                  color: '#fff',
                  fontWeight: 600,
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#4a9537',
                    color: '#fff',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
                  }
                }}
              >
                Add Door
              </Button>
              <Button
                variant="contained"
                startIcon={<RectangleHorizontal size={20} />}
                onClick={() => setWindowModalOpen(true)}
                sx={{
                  backgroundColor: '#5BB045',
                  color: '#fff',
                  fontWeight: 600,
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#4a9537',
                    color: '#fff',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
                  }
                }}
              >
                Add Window
              </Button>
              <Button
                variant="contained"
                startIcon={<Package size={20} />}
                onClick={() => setMaterialModalOpen(true)}
                sx={{
                  backgroundColor: '#5BB045',
                  color: '#fff',
                  fontWeight: 600,
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#4a9537',
                    color: '#fff',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
                  }
                }}
              >
                Select Materials
              </Button>
            </Box>
            {/* Save Button */}
            <div className="flex justify-end">
              <SaveButton
                onClick={handleSave}
                successMessage={editingExterior ? 'Exterior Wall Updated Successfully' : 'Exterior Wall Saved Successfully'}
                errorMessage={getErrorMessage()}
              >
                {editingExterior ? 'Update' : 'Save'}
              </SaveButton>
            </div>
            {/* Modals */}
            <DoorModal open={doorModalOpen} onClose={() => setDoorModalOpen(false)} />
            <WindowModal open={windowModalOpen} onClose={() => setWindowModalOpen(false)} />
            <MaterialModal open={materialModalOpen} onClose={() => setMaterialModalOpen(false)} />
          </div>
        </Box>
      </Paper>
    </Modal>
  );
} 