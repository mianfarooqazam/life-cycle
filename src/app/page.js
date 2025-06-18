"use client";
import { useState } from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Header from "@/app/components/header/Header";
import MainContent from "@/app/main/MainContent";
import Rightbar from "@/app/components/rightbar/Rightbar";
import ProtectedRoute from "./context/ProtectedRoute"; 

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <ProtectedRoute>
      <div className="h-screen grid grid-cols-10 grid-rows-[auto_1fr] gap-2 p-2">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <Header />
        <MainContent activeSection={activeSection} />
        <Rightbar />
      </div>
    </ProtectedRoute>
  );
}