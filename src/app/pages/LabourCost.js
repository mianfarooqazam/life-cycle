export default function LabourCost() {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Carbon, Cost & Quantity Analysis</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Carbon Footprint</h3>
            <p className="text-gray-600 dark:text-gray-300">Calculate environmental impact...</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Cost Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">Analyze project costs...</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Quantity Measurement</h3>
            <p className="text-gray-600 dark:text-gray-300">Track material quantities...</p>
          </div>
        </div>
      </div>
    );
  }