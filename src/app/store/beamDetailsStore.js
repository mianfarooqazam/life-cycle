import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBeamDetailsStore = create(
  persist(
    (set, get) => ({
      // Form state
      formData: {
        numberOfBeams: '',
        beamLength: '',
        beamWidth: '',
        beamDepth: ''
      },
      
      // Table data state
      beamData: [],
      editingId: null,

      // Update form data
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),

      // Reset form data
      resetFormData: () => set({
        formData: {
          numberOfBeams: '',
          beamLength: '',
          beamWidth: '',
          beamDepth: ''
        }
      }),

      // Add new beam data
      addBeamData: (newBeamData) => set((state) => ({
        beamData: [...state.beamData, newBeamData]
      })),

      // Update existing beam data
      updateBeamData: (id, updatedData) => set((state) => ({
        beamData: state.beamData.map(item => 
          item.id === id ? updatedData : item
        )
      })),

      // Delete beam data
      deleteBeamData: (id) => set((state) => {
        const filteredData = state.beamData.filter(item => item.id !== id);
        // Update serial numbers
        const updatedData = filteredData.map((item, index) => ({
          ...item,
          srNo: index + 1
        }));
        return { beamData: updatedData };
      }),

      // Set editing ID
      setEditingId: (id) => set({ editingId: id }),

      // Clear editing ID
      clearEditingId: () => set({ editingId: null }),

      // Calculate beam volume
      calculateVolume: () => {
        const { formData } = get();
        const numberOfBeams = parseFloat(formData.numberOfBeams);
        const beamLength = parseFloat(formData.beamLength);
        const beamWidth = parseFloat(formData.beamWidth);
        const beamDepth = parseFloat(formData.beamDepth);
        
        if (numberOfBeams && beamLength && beamWidth && beamDepth) {
          // Convert width and depth from inches to feet (divide by 12)
          const widthInFeet = beamWidth / 12;
          const depthInFeet = beamDepth / 12;
          const volumePerBeam = beamLength * widthInFeet * depthInFeet;
          const totalVolume = volumePerBeam * numberOfBeams;
          return totalVolume.toFixed(2);
        }
        return '0.00';
      },

      // Calculate total volume from all beam data
      calculateTotalVolume: () => {
        const { beamData } = get();
        return beamData.reduce((total, item) => total + parseFloat(item.beamVolume), 0).toFixed(2);
      },

      // Validate form
      validateForm: () => {
        const { formData } = get();
        return !!(formData.numberOfBeams && formData.beamLength && formData.beamWidth && formData.beamDepth);
      },

      // Get error message
      getErrorMessage: () => {
        const { formData } = get();
        if (!formData.numberOfBeams || !formData.beamLength || !formData.beamWidth || !formData.beamDepth) {
          return 'Please fill in all required fields (number of beams, length, width, depth)';
        }
        return 'Please fill all required fields!';
      }
    }),
    {
      name: 'beam-details-storage'
    }
  )
); 