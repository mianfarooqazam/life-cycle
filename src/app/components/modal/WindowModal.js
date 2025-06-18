"use client";
import { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
    Paper,
    TextField,
    MenuItem,
    Divider
} from '@mui/material';
import { X, RectangleHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 0,
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto'
};

const windowTypes = [
    { value: 'wooden', label: 'Wooden' },
    { value: 'upvc', label: 'UPVC' },
    { value: 'aluminium', label: 'Aluminium' }
];

export default function WindowModal({ open, onClose }) {
    const [formData, setFormData] = useState({
        windowType: '',
        height: '',
        width: '',
        thickness: '',
        numberOfWindows: '',
        costPerWindow: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateWindowArea = () => {
        const height = parseFloat(formData.height) || 0;
        const width = parseFloat(formData.width) || 0;
        const numberOfWindows = parseInt(formData.numberOfWindows) || 0;
        return (height * width * numberOfWindows).toFixed(2);
    };

    const calculateTotalCost = () => {
        const numberOfWindows = parseInt(formData.numberOfWindows) || 0;
        const costPerWindow = parseFloat(formData.costPerWindow) || 0;
        return (numberOfWindows * costPerWindow).toLocaleString();
    };

    const calculateTotalCO2 = () => {
        const numberOfWindows = parseInt(formData.numberOfWindows) || 0;
        return (numberOfWindows * 1000).toLocaleString();
    };

    const resetForm = () => {
        setFormData({
            windowType: '',
            height: '',
            width: '',
            thickness: '',
            numberOfWindows: '',
            costPerWindow: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.windowType) {
            toast.error('Please select a window type');
            return;
        }

        if (!formData.height || !formData.width || !formData.thickness || !formData.numberOfWindows || !formData.costPerWindow) {
            toast.error('Please fill in all fields');
            return;
        }

        if (parseFloat(formData.height) <= 0 || parseFloat(formData.width) <= 0) {
            toast.error('Height and width must be greater than 0');
            return;
        }

        if (parseInt(formData.numberOfWindows) <= 0) {
            toast.error('Number of windows must be greater than 0');
            return;
        }

        try {
            setLoading(true);

            // Here you would typically save the data
            // await saveWindowData(formData);

            toast.success('Window details saved successfully! 🎉', {
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
            toast.error('Failed to save window details. Please try again.');
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
            aria-labelledby="window-modal-title"
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
                        id="window-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <RectangleHorizontal size={24} color="#5BB045" />
                        Add Window Details
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
                        {/* Window Type Selection */}
                        <TextField
                            fullWidth
                            select
                            label="Window Type"
                            name="windowType"
                            value={formData.windowType}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            required
                            disabled={loading}
                        >
                            {windowTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Height and Width */}
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Height (ft)"
                                name="height"
                                type="number"
                                value={formData.height}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                disabled={loading}
                                inputProps={{ min: "0", step: "0.1" }}
                            />
                            <TextField
                                fullWidth
                                label="Width (ft)"
                                name="width"
                                type="number"
                                value={formData.width}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                disabled={loading}
                                inputProps={{ min: "0", step: "0.1" }}
                            />
                        </Box>

                        {/* Thickness and Number of Windows */}
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Thickness (inch)"
                                name="thickness"
                                type="number"
                                value={formData.thickness}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                disabled={loading}
                                inputProps={{ min: "0", step: "0.1" }}
                            />
                            <TextField
                                fullWidth
                                label="No. of Windows"
                                name="numberOfWindows"
                                type="number"
                                value={formData.numberOfWindows}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                disabled={loading}
                                inputProps={{ min: "1" }}
                            />
                        </Box>

                        {/* Cost per Window */}
                        <TextField
                            fullWidth
                            label="Cost per Window (Rs.)"
                            name="costPerWindow"
                            type="number"
                            value={formData.costPerWindow}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            required
                            disabled={loading}
                            inputProps={{ min: "0" }}
                        />

                        {/* Calculations Display */}
                        {formData.height && formData.width && formData.numberOfWindows && (
                            <>
                                <Box sx={{
                                    p: 2,
                                    backgroundColor: '#f7f6fb',
                                    borderRadius: 1,
                                    mb: 2
                                }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'left', mb: 1 }}>
                                        Total Window Area: <span style={{ color: '#5BB045' }}>{calculateWindowArea()} ft²</span>
                                    </Typography>
                                    
                                    {formData.costPerWindow && (
                                        <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'left', mb: 1 }}>
                                            Total Cost: <span style={{ color: '#5BB045' }}>Rs. {calculateTotalCost()}</span>
                                        </Typography>
                                    )}
                                    
                                    <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'left' }}>
                                        Total kg-CO2 eq: <span style={{ color: '#5BB045' }}>{calculateTotalCO2()}</span>
                                    </Typography>
                                </Box>
                            </>
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
                                {loading ? 'Saving...' : 'Save Window'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
}