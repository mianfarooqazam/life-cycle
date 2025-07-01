import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBasementStore = create(
  persist(
    (set, get) => ({
      // Form state for excavation
      excavationData: {
        length: '',
        width: '',
        depth: ''
      },

      // Form state for finishing
      finishingData: {
        ceilingArea: '',
        tilesArea: ''
      },
      
      // Table data state
      basementData: [],
      editingId: null,

      // New: Basement Wall state
      formData: {
        wallMaterial: '',
        length: '',
        height: '',
        thickness: '',
        isInsulationUsed: 'no',
        insulationType: '',
        insulationThickness: '',
        exteriorFinish: '',
        interiorFinish: ''
      },
      doorForm: {
        doorType: '',
        height: '',
        width: '',
        thickness: '',
        quantity: '',
        costPerDoor: ''
      },
      windowForm: {
        windowType: '',
        height: '',
        width: '',
        thickness: '',
        quantity: '',
        costPerWindow: ''
      },
      basementWallsData: [],

      // Update excavation data
      updateExcavationData: (data) => set((state) => ({
        excavationData: { ...state.excavationData, ...data }
      })),

      // Update finishing data
      updateFinishingData: (data) => set((state) => ({
        finishingData: { ...state.finishingData, ...data }
      })),

      // Reset excavation data
      resetExcavationData: () => set({
        excavationData: {
          length: '',
          width: '',
          depth: ''
        }
      }),

      // Reset finishing data
      resetFinishingData: () => set({
        finishingData: {
          ceilingArea: '',
          tilesArea: ''
        }
      }),

      // Reset all form data
      resetFormData: () => set({
        formData: {
          wallMaterial: '',
          length: '',
          height: '',
          thickness: '',
          isInsulationUsed: 'no',
          insulationType: '',
          insulationThickness: '',
          exteriorFinish: '',
          interiorFinish: ''
        }
      }),

      // Add new basement data
      addBasementData: (newBasementData) => set((state) => ({
        basementData: [...state.basementData, newBasementData]
      })),

      // Update existing basement data
      updateBasementData: (id, updatedData) => set((state) => ({
        basementData: state.basementData.map(item => 
          item.id === id ? updatedData : item
        )
      })),

      // Delete basement data
      deleteBasementData: (id) => set((state) => {
        const filteredData = state.basementData.filter(item => item.id !== id);
        // Update serial numbers
        const updatedData = filteredData.map((item, index) => ({
          ...item,
          srNo: index + 1
        }));
        return { basementData: updatedData };
      }),

      // Set editing ID
      setEditingId: (id) => set({ editingId: id }),

      // Clear editing ID
      clearEditingId: () => set({ editingId: null }),

      // Calculate excavation volume
      calculateExcavationVolume: () => {
        const { excavationData } = get();
        const length = parseFloat(excavationData.length);
        const width = parseFloat(excavationData.width);
        const depth = parseFloat(excavationData.depth);
        if (length && width && depth) {
          const volume = length * width * depth;
          return volume ? volume.toFixed(2) : '0.00';
        }
        return '0.00';
      },

      // Calculate total excavation volume from all basement data
      calculateTotalExcavationVolume: () => {
        const { basementData } = get();
        return basementData.reduce((total, item) => total + parseFloat(item.excavationVolume || 0), 0).toFixed(2);
      },

      // Calculate total ceiling area from all basement data
      calculateTotalCeilingArea: () => {
        const { basementData } = get();
        return basementData.reduce((total, item) => total + parseFloat(item.ceilingArea || 0), 0).toFixed(2);
      },

      // Calculate total tiles area from all basement data
      calculateTotalTilesArea: () => {
        const { basementData } = get();
        return basementData.reduce((total, item) => total + parseFloat(item.tilesArea || 0), 0).toFixed(2);
      },

      // Validate excavation form
      validateExcavationForm: () => {
        const { excavationData } = get();
        return !!(excavationData.length && excavationData.width && excavationData.depth);
      },

      // Validate finishing form
      validateFinishingForm: () => {
        const { finishingData } = get();
        return !!(finishingData.ceilingArea && finishingData.tilesArea);
      },

      // Validate both forms
      validateForm: () => {
        const { excavationData, finishingData } = get();
        return !!(excavationData.length && excavationData.width && excavationData.depth && 
                 finishingData.ceilingArea && finishingData.tilesArea);
      },

      // Get error message
      getErrorMessage: () => {
        const { excavationData, finishingData } = get();
        if (!excavationData.length || !excavationData.width || !excavationData.depth) {
          return 'Please fill in all excavation fields (length, width, depth)';
        }
        if (!finishingData.ceilingArea || !finishingData.tilesArea) {
          return 'Please fill in all finishing fields (ceiling area, tiles area)';
        }
        return 'Please fill all required fields!';
      },

      // Wall form helpers
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      updateDoorForm: (data) => set((state) => ({
        doorForm: { ...state.doorForm, ...data }
      })),
      updateWindowForm: (data) => set((state) => ({
        windowForm: { ...state.windowForm, ...data }
      })),
      resetDoorForm: () => set({
        doorForm: {
          doorType: '',
          height: '',
          width: '',
          thickness: '',
          quantity: '',
          costPerDoor: ''
        }
      }),
      resetWindowForm: () => set({
        windowForm: {
          windowType: '',
          height: '',
          width: '',
          thickness: '',
          quantity: '',
          costPerWindow: ''
        }
      }),
      // Add new basement wall data
      addBasementWallData: (row) => set((state) => ({
        basementWallsData: [...state.basementWallsData, row]
      })),
      // Update existing basement wall data
      updateBasementWallData: (id, updatedRow) => set((state) => ({
        basementWallsData: state.basementWallsData.map(item => item.id === id ? updatedRow : item)
      })),
      // Delete basement wall data
      deleteBasementWallData: (id) => set((state) => ({
        basementWallsData: state.basementWallsData.filter(item => item.id !== id)
      })),
      // Get row for editing
      getEditingRow: (id) => {
        const { basementWallsData } = get();
        return basementWallsData.find(row => row.id === id);
      },
      // Calculation helpers
      calculateWallArea: () => {
        const { formData } = get();
        const length = parseFloat(formData.length);
        const height = parseFloat(formData.height);
        if (length && height) return (length * height).toFixed(2);
        return '';
      },
      calculateWallVolume: () => {
        const { formData } = get();
        const length = parseFloat(formData.length);
        const height = parseFloat(formData.height);
        const thickness = parseFloat(formData.thickness);
        if (length && height && thickness) {
          const thicknessInFeet = thickness / 12;
          return (length * height * thicknessInFeet).toFixed(2);
        }
        return '';
      },
      calculateDoorArea: () => {
        const { doorForm } = get();
        const h = parseFloat(doorForm.height);
        const w = parseFloat(doorForm.width);
        const q = parseFloat(doorForm.quantity) || 1;
        if (h && w && q) return (h * w * q).toFixed(2);
        return '';
      },
      calculateWindowArea: () => {
        const { windowForm } = get();
        const h = parseFloat(windowForm.height);
        const w = parseFloat(windowForm.width);
        const q = parseFloat(windowForm.quantity) || 1;
        if (h && w && q) return (h * w * q).toFixed(2);
        return '';
      }
    }),
    {
      name: 'basement-storage'
    }
  )
); 