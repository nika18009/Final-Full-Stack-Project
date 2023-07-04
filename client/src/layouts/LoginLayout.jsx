import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <div className="login-container">
      <h1>Hello to my app!</h1>
      {children}
    </div>
  );
};

export default LoginLayout;
