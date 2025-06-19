import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWaterTankStore = create(
  persist(
    (set, get) => ({
      // Form state
      formData: {
        // Water tank wall
        wallLength: '',
        wallHeight: '',
        wallThickness: '',
        // Water tank column
        numberOfColumns: '',
        columnHeight: '',
        columnLength: '',
        columnWidth: '',
        // Water tank top slab
        topSlabArea: '',
        topSlabThickness: '',
        // Water tank bottom slab
        bottomSlabArea: '',
        bottomSlabThickness: '',
        // Underground tank
        isUnderground: 'no',
        // Underground excavation
        undergroundLength: '',
        undergroundWidth: '',
        undergroundDepth: '',
        // Underground wall
        undergroundWallLength: '',
        undergroundWallHeight: '',
        undergroundWallThickness: '',
        // Underground top slab
        undergroundTopSlabArea: '',
        undergroundTopSlabThickness: '',
        // Underground bottom slab
        undergroundBottomSlabArea: '',
        undergroundBottomSlabThickness: '',
      },
      
      // Table data state
      waterTankData: [],
      editingId: null,

      // Update form data
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),

      // Reset form data
      resetFormData: () => set({
        formData: {
          wallLength: '',
          wallHeight: '',
          wallThickness: '',
          numberOfColumns: '',
          columnHeight: '',
          columnLength: '',
          columnWidth: '',
          topSlabArea: '',
          topSlabThickness: '',
          bottomSlabArea: '',
          bottomSlabThickness: '',
          isUnderground: 'no',
          undergroundLength: '',
          undergroundWidth: '',
          undergroundDepth: '',
          undergroundWallLength: '',
          undergroundWallHeight: '',
          undergroundWallThickness: '',
          undergroundTopSlabArea: '',
          undergroundTopSlabThickness: '',
          undergroundBottomSlabArea: '',
          undergroundBottomSlabThickness: '',
        }
      }),

      // Add new water tank data
      addWaterTankData: (newData) => set((state) => ({
        waterTankData: [...state.waterTankData, newData]
      })),

      // Update existing water tank data
      updateWaterTankData: (id, updatedData) => set((state) => ({
        waterTankData: state.waterTankData.map(item => 
          item.id === id ? updatedData : item
        )
      })),

      // Delete water tank data
      deleteWaterTankData: (id) => set((state) => {
        const filteredData = state.waterTankData.filter(item => item.id !== id);
        // Update serial numbers
        const updatedData = filteredData.map((item, index) => ({
          ...item,
          srNo: index + 1
        }));
        return { waterTankData: updatedData };
      }),

      // Set editing ID
      setEditingId: (id) => set({ editingId: id }),

      // Clear editing ID
      clearEditingId: () => set({ editingId: null }),

      // Calculations
      calculateWallVolume: () => {
        const { wallLength, wallHeight, wallThickness } = get().formData;
        if (wallLength && wallHeight && wallThickness) {
          // thickness in inch to feet
          const thicknessFt = parseFloat(wallThickness) / 12;
          const volume = parseFloat(wallLength) * parseFloat(wallHeight) * thicknessFt;
          return volume ? volume.toFixed(2) : '0.00';
        }
        return '0.00';
      },
      calculateColumnVolume: () => {
        const { numberOfColumns, columnHeight, columnLength, columnWidth } = get().formData;
        if (numberOfColumns && columnHeight && columnLength && columnWidth) {
          const lengthFt = parseFloat(columnLength) / 12;
          const widthFt = parseFloat(columnWidth) / 12;
          const volumePerColumn = parseFloat(columnHeight) * lengthFt * widthFt;
          const totalVolume = volumePerColumn * parseFloat(numberOfColumns);
          return totalVolume ? totalVolume.toFixed(2) : '0.00';
        }
        return '0.00';
      },
      calculateTopSlabVolume: () => {
        const { topSlabArea, topSlabThickness } = get().formData;
        if (topSlabArea && topSlabThickness) {
          const thicknessFt = parseFloat(topSlabThickness) / 12;
          const volume = parseFloat(topSlabArea) * thicknessFt;
          return volume ? volume.toFixed(2) : '0.00';
        }
        return '0.00';
      },
      calculateBottomSlabVolume: () => {
        const { bottomSlabArea, bottomSlabThickness } = get().formData;
        if (bottomSlabArea && bottomSlabThickness) {
          const thicknessFt = parseFloat(bottomSlabThickness) / 12;
          const volume = parseFloat(bottomSlabArea) * thicknessFt;
          return volume ? volume.toFixed(2) : '0.00';
        }
        return '0.00';
      },
      calculateUndergroundExcavationVolume: () => {
        const { undergroundLength, undergroundWidth, undergroundDepth } = get().formData;
        if (undergroundLength && undergroundWidth && undergroundDepth) {
          const volume = parseFloat(undergroundLength) * parseFloat(undergroundWidth) * parseFloat(undergroundDepth);
          return volume ? volume.toFixed(2) : '0.00';
        }
        return '0.00';
      },
      calculateUndergroundWallVolume: () => {
        const { undergroundWallLength, undergroundWallHeight, undergroundWallThickness } = get().formData;
        if (undergroundWallLength && undergroundWallHeight && undergroundWallThickness) {
          const thicknessFt = parseFloat(undergroundWallThickness) / 12;
          const volume = parseFloat(undergroundWallLength) * parseFloat(undergroundWallHeight) * thicknessFt;
          return volume ? volume.toFixed(2) : '0.00';
        }
        return '0.00';
      },
      calculateUndergroundTopSlabVolume: () => {
        const { undergroundTopSlabArea, undergroundTopSlabThickness } = get().formData;
        if (undergroundTopSlabArea && undergroundTopSlabThickness) {
          const thicknessFt = parseFloat(undergroundTopSlabThickness) / 12;
          const volume = parseFloat(undergroundTopSlabArea) * thicknessFt;
          return volume ? volume.toFixed(2) : '0.00';
        }
        return '0.00';
      },
      calculateUndergroundBottomSlabVolume: () => {
        const { undergroundBottomSlabArea, undergroundBottomSlabThickness } = get().formData;
        if (undergroundBottomSlabArea && undergroundBottomSlabThickness) {
          const thicknessFt = parseFloat(undergroundBottomSlabThickness) / 12;
          const volume = parseFloat(undergroundBottomSlabArea) * thicknessFt;
          return volume ? volume.toFixed(2) : '0.00';
        }
        return '0.00';
      },
      // Validate form (basic: at least wall or column or slab filled)
      validateForm: () => {
        const { wallLength, wallHeight, wallThickness, numberOfColumns, columnHeight, columnLength, columnWidth, topSlabArea, topSlabThickness, bottomSlabArea, bottomSlabThickness } = get().formData;
        return !!(
          (wallLength && wallHeight && wallThickness) ||
          (numberOfColumns && columnHeight && columnLength && columnWidth) ||
          (topSlabArea && topSlabThickness) ||
          (bottomSlabArea && bottomSlabThickness)
        );
      },
      // Get error message
      getErrorMessage: () => {
        return 'Please fill in at least one section (wall, column, top slab, or bottom slab)';
      }
    }),
    {
      name: 'water-tank-storage'
    }
  )
); 