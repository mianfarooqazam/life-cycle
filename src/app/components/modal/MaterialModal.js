"use client";
import { useState, useEffect } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
    Paper,
    TextField,
    MenuItem,
    Grid,
} from '@mui/material';
import { X, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { WallBrickBlock, ExteriorFinish, InteriorFinish, Insulation } from '@/app/data/Materials';

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
    overflowY: 'auto'
};

export default function MaterialModal({ open, onClose, onSave, editingMaterial }) {
    const [formData, setFormData] = useState({
        wallBrickBlock: '',
        wallBrickBlockCost: '',
        exteriorFinish: '',
        exteriorFinishCost: '',
        interiorFinish: '',
        interiorFinishCost: '',
        insulation: '',
        insulationCost: '',
        insulationThickness: ''
    });
    const [loading, setLoading] = useState(false);

    // Initialize form data when editing
    useEffect(() => {
        if (editingMaterial) {
            setFormData({
                wallBrickBlock: editingMaterial.wallBrickBlock || '',
                wallBrickBlockCost: editingMaterial.wallBrickBlockCost || '',
                exteriorFinish: editingMaterial.exteriorFinish || '',
                exteriorFinishCost: editingMaterial.exteriorFinishCost || '',
                interiorFinish: editingMaterial.interiorFinish || '',
                interiorFinishCost: editingMaterial.interiorFinishCost || '',
                insulation: editingMaterial.insulation || '',
                insulationCost: editingMaterial.insulationCost || '',
                insulationThickness: editingMaterial.insulationThickness || ''
            });
        } else {
            resetForm();
        }
    }, [editingMaterial, open]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleWallBrickBlockChange = (e) => {
        const selectedBlock = WallBrickBlock.find(block => block.name === e.target.value);
        setFormData(prev => ({
            ...prev,
            wallBrickBlock: e.target.value,
            wallBrickBlockCost: selectedBlock ? selectedBlock.costperitem : ''
        }));
    };

    const handleExteriorFinishChange = (e) => {
        const selectedFinish = ExteriorFinish.find(finish => finish.name === e.target.value);
        setFormData(prev => ({
            ...prev,
            exteriorFinish: e.target.value,
            exteriorFinishCost: selectedFinish ? selectedFinish.costperitem : ''
        }));
    };

    const handleInteriorFinishChange = (e) => {
        const selectedFinish = InteriorFinish.find(finish => finish.name === e.target.value);
        setFormData(prev => ({
            ...prev,
            interiorFinish: e.target.value,
            interiorFinishCost: selectedFinish ? selectedFinish.costperitem : ''
        }));
    };

    const handleInsulationChange = (e) => {
        const selectedInsulation = Insulation.find(insulation => insulation.name === e.target.value);
        setFormData(prev => ({
            ...prev,
            insulation: e.target.value,
            insulationCost: selectedInsulation ? selectedInsulation.costperitem : ''
        }));
    };

    const resetForm = () => {
        setFormData({
            wallBrickBlock: '',
            wallBrickBlockCost: '',
            exteriorFinish: '',
            exteriorFinishCost: '',
            interiorFinish: '',
            interiorFinishCost: '',
            insulation: '',
            insulationCost: '',
            insulationThickness: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation - only validate materials that are present
        const requiredFields = [];
        
        if (editingMaterial?.hasWallMaterial) {
            if (!formData.wallBrickBlock) requiredFields.push('Wall Brick Block');
        }
        if (editingMaterial?.hasExteriorFinish) {
            if (!formData.exteriorFinish) requiredFields.push('Exterior Finish');
        }
        if (editingMaterial?.hasInteriorFinish) {
            if (!formData.interiorFinish) requiredFields.push('Interior Finish');
        }
        if (editingMaterial?.hasInsulation) {
            if (!formData.insulation) requiredFields.push('Insulation');
            if (formData.insulation && formData.insulation !== 'No Insulation Used' && !formData.insulationThickness) {
                requiredFields.push('Insulation Thickness');
            }
        }

        if (requiredFields.length > 0) {
            toast.error(`Please fill in: ${requiredFields.join(', ')}`);
            return;
        }

        try {
            setLoading(true);

            // Call the onSave function passed from parent
            if (onSave) {
                onSave(formData);
            }

            toast.success(editingMaterial ? 'Material details updated successfully! 🎉' : 'Material details saved successfully! 🎉', {
                duration: 3000,
                style: {
                    background: '#5BB045',
                    color: 'white',
                    fontWeight: '500'
                }
            });

            resetForm();
            onClose();
        } catch (error) {
            toast.error('Failed to save material details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="material-modal-title"
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
                        id="material-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <Package size={24} color="#5BB045" />
                        {editingMaterial ? 'Edit Material Selection' : 'Material Selection'}
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'action.hover'
                            }
                        }}
                    >
                        <X size={20} />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ p: 3 }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        {/* Wall Brick Block Section */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField
                                select
                                label="Wall Brick Block"
                                name="wallBrickBlock"
                                value={formData.wallBrickBlock}
                                onChange={handleWallBrickBlockChange}
                                variant="outlined"
                                required
                                disabled={loading || !!editingMaterial || (editingMaterial && !editingMaterial.hasWallMaterial)}
                                sx={{ flex: 1 }}
                            >
                                {WallBrickBlock.map((block) => (
                                    <MenuItem key={block.name} value={block.name}>
                                        {block.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {(!editingMaterial || editingMaterial.hasWallMaterial) && (
                                <TextField
                                    label="Cost (Rs.)"
                                    name="wallBrickBlockCost"
                                    type="number"
                                    value={formData.wallBrickBlockCost}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    disabled={loading}
                                    sx={{ width: '150px' }}
                                />
                            )}
                        </Box>

                        {/* Exterior Finish Section */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField
                                select
                                label="Exterior Finish"
                                name="exteriorFinish"
                                value={formData.exteriorFinish}
                                onChange={handleExteriorFinishChange}
                                variant="outlined"
                                required
                                disabled={loading || !!editingMaterial || (editingMaterial && !editingMaterial.hasExteriorFinish)}
                                sx={{ flex: 1 }}
                            >
                                {ExteriorFinish.map((finish) => (
                                    <MenuItem key={finish.name} value={finish.name}>
                                        {finish.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {(!editingMaterial || editingMaterial.hasExteriorFinish) && (
                                <TextField
                                    label="Cost (Rs.)"
                                    name="exteriorFinishCost"
                                    type="number"
                                    value={formData.exteriorFinishCost}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    disabled={loading}
                                    sx={{ width: '150px' }}
                                />
                            )}
                        </Box>

                        {/* Interior Finish Section */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField
                                select
                                label="Interior Finish"
                                name="interiorFinish"
                                value={formData.interiorFinish}
                                onChange={handleInteriorFinishChange}
                                variant="outlined"
                                required
                                disabled={loading || !!editingMaterial || (editingMaterial && !editingMaterial.hasInteriorFinish)}
                                sx={{ flex: 1 }}
                            >
                                {InteriorFinish.map((finish) => (
                                    <MenuItem key={finish.name} value={finish.name}>
                                        {finish.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {(!editingMaterial || editingMaterial.hasInteriorFinish) && (
                                <TextField
                                    label="Cost (Rs.)"
                                    name="interiorFinishCost"
                                    type="number"
                                    value={formData.interiorFinishCost}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    disabled={loading}
                                    sx={{ width: '150px' }}
                                />
                            )}
                        </Box>

                        {/* Insulation Section */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField
                                select
                                label="Insulation"
                                name="insulation"
                                value={formData.insulation}
                                onChange={handleInsulationChange}
                                variant="outlined"
                                required
                                disabled={loading || !!editingMaterial || (editingMaterial && !editingMaterial.hasInsulation)}
                                sx={{ flex: 1 }}
                            >
                                {Insulation.map((insulation) => (
                                    <MenuItem key={insulation.name} value={insulation.name}>
                                        {insulation.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {(!editingMaterial || editingMaterial.hasInsulation) && (
                                <TextField
                                    label="Cost (Rs.)"
                                    name="insulationCost"
                                    type="number"
                                    value={formData.insulationCost}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    disabled={loading}
                                    sx={{ width: '150px' }}
                                />
                            )}
                        </Box>

                        {/* Insulation Thickness */}
                        {formData.insulation && formData.insulation !== 'No Insulation Used' && (!editingMaterial || editingMaterial.hasInsulation) && (
                            <TextField
                                fullWidth
                                label="Insulation Thickness (inch)"
                                name="insulationThickness"
                                type="number"
                                value={formData.insulationThickness}
                                onChange={handleInputChange}
                                margin="normal"
                                variant="outlined"
                                required
                                disabled={loading || !!editingMaterial}
                                inputProps={{ min: "0", step: "0.1" }}
                            />
                        )}

                        {/* Action Buttons */}
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'flex-end',
                            mt: 3
                        }}>
                            <Button
                                variant="outlined"
                                onClick={handleClose}
                                disabled={loading}
                                sx={{ px: 3 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    px: 3,
                                    backgroundColor: '#5BB045',
                                    color: '#fff',
                                    fontWeight: 600,
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#4a9537',
                                        color: '#fff',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
                                    },
                                    '&:active': {
                                        transform: 'translateY(0px)',
                                        boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
                                    },
                                    '&:disabled': {
                                        backgroundColor: '#e0e0e0',
                                        color: '#999',
                                        boxShadow: 'none',
                                        transform: 'none'
                                    }
                                }}
                            >
                                {loading ? 'Saving...' : (editingMaterial ? 'Update Materials' : 'Save Materials')}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
}