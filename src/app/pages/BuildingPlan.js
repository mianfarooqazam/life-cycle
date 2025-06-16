'use client';

import { useState, useEffect } from 'react';
import { calculatePlotArea } from '@/app/utils/buildingPlanCalc';
import SaveButton from '@/app/components/button/SaveButton';
import { Toaster } from 'react-hot-toast';
import { useBuildingPlanStore } from '@/app/store/buildingPlanStore';
import TitleHeader from '@/app/components/header/TitleHeader';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel
} from '@mui/material';

export default function BuildingPlan() {
    const {
        projectName,
        address,
        plotSize,
        marlaSize,
        isBasementUsed,
        foundationType,
        excavatorType,
        updateBuildingPlan
    } = useBuildingPlanStore();

    const [formData, setFormData] = useState({
        projectName: projectName || '',
        address: address || '',
        plotSize: plotSize || '',
        marlaSize: marlaSize || 272,
        isBasementUsed: isBasementUsed || 'no',
        foundationType: foundationType || '',
        excavatorType: excavatorType || 'Crawler Excavation'
    });

    useEffect(() => {
        setFormData({
            projectName: projectName || '',
            address: address || '',
            plotSize: plotSize || '',
            marlaSize: marlaSize || 272,
            isBasementUsed: isBasementUsed || 'no',
            foundationType: foundationType || '',
            excavatorType: excavatorType || 'Crawler Excavation'
        });
    }, [projectName, address, plotSize, marlaSize, isBasementUsed, foundationType, excavatorType]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Validation
        if (!formData.plotSize || !formData.marlaSize || !formData.isBasementUsed) {
            return false;
        }

        if (formData.isBasementUsed === 'yes' && !formData.foundationType) {
            return false;
        }

        const plotArea = calculatePlotArea(parseFloat(formData.plotSize), parseInt(formData.marlaSize));

        updateBuildingPlan({
            ...formData,
            marlaSize: parseInt(formData.marlaSize),
            plotArea
        });

        return true;
    };

    const plotArea = formData.plotSize && formData.marlaSize
        ? calculatePlotArea(parseFloat(formData.plotSize), parseInt(formData.marlaSize))
        : 0;

    return (
        <div className="grid grid-cols-1 gap-6 p-2">
            <Toaster />
            <TitleHeader>Building Plan</TitleHeader>

            {/* Basic Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormControl fullWidth variant="outlined">
                    <FormLabel>Project Name</FormLabel>
                    <TextField
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <FormLabel>Address</FormLabel>

                    <TextField
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <FormLabel>Project Name</FormLabel>

                    <TextField
                        name="plotSize"
                        type="number"
                        value={formData.plotSize}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <FormLabel>Marla Size</FormLabel>
                    <Select
                        name="marlaSize"
                        value={formData.marlaSize}
                        onChange={handleInputChange}
                        label="Marla Size"
                    >
                        <MenuItem value={252}>252 sq ft</MenuItem>
                        <MenuItem value={272}>272 sq ft</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {/* Plot Area Display */}
            {formData.plotSize && formData.marlaSize && (
                <div className="grid grid-cols-1">
                    <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                        <p className="text-lg font-medium text-gray-800">
                            Plot Area: <span className="text-blue-600">{plotArea.toLocaleString()} ft²</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Basement and Foundation Options */}
            {formData.plotSize && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Is basement used?</FormLabel>
                        <RadioGroup
                            row
                            name="isBasementUsed"
                            value={formData.isBasementUsed}
                            onChange={handleInputChange}
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    {formData.isBasementUsed === 'yes' && (
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Foundation Type</FormLabel>
                            <RadioGroup
                                row
                                name="foundationType"
                                value={formData.foundationType}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="raft" control={<Radio />} label="Raft" />
                                <FormControlLabel value="strip" control={<Radio />} label="Strip" />
                            </RadioGroup>
                        </FormControl>
                    )}
                </div>
            )}

            {/* Excavator Type */}
            <div className="grid grid-cols-1">
                <FormControl fullWidth variant="outlined">
                    <TextField
                        label="Excavator Type"
                        name="excavatorType"
                        value={formData.excavatorType}
                        onChange={handleInputChange}
                        disabled
                        variant="outlined"
                    />
                </FormControl>
            </div>

            {/* Save Button */}
            <div className="grid grid-cols-1 justify-items-end">
                <SaveButton
                    onClick={handleSave}
                    successMessage="Building Plan Saved Successfully"
                    errorMessage={formData.isBasementUsed === 'yes' && !formData.foundationType
                        ? "Foundation type is required when basement is used!"
                        : "Plot size, marla size, and basement options are required!"}
                />
            </div>
        </div>
    );
}