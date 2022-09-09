import { useEffect, useState } from "react";
import header_image from "../assets/header_image.jpg";
import cutt_logo from "../assets/CUTT_LOGO.png";
import sun from "../assets/sun-svgrepo-com.svg";
import moon from "../assets/moon-svgrepo-com.svg";
import switch_off from "../assets/switch_off.svg";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import { useUserLog } from "../hooks/useUserLog";
import { useCurrentProject } from "../hooks/useCurrentProject";

const Header = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const { logUserOut } = useUserLog();
  const { currentProject } = useCurrentProject();
  const { accountManager } = currentProject;
  const [dropdownActive, setDropdownActive] = useState(false);
  const [accManagerImage, setAccManagerImage] = useState(
    "https://cuttevents-app.s3.eu-central-1.amazonaws.com/imageContentUrl-1657269731723.png"
  );

  useEffect(() => {
    if (accountManager && accountManager[0].imageContentUrl[0]) {
      const { imageContentUrl } = accountManager[0];
      setAccManagerImage(imageContentUrl[0]);
    }
  }, [accountManager]);

  const log_out = () => {
    localStorage.removeItem("userIsLogged");
    logUserOut();
  };

  return (
    <div className="relative h-32 m-8 overflow-hidden bg-black-50 dark:bg-white-50 rounded-lg">
      <div className="absolute z-30 flex w-full h-full">
        <div className="relative z-30 w-5/6 px-6 py-8 text-white md:py-10 md:w-1/2">
          <Link to="/">
            <img
              alt="front-end header"
              className="object-cover h-6"
              src={cutt_logo}
            />
          </Link>
        </div>
        <div
          className="absolute top-20 left-5 z-50 cursor-pointer"
          onClick={log_out}
        >
          <img
            className="w-10 h-10 rounded-full transition-all duration-500 ease-out hover:scale-105"
            src={isDarkMode ? switch_off : switch_off}
            alt="light/dark mode"
          />
        </div>
        <div className="absolute top-0 right-0 flex w-full h-full">
          <div className="w-1/3 h-full bg-white-50"></div>
          <div className="relative w-1/3">
            <svg
              fill="currentColor"
              viewBox="0 0 100 100"
              className="absolute inset-y-0 z-20 h-full text-white-50"
            >
              <polygon id="diagonal" points="0,0 100,0 50,100 0,100"></polygon>
            </svg>
            <svg
              fill="currentColor"
              viewBox="0 0 100 100"
              className="absolute inset-y-0 z-10 h-full ml-6 text-white opacity-50"
            >
              <polygon points="0,0 100,0 50,100 0,100"></polygon>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-10 w-9/12 h-full">
        <img
          alt="Backoffice header"
          className="object-cover h-full min-w-full"
          src={header_image}
        />
      </div>

      <div
        className="absolute top-1 right-1 z-50 "
        onMouseEnter={() => setDropdownActive(true)}
      >
        <img
          className="w-16 h-16 rounded-full transition-all duration-500 hover:scale-105 cursor-pointer "
          src={accManagerImage}
          alt="Rounded avatar"
          onMouseLeave={() => setDropdownActive(false)}
          onClick={() => setDropdownActive(!dropdownActive)}
        />
      </div>
      <div
        onMouseLeave={() => setDropdownActive(false)}
        className={`${
          dropdownActive ? "block" : "hidden"
        } absolute top-20 right-10 bg-white-100 z-50`}
      >
        <div>
          <div className="font-bold text-black-50 border-3 border-b border-gray-500 p-3 mr-10">
            <p>
              Your Account Manager,{" "}
              <span className="text-orange-500">
                {localStorage.getItem("user_name")}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        className="absolute top-20 right-5 z-50 cursor-pointer"
        onClick={toggleDarkMode}
      >
        <img
          className="w-10 h-10 rounded-full transition-all duration-500 ease-out hover:rotate-180"
          src={isDarkMode ? moon : sun}
          alt="light/dark mode"
        />
      </div>
    </div>
  );
};

export default Header;
