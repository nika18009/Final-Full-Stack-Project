import { useContext } from "react";
import {
  Routes as RoutesWrapper,
  Route,
  // BrowserRouter as Router,
} from "react-router-dom";
import { UserContext } from "../contexts/UserContex";
import { loginRoutes, authenticatedRoutes } from "./const";

const Routes = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { Layout, routes } = isLoggedIn ? authenticatedRoutes : loginRoutes;

  return (
    <RoutesWrapper>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
        />
      ))}
    </RoutesWrapper>
  );
};

export default Routes;
