import React, { useRef, useState, useEffect } from 'react';
import {
  Modal, Box, Button, Typography, IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Alert
} from '@mui/material';
import { Stage, Layer, Line, Rect, Group, Arc, Text, Transformer } from 'react-konva';
import { DoorClosed, Grid2x2, Pen, SquarePlus, Undo2, X, Move } from 'lucide-react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 0,
  outline: 'none',
  maxHeight: '90vh',
  overflowY: 'auto'
};

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

export default function ArchitecturalMapModal({ open, onClose, plotArea, floors = [] }) {
  const [floorMaps, setFloorMaps] = useState({});
  const [plot, setPlot] = useState(null);
  const [currentLine, setCurrentLine] = useState([]);
  const [tool, setTool] = useState('draw'); // 'draw', 'door', 'window', 'room', 'move'
  const [isAddRoomModalOpen, setAddRoomModalOpen] = useState(false);
  const [newRoomData, setNewRoomData] = useState({ type: 'Bedroom', width: '', length: '' });
  const [selectedId, selectShape] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [customRoomType, setCustomRoomType] = useState('');
  const isDrawing = useRef(false);
  const trRef = useRef();
  const layerRef = useRef();

  useEffect(() => {
    const initialData = {};
    for (const floor of floors) {
      initialData[floor] = { lines: [], objects: [], history: [] };
    }
    setFloorMaps(initialData);

    if (floors.length > 0 && !selectedFloor) {
      setSelectedFloor(floors[0]);
    }
  }, [floors]);

  useEffect(() => {
    if (plotArea > 0) {
      // Assuming a square plot for simplicity
      const sideInFt = Math.sqrt(plotArea);
      
      // Calculate scale to fit the plot in the canvas with some padding
      const scaleX = CANVAS_WIDTH / sideInFt;
      const scaleY = CANVAS_HEIGHT / sideInFt;
      const scale = Math.min(scaleX, scaleY) * 0.9;
      
      const plotWidthPx = sideInFt * scale;
      const plotHeightPx = sideInFt * scale;
      
      setPlot({
        x: (CANVAS_WIDTH - plotWidthPx) / 2,
        y: (CANVAS_HEIGHT - plotHeightPx) / 2,
        width: plotWidthPx,
        height: plotHeightPx,
        scale: scale,
        sideInFt: sideInFt,
      });
    } else {
      setPlot(null);
    }
  }, [plotArea]);

  useEffect(() => {
    if (trRef.current) {
      trRef.current.nodes(selectedId ? [layerRef.current.findOne('#' + selectedId)] : []);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  const currentMap = floorMaps[selectedFloor] || { lines: [], objects: [], history: [] };

  const saveToHistory = () => {
    if (!selectedFloor) return;
    const currentMapData = floorMaps[selectedFloor];
    const newHistory = [...(currentMapData.history || []), { lines: currentMapData.lines, objects: currentMapData.objects }];
    setFloorMaps(prev => ({
        ...prev,
        [selectedFloor]: { ...currentMapData, history: newHistory }
    }));
  };

  const handleUndo = () => {
    if (!selectedFloor) return;
    const currentMapData = floorMaps[selectedFloor];
    const history = currentMapData.history || [];
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    const newHistory = history.slice(0, -1);
    setFloorMaps(prev => ({
        ...prev,
        [selectedFloor]: { ...lastState, history: newHistory }
    }));
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    if (!selectedFloor) return;

    if (tool === 'draw') {
      saveToHistory();
      isDrawing.current = true;
      setCurrentLine([pos.x, pos.y]);
    } else if (tool === 'door' || tool === 'window') {
      saveToHistory();
      const currentMapData = floorMaps[selectedFloor] || { lines: [], objects: [] };
      const newObject = {
        id: `obj-${currentMapData.objects.length}`,
        type: tool,
        x: pos.x,
        y: pos.y,
      };
      const newObjects = [...currentMapData.objects, newObject];
      setFloorMaps(prev => ({
        ...prev,
        [selectedFloor]: {
            ...currentMapData,
            objects: newObjects
        }
    }));
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || tool !== 'draw') return;
    const pos = e.target.getStage().getPointerPosition();
    setCurrentLine((prev) => [prev[0], prev[1], pos.x, pos.y]);
  };

  const handleMouseUp = (e) => {
    if (tool === 'draw' && isDrawing.current) {
      isDrawing.current = false;
      if (currentLine.length === 4) {
        if (!selectedFloor) return;
        const currentMapData = floorMaps[selectedFloor] || { lines: [], objects: [] };
        const newLines = [...currentMapData.lines, currentLine];
        setFloorMaps(prev => ({
            ...prev,
            [selectedFloor]: {
                ...currentMapData,
                lines: newLines
            }
        }));
      }
      setCurrentLine([]);
    }
  };

  const handleDragEnd = (e, index) => {
    if (!selectedFloor) return;
    const currentMapData = floorMaps[selectedFloor];
    const newObjects = [...currentMapData.objects];
    newObjects[index] = {
      ...newObjects[index],
      x: e.target.x(),
      y: e.target.y(),
    };
    setFloorMaps(prev => ({
        ...prev,
        [selectedFloor]: { ...currentMapData, objects: newObjects }
    }));
  };

  const onTransformEnd = (e, index) => {
    if (!selectedFloor) return;
    const node = e.target;
    const currentMapData = floorMaps[selectedFloor];
    const newObjects = [...currentMapData.objects];
    newObjects[index] = {
      ...newObjects[index],
      x: node.x(),
      y: node.y(),
      width: node.width() * node.scaleX(),
      height: node.height() * node.scaleY(),
      rotation: node.rotation(),
    };
    // To prevent scaling issues, we reset scale
    node.scaleX(1);
    node.scaleY(1);
    setFloorMaps(prev => ({
        ...prev,
        [selectedFloor]: { ...currentMapData, objects: newObjects }
    }));
  };

  const handleClear = () => {
    if (!selectedFloor) return;
    saveToHistory();
    setFloorMaps(prev => ({
        ...prev,
        [selectedFloor]: { ...prev[selectedFloor], lines: [], objects: [] }
    }));
    setCurrentLine([]);
    handleCloseAddRoomModal();
  };

  const handleOpenAddRoomModal = () => {
    setTool('room');
    setAddRoomModalOpen(true);
  };

  const handleCloseAddRoomModal = () => {
    setAddRoomModalOpen(false);
    setNewRoomData({ type: 'Bedroom', width: '', length: '' });
  };

  const handleAddRoom = () => {
    if (!newRoomData.width || !newRoomData.length || !plot || !selectedFloor) return;

    saveToHistory();
    const currentMapData = floorMaps[selectedFloor];
    const roomWidthPx = parseFloat(newRoomData.width) * plot.scale;
    const roomHeightPx = parseFloat(newRoomData.length) * plot.scale;

    const label = newRoomData.type === 'Custom' && customRoomType ? customRoomType : newRoomData.type;

    const newRoom = {
      id: `room-${currentMapData.objects.length}`,
      type: 'room',
      x: plot.x + (plot.width - roomWidthPx) / 2, // Center it in the plot
      y: plot.y + (plot.height - roomHeightPx) / 2,
      width: roomWidthPx,
      height: roomHeightPx,
      rotation: 0,
      label: label,
      dims: `${newRoomData.width}'x${newRoomData.length}'`,
    };

    const newObjects = [...currentMapData.objects, newRoom];
    setFloorMaps(prev => ({
        ...prev,
        [selectedFloor]: { ...currentMapData, objects: newObjects }
    }));
    handleCloseAddRoomModal();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {/* Header */}
        <Box sx={{
          p: 3,
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            Draw Architectural Map
          </Typography>
          <IconButton
              onClick={onClose}
              size="small"
              sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}
            >
              <X size={20} />
            </IconButton>
        </Box>

        {/* Toolbar */}
        <Box sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            borderBottom: '1px solid',
            borderColor: 'divider'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {floors.length > 0 && (
                  <FormControl size="small" sx={{ minWidth: 150, mr: 2 }}>
                    <InputLabel>Floor</InputLabel>
                    <Select
                      value={selectedFloor}
                      onChange={(e) => setSelectedFloor(e.target.value)}
                      label="Floor"
                    >
                      {floors.map((floor) => (
                        <MenuItem key={floor} value={floor}>{floor}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <Tooltip title="Undo">
                  <IconButton 
                    onClick={handleUndo} 
                    disabled={currentMap.history.length === 0}
                    size="small"
                    sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}
                  >
                    <Undo2 size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Draw Wall">
                  <IconButton 
                    onClick={() => setTool('draw')} 
                    color={tool === 'draw' ? 'primary' : 'default'}
                    size="small"
                    sx={{ color: tool === 'draw' ? 'primary.main' : 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}
                  >
                    <Pen size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Door">
                  <IconButton 
                    onClick={() => setTool('door')} 
                    color={tool === 'door' ? 'primary' : 'default'}
                    size="small"
                    sx={{ color: tool === 'door' ? 'primary.main' : 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}
                  >
                    <DoorClosed size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Window">
                  <IconButton 
                    onClick={() => setTool('window')} 
                    color={tool === 'window' ? 'primary' : 'default'}
                    size="small"
                    sx={{ color: tool === 'window' ? 'primary.main' : 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}
                  >
                    <Grid2x2 size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Room">
                  <IconButton 
                    onClick={handleOpenAddRoomModal} 
                    color={tool === 'room' ? 'primary' : 'default'}
                    size="small"
                    sx={{ color: tool === 'room' ? 'primary.main' : 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}
                  >
                    <SquarePlus size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Move">
                  <IconButton
                    onClick={() => setTool('move')}
                    color={tool === 'move' ? 'primary' : 'default'}
                    size="small"
                    sx={{ color: tool === 'move' ? 'primary.main' : 'text.secondary', '&:hover': { backgroundColor: 'action.hover' } }}
                  >
                    <Move size={20} />
                  </IconButton>
                </Tooltip>
            </Box>
            <Alert severity="info" sx={{ mt: 2 }}>
              This mode is in beta testing. 
            </Alert>
        </Box>
      
        {/* Content */}
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
          <Stage
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{  borderRadius: '8px' }}
            onMouseDown={(e) => {
              checkDeselect(e);
              handleMouseDown(e);
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Layer ref={layerRef}>
              {plot && (
                <Group>
                    <Rect
                        x={plot.x}
                        y={plot.y}
                        width={plot.width}
                        height={plot.height}
                        stroke="#808080"
                        strokeWidth={4}
                    />
                    <Text
                        x={plot.x}
                        y={plot.y - 20}
                        width={plot.width}
                        align="center"
                        text={`${plot.sideInFt.toFixed(2)} ft`}
                        fontSize={14}
                        fontStyle="bold"
                        fill="#808080"
                    />
                    <Text
                        x={plot.x - 30}
                        y={plot.y + plot.height / 2}
                        rotation={-90}
                        text={`${plot.sideInFt.toFixed(2)} ft`}
                        fontSize={14}
                        fontStyle="bold"
                        align="center"
                        verticalAlign="middle"
                        fill="#808080"
                    />
                </Group>
              )}
              {currentMap.lines.map((line, idx) => (
                <Line key={`line-${idx}`} points={line} stroke="#808080" strokeWidth={5} lineCap="round" />
              ))}
              {currentLine.length === 4 && (
                <Line points={currentLine} stroke="#808080" strokeWidth={2} dash={[10, 5]} />
              )}
              {currentMap.objects.map((obj, i) => {
              if (obj.type === 'room') {
                return (
                  <Group
                    key={`obj-${i}`}
                    id={obj.id}
                    x={obj.x}
                    y={obj.y}
                    width={obj.width}
                    height={obj.height}
                    rotation={obj.rotation}
                    draggable={tool === 'move'}
                    onDragEnd={(e) => handleDragEnd(e, i)}
                    onTransformEnd={(e) => onTransformEnd(e, i)}
                    onClick={() => selectShape(obj.id)}
                    onTap={() => selectShape(obj.id)}
                  >
                    <Rect width={obj.width} height={obj.height} stroke={selectedId === obj.id ? '#00A3E0' : '#333'} strokeWidth={2} fill="#fff" />
                    <Text
                      text={`${obj.label}\n${obj.dims}`}
                      fontSize={14}
                      width={obj.width}
                      height={obj.height}
                      align="center"
                      verticalAlign="middle"
                      padding={5}
                    />
                  </Group>
                );
              }
              if (obj.type === 'window') {
                return (
                  <Group
                    key={`obj-${i}`}
                    id={obj.id}
                    x={obj.x}
                    y={obj.y}
                    rotation={obj.rotation || 0}
                    draggable={tool === 'move'}
                    onDragEnd={(e) => handleDragEnd(e, i)}
                    onTransformEnd={(e) => onTransformEnd(e, i)}
                    onClick={() => selectShape(obj.id)}
                    onTap={() => selectShape(obj.id)}
                  >
                    <Rect
                      width={60}
                      height={8}
                      fill="#fff"
                      stroke={selectedId === obj.id ? '#00A3E0' : '#000'}
                      strokeWidth={2}
                    />
                  </Group>
                );
              }
              if (obj.type === 'door') {
                return (
                  <Group
                    key={`obj-${i}`}
                    id={obj.id}
                    x={obj.x}
                    y={obj.y}
                    rotation={obj.rotation || 0}
                    draggable={tool === 'move'}
                    onDragEnd={(e) => handleDragEnd(e, i)}
                    onTransformEnd={(e) => onTransformEnd(e, i)}
                    onClick={() => selectShape(obj.id)}
                    onTap={() => selectShape(obj.id)}
                  >
                    <Rect width={40} height={4} fill="white" stroke="black" strokeWidth={1} />
                    <Arc angle={90} rotation={-90} x={0} y={4} outerRadius={40} stroke="black" strokeWidth={1} />
                  </Group>
                );
              }
              return null;
            })}
              <Transformer ref={trRef} />
            </Layer>
          </Stage>
        </Box>

        <Dialog open={isAddRoomModalOpen} onClose={handleCloseAddRoomModal}>
          <DialogTitle>Add a New Room</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>Room Type</InputLabel>
              <Select
                value={newRoomData.type}
                onChange={(e) => {
                  setNewRoomData({ ...newRoomData, type: e.target.value });
                  if (e.target.value !== 'Custom') setCustomRoomType('');
                }}
              >
                <MenuItem value="Bedroom">Bedroom</MenuItem>
                <MenuItem value="Bathroom">Bathroom</MenuItem>
                <MenuItem value="Kitchen">Kitchen</MenuItem>
                <MenuItem value="Lounge">Lounge</MenuItem>
                <MenuItem value="Dining Room">Dining Room</MenuItem>
                <MenuItem value="Custom">Custom</MenuItem>
              </Select>
            </FormControl>
            {newRoomData.type === 'Custom' && (
              <TextField
                label="Custom Room Name"
                fullWidth
                margin="normal"
                value={customRoomType}
                onChange={e => setCustomRoomType(e.target.value)}
              />
            )}
            <TextField
              label="Width (ft)"
              type="number"
              fullWidth
              margin="normal"
              value={newRoomData.width}
              onChange={(e) => setNewRoomData({ ...newRoomData, width: e.target.value })}
            />
            <TextField
              label="Length (ft)"
              type="number"
              fullWidth
              margin="normal"
              value={newRoomData.length}
              onChange={(e) => setNewRoomData({ ...newRoomData, length: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddRoomModal}>Cancel</Button>
            <Button onClick={handleAddRoom} variant="contained">Add</Button>
          </DialogActions>
        </Dialog>

        {/* Action Buttons */}
        <Box sx={{
          p: 3,
          pt: 1,
          display: 'flex',
          gap: 2,
          justifyContent: 'flex-end',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button
            variant="outlined"
            onClick={handleClear}
            sx={{ px: 3 }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              px: 3,
              backgroundColor: '#5BB045',
              color: '#fff',
              fontWeight: 600,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#4a9537',
                color: '#fff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
              },
              '&:active': {
                transform: 'translateY(0px)',
                boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
              },
              '&:disabled': {
                backgroundColor: '#e0e0e0',
                color: '#999',
                boxShadow: 'none',
                transform: 'none'
              }
            }}
          >
            Done
          </Button>
        </Box>
      </Box>
    </Modal>
  );
} 