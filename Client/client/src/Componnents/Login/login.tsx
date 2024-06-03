import { createRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

export const Login = () => {
  const navigate = useNavigate();
  const emailVal = createRef<HTMLInputElement>();
  const passwordVal = createRef<HTMLInputElement>();

  const hendelRegister = () => {
    const emailRef = emailVal.current?.value;
    const passwordRef = passwordVal.current?.value;
    axios
    .post("http://localhost:4000/api/login/users", {
      email: emailRef,
      password: passwordRef,
    })
    .then((res) => {
      console.log(res.data);
      if(res.data.token !== undefined){
        sessionStorage.setItem("email", res.data.Email);
        navigate("/homePage");

      }else{
        alert("Registration unsuccessful. Please sign up.");
        navigate("/register");
      }
    })
    .catch((err) => {
      console.log("registration error", err);
    });
    
  };
  return (
    <>
      <div className="container-login">
        <label>Email: </label>
        <input ref={emailVal}  />
        <br />
        <label>Password:</label>
        <input ref={passwordVal} type="password" />
        <button onClick={hendelRegister}>register</button>
      </div>
    </>
  );
};
