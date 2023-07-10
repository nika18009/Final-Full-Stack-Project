import { useContext, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContex";
import { MAIN_ROUTE, REGISTER_ROUTE } from "../../routes/const";
import FormInput from "../../components/FormItem/FormItem";
import Button from "../../components/Button/Button";
import "./Login.scss";

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const loginSuccessful = await handleLogin(user, setError);
    if (loginSuccessful) {
      const path = generatePath(MAIN_ROUTE);
      navigate(path);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <Button>Log in</Button>
          <Link to={REGISTER_ROUTE}>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
