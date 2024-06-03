import SimpleMenu from "Componnents/DropDown/dropDowm";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import AboutUsForRidders from "../AboutUs/aboutUsForRidders";
import AboutUsForTheraphy from "../AboutUs/aboutUsTherpay";
import AboutUsMain from "../AboutUs/aboutUsMain";
import CallIcon from "@mui/icons-material/Call";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import "./homePage.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Login } from "Componnents/Login/login";
import ChatPage from "Componnents/Chat/chat";

export const HomePage = () => {
  const courseProps = [
    "Therapeutic Riding Instructions",
    "Western riding level 1",
    "Western riding level 2",
    "Horse training",
    "Preparatory course",
  ];
  const competitiveNationalNeams = ["Extreme cowboy racing", "All-around"];
  const TherapeuticRiding = [
    "Mehuchedet | Leumit",
    "Clalit",
    "Macabi",
    "Privet Insutance",
  ];
  const Others = ["NationalService", "ODT"];

  const [showSignIn, setSignIn] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [color, setColr] = useState(false);
  const [token, setToken] = useState(false);
  const [chat, setChat] = useState(false);

  const handleChatClick = () => {
    setChat(!chat)
  };
  const handleSingIn = () => {
    setSignIn(!showSignIn);
    handelButtonSIngIn();
    handleBGcolor();
  };
  const handleBGcolor = () => {
    setColr(!color);
  };
  const handelButtonSIngIn = () => {
    setShowButton(!showButton);
  };
  useEffect(() => {
    const subContainer = document.getElementById("sub-container");
    let userToken = sessionStorage.getItem("token");
    if (userToken === null || userToken === undefined) {
      setToken(false);
    } else {
      setToken(true);
    }
    if (color === true) {
      if (subContainer) {
        document.body.style.background = "black";
      }
    } else if (color === false && subContainer) {
      document.body.style.background =
        "radial-gradient(circle,rgba(57, 136, 194, 1) 0%,rgba(1, 6, 19, 1) 49%)";
    }
  }, [color]);

  return (
    <>
      <div className="container-one">
        <div className="sub-container fade-in" id="sub-container">
          <div className="header topnav header-background">
            <img className="logo" />
            <div className="navBar-container">
              <Link to="/courses">
                <SimpleMenu courseProps={courseProps} header="COURSES" />
              </Link>
              <Link to="/teams">
                <SimpleMenu
                  courseProps={competitiveNationalNeams}
                  header="National Teams"
                />
              </Link>
              <Link to="/records">
                <SimpleMenu header="Records" />
              </Link>
              <Link to="/theraphy">
                <SimpleMenu
                  courseProps={TherapeuticRiding}
                  header="Therapeutic Riding"
                />
              </Link>
              <SimpleMenu courseProps={Others} header="Others" />
              <div className="Typography-phone">
                <CallIcon color="primary" />
                <Typography>{"  050-222-3643"}</Typography>
              </div>
            </div>

            <button
              className="whatsAppIcon-div"
              type="button"
              title="chat with us"
              onClick={handleChatClick}
            ></button>
            {chat && (<ChatPage/>)}
          </div>
          <div className="container-show">
            {showButton && (
              <div className="custom-animate-left">
                <h1>Welcome to Retorno 360</h1>
                {!token && (
                  <button className="sign-in-button" onClick={handleSingIn}>
                    Sign in
                  </button>
                )}
              </div>
            )}
            {showSignIn && (
              <div className="signInCon-div">
                <button className="closeButton" onClick={handleSingIn}>
                  <CloseIcon className="close-icone" />
                </button>
                <Login />
              </div>
            )}
          </div>
          <div className="footer">
            <div className="comp">
              <AboutUsMain />
            </div>
            {/*  <div className="comp">
              <AboutUsForTheraphy />
            </div> */}
            <div className="comp">
              <AboutUsForRidders />
            </div>
          </div>
          <br />
          <footer>
            <div className="footer-div">
              <FacebookIcon />
              <InstagramIcon />
              <YouTubeIcon />
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default HomePage;
