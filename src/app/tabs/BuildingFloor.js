import { useBuildingPlanStore } from "../store/buildingPlanStore";
import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import ExteriorWallModal from "../components/modal/ExteriorWallModal";
import InteriorWallModal from "../components/modal/InteriorWallModal";
import SlabModal from "../components/modal/SlabModal";
import ExteriorWallsTable from "../components/table/ExteriorWallsTable";
import InteriorWallsTable from "../components/table/InteriorWallsTable";
import SlabTable from "../components/table/SlabTable";
import { useExteriorWallStore } from "../store/exteriorWallStore";
import { useInteriorWallStore } from "../store/interiorWallStore";
import { useSlabStore } from "../store/slabStore";

export default function BuildingFloor() {
  const numberOfFloors = useBuildingPlanStore((state) => state.numberOfFloors);
  const selectedFloor = useBuildingPlanStore((state) => state.selectedFloor);
  const setSelectedFloor = useBuildingPlanStore((state) => state.setSelectedFloor);

  // Modal states
  const [exteriorWallModalOpen, setExteriorWallModalOpen] = useState(false);
  const [interiorWallModalOpen, setInteriorWallModalOpen] = useState(false);
  const [slabModalOpen, setSlabModalOpen] = useState(false);

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

  // Wall data and edit state
  const {
    exteriorWallsData,
    getWallsByFloor: getExteriorWallsByFloor,
    setEditingId: setExteriorEditingId,
    deleteExteriorWallData,
    getEditingRow: getExteriorEditingRow,
    updateFormData: updateExteriorFormData,
    updateDoorForm: updateExteriorDoorForm,
    updateWindowForm: updateExteriorWindowForm,
    resetFormData: resetExteriorFormData,
    resetDoorForm: resetExteriorDoorForm,
    resetWindowForm: resetExteriorWindowForm,
  } = useExteriorWallStore();
  const {
    interiorWallsData,
    getWallsByFloor: getInteriorWallsByFloor,
    setEditingId: setInteriorEditingId,
    deleteInteriorWallData,
    getEditingRow: getInteriorEditingRow,
    updateFormData: updateInteriorFormData,
    updateDoorForm: updateInteriorDoorForm,
    updateWindowForm: updateInteriorWindowForm,
    resetFormData: resetInteriorFormData,
    resetDoorForm: resetInteriorDoorForm,
    resetWindowForm: resetInteriorWindowForm,
  } = useInteriorWallStore();
  const {
    slabData,
    getSlabsByFloor,
    setEditingId: setSlabEditingId,
    deleteSlabData,
    getEditingRow: getSlabEditingRow,
    updateFormData: updateSlabFormData,
    resetFormData: resetSlabFormData
  } = useSlabStore();

  // Get filtered walls for the selected floor
  const filteredExteriorWalls = getExteriorWallsByFloor(selectedFloor);
  const filteredInteriorWalls = getInteriorWallsByFloor(selectedFloor);
  const filteredSlabs = getSlabsByFloor(selectedFloor);

  // Edit handlers
  const handleEditExterior = (id) => {
    setExteriorEditingId(id);
    const row = getExteriorEditingRow(id);
    if (row) {
      updateExteriorFormData({
        length: row.length || '',
        height: row.height || '',
        thickness: row.thickness || '',
        isInsulationUsed: row.insulationUsed || 'no',
        insulationThickness: row.insulationThickness || '',
        isCurtainWall: row.isCurtainWall || 'no',
        glassThickness: row.glassThickness || '',
        isTilesUsed: row.isTilesUsed || 'no',
        tileHeight: row.tileHeight || '',
        wallMaterial: row.wallMaterial || '',
        exteriorFinish: row.exteriorFinish || '',
        interiorFinish: row.interiorFinish || '',
        insulationType: row.insulationType || '',
      });
      updateExteriorDoorForm({
        doorType: row.doorType || '',
        height: row.doorHeight || '',
        width: row.doorWidth || '',
        thickness: row.doorThickness || '',
        quantity: row.doorQuantity || '',
        costPerDoor: row.doorCost || ''
      });
      updateExteriorWindowForm({
        windowType: row.windowType || '',
        height: row.windowHeight || '',
        width: row.windowWidth || '',
        thickness: row.windowThickness || '',
        quantity: row.windowQuantity || '',
        costPerWindow: row.windowCost || ''
      });
    }
    setExteriorWallModalOpen(true);
  };
  const handleDeleteExterior = (id) => {
    deleteExteriorWallData(id);
  };
  const handleEditInterior = (id) => {
    setInteriorEditingId(id);
    const row = getInteriorEditingRow(id);
    if (row) {
      updateInteriorFormData({
        length: row.length || '',
        height: row.height || '',
        thickness: row.thickness || '',
        isInsulationUsed: row.insulationUsed || 'no',
        insulationThickness: row.insulationThickness || '',
        isCurtainWall: row.isCurtainWall || 'no',
        glassThickness: row.glassThickness || '',
        isTilesUsed: row.isTilesUsed || 'no',
        tileHeight: row.tileHeight || '',
        wallMaterial: row.wallMaterial || '',
        exteriorFinish: row.exteriorFinish || '',
        interiorFinish: row.interiorFinish || '',
        insulationType: row.insulationType || '',
      });
      updateInteriorDoorForm({
        doorType: row.doorType || '',
        height: row.doorHeight || '',
        width: row.doorWidth || '',
        thickness: row.doorThickness || '',
        quantity: row.doorQuantity || '',
        costPerDoor: row.doorCost || ''
      });
      updateInteriorWindowForm({
        windowType: row.windowType || '',
        height: row.windowHeight || '',
        width: row.windowWidth || '',
        thickness: row.windowThickness || '',
        quantity: row.windowQuantity || '',
        costPerWindow: row.windowCost || ''
      });
    }
    setInteriorWallModalOpen(true);
  };
  const handleDeleteInterior = (id) => {
    deleteInteriorWallData(id);
  };
  const handleEditSlab = (id) => {
    setSlabEditingId(id);
    const row = getSlabEditingRow(id);
    if (row) {
      updateSlabFormData({
        slabArea: row.slabArea || '',
        slabThickness: row.slabThickness || '',
        isCeilingUsed: row.isCeilingUsed || 'no',
        ceilingArea: row.ceilingArea || '',
        areTilesUsed: row.areTilesUsed || 'no',
        tilesArea: row.tilesArea || '',
      });
    }
    setSlabModalOpen(true);
  };
  const handleDeleteSlab = (id) => {
    deleteSlabData(id);
  };

  // Handle button clicks
  const handleExteriorWallClick = () => {
    setExteriorWallModalOpen(true);
  };

  const handleInteriorWallClick = () => {
    setInteriorWallModalOpen(true);
  };
  const handleSlabClick = () => {
    setSlabModalOpen(true);
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
          onClick={handleSlabClick}
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
        floorNumber={selectedFloor}
      />
      <InteriorWallModal
        open={interiorWallModalOpen}
        onClose={() => setInteriorWallModalOpen(false)}
        selectedFloorName={selectedFloorName}
        floorNumber={selectedFloor}
      />
      <SlabModal
        open={slabModalOpen}
        onClose={() => setSlabModalOpen(false)}
        selectedFloorName={selectedFloorName}
        floorNumber={selectedFloor}
      />
      {/* Wall Tables */}
      {filteredExteriorWalls.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <ExteriorWallsTable
            data={filteredExteriorWalls}
            onEdit={handleEditExterior}
            onDelete={handleDeleteExterior}
          />
        </Box>
      )}
      {filteredInteriorWalls.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <InteriorWallsTable
            data={filteredInteriorWalls}
            onEdit={handleEditInterior}
            onDelete={handleDeleteInterior}
          />
        </Box>
      )}
      {filteredSlabs.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <SlabTable
            data={filteredSlabs}
            onEdit={handleEditSlab}
            onDelete={handleDeleteSlab}
          />
        </Box>
      )}
    </div>
  );
}