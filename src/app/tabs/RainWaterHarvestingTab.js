import React, { useState, useMemo } from 'react';
import TextInput from '@/app/components/input/TextInput';
import { Alert } from '@mui/material';

export default function RainWaterHarvestingTab() {
  const [roofArea, setRoofArea] = useState('');
  const [collectionEfficiency, setCollectionEfficiency] = useState('85');

  // Peshawar, Pakistan data
  const peshawarData = {
    annualRainfall: 16.5, // inches per year
    cityName: 'Peshawar',
    country: 'Pakistan'
  };

  // Calculate rain water harvesting
  const calculations = useMemo(() => {
    if (!roofArea || isNaN(roofArea) || roofArea <= 0) {
      return null;
    }

    const roofAreaSqFt = parseFloat(roofArea);
    const efficiency = parseFloat(collectionEfficiency) / 100;
    
    // Conversion factor: 1 inch of rain on 1 sq ft = 0.623 gallons
    const annualCollection = roofAreaSqFt * peshawarData.annualRainfall * efficiency * 0.623;
    const monthlyCollection = annualCollection / 12;
    const dailyCollection = monthlyCollection / 30;
    
    // Calculate potential savings (assuming 1 gallon = 0.00378541 cubic meters)
    const annualCollectionCubicMeters = annualCollection * 0.00378541;
    const costSavings = annualCollectionCubicMeters * 50; // Assuming 50 PKR per cubic meter

    return {
      annualCollection: annualCollection.toFixed(0),
      monthlyCollection: monthlyCollection.toFixed(0),
      dailyCollection: dailyCollection.toFixed(1),
      annualCollectionCubicMeters: annualCollectionCubicMeters.toFixed(2),
      costSavings: costSavings.toFixed(0)
    };
  }, [roofArea, collectionEfficiency]);

  const handleRoofAreaChange = (e) => {
    setRoofArea(e.target.value);
  };

  const handleEfficiencyChange = (e) => {
    setCollectionEfficiency(e.target.value);
  };

  const efficiencyOptions = [
    { value: '70', label: '70% (Basic System)' },
    { value: '80', label: '80% (Standard System)' },
    { value: '85', label: '85% (Recommended)' },
    { value: '90', label: '90% (High Efficiency)' },
    { value: '95', label: '95% (Premium System)' }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Roof Area"
          name="roofArea"
          type="number"
          value={roofArea}
          onChange={handleRoofAreaChange}
          inputProps={{ min: "0", step: "0.1" }}
          placeholder="Enter roof area in sq ft"
        />
        <TextInput
          label="Collection Efficiency"
          name="collectionEfficiency"
          value={collectionEfficiency}
          onChange={handleEfficiencyChange}
          options={efficiencyOptions}
        />
      </div>
      
      {calculations && (
        <div className="grid grid-cols-1">
          <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
            <p className="text-lg font-bold text-gray-800">
              Annual Rainwater Collection: <span className="text-[#5BB045]">{calculations.annualCollection} gallons</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Monthly Average Collection: <span className="text-[#5BB045]">{calculations.monthlyCollection} gallons</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Daily Average Collection: <span className="text-[#5BB045]">{calculations.dailyCollection} gallons</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Annual Collection (Cubic Meters): <span className="text-[#5BB045]">{calculations.annualCollectionCubicMeters} m³</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Estimated Annual Cost Savings: <span className="text-[#5BB045]">PKR {calculations.costSavings}</span>
            </p>
          </div>
        </div>
      )}

      <Alert severity="info">
        <strong>Note:</strong> Calculations are based on {peshawarData.cityName}, {peshawarData.country} annual rainfall of {peshawarData.annualRainfall} inches. 
        Collection efficiency varies based on roof material, gutter system, and maintenance. Cost savings are estimated at PKR 50 per cubic meter of water.
      </Alert>
    </div>
  );
} 