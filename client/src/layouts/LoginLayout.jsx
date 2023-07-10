// import React from "react";
import PropTypes from "prop-types";
import Topbar from "../components/TopBar/TopBar";

const LoginLayout = ({ children }) => {
  return (
    <div>
      <Topbar />
      <div className="login-container">{children}</div>
    </div>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;
