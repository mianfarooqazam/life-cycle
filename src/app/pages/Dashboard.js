import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  // Dummy data for the dashboard
  const projectStats = {
    totalProjects: 12,
    activeProjects: 8,
    completedProjects: 4,
    totalBudget: 2450000,
  };

  const carbonData = {
    totalEmissions: 1234.56,
    saved: 456.78,
    target: 1500,
    trend: -12.5,
  };

  const materials = [
    { name: "Concrete", quantity: "2,450 m³", cost: "$245,000", carbon: "735 tons CO₂", carbonValue: 735 },
    { name: "Steel", quantity: "180 tons", cost: "$162,000", carbon: "468 tons CO₂", carbonValue: 468 },
    { name: "Timber", quantity: "850 m³", cost: "$68,000", carbon: "-425 tons CO₂", carbonValue: -425 },
    { name: "Asphalt", quantity: "1,200 tons", cost: "$96,000", carbon: "120 tons CO₂", carbonValue: 120 },
  ];

  const recentProjects = [
    { name: "Highway Extension A12", progress: 78, budget: "$1.2M", status: "on-track" },
    { name: "Bridge Reinforcement", progress: 45, budget: "$450K", status: "delayed" },
    { name: "Urban Plaza Development", progress: 92, budget: "$800K", status: "on-track" },
  ];

  
  

  // Material costs bar chart data
  const materialCostData = {
    labels: materials.map(m => m.name),
    datasets: [
      {
        label: 'Cost (USD)',
        data: [245000, 162000, 68000, 96000],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
          'rgb(34, 197, 94)',
          'rgb(251, 146, 60)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 text-center" style={{
                backgroundColor: "#2663eb",
                padding: "12px 20px",
                borderRadius: 5,
                color: "#fff"
            }}>Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{projectStats.totalProjects}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">${(projectStats.totalBudget / 1000000).toFixed(1)}M</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Carbon Emissions</p>
              <p className="text-2xl font-bold text-gray-900">{carbonData.totalEmissions.toFixed(0)} tons</p>
              <p className="text-xs text-red-500">↑ {Math.abs(carbonData.trend)}% vs last month</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Carbon Saved</p>
              <p className="text-2xl font-bold text-gray-900">{carbonData.saved.toFixed(0)} tons</p>
              <p className="text-xs text-green-500">↑ 23% vs last month</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Project Progress - Moved to Top */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Active Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentProjects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{project.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === 'on-track' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Budget: {project.budget}</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      
        {/* Material Costs Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Material Costs Breakdown</h3>
          <div className="h-64">
            <Bar data={materialCostData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Materials Calculator - Now full width */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Materials Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {materials.map((material, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{material.name}</h4>
                  <p className="text-sm text-gray-500">Quantity: {material.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{material.cost}</p>
                  <p className={`text-sm ${material.carbon.startsWith('-') ? 'text-green-600' : 'text-orange-600'}`}>
                    {material.carbon}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Total Cost:</span>
            <span className="font-bold text-xl text-gray-900">$571,000</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold text-gray-900">Net Carbon:</span>
            <span className="font-bold text-xl text-orange-600">898 tons CO₂</span>
          </div>
        </div>
      </div>
    </div>
  );
}