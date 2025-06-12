export default function Materials() {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Overview</h3>
            <p className="text-gray-600 dark:text-gray-300">Dashboard overview content...</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Recent Activities</h3>
            <p className="text-gray-600 dark:text-gray-300">Recent activities...</p>
          </div>
        </div>
      </div>
    );
  }