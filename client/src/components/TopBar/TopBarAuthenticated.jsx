import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContex";
import { MAIN_ROUTE } from "../../routes/const";
import { FaUserAlt } from "react-icons/fa";
import Button from "../Button/Button";
import Logo from "../../assets/Logo.png";
import "./Topbar.scss";

const TopbarAuthenticated = () => {
  const { user } = useContext(UserContext);
  const { handleLogout } = useContext(UserContext);

  return (
    <nav className="navigation">
      <div>
        <img src={Logo} alt="" />
      </div>
      <div>
        <Link to={MAIN_ROUTE} key="Main Page">
          Main page
        </Link>
      </div>
      <div className="userInformation">
        <FaUserAlt />
        <p>{user.name}</p>

        <Button type="button" variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default TopbarAuthenticated;
