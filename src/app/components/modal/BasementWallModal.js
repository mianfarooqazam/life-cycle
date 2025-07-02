import React, { useState } from 'react';
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Paper,
  Modal,
  Typography,
  IconButton,
  Divider,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material';
import { X } from 'lucide-react';
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
import { WallBrickBlock, ExteriorFinish, InteriorFinish, Insulation } from '@/app/data/Materials';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 0,
  outline: 'none',
  maxHeight: '90vh',
  overflowY: 'auto'
};

export default function BasementWallModal({
  open,
  onClose,
  onSave,
  editingRow,
  formData,
  doorForm,
  windowForm,
  updateFormData,
  updateDoorForm,
  updateWindowForm,
  resetFormData,
  resetDoorForm,
  resetWindowForm,
  calculateWallArea,
  calculateWallVolume,
  calculateDoorArea,
  calculateWindowArea,
  calculateTilesArea,
  foundationType,
  calculateStripVolumeForWall
}) {
  const [tileHeightError, setTileHeightError] = useState('');

  // Tile height validation
  const handleTileHeightChange = (e) => {
    const value = e.target.value;
    const wallHeight = parseFloat(formData.height);
    if (value && wallHeight && parseFloat(value) > wallHeight) {
      setTileHeightError('Tile height cannot be greater than wall height');
    } else {
      setTileHeightError('');
    }
    updateFormData({ tileHeight: value });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="basement-wall-modal-title"
    >
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
          <Typography
            id="basement-wall-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: 600 }}
          >
            Basement Wall Details
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <X size={20} />
          </IconButton>
        </Box>
        {/* Content */}
        <Box sx={{ p: 3 }}>
          <div className="grid grid-cols-1 gap-6">
            {/* Wall Material and Finish Selection in one line */}
            <div className="flex flex-row gap-4">
              <div className="flex-1">
                <FormControl fullWidth>
                  <InputLabel id="wall-material-label">Wall Material</InputLabel>
                  <Select
                    labelId="wall-material-label"
                    id="wall-material"
                    value={formData.wallMaterial}
                    label="Wall Material"
                    onChange={(e) => updateFormData({ wallMaterial: e.target.value })}
                  >
                    {WallBrickBlock.map((item) => (
                      <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="flex-1">
                <FormControl fullWidth>
                  <InputLabel id="exterior-finish-label">Exterior Finish</InputLabel>
                  <Select
                    labelId="exterior-finish-label"
                    id="exterior-finish"
                    value={formData.exteriorFinish}
                    label="Exterior Finish"
                    onChange={(e) => updateFormData({ exteriorFinish: e.target.value })}
                  >
                    {ExteriorFinish.map((item) => (
                      <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="flex-1">
                <FormControl fullWidth>
                  <InputLabel id="interior-finish-label">Interior Finish</InputLabel>
                  <Select
                    labelId="interior-finish-label"
                    id="interior-finish"
                    value={formData.interiorFinish}
                    label="Interior Finish"
                    onChange={(e) => updateFormData({ interiorFinish: e.target.value })}
                  >
                    {InteriorFinish.map((item) => (
                      <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            {/* First row: Length & Height */}
            <div className="flex flex-row gap-4">
              <div className="flex-1">
                <TextInput
                  label="Basement Wall Length (ft)"
                  name="length"
                  type="number"
                  value={formData.length}
                  onChange={(e) => updateFormData({ length: e.target.value })}
                  required
                  inputProps={{ min: "0", step: "0.1" }}
                />
              </div>
              <div className="flex-1">
                <TextInput
                  label="Basement Wall Height (ft)"
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateFormData({ height: e.target.value })}
                  required
                  inputProps={{ min: "0", step: "0.1" }}
                />
              </div>
            </div>
            {/* Second row: Thickness only */}
            <div className="flex flex-row gap-4">
              <div className="flex-1">
                <TextInput
                  label="Basement Wall Thickness (inch)"
                  name="thickness"
                  type="number"
                  value={formData.thickness}
                  onChange={(e) => updateFormData({ thickness: e.target.value })}
                  required
                  inputProps={{ min: "0", step: "0.1" }}
                  sx={{ maxWidth: 250 }}
                />
              </div>
            </div>
            {/* Calculated Values */}
            {formData.length && formData.height && formData.thickness && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                  <p className="text-lg font-bold text-gray-800">
                    Basement Wall Area: <span className="text-[#5BB045]">{calculateWallArea()} ft²</span>
                  </p>
                </div>
                <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                  <p className="text-lg font-bold text-gray-800">
                    Basement Wall Volume: <span className="text-[#5BB045]">{calculateWallVolume()} ft³</span>
                  </p>
                </div>
              </div>
            )}
            {/* Insulation Radio Button */}
            <div className="grid grid-cols-1">
              <FormControl component="fieldset">
                <FormLabel component="legend">Is Insulation Used?</FormLabel>
                <RadioGroup
                  row
                  name="isInsulationUsed"
                  value={formData.isInsulationUsed}
                  onChange={(e) => updateFormData({ isInsulationUsed: e.target.value })}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            {/* Insulation Type and Thickness Input */}
            {formData.isInsulationUsed === 'yes' && (
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <FormControl fullWidth>
                    <InputLabel id="insulation-type-label">Insulation Type</InputLabel>
                    <Select
                      labelId="insulation-type-label"
                      id="insulation-type"
                      value={formData.insulationType}
                      label="Insulation Type"
                      onChange={(e) => updateFormData({ insulationType: e.target.value })}
                    >
                      {Insulation.map((item) => (
                        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex-1">
                  <TextInput
                    placeholder="Basement Wall Insulation Thickness (inch)"
                    name="insulationThickness"
                    type="number"
                    value={formData.insulationThickness}
                    onChange={(e) => updateFormData({ insulationThickness: e.target.value })}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                </div>
              </div>
            )}
            {/* Tiles Used Radio Button */}
            <div className="grid grid-cols-1">
              <FormControl component="fieldset">
                <FormLabel component="legend">Are Tiles Used in Wall?</FormLabel>
                <RadioGroup
                  row
                  name="isTilesUsed"
                  value={formData.isTilesUsed ?? 'no'}
                  onChange={(e) => updateFormData({ isTilesUsed: e.target.value })}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            {/* Tile Height Input */}
            {formData.isTilesUsed === 'yes' && (
              <div>
                <TextInput
                  label="Tile Height (ft)"
                  name="tileHeight"
                  type="number"
                  value={formData.tileHeight}
                  onChange={handleTileHeightChange}
                  required
                  inputProps={{ min: '0', step: '0.1', max: formData.height || undefined }}
                  sx={{ maxWidth: 250 }}
                  error={!!tileHeightError}
                  helperText={tileHeightError}
                />
              </div>
            )}
            {/* Tiles Area Display */}
            {formData.isTilesUsed === 'yes' && formData.tileHeight && !tileHeightError && (
              <div className="p-4 rounded-md" style={{ backgroundColor: '#f7f6fb', maxWidth: 350 }}>
                <p className="text-lg font-bold text-gray-800">
                  Basement Wall Tiles Area: <span className="text-[#5BB045]">{calculateTilesArea()} ft²</span>
                </p>
              </div>
            )}
            {/* Strip Foundation Fields for Basement Wall */}
            {foundationType === 'strip' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                  <TextInput
                    label="Strip Depth (ft)"
                    name="stripDepth"
                    type="number"
                    value={formData.stripDepth}
                    onChange={(e) => updateFormData({ stripDepth: e.target.value })}
                    inputProps={{ min: '0', step: '0.1' }}
                  />
                  <TextInput
                    label="Strip Width (ft)"
                    name="stripWidth"
                    type="number"
                    value={formData.stripWidth}
                    onChange={(e) => updateFormData({ stripWidth: e.target.value })}
                    inputProps={{ min: '0', step: '0.1' }}
                  />
                </div>
                {formData.length && formData.stripDepth && formData.stripWidth && (
                  <div className="p-4 rounded-md mt-2" style={{ backgroundColor: '#f7f6fb' }}>
                    <p className="text-lg font-bold text-gray-800">
                      Strip Volume: <span className="text-[#5BB045]">{calculateStripVolumeForWall()} ft³</span>
                    </p>
                  </div>
                )}
              </>
            )}
            {/* Door and Window Inputs Side by Side */}
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', mt: 2 }}>
              {/* Door Inputs (Left) */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Door Details</Typography>
                <TextInput
                  label="Door Type"
                  name="doorType"
                  value={doorForm.doorType}
                  onChange={(e) => updateDoorForm({ doorType: e.target.value })}
                  select
                  options={[
                    { value: 'wooden', label: 'Wooden' },
                    { value: 'upvc', label: 'UPVC' },
                    { value: 'aluminium', label: 'Aluminium' }
                  ]}
                  required
                />
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <TextInput
                    label="Height (ft)"
                    name="height"
                    type="number"
                    value={doorForm.height}
                    onChange={(e) => updateDoorForm({ height: e.target.value })}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                  <TextInput
                    label="Width (ft)"
                    name="width"
                    type="number"
                    value={doorForm.width}
                    onChange={(e) => updateDoorForm({ width: e.target.value })}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <TextInput
                    label="Thickness (inch)"
                    name="thickness"
                    type="number"
                    value={doorForm.thickness}
                    onChange={(e) => updateDoorForm({ thickness: e.target.value })}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                  <TextInput
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={doorForm.quantity}
                    onChange={(e) => updateDoorForm({ quantity: e.target.value })}
                    required
                    inputProps={{ min: "1" }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <TextInput
                    label="Cost per Door"
                    name="costPerDoor"
                    type="number"
                    value={doorForm.costPerDoor}
                    onChange={(e) => updateDoorForm({ costPerDoor: e.target.value })}
                    required
                    inputProps={{ min: "0" }}
                  />
                </Box>
              </Box>
              {/* Divider */}
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              {/* Window Inputs (Right) */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Window Details</Typography>
                <TextInput
                  label="Window Type"
                  name="windowType"
                  value={windowForm.windowType}
                  onChange={(e) => updateWindowForm({ windowType: e.target.value })}
                  select
                  options={[
                    { value: 'wooden', label: 'Wooden' },
                    { value: 'upvc', label: 'UPVC' },
                    { value: 'aluminium', label: 'Aluminium' }
                  ]}
                  required
                />
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <TextInput
                    label="Height (ft)"
                    name="height"
                    type="number"
                    value={windowForm.height}
                    onChange={(e) => updateWindowForm({ height: e.target.value })}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                  <TextInput
                    label="Width (ft)"
                    name="width"
                    type="number"
                    value={windowForm.width}
                    onChange={(e) => updateWindowForm({ width: e.target.value })}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <TextInput
                    label="Thickness (inch)"
                    name="thickness"
                    type="number"
                    value={windowForm.thickness}
                    onChange={(e) => updateWindowForm({ thickness: e.target.value })}
                    required
                    inputProps={{ min: "0", step: "0.1" }}
                  />
                  <TextInput
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={windowForm.quantity}
                    onChange={(e) => updateWindowForm({ quantity: e.target.value })}
                    required
                    inputProps={{ min: "1" }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <TextInput
                    label="Cost per Window"
                    name="costPerWindow"
                    type="number"
                    value={windowForm.costPerWindow}
                    onChange={(e) => updateWindowForm({ costPerWindow: e.target.value })}
                    required
                    inputProps={{ min: "0" }}
                  />
                </Box>
              </Box>
            </Box>
            {/* Display Door and Window Area */}
            {(doorForm.height && doorForm.width && doorForm.quantity) || (windowForm.height && windowForm.width && windowForm.quantity) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doorForm.height && doorForm.width && doorForm.quantity && (
                  <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                    <p className="text-lg font-bold text-gray-800">
                      Door Area: <span className="text-[#5BB045]">{calculateDoorArea()} ft²</span>
                    </p>
                  </div>
                )}
                {windowForm.height && windowForm.width && windowForm.quantity && (
                  <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                    <p className="text-lg font-bold text-gray-800">
                      Window Area: <span className="text-[#5BB045]">{calculateWindowArea()} ft²</span>
                    </p>
                  </div>
                )}
              </div>
            ) : null}
            {/* Save Button */}
            <div className="grid grid-cols-1 justify-items-end">
              <SaveButton
                onClick={onSave}
                successMessage="Basement Wall Data Saved Successfully! 🎉"
                errorMessage="Please fill all required fields!"
              />
            </div>
          </div>
        </Box>
      </Paper>
    </Modal>
  );
} 