import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSlabStore = create(
  persist(
    (set, get) => ({
      // Form state
      formData: {
        slabArea: '',
        slabThickness: '',
        isCeilingUsed: 'no',
        ceilingArea: '',
        areTilesUsed: 'no',
        tilesArea: '',
      },
      slabData: [],
      editingId: null,

      // Update form data
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      resetFormData: () => set({
        formData: {
          slabArea: '',
          slabThickness: '',
          isCeilingUsed: 'no',
          ceilingArea: '',
          areTilesUsed: 'no',
          tilesArea: '',
        }
      }),

      // Add new slab data
      addSlabData: (row) => set((state) => ({
        slabData: [...state.slabData, { ...row, floorNumber: row.floorNumber }]
      })),
      // Update existing slab data
      updateSlabData: (id, updatedRow) => set((state) => ({
        slabData: state.slabData.map(item => item.id === id ? { ...updatedRow, floorNumber: updatedRow.floorNumber } : item)
      })),
      // Delete slab data
      deleteSlabData: (id) => set((state) => ({
        slabData: state.slabData.filter(item => item.id !== id)
      })),
      // Set/Clear editing ID
      setEditingId: (id) => set({ editingId: id }),
      clearEditingId: () => set({ editingId: null }),
      // Get row for editing
      getEditingRow: (id) => {
        const { slabData } = get();
        return slabData.find(row => row.id === id);
      },
      // Get slabs for a specific floor
      getSlabsByFloor: (floorNumber) => {
        const { slabData } = get();
        return slabData.filter(row => row.floorNumber === floorNumber);
      },
      // Calculation helpers
      calculateSlabVolume: () => {
        const { formData } = get();
        const area = parseFloat(formData.slabArea);
        const thickness = parseFloat(formData.slabThickness);
        if (area && thickness) {
          const thicknessInFeet = thickness / 12;
          return (area * thicknessInFeet).toFixed(2);
        }
        return '';
      },
    }),
    {
      name: 'slab-storage'
    }
  )
); 