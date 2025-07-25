import React, { useState, useMemo } from 'react';
import TextInput from '@/app/components/input/TextInput';
import {Alert} from '@mui/material';
import { useRoofDetailsStore } from '@/app/store/roofDetailsStore';

export default function SolarPanelTab() {
  const [monthlyConsumption, setMonthlyConsumption] = useState({
    january: '',
    february: '',
    march: '',
    april: '',
    may: '',
    june: '',
    july: '',
    august: '',
    september: '',
    october: '',
    november: '',
    december: ''
  });

  const { formData } = useRoofDetailsStore();
  const roofArea = formData.roofArea || 0;

  // Calculate solar panel requirements
  const calculations = useMemo(() => {
    const monthlyValues = Object.values(monthlyConsumption);
    const validValues = monthlyValues.filter(value => value && !isNaN(value) && parseFloat(value) > 0);
    
    if (validValues.length === 0) {
      return null;
    }

    const totalMonthlyUnits = validValues.reduce((sum, value) => sum + parseFloat(value), 0);
    const averageMonthlyUnits = totalMonthlyUnits / validValues.length;
    const dailyUnitConsumption = averageMonthlyUnits / 30; // units per day
    const rooftopCapacity = dailyUnitConsumption / 4.5; // kW
    const numberOfSolarPanels = Math.round(rooftopCapacity * 3); // units per day, rounded to nearest
    const areaRequiredForRooftop = rooftopCapacity * 95; // sq ft

    return {
      totalMonthlyUnits: totalMonthlyUnits.toFixed(2),
      averageMonthlyUnits: averageMonthlyUnits.toFixed(2),
      dailyUnitConsumption: dailyUnitConsumption.toFixed(2),
      rooftopCapacity: rooftopCapacity.toFixed(2),
      numberOfSolarPanels: numberOfSolarPanels.toString(),
      areaRequiredForRooftop: areaRequiredForRooftop.toFixed(2),
      roofArea: roofArea
    };
  }, [monthlyConsumption, roofArea]);

  const handleInputChange = (month, value) => {
    setMonthlyConsumption(prev => ({
      ...prev,
      [month]: value
    }));
  };

  const months = [
    { key: 'january', label: 'January' },
    { key: 'february', label: 'February' },
    { key: 'march', label: 'March' },
    { key: 'april', label: 'April' },
    { key: 'may', label: 'May' },
    { key: 'june', label: 'June' },
    { key: 'july', label: 'July' },
    { key: 'august', label: 'August' },
    { key: 'september', label: 'September' },
    { key: 'october', label: 'October' },
    { key: 'november', label: 'November' },
    { key: 'december', label: 'December' }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map((month) => (
          <TextInput
            key={month.key}
            label={month.label}
            name={month.key}
            type="number"
            value={monthlyConsumption[month.key]}
            onChange={(e) => handleInputChange(month.key, e.target.value)}
            inputProps={{ min: "0", step: "0.1" }}
          />
        ))}
      </div>
      
      {calculations && (
        <div className="grid grid-cols-1">
          <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
            <p className="text-lg font-bold text-gray-800">
              Total Monthly Units: <span className="text-[#5BB045]">{calculations.totalMonthlyUnits} units</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Average Monthly Units: <span className="text-[#5BB045]">{calculations.averageMonthlyUnits} units</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Daily Unit Consumption: <span className="text-[#5BB045]">{calculations.dailyUnitConsumption} units/day</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              kW System Recommended: <span className="text-[#5BB045]">{calculations.rooftopCapacity} kW</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Number of Solar Panels Required: <span className="text-[#5BB045]">{calculations.numberOfSolarPanels} panels</span>
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Area Required for Rooftop: <span className="text-[#5BB045]">{calculations.areaRequiredForRooftop} sq ft</span>
            </p>
            {calculations.roofArea > 0 && (
              <p className="text-lg font-bold text-gray-800 mt-2">
                Available Roof Area: <span className="text-[#5BB045]">{calculations.roofArea} sq ft</span>
              </p>
            )}
          </div>
        </div>
      )}
      
      <Alert severity="info">
        <strong>Note:</strong> Solar panel calculations are based on standard efficiency rates and average daily sunlight hours. Actual performance may vary based on location, weather conditions, and panel specifications.
      </Alert>
    </div>
  );
} 