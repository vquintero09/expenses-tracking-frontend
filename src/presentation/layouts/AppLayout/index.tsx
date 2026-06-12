import { Outlet } from "react-router-dom";
import { BottonNavigation } from "./BottonNavigation";

export const AppLayout = () => {
  return (
    <div className=" bg-main  min-h-screen">
      <main className="flex-1 overflow-y-auto pb-18">
        <Outlet />
      </main>
      <BottonNavigation />
    </div>
  );
};
