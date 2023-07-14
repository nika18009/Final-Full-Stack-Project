import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ children, color,...props }) => {
  return (
    <button className={`styled-button ${color} `} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  color:PropTypes.string,
};



export default Button;
