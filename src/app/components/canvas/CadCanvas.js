import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import TitleHeader from "@/app/components/header/TitleHeader";
import SaveButton from "@/app/components/button/SaveButton";
import { Pencil, DoorClosed, Grid2x2, Move, Undo, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import CadCanvasModal from "@/app/components/modal/CadCanvasModal";
import { useCadStore } from "@/app/store/cadStore";

function IconWithTooltip({ Icon, tooltipText, onClick, active, iconColor, size = 24, padding = 'p-2' }) {
  return (
    <div className="relative group">
      <motion.div
        className={`${padding} rounded-xl flex justify-center items-center cursor-pointer transition-all duration-200 bg-white shadow-md hover:shadow-lg`}
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={onClick}
      >
        <Icon size={size} color={iconColor || "black"} />
      </motion.div>
      {/* Tooltip - now to the right */}
      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {tooltipText}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
      </div>
    </div>
  );
}

export default function CadCanvas() {
  const stageRef = useRef();
  const [modalOpenIdx, setModalOpenIdx] = useState(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  
  const {
    lines,
    wallDetails,
    currentLine,
    drawing,
    setCurrentLine,
    setDrawing,
    addLine,
    updateWallDetails,
    clearLines,
    setHoveredLine,
    clearHoveredLine
  } = useCadStore();

  useEffect(() => {
    const updateStageSize = () => {
      const maxWidth = Math.min(800, window.innerWidth * 0.9);
      const maxHeight = Math.min(600, window.innerHeight * 0.7);
      setStageSize({ width: maxWidth, height: maxHeight });
    };

    updateStageSize();
    window.addEventListener('resize', updateStageSize);
    return () => window.removeEventListener('resize', updateStageSize);
  }, []);

  const handleMouseDown = (e) => {
    if (!drawing) {
      const stage = stageRef.current;
      const pointer = stage.getPointerPosition();
      setCurrentLine({ points: [pointer.x, pointer.y] });
      setDrawing(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing || !currentLine) return;
    const stage = stageRef.current;
    const pointer = stage.getPointerPosition();
    setCurrentLine({
      points: [
        currentLine.points[0],
        currentLine.points[1],
        pointer.x,
        pointer.y,
      ],
    });
  };

  const handleMouseUp = (e) => {
    if (drawing && currentLine && currentLine.points.length === 4) {
      addLine(currentLine);
      setCurrentLine(null);
      setDrawing(false);
    }
  };

  const handleClear = () => {
    clearLines();
  };

  const handleUndo = () => {
    if (lines.length > 0) {
      // Remove the last line
      const newLines = lines.slice(0, -1);
      const newWallDetails = wallDetails.slice(0, -1);
      useCadStore.getState().setLines(newLines);
      useCadStore.getState().setWallDetails(newWallDetails);
    }
  };

  const handleLineHover = (index) => {
    const details = wallDetails[index];
    setHoveredLine(index, details);
  };

  const handleLineLeave = () => {
    clearHoveredLine();
  };

  return (
    
    <div className="grid grid-cols-1 p-2 overflow-x-hidden">
      <TitleHeader>
        Computer-Aided Architectural Plan
      </TitleHeader>
      {/* Icon Toolbar - now at the top and centered */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '18px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
          <IconWithTooltip 
            Icon={Pencil} 
            tooltipText="Pen" 
            onClick={() => true}
          />
          <IconWithTooltip Icon={DoorClosed} tooltipText="Door" />
          <IconWithTooltip Icon={Grid2x2} tooltipText="Window" />
          <IconWithTooltip Icon={Move} tooltipText="Move" />
          <IconWithTooltip Icon={Undo} tooltipText="Undo" onClick={handleUndo} />
          <IconWithTooltip Icon={Trash2} tooltipText="Clear" onClick={handleClear} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            width: "min(800px, 90vw)",
            height: "min(600px, 70vh)",
            background: "#fafafa",
            justifyContent: "space-between"
          }}
        >
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            <Layer>
              {/* Grid background */}
              {(() => {
                const gridSize = 40;
                const lines = [];
                // Vertical grid lines
                for (let x = 0; x <= stageSize.width; x += gridSize) {
                  lines.push(
                    <Line
                      key={`vgrid-${x}`}
                      points={[x, 0, x, stageSize.height]}
                      stroke="#e0e0e0"
                      strokeWidth={1}
                    />
                  );
                }
                // Horizontal grid lines
                for (let y = 0; y <= stageSize.height; y += gridSize) {
                  lines.push(
                    <Line
                      key={`hgrid-${y}`}
                      points={[0, y, stageSize.width, y]}
                      stroke="#e0e0e0"
                      strokeWidth={1}
                    />
                  );
                }
                return lines;
              })()}
              {/* Regular lines */}
              {lines.map((line, idx) => (
                <Line
                  key={idx}
                  points={line.points}
                  stroke="#007bff"
                  strokeWidth={6}
                  lineCap="round"
                  onMouseEnter={() => handleLineHover(idx)}
                  onMouseLeave={handleLineLeave}
                  listening={true}
                />
              ))}
              
              {currentLine && (
                <Line
                  points={currentLine.points}
                  stroke="#007bff"
                  strokeWidth={6}
                  dash={[10, 5]}
                  lineCap="round"
                />
              )}
            </Layer>
          </Stage>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-items-end" style={{ marginTop: 32 }}>
        <SaveButton
          onClick={() => true}
          successMessage="Canvas saved!"
        />
      </div>
      
      {/* Regular wall modal */}
      {lines.map((line, idx) => (
        <CadCanvasModal
          key={idx}
          open={modalOpenIdx === idx}
          onClose={() => setModalOpenIdx(null)}
          details={wallDetails[idx] || {}}
          setDetails={details => {
            updateWallDetails(idx, details);
          }}
        />
      ))}
    </div>
  );
}
