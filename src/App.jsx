import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import UsersList from "./pages/users/UsersList";
import SitesList from "./pages/sites/SitesList";
import RegionsList from "./pages/regions/RegionsList";

import { useDispatch } from "react-redux";
import { setCredential } from "./redux/auth/authSlice";
import authService from "./api/auth.service";
import SettingRoutting from "./setting-routing";
import IndicatorsList from "./pages/indicators/IndicatorsList";
import Home from "./pages/Home";
import AdminDashboard from "./pages/report/AdminDashboard";
import SettingPage from "./pages/SettingPage";
import IndicatorsDetail from "./pages/indicators/IndicatorsDetails";
import ForgetByEmail from "./pages/forget/ForgetByEmail";
import PassowrdReset from "./pages/forget/PassowrdReset";
import DashBoard from "./pages/Dashboard/DashBoard";
import ReportTab from "./pages/report/ReportTab";
import TargetSettingPage from "./pages/TargetSetting";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCredential({ user: authService.getCurrentUser() }));
  }, []);
  return (
    <div className="flex flex-col h-[100vh]">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route element={<ProtectedRoute />}>
            {/* <Route path='/login' element={ <Navigate to="/crm" replace={true} />} /> */}
            {/* <Route path='/login' element={ <Navigate to="/crm" replace={true} />} />  */}
            <Route
              path="/"
              element={<Navigate to="/blood/dashboard" replace={true} />}
            />
            <Route path="/blood/dashboard" element={<Home />} />

            <Route path="/users" element={<UsersList />} />
            <Route path="/sites" element={<SitesList />} />
            <Route path="/regions" element={<RegionsList />} />
            <Route path="/indicators" element={<IndicatorsList />} />
            <Route path="/indicators/:id" element={<IndicatorsDetail />} />

            <Route path="/admin" element={<ReportTab />} />
            <Route path="/dashboard" element={<DashBoard />} />

            <Route path="/report-setting" element={<SettingPage />} />
            <Route path="/target-setting" element={<TargetSettingPage />} />

            <Route path="/setting/*" element={<SettingRoutting />} />

            {/* <Route path="/blood/*" element={<LayoutRouting />} /> */}
          </Route>

          {/* <Route element={<>Dashboard</>} path='/' /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/forget-by-email" element={<ForgetByEmail />} />
          <Route path="/reset-password" element={<PassowrdReset />} />

          <Route path="/signup" element={<div>Signup</div>} />

          <Route path="*" element={<h1>Page is not found</h1>} />
        </Routes>
      </div>
      <div className="bg-red-800 mt-5">
        <p className="text-white p-10">
          Copyright 2024 EBTBS. All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default App;
