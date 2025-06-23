// BasementDetails.js
import React, { useState } from 'react';
import TextInput from '@/app/components/input/TextInput';

export default function BasementDetails() {
  // Local state for basement excavation
  const [excavation, setExcavation] = useState({
    length: '',
    width: '',
    depth: ''
  });

  const handleExcavationChange = (e) => {
    const { name, value } = e.target;
    setExcavation((prev) => ({ ...prev, [name]: value }));
  };

  const calculateExcavationVolume = () => {
    const { length, width, depth } = excavation;
    if (length && width && depth) {
      const volume = parseFloat(length) * parseFloat(width) * parseFloat(depth);
      return volume ? volume.toFixed(2) : '0.00';
    }
    return '0.00';
  };

  return (
    <div className="p-2">
      {/* Basement Excavation Section */}
      <h2 className="text-lg font-bold mb-2 text-center">Basement Excavation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <TextInput label="Excavation Length (ft)" name="length" type="number" value={excavation.length} onChange={handleExcavationChange} inputProps={{ min: '0', step: '0.1' }} />
        <TextInput label="Excavation Width (ft)" name="width" type="number" value={excavation.width} onChange={handleExcavationChange} inputProps={{ min: '0', step: '0.1' }} />
        <TextInput label="Excavation Depth (ft)" name="depth" type="number" value={excavation.depth} onChange={handleExcavationChange} inputProps={{ min: '0', step: '0.1' }} />
      </div>
      {(excavation.length && excavation.width && excavation.depth) && (
        <div className="p-4 rounded-md mb-6" style={{ backgroundColor: '#f7f6fb' }}>
          <p className="text-lg font-bold text-gray-800">
            Basement excavation volume: <span className="text-[#5BB045]">{calculateExcavationVolume()} ft³</span>
          </p>
        </div>
      )}
    </div>
  );
}