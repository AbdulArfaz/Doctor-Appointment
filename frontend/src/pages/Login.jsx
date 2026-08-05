import React, { useState } from "react";
import '../styles/Login.css'

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <>
    <form className="login-box">
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
