import { UserProvider } from "./UserContex";
import PropTypes from "prop-types";

const Providers = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
