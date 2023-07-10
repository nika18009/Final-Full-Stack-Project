import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import LoginLayout from "../layouts/LoginLayout";
import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import Register from "../pages/Register/Register";
import NewQuestion from "../pages/NewQuestion/NewQuestion";
import Question from "../pages/Question/Question";
import EditQuestion from "../pages/EditQuestion/EditQuestion";
import NewAnswer from "../pages/Answer/Answer";

export const REGISTER_ROUTE = "/register";
export const LOGIN_ROUTE = "/login";
export const MAIN_ROUTE = "/";
export const NEW_QUESTION_ROUTE = `/newquestion`;
export const QUESTION_ROUTE = `/question/:id`;
export const EDIT_QUESTION_ROUTE = `${QUESTION_ROUTE}/edit`;
export const QUESTION_ANSWER_ROUTE = `${QUESTION_ROUTE}/answer`;
export const EDIT_ANSWER_ROUTE = `${QUESTION_ANSWER_ROUTE}/edit`;

export const loginRoutes = {
  Layout: LoginLayout,
  routes: [
    {
      path: MAIN_ROUTE,
      Component: Main,
    },
    {
      path: LOGIN_ROUTE,
      Component: Login,
    },
    {
      path: REGISTER_ROUTE,
      Component: Register,
    },
    {
      path: NEW_QUESTION_ROUTE,
      Component: Login,
    },
    {
      path: QUESTION_ROUTE,
      Component: Question,
    },
    {
      path: EDIT_QUESTION_ROUTE,
      Component: Login,
    },
  ],
};

export const authenticatedRoutes = {
  Layout: AuthenticatedLayout,
  routes: [
    {
      path: MAIN_ROUTE,
      Component: Main,
    },
    {
      path: NEW_QUESTION_ROUTE,
      Component: NewQuestion,
    },
    {
      path: QUESTION_ROUTE,
      Component: Question,
    },
    {
      path: EDIT_QUESTION_ROUTE,
      Component: EditQuestion,
    },
    {
      path: QUESTION_ANSWER_ROUTE,
      Component: NewAnswer,
    },
    {
      path: EDIT_ANSWER_ROUTE,
      Component: NewAnswer,
    },
  ],
};

export const topbarNavigationItems = [
  { route: LOGIN_ROUTE, title: "Log in" },
  { route: REGISTER_ROUTE, title: "Register" },
];
