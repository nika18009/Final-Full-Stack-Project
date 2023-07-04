import { useContext } from "react";
import { UserContext } from "../../contexts/UserContex";
import Button from "../../components/Button/Button";

const Main = () => {
  const { handleLogout } = useContext(UserContext);

  return (
    <Button type="button" variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Main;
