import { Link } from "react-router-dom";
import { topbarNavigationItems } from "../../routes/const";
import { MAIN_ROUTE } from "../../routes/const";
import Logo from "../../assets/Logo.png";
import "./Topbar.scss";

const Topbar = () => {
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
      <div className="loginRegisterButtons">
        {topbarNavigationItems.map((navItem) => (
          <button key={navItem.title}>
            <Link to={navItem.route}>{navItem.title}</Link>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Topbar;
