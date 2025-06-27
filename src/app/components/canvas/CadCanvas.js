import React, { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import TitleHeader from '@/app/components/header/TitleHeader'; 

export default function CadCanvas() {
  const [lines, setLines] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const stageRef = useRef();

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
    setCurrentLine({ points: [currentLine.points[0], currentLine.points[1], pointer.x, pointer.y] });
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

  return (
    <div className="grid grid-cols-1 p-2">
      <TitleHeader className="text-lg font-bold mb-2 text-center">Computer-Aided Architectural Plan</TitleHeader>
      <button onClick={handleClear} className="mb-2 px-2 py-1 bg-red-500 text-white rounded">Clear Canvas</button>
      <div style={{ border: '1px solid #ccc', width: 800, height: 600, background: '#fafafa' }}>
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
                strokeWidth={4}
                lineCap="round"
              />
            ))}
            {currentLine && (
              <Line
                points={currentLine.points}
                stroke="#007bff"
                strokeWidth={3}
                dash={[10, 5]}
                lineCap="round"
              />
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
} 