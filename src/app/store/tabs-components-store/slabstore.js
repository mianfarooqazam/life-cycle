import { create } from 'zustand';

export const useSlabStore = create((set) => ({
  slabs: [],
  editingSlab: null,
  addSlab: (slab) => set((state) => ({
    slabs: [...state.slabs, { ...slab, id: Date.now() }],
  })),
  updateSlab: (id, updatedSlab) => set((state) => ({
    slabs: state.slabs.map((slab) =>
      slab.id === id ? { ...slab, ...updatedSlab } : slab
    ),
    editingSlab: null,
  })),
  deleteSlab: (id) => set((state) => ({
    slabs: state.slabs.filter((slab) => slab.id !== id),
  })),
  setEditingSlab: (slab) => set({ editingSlab: slab }),
  clearEditingSlab: () => set({ editingSlab: null }),
})); 