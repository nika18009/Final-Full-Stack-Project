// import Topbar from "../components/Topbar/Topbar";

import React from "react";

const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      {/* <Topbar /> */}
      <div className="authenticated-container">{children}</div>
    </>
  );
};

export default AuthenticatedLayout;
