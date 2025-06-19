import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSepticTankStore = create(
  persist(
    (set, get) => ({
      // Form state
      formData: {
        // Septic tank excavation
        excavationLength: '',
        excavationWidth: '',
        excavationDepth: '',
        // Septic tank wall
        wallLength: '',
        wallHeight: '',
        wallThickness: '',
        // Septic tank top slab
        topSlabArea: '',
        topSlabThickness: '',
        // Septic tank bottom slab
        bottomSlabArea: '',
        bottomSlabThickness: '',
      },
      // Table data state
      septicTankData: [],
      editingId: null,

      // Update form data
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),

      // Reset form data
      resetFormData: () => set({
        formData: {
          excavationLength: '',
          excavationWidth: '',
          excavationDepth: '',
          wallLength: '',
          wallHeight: '',
          wallThickness: '',
          topSlabArea: '',
          topSlabThickness: '',
          bottomSlabArea: '',
          bottomSlabThickness: '',
        }
      }),

      // Add new septic tank data
      addSepticTankData: (newData) => set((state) => ({
        septicTankData: [...state.septicTankData, newData]
      })),

      // Update existing septic tank data
      updateSepticTankData: (id, updatedData) => set((state) => ({
        septicTankData: state.septicTankData.map(item => 
          item.id === id ? updatedData : item
        )
      })),

      // Delete septic tank data
      deleteSepticTankData: (id) => set((state) => {
        const filteredData = state.septicTankData.filter(item => item.id !== id);
        // Update serial numbers
        const updatedData = filteredData.map((item, index) => ({
          ...item,
          srNo: index + 1
        }));
        return { septicTankData: updatedData };
      }),

      // Set editing ID
      setEditingId: (id) => set({ editingId: id }),

      // Clear editing ID
      clearEditingId: () => set({ editingId: null }),

      // Calculations
      calculateExcavationVolume: () => {
        const { excavationLength, excavationWidth, excavationDepth } = get().formData;
        if (excavationLength && excavationWidth && excavationDepth) {
          const volume = parseFloat(excavationLength) * parseFloat(excavationWidth) * parseFloat(excavationDepth);
          return volume ? volume.toFixed(2) : '0.00';
        }
        return '0.00';
      },
      calculateWallVolume: () => {
        const { wallLength, wallHeight, wallThickness } = get().formData;
        if (wallLength && wallHeight && wallThickness) {
          const thicknessFt = parseFloat(wallThickness) / 12;
          const volume = parseFloat(wallLength) * parseFloat(wallHeight) * thicknessFt;
          return volume ? volume.toFixed(2) : '0.00';
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
      // Validate form (at least one section filled)
      validateForm: () => {
        const { excavationLength, excavationWidth, excavationDepth, wallLength, wallHeight, wallThickness, topSlabArea, topSlabThickness, bottomSlabArea, bottomSlabThickness } = get().formData;
        return !!(
          (excavationLength && excavationWidth && excavationDepth) ||
          (wallLength && wallHeight && wallThickness) ||
          (topSlabArea && topSlabThickness) ||
          (bottomSlabArea && bottomSlabThickness)
        );
      },
      // Get error message
      getErrorMessage: () => {
        return 'Please fill in at least one section (excavation, wall, top slab, or bottom slab)';
      }
    }),
    {
      name: 'septic-tank-storage'
    }
  )
); 