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
    isBasementUsed,
    foundationType,
    excavatorType,
    numberOfRooms,
    numberOfKitchens,
    numberOfLounges,
    numberOfWashrooms,
    updateBuildingPlan 
  } = useBuildingPlanStore();

  const [formData, setFormData] = useState({
    projectName,
    address,
    plotSize,
    marlaSize: marlaSize || 272,
    isBasementUsed: isBasementUsed || 'no',
    foundationType: foundationType || '',
    excavatorType: excavatorType || 'Crawler Excavation',
    numberOfRooms: numberOfRooms || '',
    numberOfKitchens: numberOfKitchens || '',
    numberOfLounges: numberOfLounges || '',
    numberOfWashrooms: numberOfWashrooms || ''
  });

  useEffect(() => {
    setFormData({
      projectName,
      address,
      plotSize,
      marlaSize: marlaSize || 272,
      isBasementUsed: isBasementUsed || 'no',
      foundationType: foundationType || '',
      excavatorType: excavatorType || 'Crawler Excavation',
      numberOfRooms: numberOfRooms || '',
      numberOfKitchens: numberOfKitchens || '',
      numberOfLounges: numberOfLounges || '',
      numberOfWashrooms: numberOfWashrooms || ''
    });
  }, [projectName, address, plotSize, marlaSize, isBasementUsed, foundationType, excavatorType, numberOfRooms, numberOfKitchens, numberOfLounges, numberOfWashrooms]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Check required fields
    if (!formData.plotSize || !formData.marlaSize || !formData.isBasementUsed) {
      return false; // Return false for error
    }

    // If basement is used, foundation type is also required
    if (formData.isBasementUsed === 'yes' && !formData.foundationType) {
      return false; // Return false for error
    }

    const plotArea = calculatePlotArea(parseFloat(formData.plotSize), parseInt(formData.marlaSize));
    
    updateBuildingPlan({
      ...formData,
      marlaSize: parseInt(formData.marlaSize),
      plotArea,
      numberOfRooms: formData.numberOfRooms ? parseInt(formData.numberOfRooms) : 0,
      numberOfKitchens: formData.numberOfKitchens ? parseInt(formData.numberOfKitchens) : 0,
      numberOfLounges: formData.numberOfLounges ? parseInt(formData.numberOfLounges) : 0,
      numberOfWashrooms: formData.numberOfWashrooms ? parseInt(formData.numberOfWashrooms) : 0
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
              Plot Area: <span className="text-blue-600 ">{plotArea.toLocaleString()} ft²</span>
            </p>
          </div>
        )}

        {/* Basement and Foundation Type - Side by side */}
        {formData.plotSize && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Basement Question */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Is basement used?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isBasementUsed"
                    value="yes"
                    checked={formData.isBasementUsed === 'yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isBasementUsed"
                    value="no"
                    checked={formData.isBasementUsed === 'no'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Foundation Type - Only show if basement is used */}
            {formData.isBasementUsed === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foundation type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="foundationType"
                      value="raft"
                      checked={formData.foundationType === 'raft'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Raft
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="foundationType"
                      value="strip"
                      checked={formData.foundationType === 'strip'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Strip
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Excavator Type */}
        <div className="mt-6">
          <TextInput
            label="Excavator Type"
            name="excavatorType"
            value={formData.excavatorType}
            onChange={handleInputChange}
            placeholder="Crawler Excavation"
            disabled={true}
          />
        </div>

        {/* Room Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <TextInput
            label="No. of Rooms"
            name="numberOfRooms"
            type="number"
            value={formData.numberOfRooms}
            onChange={handleInputChange}
            placeholder="Enter number of rooms"
          />

          <TextInput
            label="No. of Kitchens"
            name="numberOfKitchens"
            type="number"
            value={formData.numberOfKitchens}
            onChange={handleInputChange}
            placeholder="Enter number of kitchens"
          />

          <TextInput
            label="No. of Lounges"
            name="numberOfLounges"
            type="number"
            value={formData.numberOfLounges}
            onChange={handleInputChange}
            placeholder="Enter number of lounges"
          />

          <TextInput
            label="No. of Washrooms"
            name="numberOfWashrooms"
            type="number"
            value={formData.numberOfWashrooms}
            onChange={handleInputChange}
            placeholder="Enter number of washrooms"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <SaveButton 
            onClick={handleSave}
            successMessage="Building Plan Saved Successfully"
            errorMessage={formData.isBasementUsed === 'yes' && !formData.foundationType 
              ? "Foundation type is required when basement is used!" 
              : "Plot size, marla size, and basement options are required!"}
          />
        </div>
      </div>
    </div>
  );
}