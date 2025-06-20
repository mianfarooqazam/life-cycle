import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useExteriorStore = create(
  persist(
    (set) => ({
      exteriors: [],
      editingExterior: null,
      addExterior: (exterior) => set((state) => ({
        exteriors: [...state.exteriors, { ...exterior, id: Date.now() }],
      })),
      updateExterior: (id, updatedExterior) => set((state) => ({
        exteriors: state.exteriors.map((exterior) =>
          exterior.id === id ? { ...exterior, ...updatedExterior } : exterior
        ),
        editingExterior: null,
      })),
      deleteExterior: (id) => set((state) => ({
        exteriors: state.exteriors.filter((exterior) => exterior.id !== id),
      })),
      setEditingExterior: (exterior) => set({ editingExterior: exterior }),
      clearEditingExterior: () => set({ editingExterior: null }),
    }),
    {
      name: 'exterior-storage',
    }
  )
); 