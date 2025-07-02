import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRetainingWallStore = create(
  persist(
    (set, get) => ({
      // Form state
      formData: {
        wallType: '', // 'brick' or 'concrete'
        length: '',
        height: '',
        thickness: ''
      },
      retainingWallsData: [],
      editingId: null,

      // Update form data
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),

      // Reset form data
      resetFormData: () => set({
        formData: {
          wallType: '',
          length: '',
          height: '',
          thickness: ''
        }
      }),

      // Add new retaining wall data
      addRetainingWallData: (newData) => set((state) => ({
        retainingWallsData: [...state.retainingWallsData, newData]
      })),

      // Update existing retaining wall data
      updateRetainingWallData: (id, updatedData) => set((state) => ({
        retainingWallsData: state.retainingWallsData.map(item => 
          item.id === id ? updatedData : item
        )
      })),

      // Delete retaining wall data
      deleteRetainingWallData: (id) => set((state) => {
        const filteredData = state.retainingWallsData.filter(item => item.id !== id);
        // Update serial numbers
        const updatedData = filteredData.map((item, index) => ({
          ...item,
          srNo: index + 1
        }));
        return { retainingWallsData: updatedData };
      }),

      // Set editing ID
      setEditingId: (id) => set({ editingId: id }),

      // Clear editing ID
      clearEditingId: () => set({ editingId: null }),

      // Get row for editing
      getEditingRow: (id) => {
        const { retainingWallsData } = get();
        return retainingWallsData.find(row => row.id === id);
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

      // Validate form
      validateForm: () => {
        const { formData } = get();
        return !!(formData.wallType && formData.length && formData.height && formData.thickness);
      },

      // Get error message
      getErrorMessage: () => {
        const { formData } = get();
        if (!formData.wallType || !formData.length || !formData.height || !formData.thickness) {
          return 'Please fill in all required fields (type, length, height, thickness)';
        }
        return 'Please fill all required fields!';
      }
    }),
    {
      name: 'retaining-wall-storage'
    }
  )
); 