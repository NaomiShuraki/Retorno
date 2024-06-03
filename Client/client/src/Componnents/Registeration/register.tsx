import { createRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./register.css";

export const Register = () => {
  const navigate = useNavigate();
  const nameVal = createRef<HTMLInputElement>();
  const emailVal = createRef<HTMLInputElement>();
  const passwordVal = createRef<HTMLInputElement>();
  const hendelRegister = () => {
    const nameRef = nameVal.current?.value;
    const emailRef = emailVal.current?.value;
    const passwordRef = passwordVal.current?.value;
    
    axios
        .post("http://localhost:4000/api/register/users", {
          name: nameRef,
          email: emailRef,
          password: passwordRef,
        })
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem("email", res.data.email);
          navigate("/homePage");
        })
        .catch((err) => {
          console.log("registration error", err);
          if (err.response && err.response.status === 401) {
            alert("Registration unsuccessful. Please log in.");
            navigate("/login");
          }
        });
    };
  return (
    <>
      <div className="container">
        <label>Name: </label>
        <input ref={nameVal} />
        <br />
        <label>Email: </label>
        <input ref={emailVal}/>
        <br />
        <label>Password:</label>
        <input ref={passwordVal} type="password" />
        <button onClick={hendelRegister}>register</button>
      </div>
    </>
  );
};
