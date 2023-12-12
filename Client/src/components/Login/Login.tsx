import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { loginUser } from "../../Redux/features/userLoginSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const loginStatus = useSelector((state: RootState) => state.login.status);
  const loginError = useSelector((state: RootState) => state.login.error);
  const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);
  const token = useSelector((state: RootState) => state.login.token)
  interface LoginAttribute {
    email: string;
    password: string;
  }
  const [input, setInput] = useState<LoginAttribute>({
    email: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(loginUser(input));
  };
  useEffect(() => {
    if (loginStatus === "succeeded") {
      window.alert("Usuario logueado con éxito!");
    } else if (loginStatus === "rejected") {
      window.alert(loginError);
    }
}, [loginError, loginStatus]);

  useEffect(() => {     
    if(isAuthenticated && token){
        navigate('/dashboard')
    }
  },[isAuthenticated, navigate, loginStatus, token])
  return {
    handleSubmit, handleChange,
  }
};

export default Login;
