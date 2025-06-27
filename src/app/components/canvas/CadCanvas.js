import React, { useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import TitleHeader from "@/app/components/header/TitleHeader";
import SaveButton from "@/app/components/button/SaveButton";
import { Pencil, DoorClosed, Grid2x2, Move, Undo } from "lucide-react";
import { motion } from "framer-motion";
import CadCanvasModal from "@/app/components/modal/CadCanvasModal";

function IconWithTooltip({ Icon, tooltipText, onClick, active, iconColor, size = 24, padding = 'p-2' }) {
  return (
    <div className="relative group">
      <motion.div
        className={`${padding} rounded-xl flex justify-center items-center cursor-pointer transition-all duration-200 ${active
          ? 'bg-white border-2 border-[#5BB045] shadow-lg'
          : 'bg-white shadow-md hover:shadow-lg'
          }`}
        whileHover={{ scale: active ? 1.25 : 1.1, rotate: 3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        animate={{ scale: active ? 1.15 : 1 }}
        onClick={onClick}
      >
        <Icon size={size} color={iconColor || (active ? '#5BB045' : 'black')} />
      </motion.div>
      {/* Tooltip */}
      <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {tooltipText}
        <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
      </div>
    </div>
  );
}

export default function CadCanvas() {
  const [lines, setLines] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const stageRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLineIdx, setSelectedLineIdx] = useState(null);

  const handleMouseDown = (e) => {
    // Only start drawing on left mouse button
    if (e.evt && e.evt.button !== 0) return;
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
      setLines([...lines, currentLine]);
      setCurrentLine(null);
      setDrawing(false);
    }
  };

  const handleClear = () => {
    setLines([]);
    setCurrentLine(null);
    setDrawing(false);
  };

  const handleUndo = () => {
    if (lines.length > 0) {
      setLines(lines.slice(0, -1));
    }
  };

  return (
    <div className="grid grid-cols-1 p-2">
      <TitleHeader className="text-lg font-bold mb-2 text-center">
        Computer-Aided Architectural Plan
      </TitleHeader>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            width: 800,
            height: 600,
            background: "#fafafa",
            justifyContent: "space-between"
          }}
        >
          <Stage
            width={800}
            height={600}
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
          >
            <Layer>
              {lines.map((line, idx) => (
                <Line
                  key={idx}
                  points={line.points}
                  stroke="#222"
                  strokeWidth={8}
                  lineCap="round"
                  onContextMenu={e => {
                    e.evt.preventDefault();
                    setSelectedLineIdx(idx);
                    setModalOpen(true);
                  }}
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
          <div style={{ width: 800, display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
            <SaveButton
              onClick={() => true}
              successMessage="Canvas saved!"
            />
            <button
              onClick={handleClear}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Clear Canvas
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"flex-start",
            height: 600,
            marginLeft: 24,
            gap: 12,
          }}
        >
          <IconWithTooltip Icon={Pencil} tooltipText="Pencil (Draw)" />
          <IconWithTooltip Icon={DoorClosed} tooltipText="Door" />
          <IconWithTooltip Icon={Grid2x2} tooltipText="Window" />
          <IconWithTooltip Icon={Move} tooltipText="Move" />
          <IconWithTooltip Icon={Undo} tooltipText="Undo" onClick={handleUndo} />
        </div>
      </div>
      <CadCanvasModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
