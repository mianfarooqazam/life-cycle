import Dashboard from "@/app/pages/Dashboard";
import Dimensions from "@/app/pages/Dimensions";
import Materials from "@/app/pages/Materials";
import LabourCost from "@/app/pages/LabourCost";
import OtherCost from "@/app/pages/OtherCost";
import Analysis from "@/app/pages/Analysis";

export default function MainContent({ activeSection }) {
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'dimensions':
        return <Dimensions />;
      case 'materials':
        return <Materials />;
      case 'labour-cost':
        return <LabourCost />;
      case 'other-cost':
        return <OtherCost />;
      case 'analysis':
        return <Analysis />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="col-span-7 rounded-lg p-6 overflow-auto" style={{ backgroundColor: '#fff' }}>
      {renderContent()}
    </div>
  );
}