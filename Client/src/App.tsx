import { Route, Routes, useLocation } from "react-router-dom";
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
import CreateNote from "./Views/CreateNote/CreateNote"
import NoteDetailView from "./Views/NoteDetailView/NoteDetailView";

function App() {
  const dispatch = useDispatch();
  const location = useLocation()
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
      {
        location.pathname !== '/dashboard/create' && <NavBar />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/dashboard/create" element={<CreateNote/>} />
        <Route path="/dashboard/note/:id" element={<NoteDetailView/>}/>
      </Routes>
    </div>
  );
}

export default App;
