export default function Header() {
    return (
      <div className="col-span-4 bg-blue-50 dark:bg-blue-900 rounded-lg p-4 flex items-center justify-between h-16">
        <h1 className="text-2xl font-bold">Life Cycle Analysis</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">Welcome back!</span>
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>
    );
  }