import Dashboard from "../pages/Dashboard";
import Dimensions from "../pages/Dimensions";
import Materials from "../pages/Materials";
import LabourCost from "../pages//LabourCost";
import OtherCost from "../pages/OtherCost";
import Analysis from "../pages/Analysis";
import BuildingPlan from "../pages/BuildingPlan";
import Cad from "../pages/Cad";

export default function MainContent({ activeSection }) {
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
        case 'building-plan':
        return <BuildingPlan />;
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
        case 'cad':
        return <Cad />;
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