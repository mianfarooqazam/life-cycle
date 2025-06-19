import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBuildingPlanStore = create(
  persist(
    (set) => ({
      projectName: '',
      address: '',
      plotSize: '',
      marlaSize: 272,
      plotArea: 0,
      isBasementUsed: 'no',
      foundationType: '',
      excavatorType: 'Crawler Excavation',
      numberOfFloors: '',
      selectedFloor: '',
      numberOfRooms: '',
      numberOfKitchens: '',
      numberOfWashrooms: '',
      numberOfLounges: '',
      
      updateBuildingPlan: (data) => set(data),
      setSelectedFloor: (floor) => set({ selectedFloor: floor }),
    }),
    {
      name: 'building-plan-storage'
    }
  )
);