export default function Dimensions() {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">User Profile</h3>
            <p className="text-gray-600 dark:text-gray-300">Manage your profile settings...</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Preferences</h3>
            <p className="text-gray-600 dark:text-gray-300">Application preferences...</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Account Settings</h3>
            <p className="text-gray-600 dark:text-gray-300">Account management...</p>
          </div>
        </div>
      </div>
    );
  }