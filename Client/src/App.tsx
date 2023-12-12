import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  authenticatedLoginStatus,
  logout,
} from "./Redux/features/userLoginSlice";
import LoginView from "./Views/LoginView/LoginView";
import RegisterView from "./Views/RegisterView/RegisterView";
import NavBar from "./Views/NavBar/NavBar";
import DashboardView from "./Views/Dashboard/DashboardView";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authenticatedLoginStatus({ token, isAuthenticated: true });
    } else {
      dispatch(logout());
    }
  }, [dispatch]);
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/dashboard" element={<DashboardView />} />
      </Routes>
    </div>
  );
}

export default App;
