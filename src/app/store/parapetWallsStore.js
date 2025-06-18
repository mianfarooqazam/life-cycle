import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useParapetWallsStore = create(
  persist(
    (set, get) => ({
      // Form state
      formData: {
        length: '',
        height: '',
        thickness: ''
      },
      
      // Table data state
      parapetWallsData: [],
      editingId: null,

      // Update form data
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),

      // Reset form data
      resetFormData: () => set({
        formData: {
          length: '',
          height: '',
          thickness: ''
        }
      }),

      // Add new parapet wall data
      addParapetWallData: (newParapetWallData) => set((state) => ({
        parapetWallsData: [...state.parapetWallsData, newParapetWallData]
      })),

      // Update existing parapet wall data
      updateParapetWallData: (id, updatedData) => set((state) => ({
        parapetWallsData: state.parapetWallsData.map(item => 
          item.id === id ? updatedData : item
        )
      })),

      // Delete parapet wall data
      deleteParapetWallData: (id) => set((state) => {
        const filteredData = state.parapetWallsData.filter(item => item.id !== id);
        // Update serial numbers
        const updatedData = filteredData.map((item, index) => ({
          ...item,
          srNo: index + 1
        }));
        return { parapetWallsData: updatedData };
      }),

      // Set editing ID
      setEditingId: (id) => set({ editingId: id }),

      // Clear editing ID
      clearEditingId: () => set({ editingId: null }),

      // Calculate area
      calculateArea: () => {
        const { formData } = get();
        const length = parseFloat(formData.length);
        const height = parseFloat(formData.height);
        if (length && height) {
          return (length * height).toFixed(2);
        }
        return '0.00';
      },

      // Calculate volume
      calculateVolume: () => {
        const { formData } = get();
        const length = parseFloat(formData.length);
        const height = parseFloat(formData.height);
        const thickness = parseFloat(formData.thickness);
        if (length && height && thickness) {
          // Convert thickness from inches to feet (divide by 12)
          const thicknessInFeet = thickness / 12;
          return (length * height * thicknessInFeet).toFixed(2);
        }
        return '0.00';
      },

      // Calculate total area from all parapet wall data
      calculateTotalArea: () => {
        const { parapetWallsData } = get();
        return parapetWallsData.reduce((total, item) => total + parseFloat(item.area), 0).toFixed(2);
      },

      // Calculate total volume from all parapet wall data
      calculateTotalVolume: () => {
        const { parapetWallsData } = get();
        return parapetWallsData.reduce((total, item) => total + parseFloat(item.volume), 0).toFixed(2);
      },

      // Validate form
      validateForm: () => {
        const { formData } = get();
        return !!(formData.length && formData.height && formData.thickness);
      },

      // Get error message
      getErrorMessage: () => {
        const { formData } = get();
        if (!formData.length || !formData.height || !formData.thickness) {
          return 'Please fill in all required fields (length, height, thickness)';
        }
        return 'Please fill all required fields!';
      }
    }),
    {
      name: 'parapet-walls-storage'
    }
  )
); 