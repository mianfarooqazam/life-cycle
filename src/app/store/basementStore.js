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
        interiorFinish: '',
        isTilesUsed: 'no',
        tileHeight: '',
        stripDepth: '', // in ft
        stripWidth: '', // in ft
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

      // Retaining Wall state
      retainingFormData: {
        wallType: '', // 'brick' or 'concrete'
        length: '',
        height: '',
        thickness: ''
      },
      retainingWallsData: [],
      retainingEditingId: null,

      // Raft Foundation state
      raftFoundationData: {
        area: '', // in ft²
        thickness: '' // in inches
      },

      // Strip Foundation state for retaining wall
      stripFormData: {
        depth: '', // in ft
        width: ''  // in ft
      },

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
          interiorFinish: '',
          isTilesUsed: 'no',
          tileHeight: '',
          stripDepth: '',
          stripWidth: '',
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
        basementWallsData: state.basementWallsData.map(item =>
          item.id === id
            ? {
                ...item,
                ...updatedRow,
                customWallMaterialCost: updatedRow.customWallMaterialCost ?? item.customWallMaterialCost,
                customExteriorFinishCost: updatedRow.customExteriorFinishCost ?? item.customExteriorFinishCost,
                customInteriorFinishCost: updatedRow.customInteriorFinishCost ?? item.customInteriorFinishCost,
                customInsulationCost: updatedRow.customInsulationCost ?? item.customInsulationCost,
                customTilesCost: updatedRow.customTilesCost ?? item.customTilesCost
              }
            : item
        )
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
      calculateStripVolumeForWall: () => {
        const { formData } = get();
        const length = parseFloat(formData.length);
        const stripDepth = parseFloat(formData.stripDepth);
        const stripWidth = parseFloat(formData.stripWidth);
        if (length && stripDepth && stripWidth) {
          return (length * stripDepth * stripWidth).toFixed(2);
        }
        return '';
      },

      // Retaining Wall helpers
      updateRetainingFormData: (data) => set((state) => ({
        retainingFormData: { ...state.retainingFormData, ...data }
      })),
      resetRetainingFormData: () => set({
        retainingFormData: {
          wallType: '',
          length: '',
          height: '',
          thickness: ''
        }
      }),
      addRetainingWallData: (newData) => set((state) => ({
        retainingWallsData: [...state.retainingWallsData, newData]
      })),
      updateRetainingWallData: (id, updatedData) => set((state) => ({
        retainingWallsData: state.retainingWallsData.map(item =>
          item.id === id ? updatedData : item
        )
      })),
      deleteRetainingWallData: (id) => set((state) => {
        const filteredData = state.retainingWallsData.filter(item => item.id !== id);
        // Update serial numbers
        const updatedData = filteredData.map((item, index) => ({
          ...item,
          srNo: index + 1
        }));
        return { retainingWallsData: updatedData };
      }),
      setRetainingEditingId: (id) => set({ retainingEditingId: id }),
      clearRetainingEditingId: () => set({ retainingEditingId: null }),
      getRetainingEditingRow: (id) => {
        const { retainingWallsData } = get();
        return retainingWallsData.find(row => row.id === id);
      },
      calculateRetainingVolume: () => {
        const { retainingFormData } = get();
        const length = parseFloat(retainingFormData.length);
        const height = parseFloat(retainingFormData.height);
        const thickness = parseFloat(retainingFormData.thickness);
        if (length && height && thickness) {
          // Convert thickness from inches to feet (divide by 12)
          const thicknessInFeet = thickness / 12;
          return (length * height * thicknessInFeet).toFixed(2);
        }
        return '0.00';
      },
      validateRetainingForm: () => {
        const { retainingFormData } = get();
        return !!(retainingFormData.wallType && retainingFormData.length && retainingFormData.height && retainingFormData.thickness);
      },
      getRetainingErrorMessage: () => {
        const { retainingFormData } = get();
        if (!retainingFormData.wallType || !retainingFormData.length || !retainingFormData.height || !retainingFormData.thickness) {
          return 'Please fill in all required fields (type, length, height, thickness)';
        }
        return 'Please fill all required fields!';
      },

      // Raft Foundation helpers
      updateRaftFoundationData: (data) => set((state) => ({
        raftFoundationData: { ...state.raftFoundationData, ...data }
      })),
      resetRaftFoundationData: () => set({
        raftFoundationData: {
          area: '',
          thickness: ''
        }
      }),
      calculateRaftVolume: () => {
        const { raftFoundationData } = get();
        const area = parseFloat(raftFoundationData.area);
        const thickness = parseFloat(raftFoundationData.thickness);
        if (area && thickness) {
          // Convert thickness from inches to feet
          const thicknessInFeet = thickness / 12;
          return (area * thicknessInFeet).toFixed(2);
        }
        return '0.00';
      },

      // Strip Foundation helpers
      updateStripFormData: (data) => set((state) => ({
        stripFormData: { ...state.stripFormData, ...data }
      })),
      resetStripFormData: () => set({
        stripFormData: {
          depth: '',
          width: ''
        }
      }),
      calculateStripVolume: () => {
        const { retainingFormData, stripFormData } = get();
        const length = parseFloat(retainingFormData.length);
        const depth = parseFloat(stripFormData.depth);
        const width = parseFloat(stripFormData.width);
        if (length && depth && width) {
          return (length * depth * width).toFixed(2);
        }
        return '0.00';
      },
    }),
    {
      name: 'basement-storage'
    }
  )
); 