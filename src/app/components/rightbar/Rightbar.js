export default function Rightbar() {
    return (
      <div className="col-span-2 rounded-lg p-4" style={{ backgroundColor: '#f7f6fb' }}>
        <h2 className="text-lg font-bold mb-4 text-center text-black">Information Panel</h2>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded">
            <div className="text-sm text-black">Total Carbon</div>
            <div className="text-lg font-bold text-black">1,234 kg CO₂</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-sm text-black">Total Cost</div>
            <div className="text-lg font-bold text-black">$12,345</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-sm text-black">Materials</div>
            <div className="text-lg font-bold text-black">567 units</div>
          </div>
        </div>
      </div>
    );
 }