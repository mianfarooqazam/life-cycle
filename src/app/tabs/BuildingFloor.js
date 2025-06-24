import { useBuildingPlanStore } from "../store/buildingPlanStore";
import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import ExteriorWallModal from "../components/modal/ExteriorWallModal";
import InteriorWallModal from "../components/modal/InteriorWallModal";

export default function BuildingFloor() {
  const numberOfFloors = useBuildingPlanStore((state) => state.numberOfFloors);
  const selectedFloor = useBuildingPlanStore((state) => state.selectedFloor);
  const setSelectedFloor = useBuildingPlanStore((state) => state.setSelectedFloor);

  // Modal states
  const [exteriorWallModalOpen, setExteriorWallModalOpen] = useState(false);
  const [interiorWallModalOpen, setInteriorWallModalOpen] = useState(false);

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

  // Get the selected floor name
  const selectedFloorName = options.find((opt) => opt.value === selectedFloor)?.label || "Floor";

  // Handle button clicks
  const handleExteriorWallClick = () => {
    setExteriorWallModalOpen(true);
  };

  const handleInteriorWallClick = () => {
    setInteriorWallModalOpen(true);
  };

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
      
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleExteriorWallClick}
          sx={{
            backgroundColor: '#5BB045',
            color: '#fff',
            fontWeight: 600,
            py: 1.5,
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#4a9537',
              color: '#fff',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
            }
          }}
        >
          {selectedFloorName} Exterior Wall
        </Button>
        <Button
          variant="contained"
          onClick={handleInteriorWallClick}
          sx={{
            backgroundColor: '#5BB045',
            color: '#fff',
            fontWeight: 600,
            py: 1.5,
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#4a9537',
              color: '#fff',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
            }
          }}
        >
          {selectedFloorName} Interior Wall
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#5BB045',
            color: '#fff',
            fontWeight: 600,
            py: 1.5,
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#4a9537',
              color: '#fff',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
            }
          }}
        >
          {selectedFloorName} Slab
        </Button>
      </Box>

      {/* Modals */}
      <ExteriorWallModal
        open={exteriorWallModalOpen}
        onClose={() => setExteriorWallModalOpen(false)}
        selectedFloorName={selectedFloorName}
      />
      <InteriorWallModal
        open={interiorWallModalOpen}
        onClose={() => setInteriorWallModalOpen(false)}
        selectedFloorName={selectedFloorName}
      />
    </div>
  );
}