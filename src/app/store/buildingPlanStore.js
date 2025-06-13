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
      numberOfRooms: 0,
      numberOfKitchens: 0,
      numberOfLounges: 0,
      numberOfWashrooms: 0,
      
      updateBuildingPlan: (data) => set(data),
    }),
    {
      name: 'building-plan-storage'
    }
  )
);