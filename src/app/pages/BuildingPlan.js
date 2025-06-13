'use client';

import { useState } from 'react';
import { calculatePlotArea } from '@/app/utils/buildingPlanCalc';
import SaveButton from '@/app/components/button/SaveButton';
import TextInput from '@/app/components/input/TextInput';
import { Toaster } from 'react-hot-toast';

export default function BuildingPlan() {
  const [formData, setFormData] = useState({
    projectName: '',
    address: '',
    plotSize: '',
    marlaSize: 272
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Your save logic here
    console.log('Saving:', formData);
  };

  const plotArea = calculatePlotArea(parseFloat(formData.plotSize) || 0, formData.marlaSize);

  return (
    <div className="p-6">
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

        {formData.plotSize && (
          <div className="mt-6 p-4  rounded-md" style={{backgroundColor:"#f7f6fb"}}>
            <p className="text-lg font-medium text-gray-800">
              Plot Area: <span className="text-blue-600">{plotArea.toLocaleString()} ft²</span>
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <SaveButton 
            onClick={handleSave} 
            toastMessage="Building Plan Saved Successfully" 
          />
        </div>
      </div>
    </div>
  );
}