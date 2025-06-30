import { create } from 'zustand';

export const useCadStore = create((set, get) => ({
  // CAD canvas state
  lines: [],
  wallDetails: [],
  currentLine: null,
  drawing: false,
  
  // Boundary wall state
  boundaryWallMode: false,
  boundaryWallDetails: null,
  boundaryWallLines: [],
  
  // Hover state for rightbar info
  hoveredLineIndex: null,
  hoveredLineDetails: null,
  
  // Actions
  setLines: (lines) => set({ lines }),
  setWallDetails: (wallDetails) => set({ wallDetails }),
  setCurrentLine: (currentLine) => set({ currentLine }),
  setDrawing: (drawing) => set({ drawing }),
  
  // Boundary wall actions
  setBoundaryWallMode: (mode) => set({ boundaryWallMode: mode }),
  setBoundaryWallDetails: (details) => set({ boundaryWallDetails: details }),
  setBoundaryWallLines: (lines) => set({ boundaryWallLines: lines }),
  
  // Add a new line
  addLine: (line) => set((state) => ({ 
    lines: [...state.lines, line],
    wallDetails: [...state.wallDetails, null]
  })),
  
  // Add boundary wall line
  addBoundaryWallLine: (line) => set((state) => ({ 
    boundaryWallLines: [...state.boundaryWallLines, line]
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
  
  // Clear boundary wall lines
  clearBoundaryWallLines: () => set({ boundaryWallLines: [], boundaryWallDetails: null }),
  
  // Hover actions
  setHoveredLine: (index, details) => set({ 
    hoveredLineIndex: index, 
    hoveredLineDetails: details 
  }),
  
  clearHoveredLine: () => set({ 
    hoveredLineIndex: null, 
    hoveredLineDetails: null 
  }),
  
  // Get total statistics
  getTotalStats: () => {
    const state = get();
    const totalLines = state.lines.length;
    const totalExternalWalls = state.wallDetails.filter(details => 
      details && details.wallType === 'external'
    ).length;
    const totalInternalWalls = state.wallDetails.filter(details => 
      details && details.wallType === 'internal'
    ).length;
    const totalBoundaryWalls = state.boundaryWallLines.length;
    
    return {
      totalLines,
      totalExternalWalls,
      totalInternalWalls,
      totalBoundaryWalls
    };
  }
})); 