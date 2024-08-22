import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppDrawer from "../ui/AppDrawer";
import SettingSide from "./SettingSide";

const SettingLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  return (
    <div className="flex max-w-[1400px] m-auto">
      <div
        className=" border-r-2 border-gray-700"
        style={{
          height: "calc(100vh - 200px)",

          minWidth: 300,
          marginTop: 20,
        }}
      >
        <SettingSide />
      </div>
      <div className="flex-1 m-5 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingLayout;
