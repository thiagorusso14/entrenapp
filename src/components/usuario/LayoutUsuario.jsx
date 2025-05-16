import { Outlet } from "react-router-dom";
import SidebarUsuario from "./SidebarUsuario";

const LayoutUsuario = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarUsuario />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutUsuario;
