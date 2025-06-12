export default function Sidebar({ activeSection, setActiveSection }) {
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'dimensions', label: 'Dimensions' },
      { id: 'materials', label: 'Materials' },
      { id: 'labour-cost', label: 'Labour Cost' },
      { id: 'other-cost', label: 'Other Cost' },
      { id: 'analysis', label: 'Analysis' },
    ];
  
    return (
      <div className="row-span-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left block p-2 rounded transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }