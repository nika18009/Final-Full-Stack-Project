import { createContext, useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { LOGIN_ROUTE } from "../routes/const";
import {
  checkUserCredentials,
  checkRegisterUserCredentials,
} from "../utils/user";
import { getUsers, createUser } from "../api/users";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  userId: null,
  handleLogin: () => null,
  handleLogout: () => null,
  handleRegister: () => null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const isLoggedIn = !!user;
  const userId = user ? user._id : null; 
  const navigate = useNavigate();

  const handleLogin = async (user, setError) => {
    try {
      const response = await getUsers();
      const existingUser = checkUserCredentials(response, user);
      if (existingUser) {
        setUser(existingUser);
        localStorage.setItem("user", JSON.stringify(existingUser));
        return true;
      } else {
        setError("User email or password is incorrect.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during login.");
    }

    return false;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate(LOGIN_ROUTE);
  };

  const handleRegister = (newUser, setError) => {
    getUsers()
      .then((response) => {
        const existingUser = checkRegisterUserCredentials(response, newUser);
        if (existingUser) {
          setError("User with this email already exists");
        } else {
          createUser(newUser).then(() => {
            navigate(LOGIN_ROUTE);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        userId, 
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
