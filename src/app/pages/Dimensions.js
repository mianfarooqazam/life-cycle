'use client';

import { useState } from 'react';
import { Building2, Home, Shield, Droplets } from 'lucide-react';
import BuildingFloor from '@/app/tabs/BuildingFloor';
import MumtyWalls from '@/app/tabs/MumtyWalls';
import ParapetWalls from '@/app/tabs/ParapetWalls';
import SepticTank from '@/app/tabs/SepticTank';
import TitleHeader from '@/app/components/header/TitleHeader'; 

export default function Dimensions() {
  const [activeTab, setActiveTab] = useState('buildingFloor');

  const tabs = [
    { id: 'buildingFloor', name: 'Building Floor', component: BuildingFloor, icon: Building2 },
    { id: 'mumtyWalls', name: 'Mumty Walls', component: MumtyWalls, icon: Home },
    { id: 'parapetWalls', name: 'Parapet Walls', component: ParapetWalls, icon: Shield },
    { id: 'septicTank', name: 'Septic Tank', component: SepticTank, icon: Droplets },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || BuildingFloor;

  return (
    <div className="p-2">
      <TitleHeader>Building Dimensions</TitleHeader>
      
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6" style={{ backgroundColor: '#f7f6fb' }}>
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-2 px-1 border-b-2 font-medium text-sm transition-colors
                  flex flex-col items-center gap-1
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <ActiveComponent />
      </div>
    </div>
  );
}