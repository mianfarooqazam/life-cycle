import React, { useState, useMemo } from 'react';
import TextInput from '@/app/components/input/TextInput';
import {Alert} from '@mui/material';

export default function SolarPanelTab() {
  const [monthlyUnitsConsumption, setMonthlyUnitsConsumption] = useState('');

  // Calculate solar panel requirements
  const calculations = useMemo(() => {
    if (!monthlyUnitsConsumption || isNaN(monthlyUnitsConsumption) || monthlyUnitsConsumption <= 0) {
      return null;
    }

    const monthlyUnits = parseFloat(monthlyUnitsConsumption);
    const dailyUnitConsumption = monthlyUnits / 30; // units per day
    const rooftopCapacity = dailyUnitConsumption / 4.5; // kW
    const numberOfSolarPanels = Math.round(rooftopCapacity * 3); // units per day, rounded to nearest
    const areaRequiredForRooftop = rooftopCapacity * 95; // sq ft

    return {
      dailyUnitConsumption: dailyUnitConsumption.toFixed(2),
      rooftopCapacity: rooftopCapacity.toFixed(2),
      numberOfSolarPanels: numberOfSolarPanels.toString(),
      areaRequiredForRooftop: areaRequiredForRooftop.toFixed(2)
    };
  }, [monthlyUnitsConsumption]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setMonthlyUnitsConsumption(value);
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Monthly Units Consumption"
          name="monthlyUnitsConsumption"
          type="number"
          value={monthlyUnitsConsumption}
          onChange={handleInputChange}
          inputProps={{ min: "0", step: "0.1" }}
        />
      </div>
      
      {calculations && (
        <div className="grid grid-cols-1">
          <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
            <p className="text-lg font-bold text-gray-800">
              Daily Unit Consumption: <span className="text-[#5BB045]">{calculations.dailyUnitConsumption} units/day</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Rooftop Capacity: <span className="text-[#5BB045]">{calculations.rooftopCapacity} kW</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Number of Solar Panels: <span className="text-[#5BB045]">{calculations.numberOfSolarPanels} panels</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Area Required for Rooftop: <span className="text-[#5BB045]">{calculations.areaRequiredForRooftop} sq ft</span>
            </p>
          </div>
        </div>
      )}
      
      <Alert severity="info">
        <strong>Note:</strong> Solar panel calculations are based on standard efficiency rates and average daily sunlight hours. Actual performance may vary based on location, weather conditions, and panel specifications.
      </Alert>
    </div>
  );
} 