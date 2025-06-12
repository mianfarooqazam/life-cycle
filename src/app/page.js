import Image from "next/image";

export default function Home() {
 return (
   <div className="h-screen grid grid-cols-5 grid-rows-[auto_1fr] gap-2 p-2">
     {/* Sidebar - Left */}
     <div className="row-span-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
       <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
       <nav>
         <ul className="space-y-2">
           <li><a href="#" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Dashboard</a></li>
           <li><a href="#" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Analysis</a></li>
           <li><a href="#" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Reports</a></li>
           <li><a href="#" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Settings</a></li>
         </ul>
       </nav>
     </div>

     {/* Header - Top */}
     <div className="col-span-4 bg-blue-50 dark:bg-blue-900 rounded-lg p-4 flex items-center justify-between h-16">
       <h1 className="text-2xl font-bold">Life Cycle Analysis</h1>
       <div className="flex items-center gap-4">
         <span className="text-sm text-gray-600 dark:text-gray-300">Welcome back!</span>
         <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
       </div>
     </div>

     {/* Main Content - Center */}
     <div className="col-span-3 bg-white dark:bg-gray-900 rounded-lg p-6 overflow-auto">
       <h2 className="text-xl font-semibold mb-4">Carbon, Cost & Quantity Calculation</h2>
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
         <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
           <h3 className="font-medium mb-2">Carbon Footprint</h3>
           <p className="text-gray-600 dark:text-gray-300">Calculate environmental impact...</p>
         </div>
         <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
           <h3 className="font-medium mb-2">Carbon Footprint</h3>
           <p className="text-gray-600 dark:text-gray-300">Calculate environmental impact...</p>
         </div>
         <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
           <h3 className="font-medium mb-2">Carbon Footprint</h3>
           <p className="text-gray-600 dark:text-gray-300">Calculate environmental impact...</p>
         </div>
       </div>
     </div>

     {/* Right Bar */}
     <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
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
   </div>
 );
}