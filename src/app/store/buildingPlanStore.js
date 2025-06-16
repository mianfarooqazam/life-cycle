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
      numberOfRooms: '',
      numberOfKitchens: '',
      numberOfWashrooms: '',
      numberOfLounges: '',
      
      updateBuildingPlan: (data) => set(data),
    }),
    {
      name: 'building-plan-storage'
    }
  )
);