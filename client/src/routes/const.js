import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import LoginLayout from "../layouts/LoginLayout";
import Login from "../pages/Login/login";
import Main from "../pages/Main/Main";
import Register from "../pages/Register/Register";

export const REGISTER_ROUTE = "/register";
export const LOGIN_ROUTE = "/";
export const MAIN_ROUTE = "/";
// export const CONTACTS_ROUTE = "/contacts";
// export const PROFILE_ROUTE = "/profile";
// export const PROJECTS_ROUTE = "/projects";
// export const NEW_QUESTION_ROUTE = `${PROJECTS_ROUTE}/new`;
// export const PROJECT_ROUTE = `${PROJECTS_ROUTE}/:id`;
// export const EDIT_PROJECT_ROUTE = `${PROJECT_ROUTE}/edit`;

// kol neesu prisijnugęs
export const loginRoutes = {
  Layout: LoginLayout,
  routes: [
    {
      path: LOGIN_ROUTE,
      Component: Login,
    },
    {
      path: REGISTER_ROUTE,
      Component: Register,
    },
  ],
};

// kai esu prisijungęs
export const authenticatedRoutes = {
  Layout: AuthenticatedLayout,
  routes: [
    {
      path: MAIN_ROUTE,
      Component: Main,
    },
  ],
};
