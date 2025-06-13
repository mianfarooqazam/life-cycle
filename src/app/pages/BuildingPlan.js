'use client';

import { useState, useEffect } from 'react';
import { calculatePlotArea } from '@/app/utils/buildingPlanCalc';
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
import { Toaster } from 'react-hot-toast';
import { useBuildingPlanStore } from '@/app/store/buildingPlanStore';

export default function BuildingPlan() {
  const { 
    projectName, 
    address, 
    plotSize, 
    marlaSize, 
    updateBuildingPlan 
  } = useBuildingPlanStore();

  const [formData, setFormData] = useState({
    projectName,
    address,
    plotSize,
    marlaSize: marlaSize || '' 
  });

  useEffect(() => {
    setFormData({
      projectName,
      address,
      plotSize,
      marlaSize: marlaSize || ''
    });
  }, [projectName, address, plotSize, marlaSize]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.plotSize || !formData.marlaSize) {
      return false; // Return false for error
    }

    const plotArea = calculatePlotArea(parseFloat(formData.plotSize), parseInt(formData.marlaSize));
    
    updateBuildingPlan({
      ...formData,
      marlaSize: parseInt(formData.marlaSize),
      plotArea
    });

    return true; // Return true for success
  };

  const plotArea = formData.plotSize && formData.marlaSize 
    ? calculatePlotArea(parseFloat(formData.plotSize), parseInt(formData.marlaSize))
    : 0;

  return (
    <div className="p-2">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 text-center">Building Plan</h2>
      
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Project Name"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            placeholder="Enter project name"
          />

          <TextInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
          />

          <TextInput
            label="Plot Size"
            name="plotSize"
            type="number"
            value={formData.plotSize}
            onChange={handleInputChange}
            placeholder="Enter plot size"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Marla Size
            </label>
            <select
              name="marlaSize"
              value={formData.marlaSize}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={252}>252 sq ft</option>
              <option value={272}>272 sq ft</option>
            </select>
          </div>
        </div>

        {formData.plotSize && formData.marlaSize && (
          <div className="mt-6 p-4 rounded-md" style={{backgroundColor:"#f7f6fb"}}>
            <p className="text-lg font-medium text-gray-800">
              Plot Area: <span className="text-blue-600">{plotArea.toLocaleString()} ft²</span>
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <SaveButton 
            onClick={handleSave}
            successMessage="Building Plan Saved Successfully"
            errorMessage="Plot size and marla size are required!"
          />
        </div>
      </div>
    </div>
  );
}