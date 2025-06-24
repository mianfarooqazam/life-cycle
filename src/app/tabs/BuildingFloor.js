import { useBuildingPlanStore } from "../store/buildingPlanStore";
import { useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function BuildingFloor() {
  const numberOfFloors = useBuildingPlanStore((state) => state.numberOfFloors);
  const selectedFloor = useBuildingPlanStore((state) => state.selectedFloor);
  const setSelectedFloor = useBuildingPlanStore((state) => state.setSelectedFloor);

  const floorCount = parseInt(numberOfFloors) || 0;
  const floorNames = [
    "Ground Floor",
    "First Floor",
    "Second Floor",
    "Third Floor",
    "Fourth Floor",
    "Fifth Floor",
    "Sixth Floor",
    "Seventh Floor",
    "Eighth Floor",
    "Ninth Floor",
    "Tenth Floor",
  ];
  const options = Array.from({ length: floorCount }, (_, i) => ({
    value: i,
    label: floorNames[i] || `Floor ${i}`,
  }));

  // Set default selected floor if not set
  useEffect(() => {
    if ((selectedFloor === '' || selectedFloor === undefined) && options.length > 0) {
      setSelectedFloor(options[0].value);
    }
  }, [selectedFloor, options, setSelectedFloor]);

  return (
    <div className="p-2">
      <Box sx={{ maxWidth: 320, mb: 2 }}>
        <FormControl fullWidth variant="outlined" size="medium">
          <InputLabel id="floor-select-label">Select Floor</InputLabel>
          <Select
            labelId="floor-select-label"
            id="floor-select"
            value={selectedFloor !== '' && selectedFloor !== undefined ? selectedFloor : ''}
            label="Select Floor"
            onChange={(e) => setSelectedFloor(Number(e.target.value))}
            sx={{ backgroundColor: '#fff', borderRadius: 2 }}
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}