import TitleHeader from '@/app/components/header/TitleHeader';
import { useBuildingPlanStore } from '@/app/store/buildingPlanStore';
import { useBeamDetailsStore } from '@/app/store/beamDetailsStore';
import { useColumnDetailsStore } from '@/app/store/columnDetailsStore';

export default function Analysis() {
  const buildingPlan = useBuildingPlanStore();
  const beamStore = useBeamDetailsStore();
  const columnStore = useColumnDetailsStore();

  const totalBeamVolume = beamStore.calculateTotalVolume();
  const totalColumnVolume = columnStore.calculateTotalVolume();

  return (
    <div className="p-2 bg-white">
      <TitleHeader>Analysis</TitleHeader>
      <div className="space-y-4">
        {/* Building Plan Summary */}
        <div className="bg-[#f7f6fb] p-4 rounded-lg">
          <h3 className="font-medium mb-2">Building Plan Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Project Name:</span> {buildingPlan.projectName || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Address:</span> {buildingPlan.address || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Plot Size:</span> {buildingPlan.plotSize || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Plot Area:</span> {buildingPlan.plotArea} ft²
            </div>
            <div>
              <span className="font-medium">Number of Floors:</span> {buildingPlan.numberOfFloors || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Foundation Type:</span> {buildingPlan.foundationType || 'Not specified'}
            </div>
          </div>
        </div>

        {/* Room Configuration */}
        <div className="bg-[#f7f6fb]  p-4 rounded-lg">
          <h3 className="font-medium mb-2">Room Configuration</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div>
              <span className="font-medium">Rooms:</span> {buildingPlan.numberOfRooms || '0'}
            </div>
            <div>
              <span className="font-medium">Kitchens:</span> {buildingPlan.numberOfKitchens || '0'}
            </div>
            <div>
              <span className="font-medium">Washrooms:</span> {buildingPlan.numberOfWashrooms || '0'}
            </div>
            <div>
              <span className="font-medium">Lounges:</span> {buildingPlan.numberOfLounges || '0'}
            </div>
          </div>
        </div>

        {/* Structural Analysis */}
        <div className="bg-[#f7f6fb]  rounded-lg">
          <h3 className="font-medium mb-2">Structural Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-3  rounded">
              <div className="text-2xl font-bold ">
                {totalBeamVolume}
              </div>
              <div className="text-sm ">Total Beam Volume (ft³)</div>
            </div>
            <div className="text-center p-3  rounded">
              <div className="text-2xl font-bold ">
                {totalColumnVolume}
              </div>
              <div className="text-sm ">Total Column Volume (ft³)</div>
            </div>
          </div>
        </div>

        {/* Beam Details */}
        <div className="bg-[#f7f6fb]  p-4 rounded-lg">
          <h3 className="font-medium mb-2">Beam Details</h3>
          {beamStore.beamData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Sr No</th>
                    <th className="text-left p-2">No. of Beams</th>
                    <th className="text-left p-2">Length (ft)</th>
                    <th className="text-left p-2">Width (in)</th>
                    <th className="text-left p-2">Depth (in)</th>
                    <th className="text-left p-2">Volume (ft³)</th>
                  </tr>
                </thead>
                <tbody>
                  {beamStore.beamData.map((beam, index) => (
                    <tr key={beam.id || index} className="border-b">
                      <td className="p-2">{beam.srNo || index + 1}</td>
                      <td className="p-2">{beam.numberOfBeams}</td>
                      <td className="p-2">{beam.beamLength}</td>
                      <td className="p-2">{beam.beamWidth}</td>
                      <td className="p-2">{beam.beamDepth}</td>
                      <td className="p-2">{beam.beamVolume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">No beam data available</p>
          )}
        </div>

        {/* Column Details */}
        <div className="bg-[#f7f6fb]  p-4 rounded-lg">
          <h3 className="font-medium mb-2">Column Details</h3>
          {columnStore.columnData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Sr No</th>
                    <th className="text-left p-2">No. of Columns</th>
                    <th className="text-left p-2">Height (ft)</th>
                    <th className="text-left p-2">Length (in)</th>
                    <th className="text-left p-2">Width (in)</th>
                    <th className="text-left p-2">Volume (ft³)</th>
                  </tr>
                </thead>
                <tbody>
                  {columnStore.columnData.map((column, index) => (
                    <tr key={column.id || index} className="border-b">
                      <td className="p-2">{column.srNo || index + 1}</td>
                      <td className="p-2">{column.numberOfColumns}</td>
                      <td className="p-2">{column.columnHeight}</td>
                      <td className="p-2">{column.columnLength}</td>
                      <td className="p-2">{column.columnWidth}</td>
                      <td className="p-2">{column.columnVolume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">No column data available</p>
          )}
        </div>

        {/* Construction Details */}
        <div className="bg-[#f7f6fb] p-4 rounded-lg">
          <h3 className="font-medium mb-2">Construction Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Basement Used:</span> {buildingPlan.isBasementUsed === 'yes' ? 'Yes' : 'No'}
            </div>
            <div>
              <span className="font-medium">Excavator Type:</span> {buildingPlan.excavatorType || 'Not specified'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}