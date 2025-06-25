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
        excavationData: {
          length: '',
          width: '',
          depth: ''
        },
        finishingData: {
          ceilingArea: '',
          tilesArea: ''
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
      }
    }),
    {
      name: 'basement-storage'
    }
  )
); 