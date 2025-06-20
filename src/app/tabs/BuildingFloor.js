import { useBuildingPlanStore } from "../store/buildingPlanStore";
import { useEffect, useState } from "react";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import BuildingFloorSlabModal from "../tabs-components/buildingfloorslab";
import { useSlabStore } from "../store/tabs-components-store/slabstore";
import SlabTable from "../components/table/tabs-components-table/SlabTable";
import BuildingInteriorModal from '../tabs-components/buildinginterior';
import InteriorTable from '../components/table/tabs-components-table/interiortable';
import { useInteriorStore } from '../store/tabs-components-store/interiorstore';
import BuildingExteriorModal from '../tabs-components/buildingexterior';
import ExteriorTable from '../components/table/tabs-components-table/exteriortable';
import { useExteriorStore } from '../store/tabs-components-store/exteriorstore';

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

  const heading = options.find((opt) => opt.value === selectedFloor)?.label || "Building Floor";

  // Button labels
  const buttonLabels = [
    "Exterior Wall",
    "Interior Wall",
    "Floor Slab"
  ];

  // Modal state
  const [slabModalOpen, setSlabModalOpen] = useState(false);
  const [interiorModalOpen, setInteriorModalOpen] = useState(false);
  const [exteriorModalOpen, setExteriorModalOpen] = useState(false);

  const slabs = useSlabStore((state) => state.slabs);
  const setEditingSlab = useSlabStore((state) => state.setEditingSlab);
  const deleteSlab = useSlabStore((state) => state.deleteSlab);

  // Interior wall store
  const interiors = useInteriorStore((state) => state.interiors);
  const setEditingInterior = useInteriorStore((state) => state.setEditingInterior);
  const deleteInterior = useInteriorStore((state) => state.deleteInterior);

  // Exterior wall store
  const exteriors = useExteriorStore((state) => state.exteriors);
  const setEditingExterior = useExteriorStore((state) => state.setEditingExterior);
  const deleteExterior = useExteriorStore((state) => state.deleteExterior);

  // Filter slabs and interiors for the selected floor
  const filteredSlabs = slabs.filter((slab) => slab.floor === selectedFloor);
  const filteredInteriors = interiors.filter((interior) => interior.floor === selectedFloor);
  const filteredExteriors = exteriors.filter((exterior) => exterior.floor === selectedFloor);

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
          color="primary"
          sx={{
            backgroundColor: '#5BB045',
            color: '#fff',
            fontWeight: 600,
            py: 1.2,
            px: 2.5,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: '0 2px 8px rgba(91, 176, 69, 0.15)',
            '&:hover': {
              backgroundColor: '#4a9537',
              color: '#fff',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 16px rgba(91, 176, 69, 0.2)',
            },
          }}
          onClick={() => setExteriorModalOpen(true)}
        >
          {heading} Exterior Wall
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#5BB045',
            color: '#fff',
            fontWeight: 600,
            py: 1.2,
            px: 2.5,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: '0 2px 8px rgba(91, 176, 69, 0.15)',
            '&:hover': {
              backgroundColor: '#4a9537',
              color: '#fff',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 16px rgba(91, 176, 69, 0.2)',
            },
          }}
          onClick={() => setInteriorModalOpen(true)}
        >
          {heading} Interior Wall
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#5BB045',
            color: '#fff',
            fontWeight: 600,
            py: 1.2,
            px: 2.5,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: '0 2px 8px rgba(91, 176, 69, 0.15)',
            '&:hover': {
              backgroundColor: '#4a9537',
              color: '#fff',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 16px rgba(91, 176, 69, 0.2)',
            },
          }}
          onClick={() => setSlabModalOpen(true)}
        >
          {heading} Floor Slab
        </Button>
      </Box>
      <BuildingExteriorModal
        open={exteriorModalOpen}
        onClose={() => {
          setExteriorModalOpen(false);
          setEditingExterior(null);
        }}
        floor={selectedFloor}
      />
      <BuildingInteriorModal
        open={interiorModalOpen}
        onClose={() => {
          setInteriorModalOpen(false);
          setEditingInterior(null);
        }}
        floor={selectedFloor}
      />
      <BuildingFloorSlabModal open={slabModalOpen} onClose={() => setSlabModalOpen(false)} floor={selectedFloor} />
      {/* Exterior Wall Table */}
      {filteredExteriors.length > 0 && (
        <div className="mt-8">
          <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>{heading} Exterior Wall Table</h2>
          <ExteriorTable
            data={filteredExteriors}
            onEdit={(id) => {
              const exterior = filteredExteriors.find((i) => i.id === id);
              setEditingExterior(exterior);
              setExteriorModalOpen(true);
            }}
            onDelete={deleteExterior}
          />
        </div>
      )}
      {/* Interior Wall Table */}
      {filteredInteriors.length > 0 && (
        <div className="mt-8">
          <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>{heading} Interior Wall Table</h2>
          <InteriorTable
            data={filteredInteriors}
            onEdit={(id) => {
              const interior = filteredInteriors.find((i) => i.id === id);
              setEditingInterior(interior);
              setInteriorModalOpen(true);
            }}
            onDelete={deleteInterior}
          />
        </div>
      )}
      {/* Slab Table */}
      {filteredSlabs.length > 0 && (
        <div className="mt-8">
          <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>{heading} Slab Table</h2>
          <SlabTable
            data={filteredSlabs}
            onEdit={(id) => {
              const slab = filteredSlabs.find((s) => s.id === id);
              setEditingSlab(slab);
              setSlabModalOpen(true);
            }}
            onDelete={deleteSlab}
          />
        </div>
      )}
    </div>
  );
}