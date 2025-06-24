import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useInteriorWallStore = create(
  persist(
    (set, get) => ({
      // Form state
      formData: {
        length: '',
        height: '',
        thickness: '',
        isCurtainWall: 'no',
        glassThickness: '',
        isInsulationUsed: 'no',
        insulationThickness: '',
        isTilesUsed: 'no',
        tileHeight: '',
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
      interiorWallsData: [],
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
          length: '',
          height: '',
          thickness: '',
          isCurtainWall: 'no',
          glassThickness: '',
          isInsulationUsed: 'no',
          insulationThickness: '',
          isTilesUsed: 'no',
          tileHeight: '',
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

      // Add new interior wall data
      addInteriorWallData: (row) => set((state) => ({
        interiorWallsData: [...state.interiorWallsData, row]
      })),
      // Update existing interior wall data
      updateInteriorWallData: (id, updatedRow) => set((state) => ({
        interiorWallsData: state.interiorWallsData.map(item => item.id === id ? updatedRow : item)
      })),
      // Delete interior wall data
      deleteInteriorWallData: (id) => set((state) => ({
        interiorWallsData: state.interiorWallsData.filter(item => item.id !== id)
      })),
      // Set/Clear editing ID
      setEditingId: (id) => set({ editingId: id }),
      clearEditingId: () => set({ editingId: null }),
      // Get row for editing
      getEditingRow: (id) => {
        const { interiorWallsData } = get();
        return interiorWallsData.find(row => row.id === id);
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
      calculateTilesArea: () => {
        const { formData } = get();
        const length = parseFloat(formData.length);
        const tileHeight = parseFloat(formData.tileHeight);
        const wallHeight = parseFloat(formData.height);
        if (formData.isTilesUsed === 'yes' && length && tileHeight && wallHeight && tileHeight <= wallHeight) {
          return (length * tileHeight).toFixed(2);
        }
        return '';
      },
    }),
    {
      name: 'interior-wall-storage'
    }
  )
); 