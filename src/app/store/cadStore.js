import { create } from 'zustand';

export const useCadStore = create((set, get) => ({
  // CAD canvas state
  lines: [],
  wallDetails: [],
  currentLine: null,
  drawing: false,
  
  // Hover state for rightbar info
  hoveredLineIndex: null,
  hoveredLineDetails: null,
  
  // Actions
  setLines: (lines) => set({ lines }),
  setWallDetails: (wallDetails) => set({ wallDetails }),
  setCurrentLine: (currentLine) => set({ currentLine }),
  setDrawing: (drawing) => set({ drawing }),
  
  // Add a new line
  addLine: (line) => set((state) => ({ 
    lines: [...state.lines, line],
    wallDetails: [...state.wallDetails, null]
  })),
  
  // Update wall details for a specific line
  updateWallDetails: (index, details) => set((state) => {
    const updatedWallDetails = [...state.wallDetails];
    updatedWallDetails[index] = details;
    return { wallDetails: updatedWallDetails };
  }),
  
  // Remove a line
  removeLine: (index) => set((state) => {
    const newLines = state.lines.filter((_, i) => i !== index);
    const newWallDetails = state.wallDetails.filter((_, i) => i !== index);
    return { lines: newLines, wallDetails: newWallDetails };
  }),
  
  // Clear all lines
  clearLines: () => set({ lines: [], wallDetails: [], currentLine: null, drawing: false }),
  
  // Hover state management
  setHoveredLine: (index, details) => set({ 
    hoveredLineIndex: index, 
    hoveredLineDetails: details 
  }),
  clearHoveredLine: () => set({ 
    hoveredLineIndex: null, 
    hoveredLineDetails: null 
  })
}));