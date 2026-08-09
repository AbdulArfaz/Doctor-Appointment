import React, { useContext, useState } from "react";
import '../styles/Login.css'
 import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Login = () => {
  //new
  const {backendurl,setToken,setUserData} = useContext(AppContext)
  const navigate  = useNavigate()

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
 


  const handleSubmit =async (evt) => {
    evt.preventDefault();
    //new
    try {
      if (state === 'Sign Up') {
        const {data} = await axios.post(`${backendurl}/api/user/register`,{name,email,password})
        if(data.success || data.statusCode === 200 || data.statusCode ===201){
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success("Account Created! Please Login. ")
          setState('Login')
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(`${backendurl}/api/user/login`,{email,password})
        if (data.success || data.statusCode === 200) {
          const accessToken = data.data.accessToken
          localStorage.setItem('token', accessToken)
          setToken(accessToken)
          setUserData(data.data.user)
          toast.success('Logged in Successfully')
          navigate('/')
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  };



  return (
    <>
    <form onSubmit={handleSubmit} className="login-box">
  <p className="form-header">{state === "Sign Up" ? "Create Account" : "Login"}</p>
  <p className="form-subtext">
    Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment
  </p>

  {state === "Sign Up" && (
    <div className="form-group">
      <p className="field-label">Full Name</p>
      <input
        type="text"
        className="field-input"
        onChange={(evt) => setName(evt.target.value)}
        value={name}
      />
    </div>
  )}

  <div className="form-group">
    <p className="field-label">Email</p>
    <input
      type="email"
      className="field-input"
      onChange={(evt) => setEmail(evt.target.value)}
      value={email}
    />
  </div>

  <div className="form-group">
    <p className="field-label">Password</p>
    <input
      type="password"
      className="field-input"
      onChange={(evt) => setPassword(evt.target.value)}
      value={password}
    />
  </div>

  <button type="submit" className="submit-btn">
    {state === "Sign Up" ? "Create Account" : "Login"}
  </button>

  {state === "Sign Up" ? (
    <p className="switch-mode-text">
      Already have an account?{" "}
      <span onClick={() => setState("Login")} className="switch-mode-btn">
        Login here
      </span>
    </p>
  ) : (
    <p className="switch-mode-text">
      Create a New Account?{" "}
      <span onClick={() => setState("Sign Up")} className="switch-mode-btn">
        Click here
      </span>
    </p>
  )}
</form>
    </>
  );
};

export default Login;
