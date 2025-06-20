import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useInteriorStore = create(
  persist(
    (set) => ({
      interiors: [],
      editingInterior: null,
      addInterior: (interior) => set((state) => ({
        interiors: [...state.interiors, { ...interior, id: Date.now() }],
      })),
      updateInterior: (id, updatedInterior) => set((state) => ({
        interiors: state.interiors.map((interior) =>
          interior.id === id ? { ...interior, ...updatedInterior } : interior
        ),
        editingInterior: null,
      })),
      deleteInterior: (id) => set((state) => ({
        interiors: state.interiors.filter((interior) => interior.id !== id),
      })),
      setEditingInterior: (interior) => set({ editingInterior: interior }),
      clearEditingInterior: () => set({ editingInterior: null }),
    }),
    {
      name: 'interior-storage',
    }
  )
); 