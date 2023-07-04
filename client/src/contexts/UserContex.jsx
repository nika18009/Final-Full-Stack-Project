import { createContext, useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { LOGIN_ROUTE } from "../routes/const";
import { checkUserCredentials } from "../utils/user";
import { getUsers, createUser } from "../api/users";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  handleLogin: () => null,
  handleLogout: () => null,
  handleRegister: () => null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // null | {email: "test", password: "asd123"}
  const isLoggedIn = !!user; // null | {email: "test", password: "asd123"}
  const navigate = useNavigate();
  // !!null => false
  // !!{email: "test", password: "asd123"} => true

  const handleLogin = (user, setError) => {
    getUsers()
      .then((response) => {
        const existingUser = checkUserCredentials(response, user);
        if (existingUser) {
          setUser(existingUser);
          localStorage.setItem("user", JSON.stringify(existingUser));
        } else {
          setError("User email or password is incorrect.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("user", null);
    navigate(LOGIN_ROUTE);
  };

  const handleRegister = (newUser) => {
    createUser(newUser)
      .then(() => {
        navigate(LOGIN_ROUTE);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const handleUpdateUser = (updatingUser) => {
  //   updateUser(user.id, updatingUser)
  //     .then((response) => {
  //       setUser(response);
  //       localStorage.setItem("user", JSON.stringify(response));
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    // <Router>
      <UserContext.Provider
        value={{
          user,
          isLoggedIn,
          handleLogin,
          handleLogout,
          handleRegister,
        }}
      >
        {children}
      </UserContext.Provider>
    // </Router>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
