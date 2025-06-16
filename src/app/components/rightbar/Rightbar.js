'use client';
import TitleHeader from '@/app/components/header/TitleHeader';
import { useBuildingPlanStore } from '@/app/store/buildingPlanStore';

export default function Rightbar() {
  const {
    plotArea,
    plotSize,
    marlaSize,
    isBasementUsed,
    foundationType,
    numBedrooms,
    numBathrooms,
    numKitchens,
    numLivingRooms,
  } = useBuildingPlanStore();

  const plotDimensions = plotSize && marlaSize ? {
    width: Math.sqrt(plotArea),
    height: Math.sqrt(plotArea),
    area: plotArea
  } : null;

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

    return (
      <div className="overflow-auto max-w-full">
        <svg
          className="mx-auto"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          width="100%"
          height="auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Main plot boundary */}
          <rect
            x={padding}
            y={padding}
            width={viewWidth}
            height={viewHeight}
            fill="#e8f4f8"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          {/* Building footprint */}
          <rect
            x={padding + viewWidth * 0.1}
            y={padding + viewHeight * 0.1}
            width={viewWidth * 0.8}
            height={viewHeight * 0.8}
            fill="#f3f4f6"
            stroke="#374151"
            strokeWidth="2"
          />

          {/* Living area */}
          <rect
            x={padding + viewWidth * 0.1}
            y={padding + viewHeight * 0.1}
            width={viewWidth * 0.4}
            height={viewHeight * 0.4}
            fill="#dbeafe"
            stroke="#374151"
            strokeWidth="1"
          />

          {/* Kitchen */}
          <rect
            x={padding + viewWidth * 0.5}
            y={padding + viewHeight * 0.1}
            width={viewWidth * 0.4}
            height={viewHeight * 0.25}
            fill="#fed7d7"
            stroke="#374151"
            strokeWidth="1"
          />

          {/* Bedroom */}
          <rect
            x={padding + viewWidth * 0.5}
            y={padding + viewHeight * 0.35}
            width={viewWidth * 0.4}
            height={viewHeight * 0.3}
            fill="#d4edda"
            stroke="#374151"
            strokeWidth="1"
          />

          {/* Bathroom */}
          <rect
            x={padding + viewWidth * 0.1}
            y={padding + viewHeight * 0.5}
            width={viewWidth * 0.2}
            height={viewHeight * 0.4}
            fill="#fff3cd"
            stroke="#374151"
            strokeWidth="1"
          />

          {/* Corridor */}
          <rect
            x={padding + viewWidth * 0.3}
            y={padding + viewHeight * 0.5}
            width={viewWidth * 0.6}
            height={viewHeight * 0.4}
            fill="#e2e8f0"
            stroke="#374151"
            strokeWidth="1"
          />

          {/* Basement */}
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
                strokeDasharray="3,3"
              />
              <text
                x={padding + viewWidth * 0.5}
                y={padding + viewHeight * 0.95}
                textAnchor="middle"
                fill="#dc2626"
                fontSize="10"
              >
                Basement ({foundationType})
              </text>
            </g>
          )}

          {/* Room Labels with Counts */}
          <text
            x={padding + viewWidth * 0.3}
            y={padding + viewHeight * 0.3}
            textAnchor="middle"
            fill="#374151"
            fontSize="10"
          >
            Living ({numLivingRooms || 1})
          </text>
          <text
            x={padding + viewWidth * 0.7}
            y={padding + viewHeight * 0.22}
            textAnchor="middle"
            fill="#374151"
            fontSize="10"
          >
            Kitchen ({numKitchens || 1})
          </text>
          <text
            x={padding + viewWidth * 0.7}
            y={padding + viewHeight * 0.5}
            textAnchor="middle"
            fill="#374151"
            fontSize="10"
          >
            Bedroom ({numBedrooms || 1})
          </text>
          <text
            x={padding + viewWidth * 0.2}
            y={padding + viewHeight * 0.7}
            textAnchor="middle"
            fill="#374151"
            fontSize="10"
          >
            Bath ({numBathrooms || 1})
          </text>
          <text
            x={padding + viewWidth * 0.6}
            y={padding + viewHeight * 0.7}
            textAnchor="middle"
            fill="#374151"
            fontSize="10"
          >
            Corridor
          </text>

          {/* Dimensions */}
          <text
            x={padding + viewWidth / 2}
            y={padding - 5}
            textAnchor="middle"
            fill="#2563eb"
            fontSize="10"
          >
            {plotDimensions.width.toFixed(1)} ft
          </text>
          <text
            x={padding - 5}
            y={padding + viewHeight / 2}
            textAnchor="middle"
            fill="#2563eb"
            fontSize="10"
            transform={`rotate(-90, ${padding - 5}, ${padding + viewHeight / 2})`}
          >
            {plotDimensions.height.toFixed(1)} ft
          </text>
        </svg>
      </div>
    );
  };

  return (
    <div className="col-span-2 rounded-lg p-4" style={{ backgroundColor: '#f7f6fb' }}>
      <TitleHeader>Info Panel</TitleHeader>
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2 text-center text-black">2D Floor Plan</h3>
        {renderArchitecturePlan()}
      </div>
    </div>
  );
}
