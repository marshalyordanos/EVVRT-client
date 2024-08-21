import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import UsersList from "./pages/users/UsersList";
import { useDispatch } from "react-redux";
import { setCredential } from "./redux/auth/authSlice";
import authService from "./api/auth.service";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCredential({ user: authService.getCurrentUser() }));
  }, []);
  return (
    <>
      <Navbar />

      <Routes>
        <Route element={<ProtectedRoute />}>
          {/* <Route path='/login' element={ <Navigate to="/crm" replace={true} />} /> */}
          {/* <Route path='/login' element={ <Navigate to="/crm" replace={true} />} />  */}
          <Route
            path="/"
            element={<Navigate to="/blood/dashboard" replace={true} />}
          />
          <Route path="/users" element={<UsersList />} />
          {/* <Route path="/blood/*" element={<LayoutRouting />} /> */}
        </Route>

        {/* <Route element={<>Dashboard</>} path='/' /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<div>Signup</div>} />

        <Route path="*" element={<h1>Page is not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
