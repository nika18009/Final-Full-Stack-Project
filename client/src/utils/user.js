export const checkUserCredentials = (users, checkingUser) => {
    return users.find(
      (user) =>
        user.email === checkingUser.email &&
        user.password === checkingUser.password
    );
  };

  export const checkRegisterUserCredentials = (users, checkingUser) => {
    return users.find(
      (user) =>
        user.email === checkingUser.email
    );
  };