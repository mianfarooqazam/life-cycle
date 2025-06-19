import { useBuildingPlanStore } from "../store/buildingPlanStore";
import { useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";

export default function BuildingFloor() {
  const numberOfFloors = useBuildingPlanStore((state) => state.numberOfFloors);
  const selectedFloor = useBuildingPlanStore((state) => state.selectedFloor);
  const setSelectedFloor = useBuildingPlanStore((state) => state.setSelectedFloor);

  // Generate floor options (Ground, First, Second, ...)
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

  const heading = options.find((opt) => opt.value === selectedFloor)?.label || "Building Floor";

  return (
    <div className="p-2">
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', mb: 2 }}>
        {options.map((opt) => (
          <Button
            key={opt.value}
            variant={selectedFloor === opt.value ? "contained" : "outlined"}
            onClick={() => setSelectedFloor(opt.value)}
            sx={{
              backgroundColor: selectedFloor === opt.value ? '#5BB045' : '#fff',
              color: selectedFloor === opt.value ? '#fff' : '#5BB045',
              fontWeight: 600,
              py: 1.5,
              px: 3,
              borderRadius: 2,
              textTransform: 'none',
              border: '2px solid #5BB045',
              boxShadow: selectedFloor === opt.value ? '0 2px 8px rgba(91, 176, 69, 0.3)' : 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: selectedFloor === opt.value ? '#4a9537' : '#e8f5e9',
                color: '#5BB045',
                transform: selectedFloor === opt.value ? 'translateY(-2px)' : 'none',
                boxShadow: selectedFloor === opt.value ? '0 4px 16px rgba(91, 176, 69, 0.4)' : 'none',
              },
            }}
          >
            {opt.label}
          </Button>
        ))}
      </Box>
      <Typography
        variant="h5"
        component="h2"
        align="center"
        sx={{ fontWeight: 700, mb: 3 }}
      >
        {heading}
      </Typography>
    </div>
  );
}