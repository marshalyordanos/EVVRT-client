import React from "react";
import { Route, Routes } from "react-router-dom";
import SettingLayout from "./components/layout/SettingLayout";
import ProfilePage from "./pages/Profile";

const SettingRoutting = () => {
  return (
    <Routes>
      <Route element={<SettingLayout />}>
        <Route path="/dashboard" element={<div>dash board</div>} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default SettingRoutting;
