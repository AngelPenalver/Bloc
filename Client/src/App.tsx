import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  authenticatedLoginStatus,
  getUserData,
  logout,
  setUserId,
} from "./Redux/features/userLoginSlice";
import LoginView from "./Views/LoginView/LoginView";
import RegisterView from "./Views/RegisterView/RegisterView";
import NavBar from "./Views/NavBar/NavBar";
import DashboardView from "./Views/Dashboard/DashboardView";
import CreateNote from "./Views/CreateNote/CreateNote"
import NoteDetailView from "./Views/NoteDetailView/NoteDetailView";
import toastr from "toastr";
import { AppDispatch, RootState } from "./Redux/store";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import ProfileView from "./Views/ProfileView/ProfileView";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation()
  const userId = useSelector((state: RootState) => state.login.userId)
  const token = useSelector((state: RootState) => state.login.token)
  const [view, setView] = useState(false)
  toastr.options = {
    "closeButton": true,
    "debug": true,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": false,
    "showDuration": 300,
    "hideDuration": 1000,
    "timeOut": 2000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  interface JWT {
    userId: string;
  }
  
  useEffect(() => {
    if (token) {
      
      dispatch(authenticatedLoginStatus({ token, isAuthenticated: true }))
      const decodedToken = jwtDecode<JWT>(token);
      dispatch(setUserId(decodedToken.userId));
      
      if(userId){
        dispatch(getUserData(userId))
      }
    } else {
      dispatch(logout());
    }
  }, [dispatch, token, userId]);
 useEffect(() => {
  if(location.pathname ===  '/dashboard/create' || location.pathname.startsWith("/dashboard/note/")){
    setView(false)
  }else{
    setView(true)
  }
 },[location.pathname])
  return (
    <div>
      {
       
        view && <NavBar/>
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/dashboard/create" element={<CreateNote/>} />
        <Route path="/dashboard/note/:id" element={<NoteDetailView/>}/>
        <Route path="/profile/:id" element={<ProfileView/>}/>
      </Routes>
    </div>
  );
}

export default App;
