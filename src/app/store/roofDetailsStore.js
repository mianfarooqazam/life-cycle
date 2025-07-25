import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRoofDetailsStore = create(
  persist(
    (set, get) => ({
      // Form state
      formData: {
        roofArea: '',
        roofThickness: '',
        isInsulationUsed: 'no',
        insulationThickness: ''
      },
      
      // Table data state
      roofData: [],
      editingId: null,

      // Update form data
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),

      // Reset form data
      resetFormData: () => set({
        formData: {
          roofArea: '',
          roofThickness: '',
          isInsulationUsed: 'no',
          insulationThickness: ''
        }
      }),

      // Add new roof data
      addRoofData: (newRoofData) => set((state) => ({
        roofData: [...state.roofData, newRoofData]
      })),

      // Update existing roof data
      updateRoofData: (id, updatedData) => set((state) => ({
        roofData: state.roofData.map(item => 
          item.id === id ? updatedData : item
        )
      })),

      // Delete roof data
      deleteRoofData: (id) => set((state) => {
        const filteredData = state.roofData.filter(item => item.id !== id);
        // Update serial numbers
        const updatedData = filteredData.map((item, index) => ({
          ...item,
          srNo: index + 1
        }));
        return { roofData: updatedData };
      }),

      // Set editing ID
      setEditingId: (id) => set({ editingId: id }),

      // Clear editing ID
      clearEditingId: () => set({ editingId: null }),

      // Calculate roof volume
      calculateVolume: () => {
        const { formData } = get();
        const roofArea = parseFloat(formData.roofArea);
        const roofThickness = parseFloat(formData.roofThickness);
        
        if (roofArea && roofThickness) {
          // Convert thickness from inches to feet (divide by 12)
          const thicknessInFeet = roofThickness / 12;
          const volume = roofArea * thicknessInFeet;
          return volume.toFixed(2);
        }
        return '0.00';
      },

      // Calculate total volume from all roof data
      calculateTotalVolume: () => {
        const { roofData } = get();
        return roofData.reduce((total, item) => total + parseFloat(item.roofVolume), 0).toFixed(2);
      },

      // Validate form
      validateForm: () => {
        const { formData } = get();
        return !!(formData.roofArea && formData.roofThickness);
      },

      // Get error message
      getErrorMessage: () => {
        const { formData } = get();
        if (!formData.roofArea || !formData.roofThickness) {
          return 'Please fill in all required fields (roof area, roof thickness)';
        }
        return 'Please fill all required fields!';
      }
    }),
    {
      name: 'roof-details-storage'
    }
  )
);