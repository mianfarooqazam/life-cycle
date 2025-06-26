"use client";
import dynamic from "next/dynamic";
const CadCanvas = dynamic(() => import("../components/canvas/CadCanvas"), { ssr: false });
export default function CadPage() {
  return <CadCanvas />;
}
