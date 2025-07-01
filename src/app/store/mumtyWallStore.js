import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMumtyWallStore = create(
  persist(
    (set, get) => ({
      // Form state
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
      mumtyWallsData: [],
      editingId: null,

      // Update form data
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      updateDoorForm: (data) => set((state) => ({
        doorForm: { ...state.doorForm, ...data }
      })),
      updateWindowForm: (data) => set((state) => ({
        windowForm: { ...state.windowForm, ...data }
      })),
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

      // Add new mumty wall data
      addMumtyWallData: (row) => set((state) => ({
        mumtyWallsData: [...state.mumtyWallsData, row]
      })),
      // Update existing mumty wall data
      updateMumtyWallData: (id, updatedRow) => set((state) => ({
        mumtyWallsData: state.mumtyWallsData.map(item => item.id === id ? updatedRow : item)
      })),
      // Delete mumty wall data
      deleteMumtyWallData: (id) => set((state) => ({
        mumtyWallsData: state.mumtyWallsData.filter(item => item.id !== id)
      })),
      // Set/Clear editing ID
      setEditingId: (id) => set({ editingId: id }),
      clearEditingId: () => set({ editingId: null }),
      // Get row for editing
      getEditingRow: (id) => {
        const { mumtyWallsData } = get();
        return mumtyWallsData.find(row => row.id === id);
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
      },
    }),
    {
      name: 'mumty-wall-storage'
    }
  )
); 