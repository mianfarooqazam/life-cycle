import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    PencilRuler,
    BrickWall,
    CircleDollarSign,
    Unplug,
    BarChart3,
    LogOut,
    HelpCircle,
    Landmark,
} from 'lucide-react';

function IconWithTooltip({ Icon, tooltipText, onClick, active, iconColor, size = 24, padding = 'p-3' }) {
    return (
        <div className="relative group">
            <motion.div
                className={`${padding} rounded-xl flex justify-center items-center cursor-pointer transition-all duration-200 ${active
                        ? 'bg-white border-2 border-blue-600 shadow-lg'
                        : 'bg-white shadow-md hover:shadow-lg'
                    }`}
                whileHover={{ scale: active ? 1.25 : 1.1, rotate: 3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                animate={{ scale: active ? 1.15 : 1 }}
                onClick={onClick}
            >
                <Icon size={size} color={iconColor || (active ? '#2663EB' : 'black')} />
            </motion.div>

            {/* Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {tooltipText}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
            </div>
        </div>
    );
}

export default function Sidebar({ activeSection, setActiveSection }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'building-plan', label: 'Building Plan', icon: Landmark },
        { id: 'dimensions', label: 'Building Dimensions', icon: PencilRuler },
        { id: 'materials', label: 'Materials', icon: BrickWall },
        { id: 'labour-cost', label: 'Labour Cost', icon: CircleDollarSign },
        { id: 'other-cost', label: 'Other Cost', icon: Unplug },
        { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    ];

    const handleLogout = () => {
        // Add your logout logic here
        console.log('Logging out...');
    };

    const handleHelp = () => {
        // Add your help logic here
        console.log('Opening help...');
    };

    return (
        <div className="col-span-1 row-span-2 rounded-lg p-4" style={{ backgroundColor: '#f7f6fb' }}>
            <nav className="h-full flex flex-col">
                {/* Main menu items */}
                <div className="flex flex-col items-center justify-center gap-8 flex-1">
                    {menuItems.map((item) => (
                        <IconWithTooltip
                            key={item.id}
                            Icon={item.icon}
                            tooltipText={item.label}
                            active={activeSection === item.id}
                            onClick={() => setActiveSection(item.id)}
                        />
                    ))}
                </div>

                {/* Divider */}
                <div className="mx-auto w-20 h-px bg-gray-300 my-4"></div>

                {/* Bottom section with logout, help and version */}
                <div className="flex flex-col items-center gap-3 pb-4">
                   
                    <IconWithTooltip
                        Icon={HelpCircle}
                        tooltipText="Help"
                        active={false}
                        onClick={handleHelp}
                        iconColor="#6B7280"
                        size={18}
                        padding="p-2"
                    />
                     <IconWithTooltip
                        Icon={LogOut}
                        tooltipText="Logout"
                        active={false}
                        onClick={handleLogout}
                        iconColor="#EF4444"
                        size={18}
                        padding="p-2"
                    />
                    
                    {/* Version */}
                    <div className="text-xs text-blue-500">
                        v1.0.0
                    </div>
                </div>
            </nav>
        </div>
    );
}