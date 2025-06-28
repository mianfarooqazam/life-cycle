'use client';
import { useState } from 'react';
import TitleHeader from '@/app/components/header/TitleHeader';
import { useBuildingPlanStore } from '@/app/store/buildingPlanStore';
import { useCadStore } from '@/app/store/cadStore';
import { Button, Box } from '@mui/material';

export default function Rightbar({ activeSection }) {
  const [highlightedElement, setHighlightedElement] = useState(null);
  
  const {
    plotArea,
    plotSize,
    marlaSize,
    isBasementUsed,
    foundationType,
    numberOfRooms,
    numberOfWashrooms,
    numberOfKitchens,
    numberOfLounges,
  } = useBuildingPlanStore();

  const {
    lines,
    wallDetails,
    hoveredLineIndex,
    hoveredLineDetails,
    getTotalStats
  } = useCadStore();

  const plotDimensions = plotSize && marlaSize ? {
    width: Math.sqrt(plotArea),
    height: Math.sqrt(plotArea),
    area: plotArea
  } : null;

  const handleHighlight = (element) => {
    setHighlightedElement(element);
  };

  // CAD-specific render function
  const renderCadInfo = () => {
    const stats = getTotalStats();
    
    return (
      <div className="space-y-4">
        {/* CAD Statistics */}
        <div className="p-4 rounded-md" style={{ backgroundColor: "#f0f8ff" }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">CAD Statistics</h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Lines:</span>
              <span className="font-semibold text-blue-600">{stats.totalLines}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">External Walls:</span>
              <span className="font-semibold text-green-600">{stats.totalExternalWalls}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Internal Walls:</span>
              <span className="font-semibold text-orange-600">{stats.totalInternalWalls}</span>
            </div>
          </div>
        </div>

        {/* Hovered Line Details */}
        {hoveredLineDetails && (
          <div className="p-4 rounded-md border-2 border-blue-200" style={{ backgroundColor: "#f0f8ff" }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Selected Line Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Wall Type:</span>
                <span className="font-semibold capitalize text-blue-600">
                  {hoveredLineDetails.wallType === 'external' ? 'External' : 'Internal'} Wall
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Length:</span>
                <span className="font-semibold text-green-600">{hoveredLineDetails.length} ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Height:</span>
                <span className="font-semibold text-green-600">{hoveredLineDetails.height} ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thickness:</span>
                <span className="font-semibold text-green-600">{hoveredLineDetails.thickness} in</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Area:</span>
                <span className="font-semibold text-purple-600">
                  {(parseFloat(hoveredLineDetails.length) * parseFloat(hoveredLineDetails.height)).toFixed(2)} ft²
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!hoveredLineDetails && (
          <div className="p-4 rounded-md border-2 border-dashed border-gray-300" style={{ backgroundColor: "#fafafa" }}>
            <h3 className="text-md font-semibold text-gray-700 mb-2">Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Hover over any line to see its details</li>
              <li>• Right-click on a line to edit its properties</li>
              <li>• Use the toolbar to draw and modify elements</li>
              <li>• Save your work when finished</li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderArchitecturePlan = () => {
    if (!plotDimensions) {
      return (
        <div className="p-4 rounded border-2 border-dashed border-gray-300 h-64 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-sm">No plot data available</div>
            <div className="text-xs mt-1">Complete the building plan form</div>
          </div>
        </div>
      );
    }

    const scale = 200 / Math.max(plotDimensions.width, plotDimensions.height);
    const viewWidth = plotDimensions.width * scale;
    const viewHeight = plotDimensions.height * scale;
    const padding = 20;
    const svgWidth = viewWidth + padding * 2;
    const svgHeight = viewHeight + padding * 2;

    // Architectural line weights and styles
    const getExteriorWallStyle = () => {
      if (highlightedElement === 'exterior') {
        return {
          stroke: '#ff6b35',
          strokeWidth: '3',
          filter: 'drop-shadow(0 0 6px rgba(255, 107, 53, 0.6))'
        };
      }
      return {
        stroke: '#1a1a1a',
        strokeWidth: '2.5'
      };
    };

    const getInteriorWallStyle = () => {
      if (highlightedElement === 'interior') {
        return {
          stroke: '#ff6b35',
          strokeWidth: '2',
          filter: 'drop-shadow(0 0 4px rgba(255, 107, 53, 0.6))'
        };
      }
      return {
        stroke: '#1a1a1a',
        strokeWidth: '1.5'
      };
    };

    const getSlabStyle = () => {
      if (highlightedElement === 'slab') {
        return {
          fill: '#ff6b35',
          opacity: '0.2',
          filter: 'drop-shadow(0 0 4px rgba(255, 107, 53, 0.4))'
        };
      }
      return {
        fill: '#f8f9fa'
      };
    };

    return (
      <div className="overflow-auto max-w-full">
        <svg
          className="mx-auto"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          width="100%"
          height="auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Plot boundary with architectural styling */}
          <rect
            x={padding}
            y={padding}
            width={viewWidth}
            height={viewHeight}
            fill="#f0f8ff"
            stroke="#4a90e2"
            strokeWidth="1.5"
            strokeDasharray="8,4"
          />

          {/* Building slab area (background) */}
          <rect
            x={padding + viewWidth * 0.08}
            y={padding + viewHeight * 0.08}
            width={viewWidth * 0.84}
            height={viewHeight * 0.84}
            fill={getSlabStyle().fill}
            opacity={getSlabStyle().opacity || '1'}
            filter={getSlabStyle().filter}
          />

          {/* Building footprint - Exterior Wall (only the boundary) */}
          <rect
            x={padding + viewWidth * 0.08}
            y={padding + viewHeight * 0.08}
            width={viewWidth * 0.84}
            height={viewHeight * 0.84}
            fill="none"
            stroke={getExteriorWallStyle().stroke}
            strokeWidth={getExteriorWallStyle().strokeWidth}
            filter={getExteriorWallStyle().filter}
          />

          {/* Main Living Area */}
          <rect
            x={padding + viewWidth * 0.12}
            y={padding + viewHeight * 0.12}
            width={viewWidth * 0.35}
            height={viewHeight * 0.35}
            fill="#e3f2fd"
            stroke={getInteriorWallStyle().stroke}
            strokeWidth={getInteriorWallStyle().strokeWidth}
            filter={getInteriorWallStyle().filter}
          />

          {/* Kitchen */}
          <rect
            x={padding + viewWidth * 0.52}
            y={padding + viewHeight * 0.12}
            width={viewWidth * 0.35}
            height={viewHeight * 0.25}
            fill="#fff3e0"
            stroke={getInteriorWallStyle().stroke}
            strokeWidth={getInteriorWallStyle().strokeWidth}
            filter={getInteriorWallStyle().filter}
          />

          {/* Bedroom */}
          <rect
            x={padding + viewWidth * 0.52}
            y={padding + viewHeight * 0.42}
            width={viewWidth * 0.35}
            height={viewHeight * 0.35}
            fill="#f3e5f5"
            stroke={getInteriorWallStyle().stroke}
            strokeWidth={getInteriorWallStyle().strokeWidth}
            filter={getInteriorWallStyle().filter}
          />

          {/* Bathroom */}
          <rect
            x={padding + viewWidth * 0.12}
            y={padding + viewHeight * 0.52}
            width={viewWidth * 0.25}
            height={viewHeight * 0.35}
            fill="#e8f5e8"
            stroke={getInteriorWallStyle().stroke}
            strokeWidth={getInteriorWallStyle().strokeWidth}
            filter={getInteriorWallStyle().filter}
          />

          {/* Corridor */}
          <rect
            x={padding + viewWidth * 0.42}
            y={padding + viewHeight * 0.52}
            width={viewWidth * 0.45}
            height={viewHeight * 0.35}
            fill="#fafafa"
            stroke={getInteriorWallStyle().stroke}
            strokeWidth={getInteriorWallStyle().strokeWidth}
            filter={getInteriorWallStyle().filter}
          />

          {/* Doors - Architectural door symbols */}
          {/* Main entrance */}
          <line
            x1={padding + viewWidth * 0.25}
            y1={padding + viewHeight * 0.08}
            x2={padding + viewWidth * 0.25}
            y2={padding + viewHeight * 0.12}
            stroke="#1a1a1a"
            strokeWidth="1"
          />
          <circle
            cx={padding + viewWidth * 0.25}
            cy={padding + viewHeight * 0.08}
            r="2"
            fill="#1a1a1a"
          />

          {/* Kitchen door */}
          <line
            x1={padding + viewWidth * 0.47}
            y1={padding + viewHeight * 0.37}
            x2={padding + viewWidth * 0.52}
            y2={padding + viewHeight * 0.37}
            stroke="#1a1a1a"
            strokeWidth="1"
          />
          <circle
            cx={padding + viewWidth * 0.47}
            cy={padding + viewHeight * 0.37}
            r="2"
            fill="#1a1a1a"
          />

          {/* Bedroom door */}
          <line
            x1={padding + viewWidth * 0.47}
            y1={padding + viewHeight * 0.52}
            x2={padding + viewWidth * 0.52}
            y2={padding + viewHeight * 0.52}
            stroke="#1a1a1a"
            strokeWidth="1"
          />
          <circle
            cx={padding + viewWidth * 0.47}
            cy={padding + viewWidth * 0.52}
            r="2"
            fill="#1a1a1a"
          />

          {/* Bathroom door */}
          <line
            x1={padding + viewWidth * 0.37}
            y1={padding + viewHeight * 0.52}
            x2={padding + viewWidth * 0.42}
            y2={padding + viewHeight * 0.52}
            stroke="#1a1a1a"
            strokeWidth="1"
          />
          <circle
            cx={padding + viewWidth * 0.37}
            cy={padding + viewHeight * 0.52}
            r="2"
            fill="#1a1a1a"
          />

          {/* Windows - Architectural window symbols */}
          {/* Living room window */}
          <rect
            x={padding + viewWidth * 0.25}
            y={padding + viewHeight * 0.08}
            width={viewWidth * 0.08}
            height="1"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="0.5"
          />

          {/* Kitchen window */}
          <rect
            x={padding + viewWidth * 0.65}
            y={padding + viewHeight * 0.12}
            width="1"
            height={viewHeight * 0.08}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="0.5"
          />

          {/* Bedroom window */}
          <rect
            x={padding + viewWidth * 0.65}
            y={padding + viewHeight * 0.52}
            width="1"
            height={viewHeight * 0.08}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="0.5"
          />

          {/* Bathroom window */}
          <rect
            x={padding + viewWidth * 0.12}
            y={padding + viewHeight * 0.65}
            width={viewWidth * 0.08}
            height="1"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="0.5"
          />

          {/* Basement - Architectural basement symbol */}
          {isBasementUsed === 'yes' && (
            <g>
              <rect
                x={padding + viewWidth * 0.15}
                y={padding + viewHeight * 0.15}
                width={viewWidth * 0.7}
                height={viewHeight * 0.7}
                fill="none"
                stroke="#dc2626"
                strokeWidth="1"
                strokeDasharray="4,2"
              />
              <text
                x={padding + viewWidth * 0.5}
                y={padding + viewHeight * 0.95}
                textAnchor="middle"
                fill="#dc2626"
                fontSize="8"
                fontWeight="bold"
              >
                BASEMENT ({foundationType})
              </text>
            </g>
          )}

          {/* Room Labels with architectural styling */}
          <text
            x={padding + viewWidth * 0.295}
            y={padding + viewHeight * 0.3}
            textAnchor="middle"
            fill="#1a1a1a"
            fontSize="8"
            fontWeight="600"
          >
            LIVING ({numberOfLounges || 1})
          </text>
          <text
            x={padding + viewWidth * 0.695}
            y={padding + viewHeight * 0.25}
            textAnchor="middle"
            fill="#1a1a1a"
            fontSize="8"
            fontWeight="600"
          >
            KITCHEN ({numberOfKitchens || 1})
          </text>
          <text
            x={padding + viewWidth * 0.695}
            y={padding + viewHeight * 0.6}
            textAnchor="middle"
            fill="#1a1a1a"
            fontSize="8"
            fontWeight="600"
          >
            BEDROOM ({numberOfRooms || 1})
          </text>
          <text
            x={padding + viewWidth * 0.245}
            y={padding + viewHeight * 0.7}
            textAnchor="middle"
            fill="#1a1a1a"
            fontSize="8"
            fontWeight="600"
          >
            BATH ({numberOfWashrooms || 1})
          </text>
          <text
            x={padding + viewWidth * 0.645}
            y={padding + viewHeight * 0.7}
            textAnchor="middle"
            fill="#1a1a1a"
            fontSize="8"
            fontWeight="600"
          >
            CORRIDOR
          </text>

          {/* Dimensions with architectural styling */}
          <text
            x={padding + viewWidth / 2}
            y={padding - 8}
            textAnchor="middle"
            fill="#4a90e2"
            fontSize="9"
            fontWeight="600"
          >
            {plotDimensions.width.toFixed(1)}&apos; - 0&quot;
          </text>
          <text
            x={padding - 8}
            y={padding + viewHeight / 2}
            textAnchor="middle"
            fill="#4a90e2"
            fontSize="9"
            fontWeight="600"
            transform={`rotate(-90, ${padding - 8}, ${padding + viewHeight / 2})`}
          >
            {plotDimensions.height.toFixed(1)}&apos; - 0&quot;
          </text>

          {/* North arrow */}
          <g transform={`translate(${padding + viewWidth * 0.85}, ${padding + viewHeight * 0.15})`}>
            <polygon
              points="0,-8 4,0 0,8 -4,0"
              fill="#1a1a1a"
            />
            <text
              x="0"
              y="15"
              textAnchor="middle"
              fill="#1a1a1a"
              fontSize="6"
              fontWeight="bold"
            >
              N
            </text>
          </g>

          {/* Scale bar */}
          <g transform={`translate(${padding + viewWidth * 0.1}, ${padding + viewHeight * 0.95})`}>
            <line
              x1="0"
              y1="0"
              x2="40"
              y2="0"
              stroke="#1a1a1a"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="-2"
              x2="0"
              y2="2"
              stroke="#1a1a1a"
              strokeWidth="1"
            />
            <line
              x1="20"
              y1="-2"
              x2="20"
              y2="2"
              stroke="#1a1a1a"
              strokeWidth="1"
            />
            <line
              x1="40"
              y1="-2"
              x2="40"
              y2="2"
              stroke="#1a1a1a"
              strokeWidth="1"
            />
            <text
              x="20"
              y="12"
              textAnchor="middle"
              fill="#1a1a1a"
              fontSize="6"
              fontWeight="600"
            >
              10&apos; - 0&quot;
            </text>
          </g>
        </svg>
      </div>
    );
  };

  // Render different content based on active section
  if (activeSection === 'cad') {
    return (
      <div className="col-span-2 rounded-lg p-4" style={{ backgroundColor: '#f7f6fb' }}>
        <TitleHeader>CAD Info Panel</TitleHeader>
        {renderCadInfo()}
      </div>
    );
  }

  return (
    <div className="col-span-2 rounded-lg p-4" style={{ backgroundColor: '#f7f6fb' }}>
      <TitleHeader>Info Panel</TitleHeader>
      
      {/* Highlight Control Buttons */}
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 3 }}>
        <Button
          variant={highlightedElement === 'exterior' ? 'contained' : 'outlined'}
          size="small"
          onClick={() => handleHighlight(highlightedElement === 'exterior' ? null : 'exterior')}
          sx={{
            backgroundColor: highlightedElement === 'exterior' ? '#5BB045' : 'transparent',
            color: highlightedElement === 'exterior' ? '#fff' : '#5BB045',
            borderColor: '#5BB045',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: highlightedElement === 'exterior' ? '#4a9a3a' : 'rgba(91, 176, 69, 0.1)',
              borderColor: '#4a9a3a',
            }
          }}
        >
          Exterior Wall
        </Button>
        <Button
          variant={highlightedElement === 'interior' ? 'contained' : 'outlined'}
          size="small"
          onClick={() => handleHighlight(highlightedElement === 'interior' ? null : 'interior')}
          sx={{
            backgroundColor: highlightedElement === 'interior' ? '#5BB045' : 'transparent',
            color: highlightedElement === 'interior' ? '#fff' : '#5BB045',
            borderColor: '#5BB045',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: highlightedElement === 'interior' ? '#4a9a3a' : 'rgba(91, 176, 69, 0.1)',
              borderColor: '#4a9a3a',
            }
          }}
        >
          Interior Wall
        </Button>
        <Button
          variant={highlightedElement === 'slab' ? 'contained' : 'outlined'}
          size="small"
          onClick={() => handleHighlight(highlightedElement === 'slab' ? null : 'slab')}
          sx={{
            backgroundColor: highlightedElement === 'slab' ? '#5BB045' : 'transparent',
            color: highlightedElement === 'slab' ? '#fff' : '#5BB045',
            borderColor: '#5BB045',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: highlightedElement === 'slab' ? '#4a9a3a' : 'rgba(91, 176, 69, 0.1)',
              borderColor: '#4a9a3a',
            }
          }}
        >
          Slab
        </Button>
      </Box>

      <div className="mb-4">
        <h3 className="text-md font-semibold text-center text-black mb-3">
          2D Floor Plan
        </h3>
        
        {renderArchitecturePlan()}
      </div>
    </div>
  );
}
