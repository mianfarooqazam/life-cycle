import TitleHeader from '@/app/components/header/TitleHeader';
import { useExteriorStore } from '@/app/store/tabs-components-store/exteriorstore';
import { useInteriorStore } from '@/app/store/tabs-components-store/interiorstore';
import { useSlabStore } from '@/app/store/tabs-components-store/slabstore';

export default function Analysis() {
  const { exteriors } = useExteriorStore();
  const { interiors } = useInteriorStore();
  const { slabs } = useSlabStore();

  return (
    <div className="p-2 bg-white">
      <TitleHeader>Analysis</TitleHeader>
      <div className="space-y-8">
        {/* Exterior Wall Details */}
        <div className="bg-[#f7f6fb] p-4 rounded-lg">
          <h3 className="font-medium mb-2 text-lg">Exterior Wall Details</h3>
          {exteriors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Sr No</th>
                    <th className="text-left p-2">Length (ft)</th>
                    <th className="text-left p-2">Height (ft)</th>
                    <th className="text-left p-2">Wall Area (ft²)</th>
                    <th className="text-left p-2">Wall Volume (ft³)</th>
                    <th className="text-left p-2">Curtain Wall</th>
                    <th className="text-left p-2">Glass Thickness</th>
                    <th className="text-left p-2">Wall Thickness (in)</th>
                    <th className="text-left p-2">Tiles Used</th>
                    <th className="text-left p-2">Tile Height (ft)</th>
                    <th className="text-left p-2">Tile Area (ft²)</th>
                    <th className="text-left p-2">Floor</th>
                  </tr>
                </thead>
                <tbody>
                  {exteriors.map((item, index) => (
                    <tr key={item.id || index} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{item.length}</td>
                      <td className="p-2">{item.height}</td>
                      <td className="p-2">{item.area}</td>
                      <td className="p-2">{item.wallVolume || '-'}</td>
                      <td className="p-2">{item.isCurtainWall === 'yes' ? 'Yes' : 'No'}</td>
                      <td className="p-2">{item.isCurtainWall === 'yes' ? item.glassThickness : '-'}</td>
                      <td className="p-2">{item.isCurtainWall === 'no' ? item.wallThickness : '-'}</td>
                      <td className="p-2">{item.areTilesUsed === 'yes' ? 'Yes' : 'No'}</td>
                      <td className="p-2">{item.areTilesUsed === 'yes' ? item.tileHeight : '-'}</td>
                      <td className="p-2">{item.areTilesUsed === 'yes' ? item.tileArea : '-'}</td>
                      <td className="p-2">{item.floor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No exterior wall data available</p>
          )}
        </div>

        {/* Interior Wall Details */}
        <div className="bg-[#f7f6fb] p-4 rounded-lg">
          <h3 className="font-medium mb-2 text-lg">Interior Wall Details</h3>
          {interiors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Sr No</th>
                    <th className="text-left p-2">Length (ft)</th>
                    <th className="text-left p-2">Height (ft)</th>
                    <th className="text-left p-2">Wall Area (ft²)</th>
                    <th className="text-left p-2">Wall Volume (ft³)</th>
                    <th className="text-left p-2">Curtain Wall</th>
                    <th className="text-left p-2">Glass Thickness</th>
                    <th className="text-left p-2">Wall Thickness (in)</th>
                    <th className="text-left p-2">Tiles Used</th>
                    <th className="text-left p-2">Tile Height (ft)</th>
                    <th className="text-left p-2">Tile Area (ft²)</th>
                    <th className="text-left p-2">Floor</th>
                  </tr>
                </thead>
                <tbody>
                  {interiors.map((item, index) => (
                    <tr key={item.id || index} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{item.length}</td>
                      <td className="p-2">{item.height}</td>
                      <td className="p-2">{item.area}</td>
                      <td className="p-2">{item.wallVolume || '-'}</td>
                      <td className="p-2">{item.isCurtainWall === 'yes' ? 'Yes' : 'No'}</td>
                      <td className="p-2">{item.isCurtainWall === 'yes' ? item.glassThickness : '-'}</td>
                      <td className="p-2">{item.isCurtainWall === 'no' ? item.wallThickness : '-'}</td>
                      <td className="p-2">{item.areTilesUsed === 'yes' ? 'Yes' : 'No'}</td>
                      <td className="p-2">{item.areTilesUsed === 'yes' ? item.tileHeight : '-'}</td>
                      <td className="p-2">{item.areTilesUsed === 'yes' ? item.tileArea : '-'}</td>
                      <td className="p-2">{item.floor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No interior wall data available</p>
          )}
        </div>

        {/* Slab Details */}
        <div className="bg-[#f7f6fb] p-4 rounded-lg">
          <h3 className="font-medium mb-2 text-lg">Slab Details</h3>
          {slabs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Sr No</th>
                    <th className="text-left p-2">Slab Area (ft²)</th>
                    <th className="text-left p-2">Slab Thickness (in)</th>
                    <th className="text-left p-2">Slab Volume (ft³)</th>
                    <th className="text-left p-2">Ceiling Area (ft²)</th>
                    <th className="text-left p-2">Tiles Area (ft²)</th>
                    <th className="text-left p-2">Floor</th>
                  </tr>
                </thead>
                <tbody>
                  {slabs.map((item, index) => (
                    <tr key={item.id || index} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{item.slabArea}</td>
                      <td className="p-2">{item.slabThickness}</td>
                      <td className="p-2">{item.slabVolume}</td>
                      <td className="p-2">{item.ceilingArea}</td>
                      <td className="p-2">{item.tilesArea}</td>
                      <td className="p-2">{item.floor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No slab data available</p>
          )}
        </div>
      </div>
    </div>
  );
}