export default function Rightbar() {
    return (
      <div className="col-span-2 bg-green-50 dark:bg-green-900 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 p-3 rounded">
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Carbon</div>
            <div className="text-lg font-bold">1,234 kg CO₂</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded">
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Cost</div>
            <div className="text-lg font-bold">$12,345</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded">
            <div className="text-sm text-gray-600 dark:text-gray-300">Materials</div>
            <div className="text-lg font-bold">567 units</div>
          </div>
        </div>
      </div>
    );
}