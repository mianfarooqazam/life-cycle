import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useExteriorWallStore = create(
  persist(
    (set, get) => ({
      // Form state
      formData: {
        wallMaterial: '',
        length: '',
        height: '',
        thickness: '',
        isCurtainWall: 'no',
        glassThickness: '',
        isInsulationUsed: 'no',
        insulationType: '',
        insulationThickness: '',
        isTilesUsed: 'no',
        tileHeight: '',
        exteriorFinish: '',
        interiorFinish: '',
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
      exteriorWallsData: [],
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
          isCurtainWall: 'no',
          glassThickness: '',
          isInsulationUsed: 'no',
          insulationType: '',
          insulationThickness: '',
          isTilesUsed: 'no',
          tileHeight: '',
          exteriorFinish: '',
          interiorFinish: '',
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

      // Add new exterior wall data
      addExteriorWallData: (row) => set((state) => ({
        exteriorWallsData: [...state.exteriorWallsData, { ...row, floorNumber: row.floorNumber }]
      })),
      // Update existing exterior wall data
      updateExteriorWallData: (id, updatedRow) => set((state) => ({
        exteriorWallsData: state.exteriorWallsData.map(item => item.id === id ? { ...updatedRow, floorNumber: updatedRow.floorNumber } : item)
      })),
      // Delete exterior wall data
      deleteExteriorWallData: (id) => set((state) => ({
        exteriorWallsData: state.exteriorWallsData.filter(item => item.id !== id)
      })),
      // Set/Clear editing ID
      setEditingId: (id) => set({ editingId: id }),
      clearEditingId: () => set({ editingId: null }),
      // Get row for editing
      getEditingRow: (id) => {
        const { exteriorWallsData } = get();
        return exteriorWallsData.find(row => row.id === id);
      },
      // Get walls for a specific floor
      getWallsByFloor: (floorNumber) => {
        const { exteriorWallsData } = get();
        return exteriorWallsData.filter(row => row.floorNumber === floorNumber);
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
      calculatePlasterArea: () => {
        const wallVolume = Number(get().calculateWallVolume());
        return wallVolume ? Math.round((wallVolume / 0.75) * 2) : 0;
      },
    }),
    {
      name: 'exterior-wall-storage'
    }
  )
); 