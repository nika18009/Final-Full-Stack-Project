import TopbarAuthenticated from "../components/TopBar/TopBarAuthenticated";

import React from "react";

const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <TopbarAuthenticated />
      <div className="authenticated-container">{children}</div>
    </>
  );
};

export default AuthenticatedLayout;
