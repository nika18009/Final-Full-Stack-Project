import React from "react";
import Topbar from "../components/TopBar/TopBar";

const LoginLayout = ({ children }) => {
  return (
    <div>
      <Topbar />
      <div className="login-container">{children}</div>
    </div>
  );
};

export default LoginLayout;
