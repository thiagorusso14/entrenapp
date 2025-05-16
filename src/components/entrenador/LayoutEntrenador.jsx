import React from "react";
import SidebarEntrenador from "./SidebarEntrenador";
import { Outlet } from "react-router-dom";

const LayoutEntrenador = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarEntrenador />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutEntrenador;
