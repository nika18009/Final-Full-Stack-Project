import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContex";
import { REGISTER_ROUTE } from "../../routes/const";
import Input from "../../components/FormItem/FormItem";
import Button from "../../components/Button/Button";

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    handleLogin(user, setError);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        
        <Input
          label="Email"
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <Button>Login</Button>
          <Link to={REGISTER_ROUTE}>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
