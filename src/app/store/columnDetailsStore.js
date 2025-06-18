import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useColumnDetailsStore = create(
  persist(
    (set, get) => ({
      // Form state
      formData: {
        numberOfColumns: '',
        columnHeight: '',
        columnLength: '',
        columnWidth: ''
      },
      
      // Table data state
      columnData: [],
      editingId: null,

      // Update form data
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),

      // Reset form data
      resetFormData: () => set({
        formData: {
          numberOfColumns: '',
          columnHeight: '',
          columnLength: '',
          columnWidth: ''
        }
      }),

      // Add new column data
      addColumnData: (newColumnData) => set((state) => ({
        columnData: [...state.columnData, newColumnData]
      })),

      // Update existing column data
      updateColumnData: (id, updatedData) => set((state) => ({
        columnData: state.columnData.map(item => 
          item.id === id ? updatedData : item
        )
      })),

      // Delete column data
      deleteColumnData: (id) => set((state) => {
        const filteredData = state.columnData.filter(item => item.id !== id);
        // Update serial numbers
        const updatedData = filteredData.map((item, index) => ({
          ...item,
          srNo: index + 1
        }));
        return { columnData: updatedData };
      }),

      // Set editing ID
      setEditingId: (id) => set({ editingId: id }),

      // Clear editing ID
      clearEditingId: () => set({ editingId: null }),

      // Calculate column volume
      calculateVolume: () => {
        const { formData } = get();
        const numberOfColumns = parseFloat(formData.numberOfColumns);
        const columnHeight = parseFloat(formData.columnHeight);
        const columnLength = parseFloat(formData.columnLength);
        const columnWidth = parseFloat(formData.columnWidth);
        
        if (numberOfColumns && columnHeight && columnLength && columnWidth) {
          // Convert length and width from inches to feet (divide by 12)
          const lengthInFeet = columnLength / 12;
          const widthInFeet = columnWidth / 12;
          const volumePerColumn = columnHeight * lengthInFeet * widthInFeet;
          const totalVolume = volumePerColumn * numberOfColumns;
          return totalVolume.toFixed(2);
        }
        return '0.00';
      },

      // Calculate total volume from all column data
      calculateTotalVolume: () => {
        const { columnData } = get();
        return columnData.reduce((total, item) => total + parseFloat(item.columnVolume), 0).toFixed(2);
      },

      // Validate form
      validateForm: () => {
        const { formData } = get();
        return !!(formData.numberOfColumns && formData.columnHeight && formData.columnLength && formData.columnWidth);
      },

      // Get error message
      getErrorMessage: () => {
        const { formData } = get();
        if (!formData.numberOfColumns || !formData.columnHeight || !formData.columnLength || !formData.columnWidth) {
          return 'Please fill in all required fields (number of columns, height, length, width)';
        }
        return 'Please fill all required fields!';
      }
    }),
    {
      name: 'column-details-storage'
    }
  )
); 